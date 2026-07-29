# Camera-Ready Frontend Plan

Status: ready for implementation  
Working branch: `codex/camera-ready-website`  
Baseline: `main` at `dfa6c62`

## Goal

Turn the project page from a paper-shaped results dashboard into a concise,
interactive explanation of capability provenance that a smart high-school
reader can follow.

The page should answer five questions in order:

1. Where do a model's capabilities come from?
2. What does training-data influence mean?
3. Why do we group noisy document scores into corpus regions?
4. What did the study learn at a qualitative level?
5. Why does this matter for understanding and shaping models?

Precise statistics remain available as supporting evidence, but they do not
drive the primary reading experience.

## Design Direction

**Editorial research explainer with a playful field-guide character.**

The visual system should retain the project's warm paper palette and
Capabilibara identity while becoming more deliberate and memorable:

- An editorial hierarchy with characterful display typography and highly
  readable body copy.
- Capabilibara used as a guide through the method, not only as footer artwork.
- A small number of high-impact animations that explain invisible concepts.
- Generous pacing and asymmetry instead of repeated white cards and dashboards.
- Scientific blue/red influence semantics reserved for places where sign
  genuinely matters.
- Motion that supports comprehension and respects reduced-motion preferences.

## Scientific and Editorial Guardrails

- Do not publish unverified Comma, DCLM, or Marin results.
- Do not imply that a high-influence document is individually causal.
- Do not describe suppressive influence as inherently harmful data.
- Do not generalize OLMo3 findings to every model.
- Do not lead with individual topic-format bins as universal findings.
- Prefer topic-, format-, lexical-, and method-level explanations.
- Clearly separate association through attribution from intervention through
  unlearning.
- Keep the paper and current approved claim data as the source of truth.
- Treat exact statistics as progressive-disclosure evidence.

## Target Information Architecture

### 1. Hero: The research question

- Lead with the plain-language question: "Where does a model learn a skill?"
- Follow with a one-sentence capability-provenance answer.
- Keep paper, arXiv, and code actions.
- Reduce the hero to roughly one viewport on desktop.
- Introduce Capabilibara as a visual guide without making the page childish.

### 2. Influence functions, visually explained

- Show a simple prediction and a few representative training documents.
- Animate documents pushing the prediction toward or away from an answer.
- Define influence before naming TrackStar or Bergson.
- Include a short "association, not proof" clarification.

### 3. From noisy documents to a capability map

- Explain why individual scores are too noisy to read directly.
- Animate many documents becoming labeled corpus regions.
- Present WebOrganizer as one practical labeling system, not the contribution.
- Introduce the social/STEM and reasoning/knowledge comparisons only after the
  aggregation idea is clear.

### 4. What we learned

- Use two or three qualitative findings:
  - Social and technical tasks draw on differently shaped corpus regions.
  - Social-reasoning support includes interactional language as well as formal
    documentation.
  - Forgetting flagged material can selectively damage the matching behavior.
- Avoid repeating the same finding as prose, bars, and a full paper figure.
- Provide compact "See the evidence" disclosures for approved numbers.

### 5. Beyond one model

- Explain that models can have different corpus personalities.
- Describe Comma, DCLM, and Marin work as ongoing only if useful.
- Do not render empty result columns or "pending" statistical cells.
- Make future verified model results addable through structured data without
  requiring another redesign.

### 6. Limits, resources, and citation

- Keep limitations short and prominent.
- Consolidate paper, code, artifacts, and citation into one closing area.
- Label unreleased artifacts honestly.
- Correct all public URLs to `/capabilibara/`.

## Implementation Tasks

### Phase 0 - Baseline and content inventory

- [ ] Capture desktop and mobile baseline states.
- [ ] Inventory every section, claim, visualization, and outbound link.
- [ ] Mark content as keep, rewrite, move to evidence, or remove.
- [ ] Record approved claims separately from provisional multi-model work.

Acceptance:

- Every current section has an explicit disposition.
- No scientific claim is moved or rewritten without a paper/reviewer source.

### Phase 1 - Narrative skeleton

- [ ] Reduce navigation to approximately five destinations.
- [ ] Replace the current hero and metrics-first opening.
- [ ] Add the plain-language influence-function section.
- [ ] Reorder the method so attribution precedes taxonomy details.
- [ ] Collapse duplicate Findings and Figures material.
- [ ] Move exact statistics into progressive-disclosure evidence blocks.

Acceptance:

- A reader can explain the method after reading only headings and lead copy.
- The primary story contains no unexplained z-scores, gamma notation, or
  benchmark abbreviations.
- Desktop page length is materially shorter than the current 13,800 pixels.

### Phase 2 - Visual system

- [ ] Refine typography, spacing, color tokens, and section rhythm.
- [ ] Give Capabilibara a purposeful role in the story.
- [ ] Replace repeated card layouts with an editorial composition.
- [ ] Create consistent buttons, evidence disclosures, captions, and callouts.
- [ ] Preserve accessible contrast, focus states, and semantic structure.

Acceptance:

- The page has one recognizable visual point of view.
- Typography and spacing remain comfortable at 390px and 1280px widths.
- No horizontal page overflow is introduced.

### Phase 3 - Explanatory motion

- [ ] Selectively port reusable assets from
  `glenn/socialtda-research-animations-de0a5a`.
- [ ] Prioritize the aggregation and targeted-unlearning explainers.
- [ ] Build or adapt an influence-function explainer for the new narrative.
- [ ] Load video/animation assets only when needed.
- [ ] Provide poster or static states for reduced motion and no-JavaScript use.

Acceptance:

- Every animation teaches one concept that is difficult to explain in prose.
- Animations do not autoplay distracting loops below the fold.
- Reduced-motion mode retains the complete explanation.

### Phase 4 - Evidence and extensibility

- [ ] Keep approved scientific values in one structured data source.
- [ ] Remove duplicated hard-coded values from HTML where practical.
- [ ] Replace the current pending-model table with an extensible but hidden or
  narrative-safe model structure.
- [ ] Add verified future models only after Glenn/Zini approval.

Acceptance:

- Updating an approved value does not require editing multiple visualizations.
- No unverified model result is visible or implied.

### Phase 5 - Resource and deployment cleanup

- [ ] Change README and citation project URLs to `/capabilibara/`.
- [ ] Verify canonical, Open Graph, and social-card URLs.
- [ ] Audit paper, arXiv, code, artifact, and author links.
- [ ] Confirm GitHub Pages deployment behavior remains unchanged.

Acceptance:

- No public project link points to the 404 `/social-data-attribution/` path.
- The deployed page matches the reviewed commit.

### Phase 6 - Verification

- [ ] Test desktop, tablet, and mobile layouts.
- [ ] Test keyboard navigation and visible focus.
- [ ] Test reduced motion and no-JavaScript fallbacks.
- [ ] Check console errors and missing assets.
- [ ] Check loading behavior and oversized media.
- [ ] Conduct a final claim-by-claim review against the paper.
- [ ] Conduct a high-school-reader copy pass.

Acceptance:

- The page works at 390px, 768px, and 1280px without content loss.
- There are no console errors, broken links, or missing media.
- Every visible quantitative claim is traceable to an approved source.

## Recommended Work Order

1. Phase 0 content inventory.
2. Phase 1 narrative skeleton.
3. Review the unstyled/low-style story with Rayan.
4. Phase 2 visual system.
5. Phase 3 explanatory motion.
6. Phase 4 evidence and model extensibility.
7. Phases 5-6 cleanup and verification.

This sequencing prevents visual polish from locking in the current
results-heavy information architecture.
