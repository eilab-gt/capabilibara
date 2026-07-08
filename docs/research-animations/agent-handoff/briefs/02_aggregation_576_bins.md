# 02_aggregation_576_bins: Why aggregation matters: noisy documents → 576 bins

## Concept

Explain the methodological move from noisy document-level attribution to stable corpus-region analysis.

## Audience

Methods section, talks, reviewer-facing explainer.

## Scientific claim

Document-level influence scores are too noisy for direct interpretation; bin-level aggregation over the fixed taxonomy gives stable corpus units for comparison.

## Source values to use

- 24 topics
- 24 formats
- 576 bins
- 5,678,621 documents
- ~10.5B tokens
- 10k docs/bin target

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Noisy document dots | Hundreds of tiny dots flicker around a model/query. | Document-level scores are noisy. |
| 2–5s | Taxonomy scaffold | Rows and columns fade in as topic×format axes. | Use a fixed taxonomy before inspection. |
| 5–8s | Dots snap to bins | Dots flow into named cells; a few cells average to stable values. | Aggregate documents into corpus regions. |
| 8–12s | 576×4 matrix | Grid becomes a compact matrix with four benchmark chips. | Now regions can be compared across capabilities. |
| 12–15s | End card | One cell zooms in; value appears as signed influence. | Not one document: one interpretable corpus region. |

## Implementation notes

Use particle/dot elements with seeded randomness. Snap dots into a 24×24 grid or an 8×8 representative grid labeled '576 bins'. Include an averaging glyph: many dots → one bin score.

## Guardrails

Do not show document text. Do not say aggregation makes estimates exact.

## Deliverables

- `public/static/js/animations/aggregation-animation.js`
- `public/animations/dev/aggregation.html`
- `public/static/animations/exports/aggregation_poster.png`
- `public/static/animations/exports/aggregation_16x9.mp4`
- `public/static/animations/exports/aggregation_square.mp4`
- `docs/research-animations/qa/aggregation_qa.md`

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
