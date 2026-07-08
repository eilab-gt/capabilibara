/* SocialTDA animation palettes.
   Colors follow docs/research-animations/agent-handoff/DESIGN_SYSTEM.md and
   docs/research-animations/agent-handoff/data/palette.json, matching the
   tokens already used by the project site. */

export const BENCHMARK_COLORS = {
  "SocialIQA": "#762A83",
  "MMLU Social Sciences": "#8C6D1F",
  "ARC-Challenge": "#A14F00",
  "MMLU STEM": "#1B7837"
};

export const INFLUENCE_COLORS = {
  positive: "#2166AC",   // supportive signed influence
  positiveLight: "#67A9CF",
  negative: "#B35806",   // suppressive / contrasting signed influence
  neutral: "#F7F7F7",    // near-zero influence
  neutralStroke: "#C9C9C9"
};

export const UI_COLORS = {
  background: "#FFFFFF",
  ink: "#171717",
  slate: "#4B5563",
  faint: "#8A8F98",
  gridFill: "#EFE6F2",
  gridStroke: "#C9B8CF"
};

/* Display cap for the diverging influence scale. Color saturates at |z| = cap
   so one extreme bin does not wash out the palette; printed values stay exact. */
export const Z_COLOR_CAP = 2.5;

export function mix(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const ch = (i) => Math.round(a[i] + (b[i] - a[i]) * t);
  return "rgb(" + ch(0) + "," + ch(1) + "," + ch(2) + ")";
}

/* Diverging fill for a signed within-benchmark z-score:
   neutral -> blue for supportive (z > 0), neutral -> orange for suppressive. */
export function influenceColor(z, cap = Z_COLOR_CAP) {
  const t = Math.min(Math.abs(z) / cap, 1);
  return z >= 0
    ? mix(INFLUENCE_COLORS.neutral, INFLUENCE_COLORS.positive, t)
    : mix(INFLUENCE_COLORS.neutral, INFLUENCE_COLORS.negative, t);
}

/* Text color that stays readable on top of influenceColor(z). */
export function influenceInk(z, cap = Z_COLOR_CAP) {
  return Math.min(Math.abs(z) / cap, 1) > 0.55 ? "#FFFFFF" : "#222222";
}

/* Unlearning accuracy damage γ (accuracy points): red = damage, blue = gain. */
export function accuracyDamageColor(gamma, cap = 0.02) {
  const t = Math.min(Math.abs(gamma) / cap, 1);
  return gamma >= 0 ? mix("#FDF2F0", "#67000D", t) : mix("#EFF3FF", "#2166AC", t);
}

/* Accepts the full benchmark name ("MMLU Social Sciences"). */
export function benchmarkColor(name) {
  const c = BENCHMARK_COLORS[name];
  if (!c) throw new Error("Unknown benchmark: " + name);
  return c;
}

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
}
