# 06_socialiqa_outlier_profile: SocialIQA as provenance-structure outlier

## Concept

Compare the full 576-bin profiles and show SocialIQA separates from the other three benchmarks.

## Audience

Results section, social clip, talk slide.

## Scientific claim

SocialIQA’s 576-bin profile correlates with each comparison benchmark at r ≤ 0.22, while the other three correlate at r = 0.53–0.86.

## Source values to use

- Correlation matrix: [[1,0.06,0.22,0.09],[0.06,1,0.53,0.86],[0.22,0.53,1,0.55],[0.09,0.86,0.55,1]]

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

8–12 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Four profile fingerprints | Four small heatmap/fingerprint cards appear. | Each benchmark has a 576-bin profile. |
| 2–5s | Correlation matrix | Cards shrink into a 4×4 correlation matrix. | How similar are the profiles? |
| 5–8s | SocialIQA separates | Low correlation cells involving SocialIQA highlight; the other three cluster. | SocialIQA: r ≤ 0.22 vs others. |
| 8–12s | End card | SocialIQA node moves away from clustered comparison nodes. | SocialIQA is the provenance-structure outlier. |

## Implementation notes

Build a small 4×4 correlation heatmap and a node cluster/force-like layout. Use static, deterministic positions.

## Guardrails

Do not say SocialIQA is 'better' or 'more social' based on this alone. This is profile divergence.

## Deliverables

- socialiqa-outlier-animation.js
- dev page
- poster
- MP4

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
