# Research Animations

This directory stores planning and agent-handoff material for SocialTDA research animations. It is intentionally outside `public/` so the source material is tracked for review and reuse without being served as part of the project website by default.

## Contents

- `agent-handoff/` - extracted from `socialtda-animation-agent-handoff(1).zip` on 2026-07-08. Contains animation briefs, reusable agent prompts, claim guardrails, design guidance, source maps, QA notes, and canonical starter data.
- `qa/` - tracked location for per-animation QA notes once animations are implemented.

## Repo Conventions

This repository serves the website from `public/`. Future animation implementations should use these paths:

- Runtime JavaScript: `public/static/js/animations/`
- Runtime CSS: `public/static/css/animations.css`
- Dev pages: `public/animations/dev/`
- Served exports: `public/static/animations/exports/`
- QA notes: `docs/research-animations/qa/`

## Suggested Starting Point

For a new animation implementation pass, start with:

1. `agent-handoff/AGENT_HANDOFF_PROMPT.md`
2. `agent-handoff/PROJECT_CONTEXT.md`
3. `agent-handoff/CLAIM_GUARDRAILS.md`
4. `agent-handoff/DESIGN_SYSTEM.md`
5. `agent-handoff/IMPLEMENTATION_GUIDE.md`
6. `agent-handoff/data/socialtda_claims.yaml`
7. The relevant file in `agent-handoff/briefs/`

The handoff recommends plain JavaScript, SVG, and GSAP so the no-build local website workflow remains intact. Run local dev from the repository root with:

```bash
python3 -m http.server 8000
```
