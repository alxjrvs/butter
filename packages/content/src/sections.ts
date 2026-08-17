import type { SectionRef } from "./types.ts";

/**
 * The page's sections, in reading order, and the source of the contents line.
 *
 * The headings are butter all the way down; every one of them carries a plain
 * deck line underneath saying what it actually is, which is what keeps the
 * conceit from costing the reader anything.
 */
export const SECTIONS: readonly SectionRef[] = [
  { id: "cream", label: "Cream" },
  { id: "churn", label: "The churn" },
  { id: "spread", label: "Spread it" },
  { id: "handle", label: "One handle" },
  { id: "lamination", label: "Lamination" },
  { id: "moulds", label: "Moulds" },
  { id: "buttermilk", label: "Buttermilk" },
  { id: "recipe", label: "The recipe" },
  { id: "keeping", label: "Keeping" },
];
