# Copy-paste handoff bundle for a coding agent

You are building research animations for **Where Does Social Reasoning Come From? Capability Provenance in Language Models**.

The goal is a suite of source-controlled, web-native animations for a project website, conference talks, and social media.

## Scientific core

The project maps benchmark behavior back to aggregate regions of the OLMo3-7B/Dolma3 pretraining corpus using training-data attribution. It aggregates noisy document-level influence scores into WebOrganizer bins: **24 topics × 24 formats = 576 bins**. It compares four benchmarks in a 2×2 design: SocialIQA, MMLU Social Sciences, ARC-Challenge, and MMLU STEM. It then uses targeted machine unlearning as partial validation.

## Do first

Build the signature-bin animation:

`Literature × Customer Support`

Values:
- SocialIQA: `+16.0`
- MMLU Social Sciences: `−7.31`
- ARC-Challenge: `−0.45`
- MMLU STEM: `−5.75`

Message: **Same corpus bin, different capability provenance.**

## Technology

Use plain SVG + GSAP. Keep local serving simple:

```bash
python3 -m http.server 8000
```

Do not add a heavy framework unless requested.

This repo serves the website from `public/`. Use runtime assets under `public/static/`, dev pages under `public/animations/dev/`, and QA notes under `docs/research-animations/qa/`.

Use `data/socialtda_claims.yaml` as transcribed starter data. Do not change scientific values unless a source PDF/artifact is added to the repo or a maintainer explicitly supplies updated values. Copy needed values into one JavaScript data module, then import from that module.

## Required files

```text
public/static/js/animations/socialtda-data.js
public/static/js/animations/socialtda-palettes.js
public/static/js/animations/socialtda-svg-utils.js
public/static/js/animations/signature-bin-animation.js
public/static/css/animations.css
public/animations/dev/signature-bin.html
docs/research-animations/qa/signature-bin_qa.md
```

## Science guardrails

Do not:
- invent values;
- show raw training snippets;
- imply exact document-level causality;
- imply unlearning validates all benchmarks;
- remove caveats around approximate attribution, working-set scope, or single-model scope.

Use language:
- aggregate corpus regions;
- signed influence;
- partial causal validation;
- strongest for SocialIQA, mixed for comparison tasks;
- within the OLMo3-7B/Dolma3 setting.

## Next animations after the first

1. Noisy documents → 576-bin aggregation.
2. 2×2 benchmark design.
3. Influence-targeted vs random unlearning.
4. Lexical bimodality.
5. Vision: capability provenance as a corpus map.
6. Claim boundary / selective damage.
