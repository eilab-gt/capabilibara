# 05_signature_bin_sign_flip: Signature-bin sign flip

## Concept

One corpus bin supports SocialIQA strongly while being negative/flat for comparison benchmarks.

## Audience

Twitter/X, website hero/result card, talk opener.

## Scientific claim

`Literature × Customer Support` is SocialIQA’s extreme positive bin (+16.0) and flips negative for MMLU Social Sciences (−7.31) and MMLU STEM (−5.75), with ARC-Challenge near flat (−0.45).

## Source values to use

- Literature × Customer Support: SocialIQA +16.0, MMLU SS −7.31, ARC −0.45, MMLU STEM −5.75

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

6–10 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–1s | Single row appears | A row label types or fades in: Literature × Customer Support. | One topic×format bin. |
| 1–3s | Four benchmark columns | SocialIQA, MMLU SS, ARC-Challenge, MMLU STEM chips appear. | Same bin, four benchmarks. |
| 3–5s | Cells fill | SocialIQA cell fills deep blue and expands; MMLU cells fill orange; ARC stays neutral. | +16.0, −7.31, −0.45, −5.75. |
| 5–7s | Callout | A line circles the SocialIQA cell then shows the MMLU sign flip. | Same corpus region; different provenance. |
| 7–10s | End card | Compact legend + takeaway. | Social reasoning has a distinct corpus signature. |

## Implementation notes

This should be the first build. Use exact values from data. Cap color at |z|=2.5 but print true values. Include legend and final static state. Make it crop-safe for square.

## Guardrails

Do not imply this one bin explains all social reasoning. Use 'signature bin' or 'extreme selected bin', not 'the source'.

## Deliverables

- `public/static/js/animations/signature-bin-animation.js`
- `public/animations/dev/signature-bin.html`
- `public/static/animations/exports/signature-bin_poster.png`
- `public/static/animations/exports/signature-bin_16x9.mp4`
- `public/static/animations/exports/signature-bin_square.mp4`
- `docs/research-animations/qa/signature-bin_qa.md`
- optional GIF

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
