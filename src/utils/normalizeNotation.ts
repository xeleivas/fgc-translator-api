import { NOTATION_ALIASES } from "./notationAliases";

const sortedAliases = Object.keys(NOTATION_ALIASES).sort(
  (a, b) => b.length - a.length
);

export function normalizeStep(step: string): string {
  const lower = step.toLowerCase();

  for (const alias of sortedAliases) {
    if (lower.startsWith(alias)) {
      const replaced = NOTATION_ALIASES[alias];
      return replaced + step.slice(alias.length); // keep the suffix (e.g., HK)
    }
  }

  return step; // no alias matched
}

export function normalizeStepList(steps: string[]): string[] {
  return steps.map(normalizeStep);
}
