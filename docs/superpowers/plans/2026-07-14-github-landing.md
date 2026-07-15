# GitHub Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the COLM 2026 GitHub landing surface for `eilab-gt/social-data-attribution`: a software-forward README, an AGPL-3.0 code license, a paper-citing CITATION.cff, and a runbook for the GitHub-side metadata clicks.

**Architecture:** This is a docs-and-config task, not code. Four artifacts land in the repo: `README.md` (rewrite), `LICENSE` (new AGPL-3.0), `CITATION.cff` (new), and `docs/github-landing-assets.md` (new runbook). No build, no tests to run against logic; verification is rendering correctness, license-text fidelity, and CFF schema validity. The design is staged: structure and license land now; code-quick-start content stays in honestly-marked pending blocks until the Copybara port.

**Tech Stack:** Markdown, shields.io badges, CFF 1.2.0 schema, AGPL-3.0 license text. No dependencies added.

**Source spec:** `docs/superpowers/specs/2026-07-14-github-landing-design.md`

**Hard sources of truth for content** (to avoid drift):
- Author list and BibTeX: `public/index.html` (lines 29-41 JSON-LD, 654-665 BibTeX block).
- Headline metrics: `public/index.html` (lines 156-163 metrics band) and `press/bluf.md`.
- Package structure: the private source repo's review-safe docs (`README_REVIEW.md`, `docs/ANONYMOUS_SOFTWARE_GUIDE.md`) — referenced in the spec, not copied verbatim.
- License text: GNU/SPDX canonical AGPL-3.0 body.

---

## File Structure

| Path | Action | Responsibility |
|---|---|---|
| `LICENSE` | create | Full AGPL-3.0 license text for code |
| `CITATION.cff` | create | CFF 1.2.0 record; paper is preferred citation, repo is related software |
| `README.md` | rewrite | Software-forward landing page (replaces 922-byte skeleton) |
| `docs/github-landing-assets.md` | create | Click-path runbook for GitHub Settings (About, topics, website, social preview) |

Out of scope and untouched: `public/`, `press/`, `.github/workflows/pages.yml`, `LICENSE-website.md`.

---

## Task 1: Add the AGPL-3.0 code license

**Files:**
- Create: `LICENSE`

- [ ] **Step 1: Fetch the canonical AGPL-3.0 license body**

Run from the repo root:

```bash
curl -fsSL https://www.gnu.org/licenses/agpl-3.0.txt -o LICENSE
```

This is the canonical GNU source GitHub's license picker mirrors. Expected: a file roughly 645-660 lines, beginning with the line `GNU AFFERO GENERAL PUBLIC LICENSE` and ending with the warranty disclaimer paragraph.

- [ ] **Step 2: Verify the license text is intact**

Run:

```bash
head -1 LICENSE && echo "---" && tail -1 LICENSE && echo "---" && wc -l LICENSE
```

Expected: first line `GNU AFFERO GENERAL PUBLIC LICENSE`, last line a non-empty line like `Typos and corrections to <licensing@fsf.org>.`, line count in the ~645-660 range. If the file is empty or truncated, the fetch failed; re-run Step 1 or fetch from the mirror `https://raw.githubusercontent.com/github/choosealicense.com/gh-pages/_licenses/agpl-3.0.txt` and note it needs the YAML front matter stripped (the GNU source has none, so prefer it).

- [ ] **Step 3: Confirm no accidental modification of LICENSE-website.md**

Run:

```bash
git status --short LICENSE-website.md
```

Expected: no output (unchanged). The existing CC BY-SA 4.0 content license stays as-is.

- [ ] **Step 4: Commit**

```bash
git add LICENSE
git commit -m "license: add AGPL-3.0 for code

Website content stays CC BY-SA 4.0 under LICENSE-website.md; this LICENSE
governs the software, arriving with the camera-ready release."
```

---

## Task 2: Add CITATION.cff (paper as preferred citation)

**Files:**
- Create: `CITATION.cff`

- [ ] **Step 1: Write the CITATION.cff file**

Create `CITATION.cff` with exactly this content. Author list and title match `public/index.html` JSON-LD (lines 29-41) and the BibTeX block (lines 654-665); the arXiv id is fixed.

