/* The 2×2 benchmark design — SVG + GSAP animation.
   Brief: docs/research-animations/agent-handoff/briefs/03_2x2_benchmark_design.md

   Claim shown: the study crosses domain (social vs. STEM) with capability
   type (reasoning vs. knowledge) — a controlled contrastive design, not an
   arbitrary task list. Cell placement is DERIVED from each benchmark's
   domain/capability fields in the shared data module, never hard-coded.

   Guardrail: nothing here compares benchmark scores or capability quality;
   the caveat line states this explicitly.

   The SVG is authored in its FINAL poster state; the GSAP timeline animates
   toward it with fromTo tweens (see signature-bin-animation.js for the
   architecture rationale). Also exports createBenchmark2x2(), a plain-SVG
   builder other scenes can embed as an inset. */

import { BENCHMARKS, TAXONOMY, PROJECT } from "./socialtda-data.js";
import { benchmarkColor, mix, UI_COLORS } from "./socialtda-palettes.js";
import { svgEl, text } from "./socialtda-svg-utils.js";
import {
  makeSeekBeat, attachBeatControls, applyInitialPosition, makeSceneApi
} from "./socialtda-timeline-utils.js";

const VB_W = 1280;
const VB_H = 720;
/* Central square-crop zone: content inside x ∈ [280, 1000] survives a 1:1
   crop of the 16:9 render. */
const SQUARE_X = (VB_W - VB_H) / 2;
const CX = VB_W / 2;

export const BEATS = ["axes", "benchmarks", "contrasts", "takeaway"];

const CAPTIONS = [
  "Two axes — four cells.",
  "One benchmark per cell.",
  "Does provenance separate by domain, by capability type, or both?"
];

const TAKEAWAY = "A controlled, contrastive benchmark design.";
const CAVEAT = "Contrasts capability provenance — not a ranking of benchmark difficulty or model quality.";

/* Reusable plain-SVG 2×2 benchmark matrix (no GSAP dependency), for use as
   an inset in other scenes. Axis orders are derived from the order fields
   first appear in BENCHMARKS. Returns handles so callers can animate parts:
   { g, cells: [{ bench, cellRect, chip, subLabel, row, col }],
     colHeaders, rowHeaders, axisTitles, bounds } */
export function createBenchmark2x2(parent, opts = {}) {
  const o = Object.assign({
    x: 408, y: 230,          // top-left of the cell grid
    cellW: 225, cellH: 110, gap: 14,
    chipW: 168, chipH: 34,
    headerFontSize: 14, chipFontSize: 14, subFontSize: 11,
    showAxisTitles: true
  }, opts);

  const domains = [];
  const capabilities = [];
  BENCHMARKS.forEach(function (b) {
    if (domains.indexOf(b.domain) === -1) domains.push(b.domain);
    if (capabilities.indexOf(b.capability) === -1) capabilities.push(b.capability);
  });

  const g = svgEl("g", { class: "stda-benchmark-2x2" }, parent);
  const colX = function (c) { return o.x + c * (o.cellW + o.gap); };
  const rowY = function (r) { return o.y + r * (o.cellH + o.gap); };
  const gridW = domains.length * o.cellW + (domains.length - 1) * o.gap;
  const gridH = capabilities.length * o.cellH + (capabilities.length - 1) * o.gap;

  const colHeaders = domains.map(function (d, c) {
    return text(g, colX(c) + o.cellW / 2, o.y - 16, d, {
      "text-anchor": "middle", "font-size": o.headerFontSize,
      "font-weight": 700, fill: UI_COLORS.slate
    });
  });
  const rowHeaders = capabilities.map(function (cap, r) {
    return text(g, o.x - 14, rowY(r) + o.cellH / 2, cap, {
      "text-anchor": "end", "dominant-baseline": "central",
      "font-size": o.headerFontSize, "font-weight": 700, fill: UI_COLORS.slate
    });
  });

  const axisTitles = [];
  if (o.showAxisTitles) {
    axisTitles.push(text(g, o.x + gridW / 2, o.y - 42, "DOMAIN", {
      "text-anchor": "middle", "font-size": 11, "font-weight": 700,
      "letter-spacing": 2, fill: UI_COLORS.faint
    }));
    const capCx = o.x - 78, capCy = o.y + gridH / 2;
    axisTitles.push(text(g, 0, 0, "CAPABILITY", {
      "text-anchor": "middle", "font-size": 11, "font-weight": 700,
      "letter-spacing": 2, fill: UI_COLORS.faint,
      transform: "translate(" + capCx + " " + capCy + ") rotate(-90)"
    }));
  }

  const cells = BENCHMARKS.map(function (b) {
    const c = domains.indexOf(b.domain);
    const r = capabilities.indexOf(b.capability);
    const x = colX(c), y = rowY(r);
    const color = benchmarkColor(b.name);

    const cellRect = svgEl("rect", {
      x, y, width: o.cellW, height: o.cellH, rx: 12,
      fill: mix("#FFFFFF", color, 0.06),
      stroke: mix("#FFFFFF", color, 0.35), "stroke-width": 1.5
    }, g);

    const chip = svgEl("g", {}, g);
    const hasSub = b.name !== b.short;
    const chipCy = y + o.cellH / 2 + (hasSub ? -10 : 0);
    svgEl("rect", {
      x: x + o.cellW / 2 - o.chipW / 2, y: chipCy - o.chipH / 2,
      width: o.chipW, height: o.chipH, rx: o.chipH / 2, fill: color
    }, chip);
    text(chip, x + o.cellW / 2, chipCy, b.short, {
      "text-anchor": "middle", "dominant-baseline": "central",
      "font-size": o.chipFontSize, "font-weight": 700, fill: "#FFFFFF"
    });

    let subLabel = null;
    if (hasSub) {
      subLabel = text(g, x + o.cellW / 2, chipCy + o.chipH / 2 + 18, b.name, {
        "text-anchor": "middle", "font-size": o.subFontSize, fill: UI_COLORS.faint
      });
    }
    return { bench: b, cellRect, chip, subLabel, row: r, col: c };
  });

  return {
    g, cells, colHeaders, rowHeaders, axisTitles,
    domains, capabilities,
    bounds: { x: o.x, y: o.y, width: gridW, height: gridH },
    colX, rowY, cellW: o.cellW, cellH: o.cellH, gap: o.gap
  };
}

