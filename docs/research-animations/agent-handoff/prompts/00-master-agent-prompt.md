# One-shot handoff prompt for another AI coding agent

You are working on research animations for the project:

**Where Does Social Reasoning Come From? Capability Provenance in Language Models**

Your job is to build web-native, source-controlled animations for the project website, talks, and social media exports.

## Read first

Read these files before coding:

1. `PROJECT_CONTEXT.md`
2. `CLAIM_GUARDRAILS.md`
3. `DESIGN_SYSTEM.md`
4. `IMPLEMENTATION_GUIDE.md`
5. `EXPORT_AND_QA.md`
6. `data/socialtda_claims.yaml`
7. the specific animation brief in `briefs/`

## Source-of-truth rules

- The latest submission PDF or explicitly supplied artifact is the source of truth for scientific claims, values, caveats, and anonymous-review constraints.
- The GitHub repo is the source of truth for current website structure and style.
- `data/socialtda_claims.yaml` is transcribed starter data for animation values.
- Do not change scientific values unless a source PDF/artifact is added to the repo or a maintainer explicitly supplies updated values.
- Do not invent values, document snippets, examples, or claims.
- If a required value is missing, record it in the QA note and use a placeholder only if clearly marked.
- Runtime code should copy needed values into one JavaScript data module and import from that module. Do not duplicate scientific values across scene files.

## Implementation preference

Use plain **SVG + GSAP**, matching the current project site. The repo already has an SVG+GSAP `figure1.js` pattern. Refactor/extend that style rather than introducing a heavy framework.

Keep `python3 -m http.server 8000` as a valid local workflow.

This repo serves the website from `public/`. Use `public/index.html`, `public/static/js/figure1.js`, `public/static/js/main.js`, and `public/static/css/socialtda.css` as the current implementation anchors.

## First task

Build `briefs/05_signature_bin_sign_flip.md`.

Create:

```text
public/static/js/animations/socialtda-data.js
public/static/js/animations/socialtda-palettes.js
public/static/js/animations/socialtda-svg-utils.js
public/static/js/animations/signature-bin-animation.js
public/static/css/animations.css
public/animations/dev/signature-bin.html
docs/research-animations/qa/signature-bin_qa.md
```

Requirements:

- Vector SVG, not raster screenshots.
- Use values from `data/socialtda_claims.yaml`.
- Include legend for supportive / neutral / suppressive influence.
- Include static fallback and `prefers-reduced-motion` behavior.
- Include review-mode option that hides public identifiers.
- No raw training-document snippets or document IDs.
- Deterministic final frame for export.
- Final animation should work as 16:9 and square crop.

## After implementation

Report:

1. Files created/modified.
2. How to run locally.
3. How to export poster frame and MP4/GIF.
4. Which paper claims and values are shown.
5. QA checklist results.
6. TODOs or missing artifacts.
