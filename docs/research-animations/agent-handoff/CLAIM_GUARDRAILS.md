# Claim guardrails for animation work

The animation agent must treat this as scientific communication, not marketing.

## Approved headline claims

These are safe to express visually:

1. **Capability provenance maps benchmark behavior to corpus regions.**
2. **Document-level attribution is noisy; bin-level aggregation gives stable, inspectable corpus units.**
3. **The unit of analysis is a WebOrganizer topic×format bin.**
4. **The core design crosses domain and capability type: social vs. STEM and reasoning vs. knowledge.**
5. **SocialIQA is the provenance-structure outlier in the 576-bin influence profiles.**
6. **Literature × Customer Support is an extreme SocialIQA-positive bin and flips negative for the two MMLU benchmarks.**
7. **The social–STEM split is sharper for reasoning than for knowledge.**
8. **SocialIQA high-influence bins show a bimodal lexical profile: interactional/dialogue-rich text and documentation-like text.**
9. **Influence-targeted unlearning validates SocialIQA most clearly.**
10. **Other benchmarks show weaker, null, or reversed unlearning patterns; this bounds the claim.**
11. **The release/analysis should emphasize aggregate bin-level statistics, not raw document exposure.**

## Claims to avoid

Do not say or imply:

- “We proved which exact documents caused social reasoning.”
- “Social reasoning comes only from customer support data.”
- “Customer support text is always good for social reasoning.”
- “Negative influence means harmful/bad data” without explaining suppressive/contrasting influence under the attribution metric.
- “Unlearning validates all benchmarks.”
- “This result generalizes to all models.”
- “This is a full mechanistic explanation of social reasoning.”
- “The analysis characterizes every document in Dolma3 equally.” The empirical analysis is on the stratified working set.
- “The animations show raw examples from the training corpus.”

## Safe caveat language

Use language like:

- “in the OLMo3-7B / Dolma3 setting”
- “within the stratified working set”
- “aggregate corpus regions”
- “signed influence under the attribution metric”
- “partial causal validation”
- “load-bearing region, not exact mechanism”
- “strongest validation for SocialIQA; mixed results for comparison tasks”

## Ethics / responsible-release rule

Do not display raw training text or document identifiers. Use stylized document cards, paraphrased labels, aggregate cells, and matrix summaries only.

## Review-mode anonymity

For anonymous submission assets, do not show:

- author names;
- institutional logos;
- public project URL;
- arXiv ID;
- GitHub organization/user names;
- “we release all artifacts” if that compromises review anonymity or is not yet true in the review context.
