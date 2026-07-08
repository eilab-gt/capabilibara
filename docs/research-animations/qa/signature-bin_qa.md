# QA note — signature-bin (05_signature_bin_sign_flip)

Date: 2026-07-08
Brief: `docs/research-animations/agent-handoff/briefs/05_signature_bin_sign_flip.md`

## Claim and values shown

**Claim:** `Literature × Customer Support` is SocialIQA's extreme positive bin
(+16.0) and flips negative for MMLU Social Sciences (−7.31) and MMLU STEM
(−5.75), with ARC-Challenge near flat (−0.45). Values are signed,
within-benchmark z-scores in the OLMo3-7B / Dolma3 setting.

**This animation claims:** one selected corpus bin has an extreme positive
signed-influence z-score for SocialIQA while being negative for both MMLU
benchmarks and near flat for ARC-Challenge, under the attribution metric.

**This animation does NOT claim:** that this bin is "the source" of social
reasoning, that customer-support text is always good for social reasoning,
that negative influence means harmful data, or that the result generalizes
beyond OLMo3-7B / Dolma3 and the stratified working set. The end card says
"a signature bin — not the sole source of social reasoning" and scopes the
setting explicitly.

| Benchmark | Value shown | Matches `socialtda_claims.yaml` |
|---|---:|---|
| SocialIQA | +16.0 | ✔ (`influence_values.selected_bins_panel[0]`) |
| MMLU Social Sciences | −7.31 | ✔ |
| ARC-Challenge | −0.45 | ✔ |
| MMLU STEM | −5.75 | ✔ |

Source status: transcribed starter data — **no local source PDF/artifact in
the repo yet**. Per `SOURCE_MAP.md`, a submitted PDF supersedes these values.

All values render from `public/static/js/animations/socialtda-data.js`
(the single runtime copy). No values are hard-coded in the scene file; the
scene reads `SIGNATURE_BIN.values[benchmark.key]`.

## Paths checked

- Runtime: `public/static/js/animations/socialtda-data.js`,
  `socialtda-palettes.js`, `socialtda-svg-utils.js`,
  `signature-bin-animation.js`; `public/static/css/animations.css`.
- Dev page: `http://localhost:8000/public/animations/dev/signature-bin.html`
  (served via `python3 -m http.server 8000` from the repo root). ✔ works.
- Exports: `public/static/animations/exports/` (see below).

## Checklist (EXPORT_AND_QA.md)

- [x] Scientific values match `data/socialtda_claims.yaml` (verified in-browser
      via DOM text: `+16.0, −7.31, −0.45, −5.75`; color for z = −0.45 verified
      as the exact 0.18 neutral→negative mix under the 2.5 cap).
