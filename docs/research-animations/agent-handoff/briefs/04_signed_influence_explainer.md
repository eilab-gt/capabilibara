# 04_signed_influence_explainer: What signed influence means

## Concept

Explain positive/supportive and negative/suppressive signed influence with aligned/opposed gradient arrows.

## Audience

Technical but accessible methods explainer.

## Scientific claim

A document/bin with gradients aligned with benchmark query gradients has positive influence; one with opposed gradients has negative influence.

## Source values to use

- positive/supportive
- negative/suppressive or contrasting
- near zero

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

8–12 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Query arrow | Benchmark query arrow appears. | Benchmark query gradient. |
| 2–4s | Aligned training arrow | Document/bin arrow rotates into alignment; cell turns blue. | Aligned → positive/supportive influence. |
| 4–6s | Opposed arrow | Another arrow rotates opposite; cell turns red. | Opposed → negative/suppressive or contrasting influence. |
| 6–9s | Many arrows aggregate | Multiple tiny arrows collapse into one bin score. | Average over documents in a bin. |
| 9–12s | Legend | Blue/white/red legend appears. | Signed influence is a measurement, not a moral label. |

## Implementation notes

Use abstract arrows; no formulas required unless in a technical variant. Add optional formula overlay for talks.

## Guardrails

Do not equate negative influence with toxic/bad data. It is signed opposition under the metric.

## Deliverables

- signed-influence-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
