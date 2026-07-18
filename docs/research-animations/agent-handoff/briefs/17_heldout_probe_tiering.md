# 17_heldout_probe_tiering: Held-out probe tiering and claim boundary

## Concept

Show how held-out probes broaden the attribution analysis without carrying equal evidential weight.

## Audience

Supplementary website, technical talk appendix.

## Scientific claim

Held-out probes are tiered before attribution interpretation: main, supporting, secondary, caution/control, excluded.

## Source values to use

- Main: BBQ, BBH Disambiguation QA, ToMBench, MMLU moral/humanities, NegotiationToM, PUB retained
- Supporting: SimpleToM mental-state, BBH Snarks
- Secondary/caution/failure controls as in claims context

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Many probes enter | Probe chips flow toward a gate labeled direct-answer evidence. | Breadth check. |
| 3–7s | Tiered shelves | Probes sort into main/supporting/secondary/caution/failure. | Not every probe carries the same claim weight. |
| 7–11s | Attribution surfaces | Only main/supporting shelves get bright heatmap panels; controls stay muted. | Interpret attribution after capability evidence. |
| 11–15s | End card | Claim boundary map. | Breadth without overclaiming. |

## Implementation notes

This is optional and mostly for expert audiences. Keep it simple.

## Guardrails

Do not upgrade secondary or failure controls to main evidence.

## Deliverables

- heldout-tiering-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
