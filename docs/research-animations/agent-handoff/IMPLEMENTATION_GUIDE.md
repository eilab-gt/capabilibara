# Implementation guide for coding agent

## Default architecture

Use **plain JavaScript + SVG + GSAP**, matching the current project site. Do not introduce React/Vite unless requested.

Recommended structure:

```text
public/static/js/animations/socialtda-data.js
public/static/js/animations/socialtda-palettes.js
public/static/js/animations/socialtda-svg-utils.js
public/static/js/animations/socialtda-timeline-utils.js
public/static/js/animations/signature-bin-animation.js
public/static/js/animations/aggregation-animation.js
public/static/js/animations/unlearning-animation.js
public/static/js/animations/vision-map-animation.js
public/static/css/animations.css
public/static/animations/exports/signature-bin_poster.png
public/static/animations/exports/signature-bin_16x9.mp4
public/static/animations/exports/signature-bin_square.mp4
public/animations/dev/signature-bin.html
public/animations/dev/aggregation.html
public/animations/dev/unlearning.html
public/animations/dev/vision-map.html
docs/research-animations/qa/signature-bin_qa.md
```

Runtime files live under `public/` because this repository serves the website from `public/index.html`.

For served assets, use:

```text
public/static/js/animations/
public/static/css/animations.css
public/static/animations/exports/
```

For review and handoff notes, use:

```text
docs/research-animations/qa/
```

Do not add repository-root runtime, dev-page, or export directories. Keep runtime and dev assets under `public/`, and keep QA notes under `docs/research-animations/qa/`.

## Source modules

### `socialtda-data.js`

Export values copied from `data/socialtda_claims.yaml`.

`data/socialtda_claims.yaml` is transcribed starter data. Preserve its scientific values unless a source PDF/artifact is added to the repo or a maintainer explicitly supplies updated values.

Do not hard-code values separately inside scene files. Copy needed values into `public/static/js/animations/socialtda-data.js`, then import values from this module.

### `socialtda-palettes.js`

Export benchmark colors and influence/diverging color functions.

Suggested functions:

```js
export function mix(hexA, hexB, t) {}
export function influenceColor(z, cap = 2.5) {}
export function influenceInk(z, cap = 2.5) {}
export function accuracyDamageColor(gamma, cap = 0.02) {}
export function benchmarkColor(name) {}
```

### `socialtda-svg-utils.js`

Suggested helpers:

```js
export function svgEl(tag, attrs = {}, parent = null) {}
export function text(parent, x, y, value, attrs = {}) {}
export function wrapSvgText(textEl, width, lineHeight) {}
export function createLegend(parent, options) {}
export function createHeatCell(parent, x, y, w, h, value, opts) {}
export function createDocumentGlyph(parent, x, y, w, h, opts) {}
```

### `socialtda-timeline-utils.js`

Suggested helpers:

```js
export function withReducedMotionFallback(container, buildFn, fallbackFn) {}
export function createStageControls(container, stages, goTo) {}
export function deterministicModeFromQuery(params) {}
export function exportFreezeFrame(timeline, progressOrLabel) {}
```

## Animation component contract

Each animation module should export a single build function:

```js
export function buildSignatureBinAnimation(container, options = {}) {
  // creates SVG, captions, controls, and timeline
  // returns { svg, timeline, destroy, goTo, exportFrame }
}
```

The build function should:

- accept a container element;
- support `autoplay`, `loop`, `reducedMotion`, `stage`, `end`, and `reviewMode`;
- create a static fallback if GSAP is unavailable;
- set `role="img"` and `aria-label`;
- avoid layout-dependent randomness unless a seed is provided;
- expose deterministic states for screenshots.

## Repo integration

1. Add dev pages under `public/animations/dev/` first.
2. Do not replace current `public/static/js/figure1.js` until the new component works.
3. Once stable, integrate into `public/index.html` or a new project-page section.
4. Preserve the existing fallback image pattern.
5. Respect `prefers-reduced-motion: reduce`.

## No-build constraint

The current repository can run with:

```bash
python3 -m http.server 8000
```

Keep that workflow working. If ES modules are used, use browser-native modules and relative imports. If that causes friction, use IIFEs matching `figure1.js`.

Example local dev URL:

```text
http://localhost:8000/public/animations/dev/signature-bin.html
```

## Export workflow

Use a headless browser to capture deterministic animation states. Recommended tools:

- Playwright for browser capture;
- FFmpeg for MP4/GIF conversion;
- ImageMagick optional for GIF optimization.

Add scripts only after manual dev pages work.

Served export files should go under `public/static/animations/exports/` only when they are intended to be part of the website or downloadable assets. Temporary capture frames and local scratch exports should stay outside the repo or be ignored.

## Definition of a good implementation

A finished animation has:

- a dev HTML page;
- a JS module;
- CSS scoped under `.socialtda-animation` or similar;
- data imported from one source;
- final poster frame;
- MP4 export;
- GIF export if useful;
- QA notes;
- a short README with run/export commands.
