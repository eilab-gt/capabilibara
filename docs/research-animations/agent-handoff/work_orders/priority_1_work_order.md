# Priority 1 work order

## Goal

Build the first three animations that establish the reusable pipeline:

1. Signature-bin sign flip.
2. Noisy documents → 576-bin aggregation.
3. Influence-targeted vs random unlearning.

## Why these first

Together they cover:

- one shareable result;
- one method explainer;
- one validation explainer.

They also exercise the reusable data, palette, heatmap, document-glyph, and export infrastructure.

## Task sequence

### Task 1: data and utilities

Create:

```text
public/static/js/animations/socialtda-data.js
public/static/js/animations/socialtda-palettes.js
public/static/js/animations/socialtda-svg-utils.js
public/static/js/animations/socialtda-timeline-utils.js
public/static/css/animations.css
```

Use `data/socialtda_claims.yaml` as transcribed starter data. Copy needed values into `public/static/js/animations/socialtda-data.js`, then import from that single module. Do not duplicate scientific values across animation scene files.

### Task 2: signature-bin sign flip

Use `briefs/05_signature_bin_sign_flip.md`.

### Task 3: aggregation animation

Use `briefs/02_aggregation_576_bins.md`.

### Task 4: unlearning contrast animation

Use `briefs/12_targeted_vs_random_unlearning.md`.

### Task 5: exports

For each animation:

- poster PNG under `public/static/animations/exports/`;
- 16:9 MP4 under `public/static/animations/exports/`;
- square MP4 under `public/static/animations/exports/`;
- optional GIF.

### Task 6: QA

Complete the QA checklist and write a short handoff note under `docs/research-animations/qa/`.

## Exit criteria

- Three dev pages work locally.
- Each has a poster frame.
- At least the signature-bin animation has MP4 export.
- All scientific values trace to `socialtda-data.js`.
- No raw document text appears.
- Dev pages are served from `public/animations/dev/`.
- Runtime paths use `public/static/...`.
