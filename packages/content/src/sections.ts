import type { SectionRef } from "./types.ts";

/**
 * The eight tablespoons, in reading order.
 *
 * A stick of butter is scored into eight, and the rail down the left margin is
 * that scoring. The count is therefore load-bearing rather than decorative:
 * `RulerNav` throws at build time on any other length, so a ninth section means
 * merging two or dropping the device — a decision, not a drift.
 */
export const SECTIONS: readonly SectionRef[] = [
  { id: "stack", label: "Stack" },
  { id: "thesis", label: "Thesis" },
  { id: "layers", label: "Layers" },
  { id: "gate", label: "Gate" },
  { id: "files", label: "Files" },
  { id: "exclusions", label: "Exclusions" },
  { id: "machine", label: "Machine" },
  { id: "start", label: "Start" },
];