```cff
cff-version: 1.2.0
message: "If you use this software, please cite the accompanying paper."
title: "Capability Provenance in Language Models: A Case Study in Social Reasoning"
type: software
repository-code: "https://github.com/eilab-gt/social-data-attribution"
url: "https://eilab.gatech.edu/social-data-attribution/"
abstract: >-
  Training-data attribution as an interpretable tool for capability discovery,
  mapping which regions of the pretraining corpus support social-reasoning
  versus STEM-reasoning in OLMo3-7B. Released artifacts are aggregate bin-level
  statistics by design.
keywords:
  - training-data-attribution
  - interpretability
  - language-models
  - capability-provenance
  - machine-unlearning
authors:
  - family-names: Matlin
    given-names: Glenn
  - family-names: Chakraborty
    given-names: Chandreyi
  - family-names: Eom
    given-names: Saehee
  - family-names: Okamoto
    given-names: Mika
  - family-names: Castilla
    given-names: Rayan
  - family-names: Jaburi
    given-names: Louis
  - family-names: Deng
    given-names: Alvin
  - family-names: Min
    given-names: Taywon
  - family-names: Quirke
    given-names: Lucia
  - family-names: Biderman
    given-names: Stella
  - family-names: Riedl
    given-names: Mark
license: AGPL-3.0-only
preferred-citation:
  type: proceedings
  title: "Capability Provenance in Language Models: A Case Study in Social Reasoning"
  authors:
    - family-names: Matlin
      given-names: Glenn
    - family-names: Chakraborty
      given-names: Chandreyi
    - family-names: Eom
      given-names: Saehee
    - family-names: Okamoto
      given-names: Mika
    - family-names: Castilla
      given-names: Rayan
    - family-names: Jaburi
      given-names: Louis
    - family-names: Deng
      given-names: Alvin
    - family-names: Min
      given-names: Taywon
    - family-names: Quirke
      given-names: Lucia
    - family-names: Biderman
      given-names: Stella
    - family-names: Riedl
      given-names: Mark
  year: 2026
  conference:
    name: "Conference on Language Modeling (COLM 2026)"
  url: "https://arxiv.org/abs/2606.19625"
```

- [ ] **Step 2: Validate the CFF structure**

Run:

```bash
python3 -c "import yaml,sys; d=yaml.safe_load(open('CITATION.cff')); assert d['cff-version']=='1.2.0'; assert len(d['authors'])==11; assert d['preferred-citation']['url'].startswith('https://arxiv.org'); print('CITATION.cff OK:', len(d['authors']), 'authors, preferred-citation =', d['preferred-citation']['title'])"
```

Expected output: `CITATION.cff OK: 11 authors, preferred-citation = Capability Provenance in Language Models: A Case Study in Social Reasoning`

If it fails, check YAML indentation (CFF is indentation-sensitive) and that there are exactly 11 authors matching the index.html author block.

- [ ] **Step 3: Commit**

```bash
git add CITATION.cff
git commit -m "citation: add CITATION.cff citing the COLM 2026 paper

GitHub's Cite this repository button now surfaces the paper BibTeX; the
repo is listed as related software under AGPL-3.0-only."
```

---

## Task 3: Write the README (software-forward, GitHub-native)

**Files:**
- Modify (full rewrite): `README.md`

This is the largest task. Write the whole file in one pass using the content below, then verify. All content is pinned to the sources named in the plan header; no value is invented.

- [ ] **Step 1: Replace README.md with the full software-forward version**

Overwrite `README.md` entirely with this content:

````markdown
<div align="center">
  <img src="public/static/images/favicon.svg" width="56" height="56" alt="">
  <h1>Capability Provenance in Language Models</h1>
  <p><em>A Case Study in Social Reasoning</em></p>

  <!-- badges -->
  <p>
    <a href="https://arxiv.org/abs/2606.19625"><img src="https://img.shields.io/badge/%F0%9F%93%84%20paper-arXiv%202606.19625-1f2328.svg" alt="Paper"></a>
    <a href="https://eilab.gatech.edu/social-data-attribution/"><img src="https://img.shields.io/badge/venue-COLM%202026-762a83.svg" alt="COLM 2026"></a>
    <a href="https://eilab.gatech.edu/social-data-attribution/"><img src="https://img.shields.io/badge/%F0%9F%8C%90%20website-project%20page-2f6fa8.svg" alt="Project page"></a>
    <img src="https://img.shields.io/badge/code-pending%20release-8c6d1f.svg" alt="Code status: pending release">
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-a93428.svg" alt="License: AGPL-3.0"></a>
    <img src="https://img.shields.io/badge/python-3.12-2f6fa8.svg" alt="Python 3.12">
    <img src="https://img.shields.io/github/last-commit/eilab-gt/social-data-attribution?label=last%20commit" alt="Last commit">
    <img src="https://img.shields.io/github/stars/eilab-gt/social-data-attribution?style=social" alt="Stars">
  </p>

  <p>
    <em>The software for <strong>Capability Provenance in Language Models</strong> (COLM 2026):</em><br>
    a training-data attribution pipeline that maps which regions of a pretraining corpus
    support different reasoning capabilities, and validates those regions with targeted unlearning.
  </p>

  <img src="public/static/images/figures/fig-overview-revised.webp" width="780" alt="Figure 1: corpus-scale attribution pipeline that bins Dolma3, scores benchmark probes, aggregates signed influence, and validates selected regions with unlearning.">
  <p><sub>Figure 1: corpus-scale attribution pipeline — bin Dolma3, score benchmark probes, aggregate signed influence, validate with unlearning.</sub></p>