- [x] Final takeaway accurate, not overclaimed ("Social reasoning has a
      distinct corpus signature." + two caveat lines).
- [x] No raw training snippets or document IDs anywhere.
- [x] Review mode works: `?review=1` omits the footer identifier
      ("SocialTDA · eilab.gatech.edu/…") entirely; verified no identifier
      text remains in the SVG. Claim/values identical in both modes.
- [x] Legend present: supportive (+z) / neutral (≈ 0) / suppressive (−z),
      plus footnote "Color capped at |z| = 2.5 · printed values exact".
- [x] Text readable at 1080 px wide (checked square poster at 1080×1080).
- [x] Square crop safe: all content inside the central 720-unit square of the
      1280×720 viewBox; verified via `?bare=1&square=1` at 1080×1080.
- [x] `prefers-reduced-motion` gives a static final frame (`.is-static`,
      no timeline, no controls). Same frame as the poster by construction:
      the SVG is authored in final state and the timeline animates toward it.
- [x] Deterministic final frame: `?end=1`, the "final frame" control, and
      `exportFrame("end")` all give the same state on a cold load. (A GSAP
      `suppressEvents` bug that left count-up labels stale on seek was found
      and fixed during QA — all programmatic seeks now pass
      `suppressEvents=false`.)
- [x] Poster frame captures the final message.
- [x] MP4s play in a normal browser (H.264 / yuv420p, faststart).
- [x] No console errors (only a favicon 404 on the dev page).
- [x] Works under `python3 -m http.server 8000`.
- [x] Runtime paths under `public/static/…`; dev page under
      `public/animations/dev/`; QA note here.

## Review questions (EXPORT_AND_QA.md)

1. **Single concept taught:** one corpus bin can support one benchmark
   strongly while opposing others — capability provenance is
   benchmark-specific.
2. **Paper claim supported:** approved headline claim #6 in
   `CLAIM_GUARDRAILS.md`.
3. **Exact values displayed:** +16.0 / −7.31 / −0.45 / −5.75 (signed
   within-benchmark z-scores).
4. **A skeptical reader should not conclude:** that this bin causally
   explains social reasoning, or that the attribution is exact counterfactual
   tracing. Caveat lines address both.
5. **Works without narration:** yes — beats carry short on-screen captions.
6. **Static poster frame makes sense:** yes — the final frame is the poster.
7. **Value source:** handoff transcription (`socialtda_claims.yaml`); no
   local PDF artifact yet.

## Exports

| File | Spec | Status |
|---|---|---|
| `public/static/animations/exports/signature-bin_poster.png` | 1920×1080 PNG | ✔ captured |
| `public/static/animations/exports/signature-bin_poster_square.png` | 1080×1080 PNG | ✔ captured |
| `public/static/animations/exports/signature-bin_16x9.mp4` | 1920×1080, 30 fps, H.264 | ✔ rendered, ffprobe-verified (yuv420p, 9.83 s, 295 frames, ~398 KB); re-rendered with the red palette, playback re-checked |
| `public/static/animations/exports/signature-bin_square.mp4` | 1080×1080, 30 fps, H.264 | ✔ rendered, ffprobe-verified (yuv420p, 9.83 s, 295 frames, ~417 KB); re-rendered with the red palette, playback re-checked |
| `public/static/animations/exports/signature-bin.gif` | 640 px wide, 15 fps | ✔ produced (~306 KB) |

### Re-render commands

```bash
# from the repo root
python3 -m http.server 8000

# poster frames (headless Chrome; the static fallback IS the poster state)
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1920,1080 --screenshot=public/static/animations/exports/signature-bin_poster.png \
  "http://localhost:8000/public/animations/dev/signature-bin.html?bare=1&end=1"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1080,1080 --screenshot=public/static/animations/exports/signature-bin_poster_square.png \
  "http://localhost:8000/public/animations/dev/signature-bin.html?bare=1&end=1&square=1"

# video: deterministic frame capture (playwright-core stepping the timeline
# with seek(t, false)), then ffmpeg. Capture script: scratch/capture-frames.mjs
# pattern — drive ?bare=1&noautoplay=1&motion=1 (+&square=1), 30 fps.
ffmpeg -y -framerate 30 -i frames_16x9/f_%04d.png -c:v libx264 -pix_fmt yuv420p \
  -crf 18 -movflags +faststart public/static/animations/exports/signature-bin_16x9.mp4
ffmpeg -y -framerate 30 -i frames_square/f_%04d.png -c:v libx264 -pix_fmt yuv420p \
  -crf 18 -movflags +faststart public/static/animations/exports/signature-bin_square.mp4

# optional GIF (small preview, degrades gradients)
ffmpeg -y -i public/static/animations/exports/signature-bin_16x9.mp4 \
  -vf "fps=15,scale=640:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" \
  public/static/animations/exports/signature-bin.gif
```

Notes for the capture script:

- Headless Chrome reports `prefers-reduced-motion: reduce`, so video capture
  must pass `&motion=1` (and Playwright `reducedMotion: "no-preference"`) or
  it will record the static frame.
- When stepping the timeline from Playwright, the evaluate must NOT return
  the GSAP timeline (`.seek()` is chainable): wrap it in braces,
  `page.evaluate((t) => { window.stdaAnim.timeline.pause().seek(t, false); }, t)`.
  Returning it makes Playwright serialize a huge cyclic object and hang —
  this also applies to `waitForFunction` predicates.

## Independent review

A second-agent code review ran against the brief, `socialtda_claims.yaml`,
CLAIM_GUARDRAILS, IMPLEMENTATION_GUIDE, and DESIGN_SYSTEM (read-only; it
re-verified every transcribed number against the YAML independently). Outcome:
0 blockers; findings adjudicated and applied:

- aria-label now speaks signs as words ("plus 16.0", "minus 7.31") because
  some screen readers drop the U+2212 glyph — which would erase the sign flip.
- The callout ring's `pathLength`/dash draw-on setup moved into the animated
  branch so browsers without `pathLength`-on-rect support (older Safari) still
  get a solid ring in the static/poster frame.
- `?stage=` now accepts a numeric beat index as well as a beat name.
- Rejected (cosmetic): ring edge sits ~4 px inside the soft 5% margin; it is
  well inside the hard square-crop zone.

## Color note (2026-07-08)

The suppressive influence color was changed repo-wide from orange `#B35806`
to the ColorBrewer RdBu red `#B2182B` (the orange was confusable with the
ARC-Challenge benchmark orange `#A14F00`; blue/neutral were already RdBu
tokens). All exports below were re-rendered with the red palette; see
`aggregation_qa.md` for the full change record.

## Remaining caveats / TODOs

- **No source PDF in repo.** Values rest on the transcribed
  `socialtda_claims.yaml`; re-verify when the submission PDF or data artifact
  lands.
- ~~Pre-existing discrepancy: figure1.js hard-codes `Home × Creative` MMLU
  STEM as `−0.19` vs the YAML's `−0.12`.~~ **Resolved:** figure1.js was
  refactored onto the shared data module (commit `c478b24`, merged into this
  branch), which fixes the drift.
- Vertical 1080×1920 variant not built (optional per design system).
- Site integration (`public/index.html`) intentionally deferred per
  IMPLEMENTATION_GUIDE repo-integration order: dev page first.
