# Animation roadmap

## Recommended build order

| Order | Brief | Why |
|---:|---|---|
| 1 | `05_signature_bin_sign_flip.md` | Most shareable result; small implementation surface. |
| 2 | `02_aggregation_576_bins.md` | Explains the methodological contribution. |
| 3 | `03_2x2_benchmark_design.md` | Clarifies the experimental design. |
| 4 | `12_targeted_vs_random_unlearning.md` | Explains the main validation logic. |
| 5 | `10_lexical_bimodality.md` | Gives the project a human-readable story. |
| 6 | `01_vision_capability_provenance_map.md` | Broad project identity / hero animation. |
| 7 | `13_selective_damage_claim_boundary.md` | Communicates rigorous bounded conclusions. |

## Implementation readiness

Build the first three animations before branching into the broader suite:

1. `05_signature_bin_sign_flip.md`
2. `02_aggregation_576_bins.md`
3. `12_targeted_vs_random_unlearning.md`

Treat optional and later briefs as source/layout review candidates, not immediate build tasks. In particular, held-out, claim-boundary, and broader vision animations should be checked against a current source PDF/artifact and a concrete final-frame layout before implementation.

## Milestone 1: component foundation

Build:

- data module;
- palette module;
- SVG helpers;
- one dev page;
- first finished animation: signature-bin sign flip.

Exit criteria:

- one animation exports MP4, GIF, and poster frame;
- QA checklist complete;
- easy to add the next animation.

## Milestone 2: core explainer suite

Build:

- aggregation/noisy documents → 576 bins;
- 2×2 benchmark design;
- signed influence concept;
- signature-bin sign flip.

Exit criteria:

- a 45–60 second talk sequence can explain the method and first result.

## Milestone 3: validation suite

Build:

- attribution suggests → unlearning tests;
- influence-targeted vs random in-topic unlearning;
- selective damage / claim-boundary animation.

Exit criteria:

- viewer understands why unlearning is a validation step and why the result is strongest for SocialIQA, weaker/mixed elsewhere.

## Milestone 4: project-vision / website suite

Build:

- capability provenance map;
- open-data ecosystem;
- aggregate maps, not raw documents.

Exit criteria:

- project page has a coherent visual story from motivation to responsible release.

## Long-term optional suite

Build after core:

- correctness differential sign flip;
- held-out probe tiering;
- Theory-of-Mind unlearning;
- corpus skew vs stratified sampling;
- full heatmap comparison scrubber.
