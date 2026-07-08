/* Signature-bin sign flip — SVG + GSAP animation.
   Brief: docs/research-animations/agent-handoff/briefs/05_signature_bin_sign_flip.md

   Claim shown: Literature × Customer Support is SocialIQA's extreme positive
   bin (+16.0) and flips negative for MMLU Social Sciences (−7.31) and
   MMLU STEM (−5.75), with ARC-Challenge near flat (−0.45). Values are signed
   within-benchmark z-scores from the shared data module.

   The SVG is authored in its FINAL poster state; the GSAP timeline animates
   toward it with fromTo tweens. If GSAP is missing or reduced motion is
   requested, the untouched DOM is the static fallback, so the poster frame,
   the reduced-motion frame, and timeline.progress(1) are the same image. */

import { SIGNATURE_BIN, BENCHMARKS, TAXONOMY, PROJECT } from "./socialtda-data.js";
import {
  influenceColor, influenceInk, benchmarkColor,
  INFLUENCE_COLORS, UI_COLORS, Z_COLOR_CAP
} from "./socialtda-palettes.js";
import { svgEl, text, formatSigned, zDecimals, createLegend } from "./socialtda-svg-utils.js";

const VB_W = 1280;
const VB_H = 720;
/* Central square-crop zone: content placed inside x ∈ [280, 1000] survives a
   1:1 crop of the 16:9 render. */
const SQUARE_X = (VB_W - VB_H) / 2;

export const BEATS = ["bin", "benchmarks", "values", "flip", "takeaway"];

const CAPTIONS = [
  "One topic × format bin — 1 of " + TAXONOMY.bins + ".",
  "Same bin, four benchmarks.",
  "Signed influence: within-benchmark z-score.",
  "Same corpus region — different provenance."
];

const TAKEAWAY = "Social reasoning has a distinct corpus signature.";
const CAVEATS = [
  "Signed influence under the attribution metric, in the OLMo3-7B / Dolma3 setting.",
  "A signature bin — not the sole source of social reasoning."
];

/* Editorial per-benchmark notes for the sign-flip beat (wording per brief). */
const FLIP_NOTES = {
  socialiqa: { label: "extreme positive bin", color: INFLUENCE_COLORS.positive },
  mmlu_social_sciences: { label: "flips negative", color: INFLUENCE_COLORS.negative },
  arc_challenge: { label: "near flat", color: UI_COLORS.slate },
  mmlu_stem: { label: "flips negative", color: INFLUENCE_COLORS.negative }
};

