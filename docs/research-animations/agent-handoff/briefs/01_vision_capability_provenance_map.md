# 01_vision_capability_provenance_map: Vision: capability provenance as a corpus map

## Concept

Introduce the research vision: turn a giant opaque pretraining corpus into an inspectable map of capability-supporting regions.

## Audience

Website hero, talk opener, project identity, general audience.

## Scientific claim

Capability provenance asks which parts of pretraining data support which model abilities, using aggregate corpus regions rather than raw document retrieval.

## Source values to use

- OLMo3-7B/Dolma3
- 24 topics × 24 formats = 576 bins
- 4 benchmarks in a 2×2 design

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

15–25 seconds; 16:9 primary; square variant for social.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Opaque corpus | Cloud of anonymous document cards; no readable snippets. | A model learns from a vast pretraining corpus. |
| 3–6s | Map appears | Documents organize into a topic×format grid. | Can we map capabilities back to corpus regions? |
| 6–10s | Benchmarks probe the map | Four colored benchmark probes enter and light up different cells. | Social reasoning, social knowledge, STEM reasoning, STEM knowledge. |
| 10–16s | SocialIQA separates | SocialIQA profile highlights narrative/interpersonal and support-like cells; other profiles cluster elsewhere. | Different capabilities draw on different regions. |
| 16–22s | Intervention | Highlighted region flows into an unlearning test meter. | Attribution suggests; unlearning tests. |
| 22–25s | End card | Grid + model + test summary. | Capability provenance: inspectable, comparable, perturbable corpus regions. |

## Implementation notes

Build as a staged SVG with a corpus-card swarm, grid, four probe chips, and simplified heatmap overlays. This can reuse scenes from other components. Use generic cells, not full labels, unless zoomed.

## Guardrails

Do not imply exact document-level causality. Do not show raw text. In review mode, remove public branding.

## Deliverables

- `public/static/js/animations/vision-map-animation.js`
- `public/animations/dev/vision-map.html`
- `public/static/animations/exports/vision-map_16x9.mp4`
- `public/static/animations/exports/vision-map_poster.png`
- `docs/research-animations/qa/vision-map_qa.md`

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
