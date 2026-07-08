# QA note — benchmark-design (03_2x2_benchmark_design)

Date: 2026-07-08
Brief: `docs/research-animations/agent-handoff/briefs/03_2x2_benchmark_design.md`

## Claim and values shown

**Claim:** the study's four benchmarks form a controlled contrastive design
crossing domain (social vs. STEM) with capability type (reasoning vs.
knowledge) — approved headline claim #4 in `CLAIM_GUARDRAILS.md`.

**This animation claims:** the benchmark set decouples domain from capability
type; each benchmark occupies one cell of the 2×2.

**This animation does NOT claim:** anything about benchmark scores, task
difficulty, or model quality (the brief's guardrail). The caveat line states
this explicitly: "Contrasts capability provenance — not a ranking of
benchmark difficulty or model quality." No empirical values appear at all.

| Shown | Matches source |
|---|---|
| SocialIQA → social × reasoning | ✔ (`benchmarks.SocialIQA` in `socialtda_claims.yaml`) |
| MMLU Social Sciences → social × knowledge | ✔ (`benchmarks."MMLU Social Sciences"`) |
| ARC-Challenge → STEM × reasoning | ✔ (`benchmarks."ARC-Challenge"`) |
| MMLU STEM → STEM × knowledge | ✔ (`benchmarks."MMLU STEM"`) |
| "576 corpus bins" pointer line | ✔ (`TAXONOMY.bins`) |

Grid placement is **derived** from each benchmark's `domain`/`capability`
fields in `socialtda-data.js` (axis orders = first-appearance order in
`BENCHMARKS`); nothing about the layout is hard-coded per benchmark. Chip
colors come from `benchmarkColor()` in the shared palette module.

Source status: transcribed starter data — no local source PDF/artifact yet.

## Storyboard conformance (brief 03)

Beats (`axes → benchmarks → contrasts → takeaway`, 9.8 s total, within the
6–10 s brief window):

1. **Empty axes** — axis titles (DOMAIN / CAPABILITY), column headers
   (social / STEM), row headers (reasoning / knowledge), and empty cell
   frames fade in. Caption: "Two axes — four cells."
2. **Benchmarks land** — the four chips pop into their cells
   (back.out ease), MMLU Soc. Sci. gets its full-name sub-label.
3. **Contrasts animate** — sequential pulse outlines: reasoning row →
   knowledge row → social column → STEM column. Caption: "Does provenance
   separate by domain, by capability type, or both?" Verified in-browser
   that the pulses fire sequentially (adjacent fades overlap by ≤ 0.02 s)
   and all are hidden at the final frame.
4. **End card** — pointer line "each benchmark → its signed-influence
   profile across 576 corpus bins" (the storyboard's arrow to later
   heatmaps), takeaway "A controlled, contrastive benchmark design." +
   caveat.

**Reusable helper:** `createBenchmark2x2(parent, opts)` is exported from the
scene module — plain SVG (no GSAP inside), parameterized position/sizes,
returns per-cell handles — so later scenes (e.g. correctness differential,
unlearning) can embed the 2×2 as an inset.

## Paths checked

- Runtime: `public/static/js/animations/benchmark-design-animation.js` plus
  the shared modules (data, palettes, svg-utils, timeline-utils);
  `animations.css` unchanged.
- Dev page: `http://localhost:8000/public/animations/dev/benchmark-design.html`
  (served via `python3 -m http.server 8000` from the repo root). ✔ works.
- Exports: `public/static/animations/exports/` (below).

## Checklist (EXPORT_AND_QA.md)

- [x] Values match `data/socialtda_claims.yaml` (domain/capability table
      above; no numeric values are displayed in this animation).
- [x] Final takeaway accurate, not overclaimed; the brief's specific
      guardrail (no capability-quality comparison) is addressed by the
      caveat line and by the visual language (no scores, bars, or ranks —
      identical cell sizes, identical chip sizes).
- [x] No raw training snippets or document IDs (no corpus content at all).
- [x] Review mode works: `?review=1` omits the footer identifier entirely;
      verified in-browser that no identifier text remains.
- [x] Legend: not needed — the only color semantics are benchmark identity,
      and every chip is labeled inline with its benchmark name (QA question
      5 answered: no unlabeled color semantics).
- [x] Text readable at 1080 px wide (checked square poster).
- [x] Square crop safe: content spans x ∈ [322, 947] of the 1280×720
      viewBox (central square is [280, 1000]).
- [x] `prefers-reduced-motion` gives the static final frame (`.is-static`,
      no timeline, no controls) — same frame as the poster by construction.
