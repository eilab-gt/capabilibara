# Prompt: refactor animation components

Refactor shared code from existing animation modules into reusable helpers without changing visual output.

Targets:
- data imports;
- palette functions;
- SVG helpers;
- timeline controls;
- reduced-motion fallback;
- export hooks.

Do not introduce a build system unless necessary. Keep `python3 -m http.server 8000` working.

Keep shared runtime modules under `public/static/js/animations/` and shared CSS under `public/static/css/animations.css`.
