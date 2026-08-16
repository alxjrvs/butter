import type { SectionRef } from "./types.ts";

/** The page's sections, in reading order. Also the contents line's source. */
export const SECTIONS: readonly SectionRef[] = [
  { id: "stack", label: "The stack" },
  { id: "thesis", label: "Why this shape" },
  { id: "layers", label: "The layers" },
  { id: "gate", label: "The gate" },
  { id: "files", label: "The files" },
  { id: "exclusions", label: "Not in the stack" },
  { id: "machine", label: "The machine" },
  { id: "start", label: "Start here" },
];
