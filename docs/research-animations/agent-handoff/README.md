# SocialTDA Animation Agent Handoff Pack

This package is for handing the SocialTDA animation work to another command-line AI agent.

The goal is to give that agent enough context to build a reusable animation suite for:

**“Where Does Social Reasoning Come From? Capability Provenance in Language Models.”**

The agent should build web-native, source-controlled animations that can also export to MP4/GIF/poster frames for a project website, talks, and Twitter/X.

## Recommended use

1. Use this folder from `docs/research-animations/agent-handoff/` in this repository.
2. Give the coding agent `AGENT_HANDOFF_PROMPT.md` first.
3. Tell the agent to read:
   - `PROJECT_CONTEXT.md`
   - `CLAIM_GUARDRAILS.md`
   - `DESIGN_SYSTEM.md`
   - `IMPLEMENTATION_GUIDE.md`
   - `data/socialtda_claims.yaml`
   - the relevant file in `briefs/`
4. Start with `briefs/05_signature_bin_sign_flip.md`.
5. After the first animation works, move to `work_orders/priority_1_work_order.md`.

## Known repo adjustments

This public website checkout serves from `public/`, not from the repository root. Use these paths for future implementation work:

- Runtime JavaScript: `public/static/js/animations/`
- Runtime CSS: `public/static/css/animations.css`
- Dev pages: `public/animations/dev/`
- Served exports: `public/static/animations/exports/`
- QA notes: `docs/research-animations/qa/`

Keep the no-build workflow working from the repository root:

```bash
python3 -m http.server 8000
```

## Source-of-truth hierarchy

1. **Latest submission PDF or explicitly supplied artifact** for scientific claims, values, caveats, and anonymous-review constraints.
2. **Project repository** for current website structure, style tokens, and existing animation code.
3. **Released artifacts/data files** once available; those should replace manually transcribed values in `data/socialtda_claims.yaml`.

`data/socialtda_claims.yaml` is transcribed starter data for animation work. Preserve its scientific values unless a source PDF/artifact is added to the repo or a maintainer explicitly supplies updated values.

Runtime animation code should copy needed values into one JavaScript data module, then import from that module. Do not duplicate scientific values across scene files.

## Important implementation choice

Use **SVG + GSAP** first. The current project site already uses a self-contained SVG + GSAP animation for Figure 1, so the easiest path is to refactor and extend that pattern rather than introduce a heavy build system.

## Package map

| Path | Purpose |
|---|---|
| `AGENT_HANDOFF_PROMPT.md` | One-shot prompt to give another AI agent. |
| `PROJECT_CONTEXT.md` | Paper, method, results, and repository context. |
| `SOURCE_MAP.md` | Where each animation claim comes from in the PDF/repo. |
| `ANIMATION_ROADMAP.md` | Recommended suite, priorities, and milestones. |
| `briefs/` | Detailed animation briefs. |
| `data/socialtda_claims.yaml` | Transcribed starter values the agent should use to build a single JS data module. |
| `CLAIM_GUARDRAILS.md` | What the animations may and may not claim. |
| `DESIGN_SYSTEM.md` | Palette, visual metaphors, layout, and motion language. |
| `IMPLEMENTATION_GUIDE.md` | Suggested repo structure and component architecture. |
| `EXPORT_AND_QA.md` | Export formats, QA checklist, and definition of done. |
| `prompts/` | Reusable prompts for coding, review, export, and refactoring. |
| `work_orders/` | Concrete task batches for the other AI agent. |
