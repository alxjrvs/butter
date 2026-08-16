import { type Html, html } from "@butter/core";
import type { Ingredient } from "./types.ts";
import { VERSIONS } from "./versions.ts";

export const CREAM: {
  readonly heading: string;
  readonly deck: string;
  readonly intro: Html;
  readonly outro: Html;
} = {
  heading: "Cream",
  deck: "What goes in",

  intro: html(`
      <p>
        Good butter is mostly a question of good cream. Nothing on this list is exotic, and
        that is deliberate — every piece is something you would probably reach for anyway.
      </p>
      <p>
        The value is not in any single choice. It is in having made all of them once, together,
        so that a new repository starts out already decided. No week of picking a formatter.
        No third opinion about path aliases.
      </p>`),

  outro: html(`
      <p>
        One tool per job, and never a second tool doing the same job differently. That rule on
        its own removes most of the configuration a monorepo usually accumulates, because most
        of that configuration exists to make two overlapping tools agree.
      </p>`),
};

/**
 * What goes in the churn.
 *
 * One row per layer: what it is, what it's for, and the version where there is
 * one. No proportions, no trends, no dates, so nothing here expires on its own.
 * An em dash means the layer has no pinned version, not that it is missing.
 */
export const INGREDIENTS: readonly Ingredient[] = [
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
  // No version: this repo installs no React, so nothing could check the number
  // and "every version here is looked up" would stop being true.
  { layer: "React", detail: "19, with TanStack Router and Query" },
  { layer: "Component library", detail: "tokens, style objects, a story gate" },
  { layer: "Netlify · Render · Convex", detail: "web, workers, backend" },
];
