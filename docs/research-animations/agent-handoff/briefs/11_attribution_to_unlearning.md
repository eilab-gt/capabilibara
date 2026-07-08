# 11_attribution_to_unlearning: Attribution suggests; unlearning tests

## Concept

Explain why unlearning is a validation step rather than just another plot.

## Audience

Methods/results bridge.

## Scientific claim

Attribution is associational; targeted unlearning is an interventionist test of whether a corpus region is load-bearing.

## Source values to use

- NGDiff + LoRA rank 8
- γ = baseline − unlearned
- selection strategy: random vs influence-guided
- scope: single-topic vs global

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Attribution map | A bin lights up in the corpus map. | Attribution suggests a region matters. |
| 3–6s | Forget operation | Highlighted docs/cell pass into an unlearning module. | Intervene: forget targeted data. |
| 6–9s | Evaluate | Four benchmark meters appear after unlearning. | Measure accuracy damage γ. |
| 9–12s | Validation logic | If targeted forgetting hurts aligned benchmark more than random control, region is load-bearing. | Association → intervention. |
| 12–15s | Caveat | Partial validation label appears. | Not a full mechanism. |

## Implementation notes

This can share visuals with the unlearning contrast animation. Use a simple formula card for γ.

## Guardrails

Must say partial validation, not proof of exact mechanism.

## Deliverables

- attribution-to-unlearning-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
