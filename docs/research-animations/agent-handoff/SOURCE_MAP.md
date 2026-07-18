# Source map

Use this file to keep the coding agent grounded in the paper and current repo.

## Latest PDF anchors

The latest submission PDF or explicitly supplied artifact should be treated as the scientific source of truth. This repo currently does not include a local PDF, so the values in `data/socialtda_claims.yaml` should be treated as transcribed starter data until a source artifact is added or a maintainer supplies updates.

| Topic | Where in PDF | Notes for animation |
|---|---|---|
| Abstract / core claim | p.1, abstract lines 1–19 | TDA maps corpus regions supporting social vs. STEM reasoning; aggregation over 576 bins; unlearning gives partial validation. |
| Contributions | p.2, lines 37–61 | Four independent contributions: bin-level aggregation, 2×2 design, lexical profiling, targeted unlearning. |
| Open ecosystem / unit of analysis | p.2, lines 65–78 | OLMo3/Dolma3, 5.68M working set, 24×24 bins, four benchmarks. |
| RQs | p.3, lines 84–91 | Description → comparison → validation story arc. |
| Attribution definition | p.5, lines 199–208 | Gradient alignment = positive influence; opposition = negative influence. |
| Aggregation | p.6, lines 222–231 | Aggregate brittle document-level scores to stable bin-level patterns; output is 576×4 matrix. |
| Unlearning definition | p.7, lines 271–285 | Selection strategy × data scope; γ = baseline − unlearned; global control. |
| RQ1 result | p.7–8, lines 294–318 | SocialIQA outlier; Customer Support, Literature, Social Life; signature bin; correlation structure. |
| Figure 2 visual | p.8 | Useful reference for signature-bin and marginal animations. |
| RQ2 result | p.8–9, lines 335–349 | Reasoning split sharper than knowledge split; correctness differential; lexical bimodality. |
| RQ3 result | p.9, lines 350–367 | SocialIQA unlearning validates most clearly; weaker/null/reversed comparison effects. |
| Ethics / no raw docs | p.10, lines 403–414 | Release aggregate bin-level statistics, not document-level scores or raw snippets. |
| Taxonomy | p.16–18, lines 656–667 and tables 2–3 | 24 topics and 24 formats; use for grid labels and axis order. |
| Corpus skew | p.18–25, lines 680–710 | Natural corpus distribution is highly skewed; motivates stratified sampling. |
| Correlation matrix | p.35, Figure 15 | Use to animate SocialIQA as structural outlier. |
| Correctness differential | p.38–40, lines 853–888 | Literature × Customer Support correctness sign flip. |
| Held-out tiers | p.41, lines 903–908 | Use only for optional held-out/claim-boundary animations. |
| Lexical bimodality | p.60–62, lines 1080–1105 | SocialIQA high-influence bins split into interactional and documentation-like text. |
| SocialIQA top-20 table | p.69, lines 1136–1142 | Clean 10/10 interactional vs expository split. |
| Unlearning Table 49 | p.83–84, lines 1221–1250 | Paired significance values for influence-targeted vs random unlearning. |
| Selectivity | p.88–93, lines 1305–1414 | Selectivity formula and mixed cross-method reading. |
| Limitations | p.95–97, lines 1483–1550 | Scope, approximate attribution, working-set limits, unlearning is not full mechanism, single-model scope. |

## Repo anchors

Current repo files worth inspecting:

| File | Why |
|---|---|
| `README.md` | Confirms repo currently hosts project website and artifacts may be pending. |
| `public/index.html` | Page structure; includes current teaser/figure areas. |
| `public/static/js/figure1.js` | Existing SVG + GSAP animation; use as architecture reference. |
| `public/static/css/socialtda.css` | Palette tokens and current animation styles. |
| `public/static/js/main.js` | Tabs, heatmap coloring, AOS/reduced-motion logic. |

## Important discrepancy policy

When the repo/website and latest PDF or supplied artifact disagree, prefer the source artifact for scientific values and caveats. When no source artifact is available, preserve the current transcribed values and make any uncertainty explicit in QA notes.
