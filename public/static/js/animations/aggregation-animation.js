/* Aggregation: noisy documents → 576 bins — SVG + GSAP animation.
   Brief: docs/research-animations/agent-handoff/briefs/02_aggregation_576_bins.md

   Claim shown: document-level influence scores are too noisy for direct
   interpretation; aggregating the stratified working set (5,678,621 documents,
   ~10.5B tokens, target 10,000 docs per bin) over the fixed 24 topics × 24
   formats taxonomy gives 576 stable corpus regions whose signed influence can
   be compared across benchmarks. All values come from the shared data module;
   the matrix shows the four selected bins from the claims panel.

   The SVG is authored in its FINAL poster state; the GSAP timeline animates
   toward it with fromTo tweens. Transient story elements (noisy dots, the big
   taxonomy grid, the averaging callout, beat captions) are authored hidden, so
   the static fallback, the reduced-motion frame, timeline.progress(1) and the
   poster are the same image by construction. Dot positions use a seeded PRNG,
   so every frame is deterministic for capture. */

import {
  TAXONOMY, WORKING_SET, BENCHMARKS, SELECTED_BINS_PANEL, PROJECT
} from "./socialtda-data.js";
import {
  influenceColor, influenceInk, benchmarkColor, mix,
  INFLUENCE_COLORS, UI_COLORS, Z_COLOR_CAP
} from "./socialtda-palettes.js";
import {
  svgEl, text, formatSigned, spokenSigned, formatInt, createLegend
} from "./socialtda-svg-utils.js";
import {
  makeSeekBeat, attachBeatControls, applyInitialPosition, makeSceneApi
} from "./socialtda-timeline-utils.js";

const VB_W = 1280;
const VB_H = 720;
/* Central square-crop zone: content placed inside x ∈ [280, 1000] survives a
   1:1 crop of the 16:9 render. */
const SQUARE_X = (VB_W - VB_H) / 2;
const CX = VB_W / 2;

export const BEATS = ["noise", "taxonomy", "aggregate", "matrix", "takeaway"];

const CAPTIONS = [
  "Document-level influence scores are noisy.",
  "Fix a topic × format taxonomy before inspection.",
  "Aggregate documents into corpus regions.",
  "Compare regions across benchmarks and capabilities."
];

const TAKEAWAY = "Not one document — one interpretable corpus region.";
const CAVEATS = [
  "Aggregation stabilizes estimates under the attribution metric — it does not make them exact.",
  "OLMo3-7B / Dolma3 · stratified working set · stylized dots — no raw documents shown."
];

/* Stylized noise dots: illustrative only (no real per-document values).
   Colors reuse the influence palette so the legend covers them. */
const DOT_COUNT = 240;
const DOT_POS = INFLUENCE_COLORS.positiveLight;
const DOT_NEG = mix(INFLUENCE_COLORS.neutral, INFLUENCE_COLORS.negative, 0.55);
const DOT_NEUTRAL = "#CFCFCF";

/* Big transient taxonomy grid (compressed 12×12 view of the 24×24 grid). */
const GRID_N = 12;
const GRID_SIZE = 280;
const GRID_X = CX - GRID_SIZE / 2;   // 500
const GRID_Y = 180;
const GRID_GAP = 3;
const GRID_CELL = (GRID_SIZE - (GRID_N - 1) * GRID_GAP) / GRID_N;
/* Vertical center of the transient stage (dot cloud, query chip, grid). */
const CLOUD_CY = GRID_Y + GRID_SIZE / 2;   // 320

/* Final matrix panel geometry (row = selected bin, column = benchmark). */
const LABEL_W = 210;
const COL_W = 96;
const COL_PITCH = 100;
const ROW_H = 38;
const ROW_PITCH = 44;
const MATRIX_W = LABEL_W + 8 + BENCHMARKS.length * COL_PITCH - (COL_PITCH - COL_W);
const MATRIX_X = CX - MATRIX_W / 2;
const CELLS_X = MATRIX_X + LABEL_W + 8;
const CHIPS_Y = 222;
const ROWS_Y = 262;

