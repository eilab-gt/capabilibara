# Design system for SocialTDA animations

## Visual identity

Use a restrained research-graphics style:

- white or very light background;
- crisp vector shapes;
- thin grid lines;
- semantic colors for benchmarks and influence sign;
- no decorative particle effects unless representing noisy document-level scores;
- no raw text snippets from training data.

## Benchmark palette

Use the current project palette:

| Benchmark | Role | Color |
|---|---|---|
| SocialIQA | Social reasoning | `#762A83` |
| MMLU Social Sciences | Social knowledge | `#8C6D1F` |
| ARC-Challenge | STEM reasoning | `#A14F00` |
| MMLU STEM | STEM knowledge | `#1B7837` |

## Influence palette

| Meaning | Color |
|---|---|
| Supportive / positive signed influence | `#2166AC` |
| Suppressive / negative signed influence | `#B35806` or existing site red/orange scale |
| Neutral / near zero | `#F7F7F7` |
| Accuracy drop in unlearning | use a red/dark red damage scale |
| Accuracy gain / preservation | muted neutral or blue depending on context |

Always include a legend whenever blue/red or blue/orange appears.

## Core visual metaphors

| Concept | Visual metaphor |
|---|---|
| Corpus | Cloud/stack of anonymous document cards |
| Deduplication | duplicate cards fading out |
| Taxonomy | 24×24 grid, sometimes compressed to 8×8/12×12 for readability |
| Bin | one named topic×format cell |
| Benchmark query | colored probe chip or arrow |
| Positive influence | blue/supportive glow, aligned arrows |
| Negative influence | orange/suppressive cell, opposed arrows |
| Aggregation | noisy dots snapping into bins |
| Contrast | two heatmaps subtract into a signed difference map |
| Correctness differential | correct and incorrect query streams subtracting |
| Unlearning | highlight/remove/forget operation followed by accuracy-damage meters |
| Claim boundary | evidence ladder or ring diagram separating strong, supporting, and caveated claims |

## Motion grammar

- Fade in context before values.
- Use zoom sparingly to move from corpus scale to one bin.
- Use staged reveals for matrices: axes first, then cells, then labels, then takeaway.
- Use a final 1.0–1.5 second hold on the takeaway frame for social exports.
- Avoid fast flashing heatmaps. Color changes should be smooth and readable.
- Prefer short loops of 6–15 seconds for social clips.
- Prefer 20–45 seconds for website/talk explainers.

## Typography

Use the site’s existing fonts if possible. Keep on-screen text short.

Good captions:

- “From documents to corpus regions”
- “24 topics × 24 formats = 576 bins”
- “Same corpus bin, different capability provenance”
- “Attribution suggests; unlearning tests”
- “Partial validation, bounded claim”

Avoid dense sentences inside the animation. Put detail in surrounding page text.

## Layout sizes

Build every animation as an SVG viewBox that can render cleanly at:

- 16:9 website/talk: `1920×1080` or scalable `viewBox="0 0 1280 720"`;
- square social: `1080×1080`;
- vertical/social story: optional `1080×1920`;
- poster frame: PNG at same sizes.

Keep a safe margin of at least 5% on all sides.
