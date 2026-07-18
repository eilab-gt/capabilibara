# 07_format_and_topic_personalities: Format and topic personalities

## Concept

Show SocialIQA’s peak formats/topics versus documentation-like comparison profiles.

## Audience

General audience result explainer.

## Scientific claim

SocialIQA peaks on Customer Support/FAQ/Q&A-like formats and Literature/Social Life topics, while comparison benchmarks concentrate in Documentation, Academic Writing, and Legal Notices.

## Source values to use

- Top-3 formats from `claims.influence_values.top_formats`
- Selected topic margins from paper result

Use `data/socialtda_claims.yaml` as the canonical source. If any of these values are missing from the runtime data module, add them there first rather than hard-coding them in this animation.

## Recommended duration

8–14 seconds.

## Storyboard

| Time | Scene | Visual | On-screen text |
|---:|---|---|---|
| 0–2s | Format bars appear | Four small benchmark panels with top formats. | What form of text matters? |
| 2–5s | SocialIQA bars rise | Customer Support, Documentation, FAQ appear; Customer Support highlighted. | SocialIQA peaks on Customer Support. |
| 5–8s | Comparison bars rise | Documentation dominates MMLU SS, ARC, MMLU STEM. | Comparison tasks lean documentation-like. |
| 8–12s | Topic chips | Literature and Social Life highlight for SocialIQA; Science/Software/Industrial for comparisons. | Topic and format both matter. |
| 12–14s | End card | Split: interpersonal/dialogic vs documentation-like. | Not just topic — communicative form. |

## Implementation notes

Use bar charts or ranked chips. Avoid full 24-label axes; show top-3 only.

## Guardrails

Do not say documentation is irrelevant to SocialIQA; it is positive but not the peak.

## Deliverables

- format-topic-animation.js
- dev page
- poster

## QA questions

1. Can the final frame stand alone as a poster?
2. Are all values traceable to the data module?
3. Is the claim accurate in review mode and public mode?
4. Does the animation avoid raw training-document exposure?
5. Is there a legend for any color semantics?
