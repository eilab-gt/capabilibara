# GitHub landing page design

Status: approved 2026-07-14 (brainstorming). Next step: the writing-plans skill
produces an executable implementation plan from this doc.

A blueprint for the "GitHub represents us" surface of
`eilab-gt/social-data-attribution` ahead of the COLM 2026 release. Scope is the
repo's own presentation: the README, citation, license, and the GitHub-side
metadata (About, topics, social preview). The website (`public/`) and press
copy (`press/`) are out of scope and unchanged.

## Resolved decisions (from brainstorming)

- **Scope:** staged. Design for the code-bearing repo; ship an honest v1 now
  that marks not-yet-public code as pending. The README does not pretend code
  exists before it does.
- **Aesthetic direction:** GitHub-native, text-first, badge-driven. No custom
  CSS, no banner image; the title is selectable text. Identity comes from
  badges, the favicon, and Figure 1.
- **README shape:** software-forward. The paper and the project site own the
  results; this repository owns the software. Results appear only as one-line
  pointers, not as duplicated findings.
- **Port strategy (Copybara):** phased. Print the real package structure now so
  the architecture is legible; keep install / quick-start commands as clearly
  marked pending blocks until the port confirms them. Structure rarely moves
  under Copybara; exact commands might.
- **Template source:** model the public README on the private repo's
  review-safe docs (`README_REVIEW.md`, `docs/ANONYMOUS_SOFTWARE_GUIDE.md`,
  `docs/ANONYMOUS_SOFTWARE_WORKFLOWS.md`), not its operator-flavored main
  `README.md`. Operator paths, private HF buckets, and PACE internals stay out.
- **Bundle for this pass:** README, `CITATION.cff`, About/topics copy,
  top-level code `LICENSE`, social-preview asset prep. `CONTRIBUTING.md` and
  issue/PR templates are deferred (no active PR solicitation).
- **Code license:** AGPL-3.0 (most restrictive open-source license; read, run,
  and cite freely, but no closed commercial or hosted reuse without
  open-sourcing changes). Website content keeps CC BY-SA 4.0
  (`LICENSE-website.md`). COLM does not mandate a license; AGPL is venue-safe.
- **Citation:** `CITATION.cff` cites the paper (arXiv) as the preferred
  citation; the repo is listed as related software. The GitHub "Cite this
  repository" button then surfaces the paper BibTeX.
- **Badge set:** standard research row — paper (arXiv), venue (COLM 2026, in
  project purple), website, code status (pending release), license (AGPL-3.0),
  python (3.12), last commit (dynamic), stars (dynamic). No hardcoded result
  numbers in badges, so no drift against the paper.

## 1. Package and file artifacts

New and changed files the plan produces:

| Path | Status | Purpose |
|---|---|---|
| `README.md` | rewrite | Software-forward landing page; replaces the 922-byte skeleton |
| `LICENSE` | new | AGPL-3.0 full text for code |
| `LICENSE-website.md` | keep | CC BY-SA 4.0 for site/content (already correct) |
| `CITATION.cff` | new | Preferred citation = paper (arXiv); repo as related software |
| `docs/github-landing-assets.md` | new | Click-path runbook for repo About, topics, social preview (Settings; cannot be set from code) |
| `public/`, `press/` | unchanged | Out of scope |

Two license files coexist: a new top-level `LICENSE` (AGPL-3.0, code) and the
existing `LICENSE-website.md` (CC BY-SA 4.0, content). The README's License
section links to both and states which covers what.

## 2. README information architecture

Software-forward, GitHub-native. Section order with one-line intent:

1. **Hero** — centered title, subtitle, favicon glyph, badge row, Figure 1
   (the pipeline diagram from `public/static/images/figures/`), one-line tool
   description. No results claim.
2. **Overview** — 2-3 sentences: what the pipeline does, that it is the code
   for the COLM 2026 paper, links to paper and project site. Software-framed.