- [x] Deterministic final frame: `?end=1`, "final frame" control, and
      `exportFrame("end")` agree; no randomness in this scene; all seeks
      pass `suppressEvents=false` via the shared timeline utils.
- [x] Poster frame captures the final message.
- [x] MP4s play in a normal browser (H.264 / yuv420p, faststart).
- [x] No console errors (only the favicon 404 on the dev page).
- [x] Works under `python3 -m http.server 8000`; dev page under
      `public/animations/dev/`; runtime under `public/static/…`.

## Review questions (EXPORT_AND_QA.md)

1. **Single concept taught:** the benchmark set is a 2×2 crossing of domain
   and capability type, so provenance differences can be attributed to
   either axis.
2. **Paper claim supported:** approved headline claim #4.
3. **Exact values displayed:** none (by design); the four benchmark
   names/positions and the 576-bin pointer.
4. **A skeptical reader should not conclude:** that any benchmark is
   "better", or that the animation reports empirical provenance results —
   it only frames the design.
5. **Works without narration:** yes — beats carry short captions.
6. **Static poster frame makes sense:** yes — the full 2×2 with takeaway.
7. **Value source:** handoff transcription (`socialtda_claims.yaml`).

## Exports

| File | Spec | Status |
|---|---|---|
| `public/static/animations/exports/benchmark-design_poster.png` | 1920×1080 PNG | ✔ captured |
| `public/static/animations/exports/benchmark-design_poster_square.png` | 1080×1080 PNG | ✔ captured |
| `public/static/animations/exports/benchmark-design_16x9.mp4` | 1920×1080, 30 fps, H.264 | ✔ rendered, ffprobe-verified (yuv420p, 9.83 s, 295 frames, ~313 KB) |
| `public/static/animations/exports/benchmark-design_square.mp4` | 1080×1080, 30 fps, H.264 | ✔ rendered, ffprobe-verified (yuv420p, 9.83 s, 295 frames, ~323 KB) |
| `public/static/animations/exports/benchmark-design.gif` | 640 px wide, 15 fps | ✔ produced (~254 KB) |

Re-render commands: identical pipeline to the other animations (see
`aggregation_qa.md` — poster via headless Chrome `?bare=1&end=1`, frames via
the checked-in capture script
`node docs/research-animations/tools/capture-frames.mjs benchmark-design
<16x9|square>`, ffmpeg encode, GIF palettegen). Same capture gotchas apply
(`&motion=1` for video; never return the GSAP timeline from
`page.evaluate`); they are also documented in the script header.

## Independent review

A second-agent review ran read-only against the brief, the claims YAML,
CLAIM_GUARDRAILS, and DESIGN_SYSTEM — including live headless-Chrome DOM
probes of eight mode/seek/loop combinations (`end`, `end+loop`,
`end+review`, `reduced`, paused-at-0, and three `stage=` seeks) and an
explicit hunt for any quality-ranking reading of the visuals. Outcome:
**DONE — 0 blockers, 0 majors.** The data audit confirmed all four
domain/capability placements derive from the data module and match the
YAML, with zero hard-coded benchmark names in scene code.

Adjudicated findings:

- **Applied (nit):** this note's pulse-exclusivity wording softened
  (adjacent pulse fades overlap by ≤ 0.02 s — imperceptible, but "exactly
  one visible" was too strong).
- **Applied (nit):** the capture script the QA notes reference is now
  checked in at `docs/research-animations/tools/capture-frames.mjs`
  (previously it lived only in a scratch directory; all three QA notes now
  point at the repo path).
- **Kept as-is (minor):** `createBenchmark2x2()` reads the canonical
  `BENCHMARKS` module directly rather than accepting an arbitrary benchmark
  list — deliberate: scenes should not construct nonstandard subsets
  silently. Revisit if a future brief needs one.
- **Kept as-is (minor):** beat-label positions land at beat *start* (the
  takeaway text finishes fading in ~0.35 s later) — same scrubbing
  convention as the other two scenes.
- **Kept as-is (nits):** text "→" glyph as the storyboard's arrow;
  lowercase "social" column header (casing derives from the data fields);
  11 px sub-label as a secondary caption.

## Remaining caveats / TODOs

- **No source PDF in repo.** Domain/capability assignments rest on the
  transcribed `socialtda_claims.yaml`.
- Vertical 1080×1920 variant not built (optional per design system).
- Site integration deferred (dev page first, per IMPLEMENTATION_GUIDE).
- `createBenchmark2x2()` is exported but not yet consumed by another scene;
  first natural consumers are briefs 09/12.
