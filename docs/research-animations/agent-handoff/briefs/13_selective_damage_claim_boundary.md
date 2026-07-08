# 13_selective_damage_claim_boundary: Selective damage and claim boundary

## Concept

Visualize that strong validation means targeted capability damage with limited collateral damage, and show the mixed claim boundary.

## Audience

Talk conclusion, reviewer-facing rigor slide.

## Scientific claim

SocialIQA is favorable/cleanest; MMLU STEM is weaker or construction-dependent; MMLU Social Sciences is not favorable; ARC-Challenge is a noise-floor non-result.

## Source values to use

- Selectivity formula sel(b)=|γ(b)|/mean collateral
- Cross-method verdicts from `claims.unlearning.cross_method_selectivity_verdict`

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

12–18 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Four meters in 2×2 grid | Each benchmark has a target-damage meter and collateral shadow. | Selective damage means target > collateral. |
| 3–6s | Formula appears | sel(b)=target damage / average collateral damage. | Higher than 1 means more selective. |
| 6–11s | Verdict ladder | SocialIQA: favorable; MMLU STEM: faithful-only; MMLU SS: not favorable; ARC: noise floor. | The evidence is strongest for SocialIQA. |
| 11–15s | Boundary ring | Core claim center, caveated claims outer ring. | A bounded scientific claim is stronger. |
| 15–18s | End card | Transparent finding label. | Validation is strongest where the data supports it. |

## Implementation notes

Use cards/badges rather than too many numeric ratios. This is a communication of claim boundary.

## Guardrails

Do not make MMLU STEM look equally validated. ARC is a noise-floor non-result.

## Deliverables

- claim-boundary-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
