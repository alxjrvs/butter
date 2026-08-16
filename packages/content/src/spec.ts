import type { SpecRow } from "./types.ts";
import { VERSIONS } from "./versions.ts";

/**
 * The stack, as a list.
 *
 * One row per layer: what it is, what it's for, and the version where there is
 * one. No proportions, no trends, no dates, so nothing here expires on its own.
 */
export const SPEC: readonly SpecRow[] = [
  {
    layer: "Bun",
    detail: "runtime, package manager, workspaces, tests, scripts",
    version: VERSIONS.bun,
  },
  {
    layer: "TypeScript",
    detail: "one base config, five flags past strict",
    version: VERSIONS.typescript,
  },
  {
    layer: "Biome",
    detail: "lint and format, one tool",
    version: VERSIONS.biome,
  },
  {
    layer: "Lefthook",
    detail: "staged pre-commit, whole-repo pre-push",
    version: VERSIONS.lefthook,
  },
  {
    layer: "Knip",
    detail: "dead exports and unused dependencies",
    version: VERSIONS.knip,
  },
  { layer: "GitHub Actions", detail: "fan out, then one required check" },
  { layer: "React", detail: "with TanStack Router and Query", version: "19" },
  { layer: "Component library", detail: "tokens, style objects, a story gate" },
  { layer: "Netlify · Render · Convex", detail: "web, workers, backend" },
];
