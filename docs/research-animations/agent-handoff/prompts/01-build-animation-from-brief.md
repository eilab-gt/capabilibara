# Prompt: build one animation from a brief

Read the selected animation brief and implement it as a reusable SVG + GSAP component.

Use `data/socialtda_claims.yaml` as transcribed starter data. Copy needed values into one runtime data module under `public/static/js/animations/socialtda-data.js`, then import from that module. Do not hard-code values in multiple scene files.

Before coding, produce a short implementation plan:
- component name;
- data fields used;
- scene sequence;
- files to create;
- export strategy;
- likely risks.

Then implement the component, dev page, CSS, and QA file using the repo paths in `IMPLEMENTATION_GUIDE.md`.

After coding, run locally with `python3 -m http.server 8000`, inspect the dev page at `/public/animations/dev/<slug>.html`, and fix errors.

Do not overclaim the science. Use `CLAIM_GUARDRAILS.md`.
