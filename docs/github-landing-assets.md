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
