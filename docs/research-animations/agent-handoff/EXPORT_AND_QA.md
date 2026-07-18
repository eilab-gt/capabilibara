# Export and QA guide

## Deliverables per animation

Minimum deliverables:

```text
public/animations/dev/<slug>.html
public/static/js/animations/<slug>-animation.js
public/static/css/animations.css
public/static/animations/exports/<slug>_poster.png
public/static/animations/exports/<slug>_16x9.mp4
public/static/animations/exports/<slug>_square.mp4
docs/research-animations/qa/<slug>_qa.md
```

Optional:

```text
public/static/animations/exports/<slug>.gif
public/static/animations/exports/<slug>_vertical.mp4
scratch or ignored capture directory for frame sequences
```

## Export settings

Recommended:

| Use | Size | Duration | Format |
|---|---:|---:|---|
| Website embedded loop | responsive SVG | 8–20s | native SVG/JS |
| Talk video | 1920×1080 | 10–45s | MP4 H.264 |
| Twitter/X square | 1080×1080 | 6–15s | MP4, optional GIF |
| Poster frame | same as video | static | PNG |
| Accessibility fallback | same layout | static | PNG/SVG |

Use MP4 as the main social format. GIFs are useful for quick preview but can degrade color gradients and text.

## QA checklist

For every animation:

- [ ] Scientific values match `data/socialtda_claims.yaml`, unless a source PDF/artifact or maintainer-provided update supersedes it.
- [ ] Final takeaway is accurate and not overclaimed.
- [ ] No raw training snippets or document IDs are displayed.
- [ ] Review-mode anonymity works.
- [ ] Legend explains color semantics.
- [ ] Text is readable at 1080px wide.
- [ ] Mobile aspect ratio does not crop labels.
- [ ] `prefers-reduced-motion` gives a static fallback.
- [ ] Timeline can be paused or has a deterministic final frame for screenshots and poster export.
- [ ] Poster frame captures the final message.
- [ ] MP4 plays in a normal browser.
- [ ] GIF, if produced, is under a practical size target.
- [ ] No console errors.
- [ ] Works under `python3 -m http.server 8000`.
- [ ] Dev page works at `/public/animations/dev/<slug>.html` from the local server.
- [ ] Runtime paths use `public/static/...`, not a repository-root runtime directory.
- [ ] QA note is saved at `docs/research-animations/qa/<slug>_qa.md`.

## Review questions

Before accepting an animation, answer:

1. What single concept does this animation teach?
2. Which paper claim does it support?
3. Which exact values are displayed?
4. What should a skeptical reader not conclude from it?
5. Does it work without surrounding narration?
6. Does it still make sense as a static poster frame?
7. Which source currently supports the values: handoff data, local PDF/artifact, or maintainer-supplied update?

## Common failure modes

- Too many labels on a full 24×24 grid.
- Heatmap colors but no legend.
- Animation suggests individual documents are exposed.
- Unlearning is shown as “proof” rather than partial validation.
- Review-mode assets accidentally include public identifiers.
- Small text unreadable in GIF.
- Values copied into multiple JS files and drifting out of sync.
- Dev pages or exports created outside the repo's `public/` structure.