export function buildSignatureBinAnimation(container, options = {}) {
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

  const bin = SIGNATURE_BIN;
  const cellsData = BENCHMARKS.map((b) => {
    const z = bin.values[b.key];
    return {
      bench: b,
      z,
      color: influenceColor(z),
      ink: influenceInk(z),
      note: FLIP_NOTES[b.key]
    };
  });

  /* Spoken signs ("plus"/"minus") instead of +/− glyphs: several screen
     readers drop U+2212, which would erase the sign flip this chart teaches. */
  const ariaSigned = function (v) {
    return (v < 0 ? "minus " : "plus ") + Math.abs(v).toFixed(zDecimals(v));
  };
  const ariaLabel = "Animated chart. The corpus bin " + bin.bin +
    " has signed influence z-scores of " + cellsData.map(function (c) {
      return ariaSigned(c.z) + " on " + c.bench.name;
    }).join(", ") +
    ". An extreme SocialIQA-positive signature bin that flips negative for both MMLU benchmarks, in the OLMo3-7B / Dolma3 setting.";

  // ---------- scaffold ----------
  const root = document.createElement("div");
  root.className = "socialtda-animation stda-signature-bin" + (animated ? "" : " is-static");
  container.appendChild(root);

  const svg = svgEl("svg", {
    class: "stda-svg",
    viewBox: "0 0 " + VB_W + " " + VB_H,
    role: "img",
    "aria-label": ariaLabel
  });
  root.appendChild(svg);
  const svgTitle = svgEl("title", {}, svg);
  svgTitle.textContent = "Signature-bin sign flip: " + bin.bin;

  // Opaque background so exported frames are clean.
  svgEl("rect", { x: 0, y: 0, width: VB_W, height: VB_H, fill: UI_COLORS.background }, svg);

  if (opts.showSquareGuide) {
    svgEl("rect", {
      x: SQUARE_X + 0.5, y: 0.5, width: VB_H - 1, height: VB_H - 1,
      fill: "none", stroke: "#D8D8D8", "stroke-dasharray": "6 5"
    }, svg);
    text(svg, SQUARE_X + 10, 22, "square crop", { "font-size": 12, fill: "#B9B9B9" });
  }

  // ---------- header ----------
  const CX = VB_W / 2;
  const kicker = text(svg, CX, 100, "ONE TOPIC × FORMAT BIN · 1 OF " + TAXONOMY.bins, {
    "text-anchor": "middle", "font-size": 13, "font-weight": 700,
    "letter-spacing": 2.2, fill: UI_COLORS.slate
  });
  const title = text(svg, CX, 144, bin.bin, {
    "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: UI_COLORS.ink
  });

  // ---------- chips, tags, cells, notes ----------
  const CELL_W = 150, CELL_H = 112, COL_PITCH = 164;
  const colX = cellsData.map(function (_, i) {
    return CX + (i - (cellsData.length - 1) / 2) * COL_PITCH - CELL_W / 2;
  });

  const chipEls = [], tagEls = [], cellEls = [], noteEls = [];
  cellsData.forEach(function (c, i) {
    const x = colX[i];

    const chip = svgEl("g", {}, svg);
    svgEl("rect", { x, y: 186, width: CELL_W, height: 36, rx: 18, fill: benchmarkColor(c.bench.name) }, chip);
    text(chip, x + CELL_W / 2, 209, c.bench.short, {
      "text-anchor": "middle", "font-size": 15, "font-weight": 700, fill: "#FFFFFF"
    });
    chipEls.push(chip);

    tagEls.push(text(svg, x + CELL_W / 2, 246, c.bench.domain + " · " + c.bench.capability, {
      "text-anchor": "middle", "font-size": 12, fill: UI_COLORS.faint
    }));

    const cell = svgEl("g", {}, svg);
    svgEl("rect", { x, y: 268, width: CELL_W, height: CELL_H, rx: 10, fill: c.color }, cell);
    const label = text(cell, x + CELL_W / 2, 324, formatSigned(c.z), {
      "text-anchor": "middle", "dominant-baseline": "central",
      "font-size": 27, "font-weight": 800, fill: c.ink
    });
    cellEls.push({ g: cell, rect: cell.firstChild, label, data: c });

    noteEls.push(text(svg, x + CELL_W / 2, 404, c.note.label, {
      "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: c.note.color
    }));
  });

  /* Callout ring around the SocialIQA cell (drawn on during the flip beat).
     Authored plain-solid; the pathLength/dash draw-on setup is applied only in
     the animated branch, so browsers without pathLength-on-rect support still
     get a solid ring in the static/poster frame. */
  const ring = svgEl("rect", {
    x: colX[0] - 7, y: 261, width: CELL_W + 14, height: CELL_H + 14, rx: 14,
    fill: "none", stroke: benchmarkColor("SocialIQA"), "stroke-width": 3
  }, svg);

  // ---------- captions / takeaway ----------
  const captionEls = CAPTIONS.map(function (s) {
    return text(svg, CX, 452, s, {
      "text-anchor": "middle", "font-size": 18, "font-weight": 600,
      fill: UI_COLORS.slate, opacity: 0
    });
  });
  const takeaway = text(svg, CX, 452, TAKEAWAY, {
    "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: UI_COLORS.ink
  });
  const caveat1 = text(svg, CX, 484, CAVEATS[0], {
    "text-anchor": "middle", "font-size": 12.5, fill: UI_COLORS.slate
  });
  const caveat2 = text(svg, CX, 503, CAVEATS[1], {
    "text-anchor": "middle", "font-size": 12.5, fill: UI_COLORS.slate
  });

  // ---------- legend + scale footnote ----------
  const legend = createLegend(svg, {
    cx: CX, y: 556,
    items: [
      { label: "supportive (+z)", fill: INFLUENCE_COLORS.positive },
      { label: "neutral (≈ 0)", fill: INFLUENCE_COLORS.neutral, stroke: INFLUENCE_COLORS.neutralStroke },
      { label: "suppressive (−z)", fill: INFLUENCE_COLORS.negative }
    ]
  });
  const footnote = text(svg, CX, 588, "Color capped at |z| = " + Z_COLOR_CAP + " · printed values exact", {
    "text-anchor": "middle", "font-size": 12, fill: UI_COLORS.faint
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
    // Authored DOM already shows the final frame; captions stay hidden.
    return makeApi(null);
  }

  // ---------- timeline ----------
  /* fromTo tweens immediate-render their "from" state at build time, which is
     what hides everything before the timeline plays. */
  const tl = gsap.timeline({
    paused: true,
    repeat: opts.loop ? -1 : 0,
    repeatDelay: opts.loop ? 1.6 : 0
  });
  const IN = { opacity: 1, y: 0 };

  function fadeUp(el, pos, dur) {
    tl.fromTo(el, { opacity: 0, y: 12 }, Object.assign({ duration: dur || 0.5, ease: "power2.out" }, IN), pos);
  }
  function captionSwap(idx, pos) {
    if (idx > 0) tl.to(captionEls[idx - 1], { opacity: 0, duration: 0.3 }, pos - 0.1);
    tl.fromTo(captionEls[idx], { opacity: 0 }, { opacity: 1, duration: 0.4 }, pos + 0.15);
  }

  // Beat 1 — the bin.
  tl.addLabel("bin", 0);
  fadeUp(kicker, 0, 0.45);
  fadeUp(title, 0.12, 0.55);
  captionSwap(0, 0.25);

  // Beat 2 — four benchmark chips.
  tl.addLabel("benchmarks", 1.15);
  captionSwap(1, 1.15);
  chipEls.forEach(function (chip, i) {
    tl.fromTo(chip,
      { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
      1.15 + i * 0.13);
  });
  tagEls.forEach(function (tag, i) {
    tl.fromTo(tag, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 1.6 + i * 0.13);
  });

  // Beat 3 — cells fill, values count up.
  tl.addLabel("values", 2.75);
  captionSwap(2, 2.75);
  cellEls.forEach(function (cell, i) {
    const at = 2.75 + i * 0.2;
    const dec = zDecimals(cell.data.z);
    const proxy = { n: 0 };
    tl.fromTo(cell.g, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at);
    tl.fromTo(cell.rect,
      { attr: { fill: INFLUENCE_COLORS.neutral } },
      { attr: { fill: cell.data.color }, duration: 0.6, ease: "power1.inOut" },
      at + 0.2);
    tl.fromTo(cell.label,
      { attr: { fill: "#222222" } },
      { attr: { fill: cell.data.ink }, duration: 0.4 },
      at + 0.4);
    tl.fromTo(proxy, { n: 0 }, {
      n: cell.data.z, duration: 0.8, ease: "power1.out",
      onUpdate: function () { cell.label.textContent = formatSigned(proxy.n, dec); }
    }, at + 0.2);
  });
  // SocialIQA emphasis pulse (transient, so the final frame stays untransformed).
  tl.to(cellEls[0].g, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.3, ease: "power2.out" }, 3.85);
  tl.to(cellEls[0].g, { scale: 1, duration: 0.35, ease: "power2.inOut" }, 4.2);
  tl.fromTo(legend, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 4.0);
  tl.fromTo(footnote, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 4.15);

  // Beat 4 — callout ring + sign-flip notes.
  tl.addLabel("flip", 5.1);
  captionSwap(3, 5.1);
  ring.setAttribute("pathLength", "1");
  ring.setAttribute("stroke-dasharray", "1");
  tl.fromTo(ring,
    { attr: { "stroke-dashoffset": 1 } },
    { attr: { "stroke-dashoffset": 0 }, duration: 0.7, ease: "power1.inOut" },
    5.2);
  noteEls.forEach(function (note, i) {
    fadeUp(note, 5.55 + i * 0.15, 0.45);
  });

  // Beat 5 — end card: takeaway + caveats (+ footer in public mode).
  tl.addLabel("takeaway", 7.1);
  tl.to(captionEls[3], { opacity: 0, duration: 0.3 }, 7.0);
  fadeUp(takeaway, 7.3, 0.6);
  tl.fromTo(caveat1, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 7.6);
  tl.fromTo(caveat2, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 7.75);
  if (footer) tl.fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 7.95);

  // Final hold so exports keep the takeaway on screen.
  tl.to({}, { duration: 1.3 }, 8.5);

  // ---------- controls ----------
  let controlsBar = null;
  if (opts.controls) controlsBar = buildControls();

  // ---------- initial position ----------
  if (opts.end) {
    tl.progress(1, false).pause();
  } else if (opts.stage !== null && opts.stage !== undefined && opts.stage !== "") {
    seekBeat(opts.stage);
    if (opts.autoplay) tl.play();
  } else if (opts.autoplay) {
    tl.play(0);
  }
  syncPlayUi();

  /* All programmatic seeks pass suppressEvents=false: the value count-ups
     write their labels from onUpdate callbacks, which GSAP suppresses on
     seek/progress by default — leaving stale "+0.00" text otherwise. */
  function seekBeat(beat) {
    if (typeof beat === "string" && /^\d+$/.test(beat)) beat = Number(beat);
    const label = typeof beat === "number" ? BEATS[beat] : beat;
    if (label && tl.labels[label] !== undefined) tl.pause().seek(label, false);
  }

  function buildControls() {
    const bar = document.createElement("div");
    bar.className = "stda-anim-controls";

    const playBtn = document.createElement("button");
    playBtn.className = "stda-anim-btn stda-anim-play";
    playBtn.setAttribute("aria-label", "Play or pause");
    playBtn.addEventListener("click", function () {
      if (tl.paused() || !tl.isActive()) {
        if (tl.progress() === 1) tl.restart();
        else tl.play();
      } else {
        tl.pause();
      }
      syncPlayUi();
    });
    bar.appendChild(playBtn);

    BEATS.forEach(function (name) {
      const dot = document.createElement("button");
      dot.className = "stda-beat-dot";
      dot.dataset.beat = name;
      dot.setAttribute("aria-label", "Go to beat: " + name);
      dot.title = name;
      dot.addEventListener("click", function () {
        seekBeat(name);
        syncPlayUi();
      });
      bar.appendChild(dot);
    });

    const endBtn = document.createElement("button");
    endBtn.className = "stda-anim-btn";
    endBtn.textContent = "final frame";
    endBtn.setAttribute("aria-label", "Jump to final frame");
    endBtn.addEventListener("click", function () {
      tl.progress(1, false).pause();
      syncPlayUi();
    });
    bar.appendChild(endBtn);

    root.appendChild(bar);
    tl.eventCallback("onUpdate", syncBeatUi);
    return bar;
  }

  function syncPlayUi() {
    if (!controlsBar) return;
    const btn = controlsBar.querySelector(".stda-anim-play");
    btn.textContent = tl.paused() ? "▶" : "❚❚";
    syncBeatUi();
  }

  function syncBeatUi() {
    if (!controlsBar) return;
    const t = tl.time();
    let current = BEATS[0];
    BEATS.forEach(function (name) {
      if (tl.labels[name] !== undefined && t >= tl.labels[name]) current = name;
    });
    controlsBar.querySelectorAll(".stda-beat-dot").forEach(function (d) {
      d.classList.toggle("is-active", d.dataset.beat === current);
    });
  }

  return makeApi(tl);

  function makeApi(timeline) {
    return {
      svg,
      timeline,
      goTo: function (beat) {
        if (timeline) { seekBeat(beat); syncPlayUi(); }
      },
      exportFrame: function (target) {
        if (timeline) {
          timeline.pause();
          if (target === undefined || target === "end") timeline.progress(1, false);
          else if (typeof target === "number" && target <= 1) timeline.progress(target, false);
          else seekBeat(target);
          syncPlayUi();
        }
        return svg;
      },
      destroy: function () {
        if (timeline) timeline.kill();
        root.remove();
      }
    };
  }
}
