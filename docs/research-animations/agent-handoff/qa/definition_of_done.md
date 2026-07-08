# Definition of done

An animation is done only when:

- It has a brief and a QA file under `docs/research-animations/qa/`.
- It runs locally from a dev HTML page under `public/animations/dev/`.
- It uses the shared data module under `public/static/js/animations/` for values.
- It has a static fallback.
- It supports review mode if public identifiers could appear.
- It exports at least a poster frame and MP4 under `public/static/animations/exports/` when those files are meant to be served by the website.
- It has no raw training snippets.
- It has passed scientific claim review against `data/socialtda_claims.yaml` or a newer supplied source artifact.
- It has a deterministic final frame for poster/screenshots.
- It has run commands documented.
