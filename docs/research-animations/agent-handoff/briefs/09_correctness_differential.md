# 09_correctness_differential: Correct vs incorrect reasoning

## Concept

Show bins associated with correct answers versus errors, emphasizing Literature × Customer Support as a correctness-differential outlier for reasoning.

## Audience

Deeper technical explainer.

## Scientific claim

Literature × Customer Support is top-positive correctness-differential for SocialIQA (+13.11) and ARC-Challenge (+6.00), but directionally negative for the two MMLU knowledge benchmarks; the negative knowledge arm is not statistically resolved.

## Source values to use

- Correctness differential values from `claims.influence_values.correctness_differential`

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Correct/incorrect split | Benchmark queries split into correct and incorrect streams. | Separate provenance of correct answers from errors. |
| 3–6s | Subtract maps | Correct map minus incorrect map becomes a differential heatmap. | ∆z = correct − incorrect. |
| 6–10s | Signature row | Literature × Customer Support appears for all four benchmarks. | Reasoning positive; knowledge directional negative. |
| 10–15s | Caveat frame | Confidence intervals appear lightly; knowledge negative side marked directional. | Strong reasoning arm; cautious knowledge arm. |

## Implementation notes

Use two streams and a subtraction visual; print exact values and maybe CI brackets in small text.

## Guardrails

Must include caveat: negative knowledge side is directional / CIs span zero.

## Deliverables

- correctness-differential-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