export function buildBenchmarkDesignAnimation(container, options = {}) {
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

  const ariaLabel = "Animated diagram. The study's " + BENCHMARKS.length +
    " benchmarks form a 2 by 2 design crossing domain with capability type: " +
    BENCHMARKS.map(function (b) {
      return b.name + " is " + b.domain + " " + b.capability;
    }).join("; ") +
    ". A controlled contrastive design for capability provenance across " +
    TAXONOMY.bins + " corpus bins — not a comparison of capability quality.";

  // ---------- scaffold ----------
  const root = document.createElement("div");
  root.className = "socialtda-animation stda-benchmark-design" + (animated ? "" : " is-static");
  container.appendChild(root);

  const svg = svgEl("svg", {
    class: "stda-svg",
    viewBox: "0 0 " + VB_W + " " + VB_H,
    role: "img",
    "aria-label": ariaLabel
  }, root);
  const svgTitle = svgEl("title", {}, svg);
  svgTitle.textContent = "The 2×2 benchmark design: domain × capability type";

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
  const kicker = text(svg, CX, 76, "THE 2 × 2 BENCHMARK DESIGN", {
    "text-anchor": "middle", "font-size": 13, "font-weight": 700,
    "letter-spacing": 2.2, fill: UI_COLORS.slate
  });
  const title = text(svg, CX, 118, "Domain × capability type", {
    "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: UI_COLORS.ink
  });

  // ---------- the 2×2 matrix (final state) ----------
  const matrix = createBenchmark2x2(svg, { x: 408, y: 230 });

  /* Transient contrast-pulse outlines (authored hidden): one per row
     (capability contrast) and one per column (domain contrast). */
  const PAD = 8;
  const pulses = [];
  matrix.capabilities.forEach(function (cap, r) {
    pulses.push(svgEl("rect", {
      x: matrix.bounds.x - PAD, y: matrix.rowY(r) - PAD,
      width: matrix.bounds.width + PAD * 2, height: matrix.cellH + PAD * 2,
      rx: 16, fill: "none", stroke: UI_COLORS.ink, "stroke-width": 2.5, opacity: 0
    }, svg));
  });
  matrix.domains.forEach(function (d, c) {
    pulses.push(svgEl("rect", {
      x: matrix.colX(c) - PAD, y: matrix.bounds.y - PAD,
      width: matrix.cellW + PAD * 2, height: matrix.bounds.height + PAD * 2,
      rx: 16, fill: "none", stroke: UI_COLORS.ink, "stroke-width": 2.5, opacity: 0
    }, svg));
  });

  // ---------- arrow to the influence profiles (final state) ----------
  const nextStep = text(svg, CX, 508,
    "each benchmark → its signed-influence profile across " + TAXONOMY.bins + " corpus bins", {
      "text-anchor": "middle", "font-size": 14, "font-weight": 600, fill: UI_COLORS.slate
    });

  // ---------- captions / takeaway / caveat ----------
  const captionEls = CAPTIONS.map(function (s) {
    return text(svg, CX, 552, s, {
      "text-anchor": "middle", "font-size": 18, "font-weight": 600,
      fill: UI_COLORS.slate, opacity: 0
    });
  });
  const takeaway = text(svg, CX, 552, TAKEAWAY, {
    "text-anchor": "middle", "font-size": 21, "font-weight": 800, fill: UI_COLORS.ink
  });
  const caveat = text(svg, CX, 582, CAVEAT, {
    "text-anchor": "middle", "font-size": 12.5, fill: UI_COLORS.slate
  });

  // ---------- footer (public identifier — omitted entirely in review mode) ----------
  let footer = null;
  if (!opts.reviewMode) {
    footer = text(svg, CX, 650, PROJECT.shortName + " · " + PROJECT.publicUrl, {
      "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: UI_COLORS.slate
    });
  }

  // ---------- static fallback path ----------
  if (!animated) {
    // Authored DOM already shows the final frame; captions/pulses stay hidden.
    return makeSceneApi({ svg, root, timeline: null });
  }

  // ---------- timeline ----------
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

  // Beat 1 — the empty design: axes, headers, cell frames.
  tl.addLabel("axes", 0);
  fadeUp(kicker, 0, 0.45);
  fadeUp(title, 0.12, 0.55);
  captionSwap(0, 0.3);
  matrix.axisTitles.forEach(function (t2, i) {
    tl.fromTo(t2, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5 + i * 0.12);
  });
  matrix.colHeaders.forEach(function (h, i) {
    fadeUp(h, 0.7 + i * 0.12, 0.4);
  });
  matrix.rowHeaders.forEach(function (h, i) {
    fadeUp(h, 0.95 + i * 0.12, 0.4);
  });
  matrix.cells.forEach(function (cell, i) {
    tl.fromTo(cell.cellRect, { opacity: 0, scale: 0.96, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 1.2 + i * 0.08);
  });

  // Beat 2 — the four benchmark chips land.
  tl.addLabel("benchmarks", 2.2);
  captionSwap(1, 2.2);
  matrix.cells.forEach(function (cell, i) {
    tl.fromTo(cell.chip,
      { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)" },
      2.35 + i * 0.16);
    if (cell.subLabel) {
      tl.fromTo(cell.subLabel, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 2.6 + i * 0.16);
    }
  });

  // Beat 3 — contrast pulses: each row (capability), then each column (domain).
  tl.addLabel("contrasts", 4.4);
  captionSwap(2, 4.4);
  pulses.forEach(function (p, i) {
    const at = 4.55 + i * 0.62;
    tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power1.out" }, at);
    tl.to(p, { opacity: 0, duration: 0.26, ease: "power1.in" }, at + 0.38);
  });

  // Beat 4 — end card: pointer to the influence profiles, takeaway, caveat.
  tl.addLabel("takeaway", 7.2);
  tl.to(captionEls[2], { opacity: 0, duration: 0.3 }, 7.1);
  fadeUp(nextStep, 7.3, 0.5);
  fadeUp(takeaway, 7.55, 0.55);
  tl.fromTo(caveat, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 7.85);
  if (footer) tl.fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 8.05);

  // Final hold so exports keep the takeaway on screen.
  tl.to({}, { duration: 1.2 }, 8.6);

  // ---------- controls + initial position ----------
  const seekBeat = makeSeekBeat(tl, BEATS);
  let syncPlayUi = null;
  if (opts.controls) syncPlayUi = attachBeatControls(root, tl, BEATS, seekBeat).syncPlayUi;
  applyInitialPosition(tl, opts, seekBeat);
  if (syncPlayUi) syncPlayUi();

  return makeSceneApi({ svg, root, timeline: tl, seekBeat, syncPlayUi });
}
