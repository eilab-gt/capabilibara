# Project context for the animation agent

## Paper in one sentence

The project uses training-data attribution as an interpretable tool for **capability provenance**: mapping which regions of the OLMo3-7B pretraining corpus support social reasoning versus STEM reasoning.

## The big idea

The paper’s animation spine is:

```text
raw pretraining corpus
  → WebOrganizer topic×format taxonomy
  → 576 interpretable corpus bins
  → TrackStar/Bergson signed influence scores
  → contrastive 2×2 benchmark comparison
  → targeted unlearning as partial validation
```

The main visual object should be the **24 topic × 24 format grid**. Everything else can be built as a transformation of that grid: noisy documents become bins; benchmark probes light up bins; correlations compare full-grid profiles; unlearning removes/highlights corpus regions and measures accuracy damage.

## Scientific unit of analysis

A **WebOrganizer bin** is one topic×format cell. A bin gets a signed, within-benchmark z-score:

- positive/supportive: gradients align with benchmark query gradients;
- negative/suppressive or contrasting: gradients oppose benchmark query gradients;
- near zero: weak or neutral influence under this metric.

Do not animate raw training documents as if they are being disclosed. Use anonymous, stylized document icons.

## Main benchmark design

The paper uses a 2×2 contrastive factorial design:

| Capability type | Social domain | STEM domain |
|---|---|---|
| Reasoning | SocialIQA | ARC-Challenge |
| Knowledge | MMLU Social Sciences | MMLU STEM |

This is central. Many animations should preserve this 2×2 layout or color semantics.

## Core numbers

Use `data/socialtda_claims.yaml` as transcribed starter data for animation work. Do not change these scientific values unless a source PDF/artifact is added to the repo or a maintainer explicitly supplies updated values. Runtime code should copy needed values into one JavaScript data module and import from that module, not duplicate numbers across scenes.

High-value values for first animations:

- Taxonomy: 24 topics × 24 formats = 576 bins.
- Working set: 5,678,621 documents, ~10.5B tokens, target 10k docs/bin.
- Signature bin: `Literature × Customer Support`.
  - SocialIQA: +16.0
  - MMLU Social Sciences: −7.31
  - ARC-Challenge: −0.45
  - MMLU STEM: −5.75
- SocialIQA profile correlations:
  - vs MMLU Social Sciences: 0.06
  - vs ARC-Challenge: 0.22
  - vs MMLU STEM: 0.09
  - other three among themselves: 0.53–0.86.
- Unlearning paired contrast:
  - SocialIQA median influence-minus-random damage: +0.0160 accuracy points; pBH ≈ 1e−5.
  - MMLU STEM: weaker; pBH = 0.028 but CI crosses zero.
  - MMLU Social Sciences: not significant.
  - ARC-Challenge: reversed/noise-floor under paired construction.

## Recommended first build

Start with `briefs/05_signature_bin_sign_flip.md`.

Why:

- smallest surface area;
- strongest shareable result;
- exercises the data module, palette, SVG heatmap cells, export loop, poster frame, and QA checklist;
- reusable for the hero animation and Figure 2 explainer.

## Repository context

The public repo is currently a website repository served from `public/`. The current site already has:

- `public/index.html`
- `public/static/css/socialtda.css`
- `public/static/js/figure1.js`
- `public/static/js/main.js`

The current `figure1.js` already implements a self-contained SVG + GSAP pipeline animation with stages, stage buttons, captions, play/pause, progress, reduced-motion fallback, and scene functions. Refactor that pattern into reusable modules rather than rewriting the whole site.

## Anonymous-review mode

The latest PDF is under double-blind review. The repository may contain public/de-anonymized website material. Build animations with a `review_mode` option:

- In review mode: do not show author names, institutional identities, arXiv IDs, repo URLs, or release claims that are not allowed in the review submission.
- In public mode: project links and public branding can be enabled after review/release.

## What the animations should feel like

Plain, crisp, research-first explanatory graphics:

- vector-first;
- no stock video;
- no decorative pseudo-3D unless it clarifies a concept;
- minimal text per scene;
- every number traceable to `data/socialtda_claims.yaml`;
- a static poster frame for every animation.
