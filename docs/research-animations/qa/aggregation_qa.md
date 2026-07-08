# QA note — aggregation (02_aggregation_576_bins)

Date: 2026-07-08
Brief: `docs/research-animations/agent-handoff/briefs/02_aggregation_576_bins.md`

## Claim and values shown

**Claim:** document-level influence scores are too noisy for direct
interpretation; aggregating the stratified working set over the fixed
24 topics × 24 formats taxonomy gives 576 stable corpus regions whose signed
influence can be compared across benchmarks (approved headline claim #2 in
`CLAIM_GUARDRAILS.md`).

**This animation claims:** noise at the document level; a fixed taxonomy
chosen before inspection; aggregation into bin-level corpus regions; regions
comparable across the four benchmarks.

**This animation does NOT claim:** that aggregation makes influence estimates
exact (explicit caveat line), that any real per-document values are shown
(the dots are stylized and labeled as such in the caveat), or that the result
generalizes beyond OLMo3-7B / Dolma3 and the stratified working set.

| Value shown | Matches `socialtda_claims.yaml` |
|---|---|
| 24 topics × 24 formats = 576 bins | ✔ (`corpus_and_taxonomy.taxonomy`) |
| 5,678,621 documents | ✔ (`corpus_and_taxonomy.working_set.documents`) |
| ~10.5B tokens | ✔ (`working_set.tokens_approx`) |
| target 10,000 docs per bin | ✔ (`working_set.target_docs_per_bin`) |
| 16 selected-bin z-scores (4 bins × 4 benchmarks) | ✔ (`influence_values.selected_bins_panel`, all 16 values re-checked in-browser) |
| "… 572 more bins …" | ✔ computed as `TAXONOMY.bins − SELECTED_BINS_PANEL.length` |

All values render from `public/static/js/animations/socialtda-data.js` (the
single runtime copy). No scientific values are hard-coded in the scene file.
The end-card matrix reuses the same four selected bins as the signature-bin
animation, so the two clips agree by construction.

Source status: transcribed starter data — **no local source PDF/artifact in
the repo yet**. Per `SOURCE_MAP.md`, a submitted PDF supersedes these values.

## Storyboard conformance (brief 02)

Beats (`noise → taxonomy → aggregate → matrix → takeaway`, 13.65 s total,
within the 10–15 s brief window):

1. **Noisy document dots** — 240 seeded, stylized dots flicker (position,
   brightness, and sign color) around a "benchmark queries" chip.
2. **Taxonomy scaffold** — 12×12 grid draws in with axis labels
   ("24 formats →", "24 topics ↓") and an explicit stylization caption
   ("compressed 12 × 12 view of 576 bins", per DESIGN_SYSTEM's compressed-grid
   metaphor).
3. **Dots snap to bins** — dots fly to seeded grid cells; cells tint as they
   arrive; an averaging glyph ("many docs → one score") appears.
4. **576×4 matrix** — grid gives way to a compact matrix: four benchmark
   chips × the four selected bins with real signed-influence values,
   "… 572 more bins …" marking the excerpt.
5. **End card** — ring draws around Literature × Customer Support × SocialIQA
   (+16.0); takeaway "Not one document — one interpretable corpus region."
   plus two caveat lines.

## Paths checked

- Runtime: `public/static/js/animations/aggregation-animation.js`, plus the
  shared modules `socialtda-data.js`, `socialtda-palettes.js`,
  `socialtda-svg-utils.js` (extended with `spokenSigned`, `formatInt`), and
  the new `socialtda-timeline-utils.js`; `public/static/css/animations.css`
  (unchanged — component styles are generic).
- Dev page: `http://localhost:8000/public/animations/dev/aggregation.html`
  (served via `python3 -m http.server 8000` from the repo root). ✔ works.
- Refactor: `signature-bin-animation.js` now uses the shared timeline utils;
  regression-checked in-browser (duration 9.8 s, controls, deterministic end
  frame, live mid-seek count-ups `+15.4/−5.91/…` at t = 3.6, aria signs).
- Exports: `public/static/animations/exports/` (see below).

## Checklist (EXPORT_AND_QA.md)

