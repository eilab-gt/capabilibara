# 08_reasoning_sharper_than_knowledge: Reasoning split sharper than knowledge split

## Concept

Show the social–STEM contrast is stronger for reasoning than for knowledge.

## Audience

Technical result slide.

## Scientific claim

SocialIQA−ARC-Challenge has a larger contrast range than MMLU Social Sciences−MMLU STEM; reasoning max |∆| ≈ 0.91 vs knowledge max |∆| ≈ 0.63 in topic-level contrasts.

## Source values to use

- Reasoning contrast max_abs_delta 0.91
- Knowledge contrast max_abs_delta 0.63
- Top tilting topics from `contrastive_topics`

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

8–12 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Two contrast maps | Top panel: SocialIQA − ARC; bottom: MMLU SS − MMLU STEM. | Two social–STEM contrasts. |
| 3–6s | Meters expand | Reasoning contrast meter grows to 0.91; knowledge meter grows to 0.63. | The reasoning split is wider. |
| 6–9s | Topic callouts | Literature tilts social reasoning; Software Development tilts STEM in both. | Which regions drive the split? |
| 9–12s | End card | 2×2 matrix returns with row highlight. | Capability type sharpens the corpus contrast. |

## Implementation notes

A simplified signed-difference heatmap plus two horizontal range meters. Use exact values.

## Guardrails

Do not imply domain is irrelevant; the direction is preserved but attenuated for knowledge.

## Deliverables

- reasoning-contrast-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
