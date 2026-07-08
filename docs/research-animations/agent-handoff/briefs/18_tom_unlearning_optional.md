# 18_tom_unlearning_optional: Optional: held-out Theory-of-Mind unlearning

## Concept

Show the single held-out ToM unlearning validation while preserving its caveats.

## Audience

Technical appendix / long-form explainer only.

## Scientific claim

Unlearning Social Life degrades social-pragmatic ToM in the held-out test, but attribution and unlearning do not co-rank for these probes; the claim rests on causal unlearning.

## Source values to use

- social-pragmatic ToM net −0.244 unconditional accuracy, CI [−0.380, −0.108], sign test 8/9 p=0.039
- science/math/technology control null
- first-order false-belief control null

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

12–18 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | ToM held-out label | A separate appendix lane appears, distinct from main four benchmarks. | One held-out causal test. |
| 3–7s | Social Life unlearned | Social Life topic highlighted and unlearned. | Test social-pragmatic ToM. |
| 7–11s | Subtask effects | Hinting, faux-pas, strange-story bars show degradation; controls stay near zero. | Specific to social-pragmatic ToM. |
| 11–15s | Caveat | Attribution and unlearning do not co-rank; claim rests on unlearning. | Do not treat as attribution convergence. |
| 15–18s | End card | Optional/supporting causal evidence. | Held-out validation, with caveats. |

## Implementation notes

Only build after core suite. Carefully verify sign conventions before rendering.

## Guardrails

Must include caveat that this is not a general held-out attribution–unlearning convergence result.

## Deliverables

- tom-unlearning-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
