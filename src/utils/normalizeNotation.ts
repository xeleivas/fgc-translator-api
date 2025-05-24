import { NOTATION_ALIASES } from "./notationAliases";

const sortedAliases = Object.keys(NOTATION_ALIASES).sort(
  (a, b) => b.length - a.length
);

/**
 * Takes a single step of notation and replaces any aliases with the normalized numpad notation for consistency
 *
 * @param step - The step of notation to normalize
 * @returns The normalized step
 */
export const normalizeStep = (step: string): string => {
  const lower = step.toLowerCase();

  for (const alias of sortedAliases) {
    if (lower.startsWith(alias)) {
      const replaced = NOTATION_ALIASES[alias];
      return replaced + step.slice(alias.length); // keep the suffix (e.g., HK)
    }
  }

  return step; // no alias matched
};

export const normalizeStepList = (steps: string[]): string[] => {
  return steps.map(normalizeStep);
};
