# 03_2x2_benchmark_design: The 2×2 benchmark design

## Concept

Show that the study crosses domain with capability type rather than comparing an arbitrary task list.

## Audience

Talk slides, website method section.

## Scientific claim

The design decouples social vs. STEM domain from reasoning vs. knowledge capability type.

## Source values to use

- SocialIQA
- MMLU Social Sciences
- ARC-Challenge
- MMLU STEM

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

6–10 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Empty axes | Horizontal axis appears: Social ↔ STEM; vertical axis appears: Reasoning ↔ Knowledge. | Two axes, four cells. |
| 2–4s | Benchmarks land | Four colored chips land in the matrix. | SocialIQA, ARC-Challenge, MMLU Social Sciences, MMLU STEM. |
| 4–7s | Contrasts animate | Reasoning row pulses; knowledge row pulses; domain columns pulse. | Does provenance separate by domain, capability type, or both? |
| 7–10s | End card | Matrix remains, arrows point to later heatmaps. | Controlled contrastive design. |

## Implementation notes

A small component useful as an inset in other animations. Make reusable `createBenchmark2x2()` helper.

## Guardrails

Avoid implying benchmark scores compare capability quality; this is a provenance design.

## Deliverables

- benchmark-design-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
