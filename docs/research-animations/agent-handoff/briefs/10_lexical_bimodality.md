# 10_lexical_bimodality: Two islands of SocialIQA support: lexical bimodality

## Concept

Show SocialIQA high-influence bins split into interactional/dialogue-rich text and documentation-like text.

## Audience

Website story section, social clip, talk slide.

## Scientific claim

SocialIQA is the only primary benchmark whose high-influence bins visibly split between interactional text and documentation-like text; top-20 bins split 10/10 between interactional and expository/structured formats.

## Source values to use

- SocialIQA top-20 10/10 split
- Literature × Customer Support lexical profile: 245 mean words, 33.39 second-person pronouns/1k, 6.22 mental-state terms/1k, dialogue z +2.38, social z +1.82

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

10–15 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Top-20 bins appear | 20 small cards labeled by rank, not full text. | SocialIQA top-influence bins. |
| 2–5s | Cards split into two islands | 10 cards move left to dialogic/personal; 10 move right to expository/structured. | Interactional + documentation-like. |
| 5–9s | Feature meters | Left island shows shorter docs, pronouns, mental-state, dialogue; right shows longer formal docs. | Different communicative forms. |
| 9–12s | Signature card | Literature × Customer Support zooms in with stylized support-dialogue icon. | Short, dialogue-rich support-like text. |
| 12–15s | End card | Two islands connected to SocialIQA chip. | Social reasoning support is bimodal. |

## Implementation notes

Do not show actual training text. Use icons: speech bubbles for dialogic, document/manual pages for expository.

## Guardrails

No raw snippets. Do not imply all high-influence text is conversational; it is bimodal.

## Deliverables

- lexical-bimodality-animation.js
- dev page
- poster
- social MP4

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
