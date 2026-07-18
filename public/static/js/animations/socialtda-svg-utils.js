/* SocialTDA shared SVG helpers for animation scenes.
   Plain-SVG builders only; no GSAP dependency, so scenes can render a static
   final frame even when animation is unavailable. */

export const SVG_NS = "http://www.w3.org/2000/svg";

export function svgEl(tag, attrs = {}, parent = null) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

export function text(parent, x, y, value, attrs = {}) {
  const t = svgEl("text", Object.assign({ x, y }, attrs), parent);
  t.textContent = value;
  return t;
}

/* Decimal places used to display a z-score: one decimal when the value has at
   most one (16.0), two otherwise (-7.31). Keeps printed values exact. */
export function zDecimals(v) {
  return Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? 1 : 2;
}

/* "+16.0", "−7.31" — explicit sign, typographic minus. `decimals` may be
   passed so count-up tweens keep the target value's precision. */
export function formatSigned(v, decimals = zDecimals(v)) {
  const abs = Math.abs(v).toFixed(decimals);
  return (v < 0 ? "−" : "+") + abs;
}

/* "plus 16.0", "minus 7.31" — spoken signs for aria labels: several screen
   readers drop the U+2212 glyph, which would silently erase the sign. */
export function spokenSigned(v, decimals = zDecimals(v)) {
  return (v < 0 ? "minus " : "plus ") + Math.abs(v).toFixed(decimals);
}

/* "5,678,621" — deterministic comma grouping (not locale-dependent, so
   rendered frames are identical across environments). */
export function formatInt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* Greedy word wrap into <tspan>s using a deterministic width estimate
   (avoids layout-dependent measurement so hidden/off-screen SVG still wraps). */
export function wrapSvgText(textEl, width, lineHeight = 1.3) {
  const fontSize = parseFloat(textEl.getAttribute("font-size") || "14");
  const charW = fontSize * 0.56;
  const words = (textEl.textContent || "").split(/\s+/).filter(Boolean);
  textEl.textContent = "";
  const x = textEl.getAttribute("x");
  let line = [];
  let lineIndex = 0;
  const flush = () => {
    if (!line.length) return;
    const ts = svgEl("tspan", { x, dy: lineIndex === 0 ? 0 : fontSize * lineHeight }, textEl);
    ts.textContent = line.join(" ");
    line = [];
    lineIndex++;
  };
  for (const w of words) {
    const candidate = line.concat(w).join(" ");
    if (candidate.length * charW > width && line.length) flush();
    line.push(w);
  }
  flush();
  return textEl;
}

/* Horizontal legend row, centered on `cx`. Items: { label, fill, stroke }.
   Widths are estimated deterministically (same rationale as wrapSvgText). */
export function createLegend(parent, { cx, y, items, swatch = 14, gap = 26, fontSize = 13, ink = "#4B5563" }) {
  const g = svgEl("g", { class: "stda-legend" }, parent);
  const charW = fontSize * 0.56;
  const widths = items.map((it) => swatch + 7 + it.label.length * charW);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - total / 2;
  items.forEach((it, i) => {
    svgEl("rect", {
      x, y: y - swatch + 3, width: swatch, height: swatch, rx: 3,
      fill: it.fill, stroke: it.stroke || "none", "stroke-width": it.stroke ? 1 : 0
    }, g);
    text(g, x + swatch + 7, y, it.label, { "font-size": fontSize, fill: ink });
    x += widths[i] + gap;
  });
  return g;
}

/* One heatmap cell: colored rect + centered value label.
   opts: { fill, ink, rx, fontSize, fontWeight, format } */
export function createHeatCell(parent, x, y, w, h, value, opts = {}) {
  const g = svgEl("g", { class: "stda-heat-cell" }, parent);
  const rect = svgEl("rect", {
    x, y, width: w, height: h, rx: opts.rx != null ? opts.rx : 8,
    fill: opts.fill || "#F7F7F7", stroke: opts.stroke || "none",
    "stroke-width": opts.stroke ? 1 : 0
  }, g);
  const fmt = opts.format || formatSigned;
  const label = text(g, x + w / 2, y + h / 2, fmt(value), {
    "text-anchor": "middle", "dominant-baseline": "central",
    "font-size": opts.fontSize || 26, "font-weight": opts.fontWeight || 800,
    fill: opts.ink || "#222222"
  });
  return { g, rect, label, value };
}

/* Anonymous, stylized document card (no real training text or IDs):
   rounded page, folded corner, abstract text bars. */
export function createDocumentGlyph(parent, x, y, w, h, opts = {}) {
  const fold = Math.min(8, w * 0.22);
  const g = svgEl("g", { class: "stda-doc-glyph" }, parent);
  svgEl("path", {
    d: "M" + x + " " + (y + 3) + " Q" + x + " " + y + " " + (x + 3) + " " + y +
       " H" + (x + w - fold) + " L" + (x + w) + " " + (y + fold) +
       " V" + (y + h - 3) + " Q" + (x + w) + " " + (y + h) + " " + (x + w - 3) + " " + (y + h) +
       " H" + (x + 3) + " Q" + x + " " + (y + h) + " " + x + " " + (y + h - 3) + " Z",
    fill: opts.fill || "#FFFFFF", stroke: opts.stroke || "#B79BC4",
    "stroke-width": 1.2, "stroke-linejoin": "round"
  }, g);
  svgEl("path", {
    d: "M" + (x + w - fold) + " " + y + " V" + (y + fold) + " H" + (x + w) + " Z",
    fill: opts.foldFill || "#E3D4EA"
  }, g);
  let ly = y + 10, li = 0;
  while (ly < y + h - 6) {
    svgEl("rect", {
      x: x + 5, y: ly, width: w - 10 - (li % 3 === 2 ? 7 : 0),
      height: 2.2, rx: 1.1, fill: opts.lineFill || "#C9B3D1"
    }, g);
    ly += 6;
    li++;
  }
  return g;
}
