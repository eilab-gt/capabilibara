# 14_corpus_skew_stratified_sampling: Corpus skew vs stratified sampling

## Concept

Explain why the working set samples across bins instead of preserving natural corpus proportions.

## Audience

Methods appendix, reviewer-facing explainer.

## Scientific claim

The natural WebOrganizer bin distribution is highly skewed, so stratified sampling gives each populated taxonomy cell comparable measurement budget.

## Source values to use

- largest bin >100,000× smallest
- Gini docs 0.6837; tokens 0.7337
- top-10 token share 27.8%
- working set 5,678,621 docs

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Natural corpus heatmap | A few cells glow huge; most cells dim. | The web corpus is highly skewed. |
| 3–6s | Representative sample warning | A sample follows the skew, leaving small cells sparse. | Rare regions become hard to measure. |
| 6–10s | Stratified allocation | Cells equalize to comparable measurement budgets. | Stratification asks: given a region, what does it support? |
| 10–15s | Two-question split | Balanced lens vs population lens. | Different sampling answers different questions. |

## Implementation notes

Use abstract heatmap intensities; no need for all labels. Include one numerical callout.

## Guardrails

Do not imply stratified sampling estimates natural population contribution. It estimates per-bin signal.

## Deliverables

- sampling-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
