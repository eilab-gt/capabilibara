# 16_responsible_release_aggregate_not_raw: Aggregate maps, not raw document exposure

## Concept

Communicate responsible-release discipline: aggregate bin-level statistics instead of raw document-level influence trails.

## Audience

Website ethics/responsible AI section.

## Scientific claim

The methodology operates at aggregate corpus-region level and releases aggregate statistics/matrices rather than document-level scores or raw examples.

## Source values to use

- aggregate bin-level statistics
- 576×4 influence matrix
- no raw document snippets

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

8–12 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Documents blur | Anonymous documents appear, then blur/lock. | Do not expose individual training examples. |
| 3–6s | Aggregate cells appear | Blurred documents collapse into bin-level matrix cells. | Release corpus-region statistics. |
| 6–9s | Safe artifact cards | Matrix, manifests, aggregate plots appear; raw snippets stay locked. | Structured disclosure over raw-example exposure. |
| 9–12s | End card | Ethics tagline. | Analyze corpus regions, not individual documents. |

## Implementation notes

Use lock/blur icons. Never show real text. This can be a static illustration too.

## Guardrails

This must not imply the upstream corpus is private; it is public, but the animation/release should avoid surfacing specific examples.

## Deliverables

- responsible-release-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
