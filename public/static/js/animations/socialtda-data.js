/* Capability Provenance animation data module.

   Structural and method facts only. Quantitative results are intentionally
   excluded from the site (maintainer decision, 2026-07-29): they change on
   every rerun as more models land, and the site's job is contribution +
   methodology storytelling. If a number describes a RESULT (an effect size,
   a correlation, a p-value, a bin score), it does not belong here or in the
   HTML — figure modules that need magnitudes use clearly-labeled
   illustrative values instead. */

export const SOURCE = {
  status: "structural/method facts only; quantitative results intentionally excluded from the site",
  setting: "open-data model family; OLMo3 / Dolma3 is the primary deep-dive"
};

export const PROJECT = {
  title: "Capability Provenance in Language Models: A Case Study in Social Reasoning",
  shortName: "Capability Provenance",
  publicUrl: "eilab.gatech.edu/social-data-attribution"
};

export const TAXONOMY = { topics: 24, formats: 24, bins: 576 };

/* Benchmark order matches the paper's 2x2 contrastive design. */
export const BENCHMARKS = [
  { key: "socialiqa", name: "SocialIQA", short: "SocialIQA", domain: "social", capability: "reasoning" },
  { key: "mmlu_social_sciences", name: "MMLU Social Sciences", short: "MMLU Soc. Sci.", domain: "social", capability: "knowledge" },
  { key: "arc_challenge", name: "ARC-Challenge", short: "ARC-Challenge", domain: "STEM", capability: "reasoning" },
  { key: "mmlu_stem", name: "MMLU STEM", short: "MMLU STEM", domain: "STEM", capability: "knowledge" }
];

export const INFLUENCE_METRIC = {
  name: "signed influence, within-benchmark z-score",
  positive: "supportive: bin gradients align with benchmark query gradients",
  negative: "suppressive / contrasting: bin gradients oppose benchmark query gradients",
  nearZero: "weak or neutral influence under this metric"
};

/* Cross-model roster. The Models section is a qualitative roster by design
   (maintainer decision, 2026-07-29): rows are models, columns are identity
   facts (corpus, scale, status). No result numbers live here — when final
   cross-model metrics land, extend this shape rather than inlining values
   into the HTML. Status values: "primary" (the published deep-dive),
   "in-progress", "planned". */
export const MODELS = [
  { key: "olmo3_base_7b", name: "OLMo3 Base", corpus: "Dolma3", scale: "7B", status: "primary" },
  { key: "olmo3_instruct_7b", name: "OLMo3 Instruct", corpus: "Dolma3 + post-training", scale: "7B", status: "in-progress" },
  { key: "marin_8b", name: "Marin", corpus: "Open mixture", scale: "8B", status: "in-progress" },
  { key: "dclm_7b", name: "DCLM", corpus: "DCLM-Baseline", scale: "7B", status: "in-progress" },
  { key: "comma_7b", name: "Comma", corpus: "Common Pile", scale: "7B", status: "in-progress" },
  { key: "olmo3_base_32b", name: "OLMo3 Base", corpus: "Dolma3", scale: "32B", status: "planned" },
  { key: "marin_32b", name: "Marin", corpus: "Open mixture", scale: "32B", status: "planned" }
];
