# Prompt: review an implemented animation

Review the implemented animation against:

- `CLAIM_GUARDRAILS.md`
- `DESIGN_SYSTEM.md`
- `EXPORT_AND_QA.md`
- the relevant file in `briefs/`
- `data/socialtda_claims.yaml`

Return:
1. Scientific accuracy issues.
2. Visual clarity issues.
3. Accessibility issues.
4. Responsiveness/cropping issues.
5. Export issues.
6. Suggested minimal patch set.
7. Repo path issues, including any runtime asset outside `public/static/`, dev page outside `public/animations/dev/`, or QA note outside `docs/research-animations/qa/`.
8. Whether the animation is acceptable as a public project asset, a review-mode asset, both, or neither.
