# 15_open_data_ecosystem: Why open data matters

## Concept

Show that document-level corpus attribution needs open model weights, checkpoints, tokenizer, and pretraining corpus.

## Audience

Vision/funding/project background.

## Scientific claim

Open weights alone are not enough; gradient-based corpus-scale TDA requires released document-level pretraining data.

## Source values to use

- OLMo3-7B
- Dolma3
- document-level pretraining corpus
- Base for document gradients, Instruct for query gradients

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–3s | Closed model | Black box with weights but no corpus access. | Weights alone are not enough. |
| 3–6s | Open ecosystem | Model, checkpoints, tokenizer, corpus shards, evals appear connected. | Open data makes provenance measurable. |
| 6–10s | Attribution loop | Document gradients connect to query gradients. | Trace benchmark behavior to corpus regions. |
| 10–15s | End card | Open ecosystem becomes a microscope/map. | Capability provenance needs data transparency. |

## Implementation notes

Use simple icons; avoid institutional logos in review mode.

## Guardrails

Do not claim all open models meet the requirements; scope to this ecosystem.

## Deliverables

- open-ecosystem-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
