# 12_targeted_vs_random_unlearning: Influence-targeted vs random in-topic unlearning

## Concept

Show the main validation comparison: influence-guided forget sets versus random same-topic controls.

## Audience

Reviewer-facing result, talk slide, social clip.

## Scientific claim

For SocialIQA, influence-targeted unlearning damages the intended benchmark more than random in-topic forgetting; comparison tasks are weaker/null/reversed.

## Source values to use

- SocialIQA median d +0.0160 [0.0130,0.0220], pBH ≈ 1e−5
- MMLU STEM weaker +0.0020 CI crosses zero
- MMLU SS not significant
- ARC-Challenge median d −0.0026 reversed/noise-floor

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Same topic, two lanes | A topic/bin area splits into Random in-topic and Influence-targeted lanes. | Control vs targeted selection. |
| 2–5s | Forget sets selected | Random lane samples evenly; targeted lane selects high-influence documents. | Same topic, different documents. |
| 5–8s | Unlearning module | Both lanes pass through same unlearning box. | Same procedure. |
| 8–12s | Paired results | SocialIQA damage bar for targeted exceeds random; other benchmark rows show weaker/mixed markers. | Strongest validation: SocialIQA. |
| 12–15s | End card | Bounded conclusion. | Attribution identifies load-bearing documents most clearly for SocialIQA. |

## Implementation notes

Use a paired-dot or paired-bar visual. Display SocialIQA clearly; show comparison tasks as small rows with verdict badges.

## Guardrails

Do not hide mixed results. Do not say unlearning validates all benchmarks.

## Deliverables

- targeted-random-unlearning-animation.js
- dev page
- poster
- MP4

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