</div>

## Overview

This repository will host the audited code for **"Capability Provenance in Language Models: A Case Study in Social Reasoning"** (COLM 2026). The pipeline runs gradient-based training-data attribution over a stratified sample of the Dolma3 corpus, aggregates document-level influence to corpus regions defined by the WebOrganizer 24×24 topic-by-format taxonomy, and validates the flagged regions with selective unlearning.

The full results, figures, and method write-up live in the **[paper](https://arxiv.org/abs/2606.19625)** and on the **[project site](https://eilab.gatech.edu/social-data-attribution/)**. This repository is the software.

> ⚠️ **Status.** The project website is live now. The audited code and aggregate artifacts (sampling manifests, the 576×4 bin-level influence matrix, unlearning checkpoints) arrive with the camera-ready release. Sections marked **pending** below are staged for that release and filled when the code ports in.

## Results at a glance

The headline scale of the study (full analysis and figures in the paper and on the site):

| | |
|---|---|
| **576** topic-format bins | **5.68M** documents in the working set |
| **4** contrastive benchmarks | **+1.60 pp** SocialIQA unlearning damage (p ≈ 10⁻⁵) |

## Repository structure

> Pending the code port. The intended layout mirrors the audited pipeline; final paths are confirmed at release.

```
src/
├── data_attribution/      # attribution, benchmark probes, aggregation, analysis
│   ├── attribution/       # gradient-based TDA (TrackStar via Bergson)
│   ├── evaluation/        # OLMES benchmark probes
│   └── analysis/          # bin-level influence aggregation, cross-benchmark stats
├── dolma/                 # corpus construction: dedup, WebOrganizer enrichment, stratified sampling
└── unlearning/            # influence-targeted vs matched-random unlearning (LoRA, NGDiff)
```

Each package maps to a pipeline stage: **corpus construction** (`dolma/`) → **benchmark probes** (`data_attribution/evaluation/`) → **attribution** (`data_attribution/attribution/`) → **aggregation** (`data_attribution/analysis/`) → **unlearning** (`unlearning/`).

## Quick start

> ⚠️ **Pending.** The code arrives with the camera-ready release. The intended workflow:

```bash
# clone, then install (Python 3.12, uv-managed, src/ layout)
git clone https://github.com/eilab-gt/social-data-attribution.git
cd social-data-attribution
uv sync

# reproduce a headline result (command confirmed at release)
# uv run data-attribution run <recipe>   # pending
```

The pipeline uses two vendored dependencies — **Bergson** (TrackStar attribution) and **ai2-olmes** (eval harness) — bootstrapped by a setup script. Exact install and reproduce commands are pinned here at release.

## Method

The central move is aggregation: every benchmark query is traced back to many documents, then summarized into comparable corpus regions. Dolma3 is de-duplicated, classified into WebOrganizer's 24 topic × 24 format taxonomy, and sampled into a 576-bin working set. Benchmark query gradients come from OLMo3-7B Instruct; document gradients and corpus-side curvature are computed on OLMo3-7B Base. Document-level influence is aggregated to a signed 576-bin influence matrix, contrasted across benchmarks, and the flagged regions are tested causally with selective unlearning. Figure 1 above shows the pipeline; the paper carries the depth.

## Data & models

| Component | Detail |
|---|---|
| Base model | `allenai/Olmo-3-1025-7B` (OLMo3-7B Base) |
| Instruction model | `allenai/Olmo-3-7B-Instruct` (query gradients) |
| Corpus | Dolma3, de-duplicated, ~1.26B unique documents |
| Working set | 5.68M documents, stratified across 576 WebOrganizer bins |
| Benchmarks | SocialIQA, MMLU Social Sciences, ARC-Challenge, MMLU STEM (headline 2×2); also GSM8K, ARC-Easy, BBH social tasks |
| Attribution | gradient-based TDA via TrackStar (Bergson) |
| Compute | ~37K H200-equivalent GPU-hours |

Public Hugging Face buckets and the released aggregate artifacts are listed in the **[Roadmap](#roadmap)**. No private or cluster-specific paths are referenced.

## Roadmap

- [x] Project website live ([eilab.gatech.edu/social-data-attribution](https://eilab.gatech.edu/social-data-attribution/))
- [x] Paper on arXiv ([2606.19625](https://arxiv.org/abs/2606.19625))
- [ ] Audited code port (Copybara)
- [ ] Sampling manifests
- [ ] 576×4 bin-level influence matrix (aggregate; no document-level scores)
- [ ] Unlearning checkpoints (LoRA adapters)
- [ ] Hugging Face Hub release (aggregate artifacts)

Released artifacts are **aggregate, bin-level by design** — document-level attribution scores are deliberately not released.

## Limitations

- Attribution is an analytic lens, not an exact proof of causal necessity for individual documents; unlearning validates aggregate patterns without eliminating approximation error.
- The analysis runs on a 5.68M-document stratified working set drawn from the ~1.26B-document population; results do not characterize every document in the full corpus.
- Unlearning shows a corpus region is load-bearing; it does not explain the mechanism by which those documents shape behavior.
- The deep-dive is measured on one open-data ecosystem (OLMo3-7B / Dolma3). Generalization across model families is an open question.
- Released artifacts are aggregate bin-level statistics by design — no document-level attribution scores.

## Citation

If you use this software, please cite the paper. GitHub's **"Cite this repository"** button (from `CITATION.cff`) surfaces the same BibTeX; the canonical text matches the project site.

```bibtex
@inproceedings{matlin2026doessocialreasoningcome,
  title         = {Capability Provenance in Language Models: A Case Study in Social Reasoning},
  author        = {Glenn Matlin and Chandreyi Chakraborty and Saehee Eom and Mika Okamoto and
                   Rayan Castilla and Louis Jaburi and Alvin Deng and Taywon Min and
                   Lucia Quirke and Stella Biderman and Mark Riedl},
  booktitle     = {Proceedings of the Conference on Language Modeling (COLM 2026)},
  year          = {2026},
  eprint        = {2606.19625},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CL},
  url           = {https://arxiv.org/abs/2606.19625}
}
```

## License

- **Code** in this repository is licensed under [AGPL-3.0](LICENSE).
- **Website content** (`public/`, `press/`) is licensed under [CC BY-SA 4.0](LICENSE-website.md).

## Acknowledgments

This work was supported by the Georgia Institute of Technology Experimental AI Lab (EILab), EleutherAI, and the MATS program. See the paper for the full acknowledgments.
````

- [ ] **Step 2: Verify the figure and favicon image paths resolve**

Run:

```bash
test -f public/static/images/favicon.svg && echo "favicon OK" || echo "favicon MISSING"
test -f public/static/images/figures/fig-overview-revised.webp && echo "figure OK" || echo "figure MISSING"
```

Expected: `favicon OK` and `figure OK`. Both paths are relative to the repo root, which is how GitHub renders README images.

- [ ] **Step 3: Verify the BibTeX block matches the project site**

Run:

```bash
diff <(sed -n '/@inproceedings{matlin2026doessocialreasoningcome/,/^}/p' README.md) <(sed -n '/@inproceedings{matlin2026doessocialreasoningcome/,/^}/p' public/index.html | sed 's/^[[:space:]]*//') && echo "BibTeX matches site" || echo "BibTeX drift"
```

Expected: `BibTeX matches site` (the README block is identical to the site's `bibtex-code` content, modulo leading whitespace). If drift is reported, reconcile to `public/index.html` lines 654-665.

- [ ] **Step 4: Verify markdown structure renders (no broken heading levels)**

Run:

```bash
grep -n '^#' README.md
```

Expected: a clean list of one `#` (none — the title is in a `<div>`) and `##` headings: Overview, Status (none — status is a blockquote), Results at a glance, Repository structure, Quick start, Method, Data & models, Roadmap, Limitations, Citation, License, Acknowledgments. Confirm every `##` heading from the spec's IA (section 2 of the design doc) is present.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README as software-forward landing page

GitHub-native, text-first. Real package structure now; install and
quick-start staged as pending blocks until the Copybara port. Results
point to the paper and site rather than duplicating them. BibTeX
mirrors the project site."
```

---

## Task 4: Add the GitHub-side metadata runbook

**Files:**
- Create: `docs/github-landing-assets.md`

- [ ] **Step 1: Write the runbook**

Create `docs/github-landing-assets.md` with this content:

````markdown
# GitHub landing assets — manual setup

These GitHub-side settings cannot be set from the repository contents; they are
clicks in the repo's Settings. This runbook captures the exact steps and the
approved copy, so the public repo matches the project site.

Run these after the README, LICENSE, and CITATION.cff are merged to `main`.

## About panel

**Settings → General → About.**

- **Description:** `Training-data attribution as a discovery method for capability provenance in language models. COLM 2026.`
- **Website:** `https://eilab.gatech.edu/social-data-attribution/`
- **Releases:** leave default (a release is cut when the code ports in).
- **Packages:** none.

## Topics

**Settings → General → Topics** (gear icon next to the About panel).

Add these topics, in any order:

- `training-data-attribution`
- `interpretability`
- `language-models`
- `capability-provenance`
- `mechanistic-interpretability`
- `olmo`
- `machine-unlearning`
- `research`

## Social preview

**Settings → General → Social preview → Edit → Upload an image.**

Upload `public/static/images/og-card.png` (1200×630 PNG, already sized for
social cards and the GitHub preview). This is the same image the project site
uses for its Open Graph card, so previews are consistent across channels.

## License detection

**Settings → General** should auto-detect `LICENSE` (AGPL-3.0) and surface it in
the About panel. If it does not, confirm `LICENSE` is at the repo root and
begins with `GNU AFFERO GENERAL PUBLIC LICENSE`. GitHub detects the license from
the file content, not the filename.

## Citation button

**Settings → General** should surface a **"Cite this repository"** button once
`CITATION.cff` is on `main`. The button renders the `preferred-citation` block
(the COLM paper), not the repository metadata. Verify by clicking it and
confirming the BibTeX key is `@inproceedings{matlin2026doessocialreasoningcome, ...}`.

## Checklist

- [ ] About description set
- [ ] Website set
- [ ] All 8 topics added
- [ ] Social preview uploaded
- [ ] License shows as AGPL-3.0 in About
- [ ] Cite this repository button shows the paper BibTeX
````

- [ ] **Step 2: Commit**

```bash
git add docs/github-landing-assets.md
git commit -m "docs: add GitHub landing assets runbook

Manual click-path for repo About, topics, social preview, license
detection, and the citation button, with approved copy and the
og-card.png asset pointer."
```

---

## Task 5: Final verification

- [ ] **Step 1: Confirm all four artifacts are committed and present**

Run:

```bash
test -f LICENSE && echo "LICENSE OK" || echo "LICENSE MISSING"
test -f CITATION.cff && echo "CITATION.cff OK" || echo "CITATION.cff MISSING"
test -f README.md && echo "README.md OK" || echo "README.md MISSING"
test -f docs/github-landing-assets.md && echo "runbook OK" || echo "runbook MISSING"
```

Expected: all four `OK`.

- [ ] **Step 2: Confirm the working tree is clean**

Run:

```bash
git status --short
```

Expected: no output (everything committed).

- [ ] **Step 3: Verify the three license-related pieces are consistent**

Run:

```bash
grep -l "AGPL" LICENSE CITATION.cff README.md
```

Expected: all three files listed (LICENSE contains the full text; CITATION.cff has `license: AGPL-3.0-only`; README links to `LICENSE` with the AGPL-3.0 badge).

- [ ] **Step 4: Hand off the runbook for manual steps**

Tell the user: the in-repo work is done; the remaining steps are the GitHub Settings clicks in `docs/github-landing-assets.md` (About, topics, social preview). These cannot be automated from the repo.

---

## Notes for the implementer

- **No code, no tests to run.** Verification is file presence, text fidelity (license, BibTeX), CFF schema validity, and image-path resolution. Do not invent a test harness.
- **Do not edit `LICENSE-website.md`, `public/`, or `press/`** — out of scope per the spec's section 8.
- **The arXiv id `2606.19625` and the title are fixed** across the site, the BibTeX, and the press copy. If any task's content shows a different id or title, that is an error; reconcile to `public/index.html`.
- **If the `curl` to gnu.org fails** (network), fall back to the choosealicense.com raw mirror in Task 1 Step 2's note and strip the leading `---\n...yaml...\n---` front matter so the file begins with `GNU AFFERO GENERAL PUBLIC LICENSE`.