- [x] Scientific values match `data/socialtda_claims.yaml` (all 16 matrix
      values verified in-browser via DOM text; row-0 fills verified as exact
      palette outputs: ±caps `#2166AC`/`#B35806`, and z = −0.45 as the 0.18
      neutral→orange mix under the 2.5 cap).
- [x] Final takeaway accurate, not overclaimed ("Not one document — one
      interpretable corpus region." + caveats "Aggregation stabilizes
      estimates under the attribution metric — it does not make them exact."
      and "OLMo3-7B / Dolma3 · stratified working set · stylized dots — no
      raw documents shown.").
- [x] No raw training snippets or document IDs anywhere (dots are abstract
      circles; grid cells are anonymous; caveat states stylization).
- [x] Review mode works: `?review=1` omits the footer identifier entirely;
      verified no identifier text remains in the SVG. Claim/values identical
      in both modes.
- [x] Legend present: supportive (+z) / neutral (≈ 0) / suppressive (−z).
      The legend fades in during the FIRST beat because the noise dots
      already use the influence palette. Footnote: "Color capped at
      |z| = 2.5 · printed values exact".
- [x] Text readable at 1080 px wide (checked square poster at 1080×1080).
- [x] Square crop safe: all final-frame content inside x ∈ [333, 947] of the
      1280×720 viewBox (central square is [280, 1000]); transient stage
      elements also inside; verified via `?bare=1&square=1` capture.
- [x] `prefers-reduced-motion` gives a static final frame (`.is-static`, no
      timeline, no controls). Same frame as the poster by construction: the
      SVG is authored in final state and all transients are authored hidden.
- [x] Deterministic final frame: `?end=1`, the "final frame" control, and
      `exportFrame("end")` give the same state on a cold load; dot layout and
      stagger use a seeded PRNG (mulberry32), no `Math.random`. All
      programmatic seeks pass `suppressEvents=false` via the shared
      timeline utils.
- [x] Poster frame captures the final message.
- [x] MP4s play in a normal browser (H.264 / yuv420p, faststart).
- [x] No console errors (only the favicon 404 on the dev page).
- [x] Works under `python3 -m http.server 8000`.
- [x] Runtime paths under `public/static/…`; dev page under
      `public/animations/dev/`; QA note here.

## Review questions (EXPORT_AND_QA.md)

1. **Single concept taught:** individual-document attribution is noisy;
   aggregation over a fixed taxonomy yields stable, comparable corpus
   regions.
2. **Paper claim supported:** approved headline claims #2 and #3 in
   `CLAIM_GUARDRAILS.md` (bin-level aggregation; topic×format bin as the unit
   of analysis).
3. **Exact values displayed:** 24 / 24 / 576; 5,678,621 documents; ~10.5B
   tokens; 10,000 docs-per-bin target; the 16 selected-bin signed z-scores
   (+16.0, −7.31, −0.45, −5.75 / +1.9, −0.06, −0.78, −0.46 / +1.29, −0.63,
   −0.34, −0.12 / +0.41, +6.86, +1.59, +5.56).
4. **A skeptical reader should not conclude:** that the dots depict real
   per-document scores (stylized; caveat says so), or that bin-level
   estimates are exact (caveat says they are not).
5. **Works without narration:** yes — each beat carries a short caption.
6. **Static poster frame makes sense:** yes — title + working-set stats +
   the 4-of-576 matrix + takeaway summarize the whole clip.
7. **Value source:** handoff transcription (`socialtda_claims.yaml`); no
   local PDF artifact yet.

## Exports

| File | Spec | Status |
|---|---|---|
| `public/static/animations/exports/aggregation_poster.png` | 1920×1080 PNG | ✔ captured |
| `public/static/animations/exports/aggregation_poster_square.png` | 1080×1080 PNG | ✔ captured |
| `public/static/animations/exports/aggregation_16x9.mp4` | 1920×1080, 30 fps, H.264 | ✔ rendered, ffprobe-verified (yuv420p, 13.7 s, 411 frames, ~995 KB); browser playback checked (readyState 4) |
| `public/static/animations/exports/aggregation_square.mp4` | 1080×1080, 30 fps, H.264 | ✔ rendered, ffprobe-verified (yuv420p, 13.7 s, 411 frames, ~1.1 MB); browser playback checked |
| `public/static/animations/exports/aggregation.gif` | 640 px wide, 15 fps | ✔ produced (~983 KB — larger than signature-bin's because the dot motion churns the palette; MP4 remains the primary social format) |

### Re-render commands

```bash
# from the repo root
python3 -m http.server 8000

# poster frames (headless Chrome; the static fallback IS the poster state)
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1920,1080 --screenshot=public/static/animations/exports/aggregation_poster.png \
  "http://localhost:8000/public/animations/dev/aggregation.html?bare=1&end=1"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1080,1080 --screenshot=public/static/animations/exports/aggregation_poster_square.png \
  "http://localhost:8000/public/animations/dev/aggregation.html?bare=1&end=1&square=1"

# video: deterministic frame capture (playwright-core stepping the timeline
# with seek(t, false)), then ffmpeg. Capture script pattern: drive
# ?bare=1&noautoplay=1&motion=1 (+&square=1) at 30 fps; see the capture
# gotchas below and in signature-bin_qa.md.
ffmpeg -y -framerate 30 -i frames_aggregation_16x9/f_%04d.png -c:v libx264 -pix_fmt yuv420p \
  -crf 18 -movflags +faststart public/static/animations/exports/aggregation_16x9.mp4
ffmpeg -y -framerate 30 -i frames_aggregation_square/f_%04d.png -c:v libx264 -pix_fmt yuv420p \
  -crf 18 -movflags +faststart public/static/animations/exports/aggregation_square.mp4

# optional GIF (small preview, degrades gradients)
ffmpeg -y -i public/static/animations/exports/aggregation_16x9.mp4 \
  -vf "fps=15,scale=640:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" \
  public/static/animations/exports/aggregation.gif
```

Capture gotchas (same as signature-bin):

- Headless Chrome reports `prefers-reduced-motion: reduce`, so video capture
  must pass `&motion=1` (and Playwright `reducedMotion: "no-preference"`) or
  it will record the static frame.
- When stepping the timeline from Playwright, the evaluate must NOT return
  the GSAP timeline (`.seek()` is chainable): wrap it in braces,
  `page.evaluate((t) => { window.stdaAnim.timeline.pause().seek(t, false); }, t)`.

## Independent review

A second-agent code review ran against the brief, `socialtda_claims.yaml`,
CLAIM_GUARDRAILS, DESIGN_SYSTEM, IMPLEMENTATION_GUIDE, and EXPORT_AND_QA
(read-only; it independently re-verified all 16 z-scores, the 6
corpus/taxonomy figures, and the "572 more bins" arithmetic against the YAML,
and confirmed the poster PNGs match the authored final state). Outcome:
**DONE — 0 blockers, 0 majors.** It also audited the timeline for
authored-final-state violations (none: every transient re-hidden before
`progress(1)`, no tween property conflicts, loop-stable) and confirmed the
signature-bin refactor is behaviorally equivalent line-by-line.

Adjudicated findings:

- **Applied (nit):** the aria label now derives "4 benchmarks" from
  `BENCHMARKS.length` instead of the hard-coded word "four".
- **Kept as-is (minor):** the aria label summarizes the matrix and reads out
  one example value rather than all 16 — the concept taught is aggregation,
  not the individual scores; the full grid is documented here and spoken in
  the signature-bin animation for the headline bin.
- **Kept as-is (minor):** `DOT_NEUTRAL` is a scene-local illustrative gray,
  not an influence semantic, so it stays out of the shared palette module.
- **Kept as-is (nit):** the footnote "printed values exact" (display
  precision) vs. the caveat "does not make them exact" (estimate quality)
  are distinct, both true statements.

## Remaining caveats / TODOs

- **No source PDF in repo.** Values rest on the transcribed
  `socialtda_claims.yaml`; re-verify when the submission PDF or data artifact
  lands.
- The noise-dot cloud and the 12×12 grid are stylized; real bin counts and
  per-document scores are not depicted. Covered by on-screen caption
  ("compressed 12 × 12 view of 576 bins") and the caveat line.
- Vertical 1080×1920 variant not built (optional per design system).
- Site integration (`public/index.html`) intentionally deferred per
  IMPLEMENTATION_GUIDE repo-integration order: dev page first.
- `figure1.js` still hard-codes its own copy of the selected-bins values
  (pre-existing; refactor tracked separately).