/* Deterministic PRNG so dot layout and stagger are identical on every load
   (frame-exact capture and reproducible posters). */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildAggregationAnimation(container, options = {}) {
  const opts = Object.assign({
    autoplay: true,
    loop: false,
    reducedMotion: null,   // null = follow prefers-reduced-motion
    stage: null,           // beat name or index to seek to
    end: false,            // jump to deterministic final frame
    reviewMode: false,     // hide public identifiers
    controls: true,
    showSquareGuide: false // dev aid: outline the square-crop zone
  }, options);

  const prefersReduced = typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reduced = opts.reducedMotion === null ? prefersReduced : !!opts.reducedMotion;
  const gsap = window.gsap;
  const animated = !reduced && !!gsap;

  const ariaLabel = "Animated diagram. Document-level influence scores are noisy, " +
    "so documents are aggregated into corpus regions: " + TAXONOMY.topics +
    " topics by " + TAXONOMY.formats + " formats gives " + TAXONOMY.bins +
    " bins over the stratified working set of " + formatInt(WORKING_SET.documents) +
    " documents, about " + WORKING_SET.tokensApprox + " tokens, with a target of " +
    formatInt(WORKING_SET.targetDocsPerBin) + " documents per bin. A matrix shows " +
    "signed influence z-scores for " + SELECTED_BINS_PANEL.length + " of the " +
    TAXONOMY.bins + " bins across " + BENCHMARKS.length + " benchmarks; for example, " +
    SELECTED_BINS_PANEL[0].bin + " scores " +
    spokenSigned(SELECTED_BINS_PANEL[0].values[BENCHMARKS[0].key]) + " on " +
    BENCHMARKS[0].name + ". In the OLMo3-7B / Dolma3 setting.";

  // ---------- scaffold ----------
  const root = document.createElement("div");
  root.className = "socialtda-animation stda-aggregation" + (animated ? "" : " is-static");
  container.appendChild(root);

  const svg = svgEl("svg", {
    class: "stda-svg",
    viewBox: "0 0 " + VB_W + " " + VB_H,
    role: "img",
    "aria-label": ariaLabel
  }, root);
  const svgTitle = svgEl("title", {}, svg);
  svgTitle.textContent = "Aggregation: noisy documents into " + TAXONOMY.bins + " corpus bins";

  // Opaque background so exported frames are clean.
  svgEl("rect", { x: 0, y: 0, width: VB_W, height: VB_H, fill: UI_COLORS.background }, svg);

  if (opts.showSquareGuide) {
    svgEl("rect", {
      x: SQUARE_X + 0.5, y: 0.5, width: VB_H - 1, height: VB_H - 1,
      fill: "none", stroke: "#D8D8D8", "stroke-dasharray": "6 5"
    }, svg);
    text(svg, SQUARE_X + 10, 22, "square crop", { "font-size": 12, fill: "#B9B9B9" });
  }

  // ---------- header (final state) ----------
  const kicker = text(svg, CX, 76, "FROM NOISY DOCUMENTS TO STABLE CORPUS REGIONS", {
    "text-anchor": "middle", "font-size": 13, "font-weight": 700,
    "letter-spacing": 2.2, fill: UI_COLORS.slate
  });
  const title = text(svg, CX, 118,
    TAXONOMY.topics + " topics × " + TAXONOMY.formats + " formats = " + TAXONOMY.bins + " bins", {
      "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: UI_COLORS.ink
    });
  const stats = text(svg, CX, 152,
    formatInt(WORKING_SET.documents) + " documents · ~" + WORKING_SET.tokensApprox +
    " tokens · target " + formatInt(WORKING_SET.targetDocsPerBin) + " docs per bin", {
      "text-anchor": "middle", "font-size": 13.5, fill: UI_COLORS.slate
    });

  /* Transient big taxonomy grid (compressed view). Created BEFORE the dots so
     the dots render on top of the grid cells when they fly in. */
  const bigGridG = svgEl("g", { opacity: 0 }, svg);
  const gridCells = [];
  for (let r = 0; r < GRID_N; r++) {
    for (let c = 0; c < GRID_N; c++) {
      gridCells.push(svgEl("rect", {
        x: GRID_X + c * (GRID_CELL + GRID_GAP),
        y: GRID_Y + r * (GRID_CELL + GRID_GAP),
        width: GRID_CELL, height: GRID_CELL, rx: 2,
        fill: "#FFFFFF", stroke: UI_COLORS.gridStroke, "stroke-width": 1
      }, bigGridG));
    }
  }
  const axisTop = text(bigGridG, GRID_X, GRID_Y - 9, TAXONOMY.formats + " formats →", {
    "font-size": 12, "font-weight": 600, fill: UI_COLORS.slate
  });
  const axisLeft = text(bigGridG, 0, 0, TAXONOMY.topics + " topics ↓", {
    "text-anchor": "middle", "font-size": 12, "font-weight": 600, fill: UI_COLORS.slate,
    transform: "translate(486 " + (GRID_Y + GRID_SIZE / 2) + ") rotate(-90)"
  });
  const gridCaption = text(bigGridG, CX, GRID_Y + GRID_SIZE + 22,
    "compressed " + GRID_N + " × " + GRID_N + " view of " + TAXONOMY.bins + " bins", {
      "text-anchor": "middle", "font-size": 11.5, fill: UI_COLORS.faint
    });

  // ---------- transient: noisy document dots + query chip ----------
  const rand = mulberry32(576);
  const dotsG = svgEl("g", { opacity: 0 }, svg);
  const dots = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    const rr = 205 * Math.sqrt(rand());
    const a = rand() * Math.PI * 2;
    const x = CX + rr * Math.cos(a) * 1.05;
    const y = CLOUD_CY + rr * Math.sin(a) * 0.68;
    const u = rand();
    const fill = u < 0.42 ? DOT_POS : (u < 0.84 ? DOT_NEG : DOT_NEUTRAL);
    const el = svgEl("circle", { cx: x, cy: y, r: 2.6, fill, opacity: 0 }, dotsG);
    dots.push({ el, x, y, sign: u < 0.42 ? 1 : (u < 0.84 ? -1 : 0) });
  }
  const queryChip = svgEl("g", { opacity: 0 }, svg);
  svgEl("rect", { x: CX - 74, y: CLOUD_CY - 15, width: 148, height: 30, rx: 15, fill: UI_COLORS.ink }, queryChip);
  text(queryChip, CX, CLOUD_CY, "benchmark queries", {
    "text-anchor": "middle", "dominant-baseline": "central",
    "font-size": 12.5, "font-weight": 600, fill: "#FFFFFF"
  });

  function gridCellCenter(index) {
    const r = Math.floor(index / GRID_N), c = index % GRID_N;
    return {
      x: GRID_X + c * (GRID_CELL + GRID_GAP) + GRID_CELL / 2,
      y: GRID_Y + r * (GRID_CELL + GRID_GAP) + GRID_CELL / 2
    };
  }

  // ---------- transient: averaging callout (many docs → one score) ----------
  const calloutG = svgEl("g", { opacity: 0 }, svg);
  text(calloutG, 880, 272, "many docs → one score", {
    "text-anchor": "middle", "font-size": 11.5, "font-weight": 600, fill: UI_COLORS.slate
  });
  [[862, 292, DOT_POS], [875, 300, DOT_NEG], [888, 290, DOT_POS],
   [898, 299, DOT_NEUTRAL], [871, 307, DOT_NEG]].forEach(function (d) {
    svgEl("circle", { cx: d[0], cy: d[1], r: 3, fill: d[2] }, calloutG);
  });
  svgEl("path", { d: "M880 316 V332 M874 326 L880 334 L886 326", fill: "none",
    stroke: UI_COLORS.slate, "stroke-width": 1.6, "stroke-linecap": "round",
    "stroke-linejoin": "round" }, calloutG);
  svgEl("rect", { x: 866, y: 340, width: 28, height: 28, rx: 4,
    fill: UI_COLORS.gridFill, stroke: UI_COLORS.gridStroke, "stroke-width": 1 }, calloutG);

  // ---------- final state: 576×4 matrix panel ----------
  const panelCaption = text(svg, MATRIX_X, 204,
    "Signed influence (within-benchmark z-score) · " + SELECTED_BINS_PANEL.length +
    " of " + TAXONOMY.bins + " bins shown", {
      "font-size": 12, fill: UI_COLORS.faint
    });

  const chipEls = [];
  BENCHMARKS.forEach(function (b, i) {
    const x = CELLS_X + i * COL_PITCH;
    const chip = svgEl("g", {}, svg);
    svgEl("rect", { x, y: CHIPS_Y, width: COL_W, height: 26, rx: 13,
      fill: benchmarkColor(b.name) }, chip);
    text(chip, x + COL_W / 2, CHIPS_Y + 13, b.short, {
      "text-anchor": "middle", "dominant-baseline": "central",
      "font-size": 11.5, "font-weight": 700, fill: "#FFFFFF"
    });
    chipEls.push(chip);
  });

  const rowLabelEls = [];
  const cellEls = [];
  SELECTED_BINS_PANEL.forEach(function (row, r) {
    const y = ROWS_Y + r * ROW_PITCH;
    rowLabelEls.push(text(svg, CELLS_X - 16, y + ROW_H / 2, row.bin, {
      "text-anchor": "end", "dominant-baseline": "central", "font-size": 11,
      "font-weight": r === 0 ? 700 : 400,
      fill: r === 0 ? UI_COLORS.ink : UI_COLORS.slate
    }));
    BENCHMARKS.forEach(function (b, c) {
      const z = row.values[b.key];
      const x = CELLS_X + c * COL_PITCH;
      const g = svgEl("g", {}, svg);
      const rect = svgEl("rect", { x, y, width: COL_W, height: ROW_H, rx: 8,
        fill: influenceColor(z) }, g);
      const label = text(g, x + COL_W / 2, y + ROW_H / 2, formatSigned(z), {
        "text-anchor": "middle", "dominant-baseline": "central",
        "font-size": 15, "font-weight": 800, fill: influenceInk(z)
      });
      cellEls.push({ g, rect, label, z });
    });
  });

  const ellipsis = text(svg, CX, 458,
    "… " + (TAXONOMY.bins - SELECTED_BINS_PANEL.length) + " more bins …", {
      "text-anchor": "middle", "font-size": 11.5, fill: UI_COLORS.faint
    });

  /* Callout ring around the signature cell (Literature × Customer Support ×
     SocialIQA). Authored plain-solid; the pathLength/dash draw-on setup is
     applied only in the animated branch (older Safari lacks pathLength-on-rect
     and would show a dotted ring in the static frame). */
  const ring = svgEl("rect", {
    x: CELLS_X - 6, y: ROWS_Y - 6, width: COL_W + 12, height: ROW_H + 12, rx: 12,
    fill: "none", stroke: benchmarkColor(BENCHMARKS[0].name), "stroke-width": 3
  }, svg);

  // ---------- captions / takeaway / caveats (final state + transients) ----------
  const captionEls = CAPTIONS.map(function (s) {
    return text(svg, CX, 510, s, {
      "text-anchor": "middle", "font-size": 18, "font-weight": 600,
      fill: UI_COLORS.slate, opacity: 0
    });
  });
  const takeaway = text(svg, CX, 510, TAKEAWAY, {
    "text-anchor": "middle", "font-size": 21, "font-weight": 800, fill: UI_COLORS.ink
  });
  const caveat1 = text(svg, CX, 540, CAVEATS[0], {
    "text-anchor": "middle", "font-size": 12.5, fill: UI_COLORS.slate
  });
  const caveat2 = text(svg, CX, 559, CAVEATS[1], {
    "text-anchor": "middle", "font-size": 12.5, fill: UI_COLORS.slate
  });

  // ---------- legend + scale footnote ----------
  const legend = createLegend(svg, {
    cx: CX, y: 600,
    items: [
      { label: "supportive (+z)", fill: INFLUENCE_COLORS.positive },
      { label: "neutral (≈ 0)", fill: INFLUENCE_COLORS.neutral, stroke: INFLUENCE_COLORS.neutralStroke },
      { label: "suppressive (−z)", fill: INFLUENCE_COLORS.negative }
    ]
  });
  const footnote = text(svg, CX, 628, "Color capped at |z| = " + Z_COLOR_CAP + " · printed values exact", {
    "text-anchor": "middle", "font-size": 12, fill: UI_COLORS.faint
  });

  // ---------- footer (public identifier — omitted entirely in review mode) ----------
  let footer = null;
  if (!opts.reviewMode) {
    footer = text(svg, CX, 666, PROJECT.shortName + " · " + PROJECT.publicUrl, {
      "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: UI_COLORS.slate
    });
  }

  // ---------- static fallback path ----------
  if (!animated) {
    // Authored DOM already shows the final frame; transients stay hidden.
    return makeSceneApi({ svg, root, timeline: null });
  }

  // ---------- timeline ----------
  /* fromTo tweens immediate-render their "from" state at build time, which is
     what hides the final-state elements before the timeline reveals them. */
  const tl = gsap.timeline({
    paused: true,
    repeat: opts.loop ? -1 : 0,
    repeatDelay: opts.loop ? 1.6 : 0
  });

  function fadeUp(el, pos, dur) {
    tl.fromTo(el, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: dur || 0.5, ease: "power2.out" }, pos);
  }
  function captionSwap(idx, pos) {
    if (idx > 0) tl.to(captionEls[idx - 1], { opacity: 0, duration: 0.3 }, pos - 0.1);
    tl.fromTo(captionEls[idx], { opacity: 0 }, { opacity: 1, duration: 0.4 }, pos + 0.15);
  }

  // Beat 1 — noisy document dots around the benchmark queries.
  tl.addLabel("noise", 0);
  fadeUp(kicker, 0, 0.45);
  fadeUp(title, 0.12, 0.55);
  tl.fromTo(stats, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.3);
  captionSwap(0, 0.35);
  tl.fromTo(dotsG, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.2);
  tl.fromTo(queryChip, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.45);
  // Legend appears early: the dot colors already use the influence palette.
  tl.fromTo(legend, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9);

  dots.forEach(function (d) {
    const inAt = 0.25 + rand() * 1.0;
    const baseOpacity = 0.5 + rand() * 0.45;
    tl.fromTo(d.el, { opacity: 0 }, { opacity: baseOpacity, duration: 0.4 }, inAt);

    // Positional jitter: yoyo returns the dot to its authored spot before flight.
    const driftAt = 0.5 + rand() * 1.0;
    const driftDur = (4.9 - driftAt) / 2;
    tl.to(d.el, {
      x: (rand() - 0.5) * 16, y: (rand() - 0.5) * 16,
      duration: driftDur, ease: "sine.inOut", repeat: 1, yoyo: true
    }, driftAt);

    // Sign flicker: unstable per-document signs (illustrative noise).
    if (d.sign !== 0 && rand() < 0.45) {
      const other = d.sign > 0 ? DOT_NEG : DOT_POS;
      const own = d.sign > 0 ? DOT_POS : DOT_NEG;
      const flipAt = 0.8 + rand() * 3.4;
      tl.to(d.el, { attr: { fill: other }, duration: 0.12 }, flipAt);
      if (rand() < 0.6) {
        tl.to(d.el, { attr: { fill: own }, duration: 0.12 }, flipAt + 0.3 + rand() * 0.5);
      }
    }
    // Brightness shimmer, bounded before the flight starts.
    const shimmerAt = 1.7 + rand() * 2.4;
    tl.to(d.el, { opacity: baseOpacity * 0.45, duration: 0.32, repeat: 1, yoyo: true },
      Math.min(shimmerAt, 4.2));
  });

  // Beat 2 — the fixed taxonomy scaffold fades in.
  tl.addLabel("taxonomy", 2.4);
  captionSwap(1, 2.4);
  tl.to(queryChip, { opacity: 0, duration: 0.35 }, 2.35);
  tl.fromTo(bigGridG, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.4);
  gridCells.forEach(function (cell, i) {
    const r = Math.floor(i / GRID_N), c = i % GRID_N;
    tl.fromTo(cell, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 2.45 + (r + c) * 0.048);
  });
  tl.fromTo(axisTop, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.7);
  tl.fromTo(axisLeft, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.85);
  tl.fromTo(gridCaption, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 3.2);

  // Beat 3 — dots snap into bins; cells tint as documents aggregate.
  tl.addLabel("aggregate", 5.0);
  captionSwap(2, 5.0);
  dots.forEach(function (d) {
    const target = gridCellCenter(Math.floor(rand() * GRID_N * GRID_N));
    const jx = (rand() - 0.5) * 10, jy = (rand() - 0.5) * 10;
    const flyAt = 5.05 + rand() * 1.15;
    tl.to(d.el, {
      x: target.x + jx - d.x, y: target.y + jy - d.y,
      duration: 0.75, ease: "power2.inOut"
    }, flyAt);
    tl.to(d.el, { opacity: 0, duration: 0.25 }, flyAt + 0.55);
  });
  gridCells.forEach(function (cell, i) {
    const tintAt = 5.35 + (((i * 7919) % 144) / 144) * 1.2;
    tl.fromTo(cell, { attr: { fill: "#FFFFFF" } },
      { attr: { fill: UI_COLORS.gridFill }, duration: 0.5 }, tintAt);
  });
  tl.fromTo(calloutG, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 6.0);
  tl.to(calloutG, { opacity: 0, duration: 0.35 }, 7.85);

  // Beat 4 — the grid becomes a compact 576×4 comparison matrix.
  tl.addLabel("matrix", 7.9);
  captionSwap(3, 7.9);
  tl.to(bigGridG, {
    opacity: 0, scale: 0.94, svgOrigin: CX + " " + CLOUD_CY,
    duration: 0.5, ease: "power1.in"
  }, 7.9);
  tl.fromTo(panelCaption, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 8.1);
  chipEls.forEach(function (chip, i) {
    tl.fromTo(chip,
      { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
      8.15 + i * 0.11);
  });
  rowLabelEls.forEach(function (label, r) {
    tl.fromTo(label, { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 8.35 + r * 0.12);
  });
  cellEls.forEach(function (cell, i) {
    const r = Math.floor(i / BENCHMARKS.length), c = i % BENCHMARKS.length;
    const at = 8.4 + r * 0.12 + c * 0.05;
    tl.fromTo(cell.g, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at);
    tl.fromTo(cell.rect,
      { attr: { fill: INFLUENCE_COLORS.neutral } },
      { attr: { fill: influenceColor(cell.z) }, duration: 0.5, ease: "power1.inOut" },
      at + 0.15);
    tl.fromTo(cell.label, { opacity: 0 }, { opacity: 1, duration: 0.35 }, at + 0.3);
  });
  tl.fromTo(ellipsis, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 9.3);
  tl.fromTo(footnote, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 9.4);

  // Beat 5 — end card: one region ringed, takeaway + caveats.
  tl.addLabel("takeaway", 10.8);
  tl.to(captionEls[3], { opacity: 0, duration: 0.3 }, 10.7);
  ring.setAttribute("pathLength", "1");
  ring.setAttribute("stroke-dasharray", "1");
  tl.fromTo(ring,
    { attr: { "stroke-dashoffset": 1 } },
    { attr: { "stroke-dashoffset": 0 }, duration: 0.6, ease: "power1.inOut" },
    10.9);
  fadeUp(takeaway, 11.15, 0.6);
  tl.fromTo(caveat1, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 11.5);
  tl.fromTo(caveat2, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 11.65);
  if (footer) tl.fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 11.85);

  // Final hold so exports keep the takeaway on screen.
  tl.to({}, { duration: 1.35 }, 12.3);

  // ---------- controls + initial position ----------
  const seekBeat = makeSeekBeat(tl, BEATS);
  let syncPlayUi = null;
  if (opts.controls) syncPlayUi = attachBeatControls(root, tl, BEATS, seekBeat).syncPlayUi;
  applyInitialPosition(tl, opts, seekBeat);
  if (syncPlayUi) syncPlayUi();

  return makeSceneApi({ svg, root, timeline: tl, seekBeat, syncPlayUi });
}