3. **Status** — compact callout: "Website live now; audited code and artifacts
   arriving with the camera-ready release." Sets expectations once.
4. **Results at a glance** — one line, the four metrics as a pointer to the
   paper and site. No findings duplication.
5. **Repository structure** — the real `src/data_attribution/` + `src/dolma/`
   + `src/unlearning/` tree, mapped to the five pipeline stages. Real structure
   now (phased decision), with a note that final layout is confirmed at port.
6. **Quick start** — pending block: install (`uv sync`), vendored-dep bootstrap
   for bergson/olmes, one-command reproduce. Marked clearly pending.
7. **Method** — short paragraph plus the pipeline-stage mapping (corpus to
   probes to attribution to aggregation to unlearning). Figure 1 carries the
   visual; depth deferred to the paper.
8. **Data & models** — OLMo3-7B, Dolma3, WebOrganizer 24x24 taxonomy, the
   benchmark set named accurately (SocialIQA, MMLU Soc. Sci., ARC-Challenge,
   MMLU STEM, plus GSM8K, ARC-Easy, BBH social tasks), ~37K H200-hours
   compute. Public HF buckets only; no private or cluster paths.
9. **Roadmap** — what ships when: code port, sampling manifests, 576x4
   influence matrix, unlearning checkpoints, HF Hub release. Honest and dated.
10. **Limitations** — scoped-claims bullets (one ecosystem, aggregate-only
    release, no document-level scores, attribution is analytic not causal
    proof). Carried from the site so the repo stands on its own.
11. **Citation** — BibTeX block plus a pointer to the "Cite this repository"
    button (CITATION.cff).
12. **License** — AGPL-3.0 (code) / CC BY-SA 4.0 (site content), links to both.
13. **Acknowledgments** — funders and institutional credit from the paper.

Judgment calls: no standalone Key Findings section (results live in the
paper/site); Limitations stays as a full section rather than a pointer
(omitting scope claims reads as overclaiming); Method stays short because
Figure 1 is a pipeline diagram, on-theme for a software-forward README.

## 3. Aesthetic treatment (native, with identity)

GitHub-native means no custom CSS. Identity comes through channels GitHub
supports:

- **Centered hero** via `<div align="center">` for title, subtitle, badges, and
  Figure 1. Reads as designed without styling.
- **Figure 1 as the hero image**, served from the repo's own
  `public/static/images/figures/fig-overview-revised.webp` (WebP for size; PNG
  fallback not needed in a README `<img>`). It is a pipeline diagram, so it
  earns its place in a software-forward README.
- **Metrics as a compact inline row**, not a duplicated findings section. A
  single centered line of plain text: 576 bins, 5.68M docs, 4 benchmarks,
  +1.60 pp SocialIQA damage, each labeled and pointing to the paper/site. This
  is body copy, one value per fact, and the no-drift rule in section 4 applies
  to badges only; the inline row is acceptable because it states obvious
  headline scale, not per-finding numbers that move under revision.
- **Favicon glyph** (`public/static/images/favicon.svg`) as a small `<img>`
  next to the title. Purple, on-brand, 444 bytes, zero maintenance.
- **Section headers stay clean** — no decorative emojis. Exceptions carry
  meaning only: a pending marker on Quick start and Repository structure, a
  lock glyph on License, a paper glyph on the arXiv link badge.

## 4. Badge set

Standard research row, all via shields.io so they render live:

| Badge | Style | Source |
|---|---|---|
| Paper | `arXiv 2606.19625` | static |
| Venue | `COLM 2026` in project purple `#762a83` | static |
| Website | project page link | static |
| Code status | `pending release` in muted gold | static |
| License | `AGPL-3.0` | static |
| Python | `3.12` | static |
| Last commit | dynamic | shields.io GitHub commit endpoint |
| Stars | dynamic | shields.io GitHub stars endpoint |

No hardcoded result numbers in badges, so the badge row cannot drift against
the paper. The venue badge is the one brand-color touch.

## 5. CITATION.cff

Preferred citation is the paper. The repo is listed as related software so the
"Cite this repository" button surfaces the paper BibTeX.

```cff
cff-version: 1.2.0
message: "If you use this software, please cite the paper below."
title: "Capability Provenance in Language Models: A Case Study in Social Reasoning"
type: software
# Repository as a related resource, not the primary citation
repository-code: "https://github.com/eilab-gt/social-data-attribution"
url: "https://eilab.gatech.edu/social-data-attribution/"
authors:
  - family-names: Matlin
    given-names: Glenn
  # ... full author list in paper order (Matlin, Chakraborty, Eom, Okamoto,
  # Castilla, Jaburi, Deng, Min, Quirke, Biderman, Riedl)
keywords:
  - training-data-attribution
  - interpretability
  - language-models
  - provenance
license: AGPL-3.0
preferred-citation:
  type: proceedings
  title: "Capability Provenance in Language Models: A Case Study in Social Reasoning"
  authors:
    # ... same author list
  year: 2026
  conference:
    name: "Conference on Language Modeling (COLM 2026)"
  url: "https://arxiv.org/abs/2606.19625"
  doi: "10.48550/arXiv.2606.19625"
```

Author names in `CITATION.cff` follow paper order. The final author list and
any DOI are confirmed against `manuscript/authors.tex` in the paper repo at
implementation time; the arXiv id `2606.19625` and title are already fixed.

## 6. License files

- **`LICENSE` (new, code):** the full AGPL-3.0 text from the SPDX/FSP
  canonical source. Copyright line: "Copyright (c) 2026 Georgia Institute of
  Technology and the Capability Provenance authors." A standard SPDX
  identifier line `SPDX-License-Identifier: AGPL-3.0-only` is not added to the
  license file itself (it goes in source headers, if at all, at port time).
- **`LICENSE-website.md` (existing, content):** unchanged. The README License
  section links to it and states it covers `public/` and `press/`.

## 7. GitHub-side metadata (runbook, not code)

These cannot be set from the repository contents; they are GitHub Settings
clicks. `docs/github-landing-assets.md` captures the exact steps:

- **About description (sidebar):** one-line copy, e.g. "Training-data
  attribution as a discovery method for capability provenance in language
  models. COLM 2026."
- **Topics:** `training-data-attribution`, `interpretability`, `language-models`,
  `provenance`, `mechanistic-interpretability`, `olmo`, `machine-unlearning`,
  `research`. (Confirmed against the site's `meta keywords` and the paper
  framing.)
- **Website field:** the project site URL
  `https://eilab.gatech.edu/social-data-attribution/`.
- **Social preview:** reuse `public/static/images/og-card.png` (1200x630,
  already sized for cards). Uploaded via Settings > Social preview.

## 8. What this design does NOT do

- Does not port any code from the private repo. Code lands via Copybara after
  this work; the README stages for it with pending blocks.
- Does not duplicate results from the paper or site. Results appear only as
  one-line pointers.
- Does not fabricate install commands or a repo tree that does not yet exist.
  Pending blocks are honest.
- Does not add `CONTRIBUTING.md` or issue/PR templates this pass.
- Does not change the website, the press copy, or the deployment workflow.

## 9. Implementation phasing (guidance for writing-plans)

A suggested order, each phase independently verifiable:

1. **Licenses:** add top-level `LICENSE` (AGPL-3.0); confirm
   `LICENSE-website.md` covers content.
2. **Citation:** add `CITATION.cff` with paper as preferred citation.
3. **README v1:** hero, overview, status, results pointer, repository
   structure (real), method, data and models, limitations, citation, license,
   acknowledgments. Quick start is a pending block.
4. **Badges:** wire the standard row via shields.io.
5. **GitHub metadata runbook:** write `docs/github-landing-assets.md` with the
   About/topics/website/social-preview click-path; hand it off for the manual
   Settings steps.

Phasing is a suggestion for the implementation plan, not a hard contract.
