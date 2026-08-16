import { type Html, html } from "@butter/core";
import type { Ingredient, NameKeyEntry } from "./types.ts";
import { VERSIONS } from "./versions.ts";

export const CREAM: {
  readonly heading: string;
  readonly deck: string;
  /** one sentence, before the label. Announces the acronym; does not spell it. */
  readonly lead: Html;
  /** the commentary, after the label has done the explaining */
  readonly body: Html;
} = {
  heading: "Cream",
  deck: "What the name stands for, and what goes in",

  lead: html(`
      <p>
        It is called butter because it goes on the Bun. It is also an acronym — and rather than
        spell it out twice, here is the tin.
      </p>`),

  body: html(`
      <p>
        The six bold lines are the name. Everything indented under them is what comes along for
        the ride: the tools that make the six work together rather than merely coexist.
      </p>
      <p>
        Nothing on that label is exotic, and that is deliberate. Every piece is something you
        would probably reach for anyway. The value is not in any single choice; it is in having
        made all of them once, together, so a new repository starts out already decided. No week
        of picking a formatter. No third opinion about path aliases.
      </p>
      <p>
        One tool per job, and never a second tool doing the same job differently. That rule on
        its own removes most of the configuration a monorepo usually accumulates, because most
        of that configuration exists to make two overlapping tools agree.
      </p>`),
};

/**
 * B·U·T·T·E·R — the six letters, and the choice each one stands for.
 *
 * These render as the bold lines of the label, which is what makes the acronym
 * an explanation rather than a mnemonic. A reader gets the name and the stack
 * in the same glance.
 */
export const NAME_KEY: readonly NameKeyEntry[] = [
  {
    letter: "B",
    word: "Bun",
    detail: "runtime, package manager, workspaces, tests, scripts",
    version: VERSIONS.bun,
  },
  {
    letter: "U",
    word: "Unified workspace",
    detail: "apps/* for what you deploy, packages/* for what they share",
  },
  {
    letter: "T",
    word: "TypeScript",
    detail: "one base config every workspace extends, five flags past strict",
    version: VERSIONS.typescript,
  },
  {
    letter: "T",
    word: "TanStack",
    detail: "Router and Query as the app shell",
  },
  {
    letter: "E",
    word: "Edge-deployed",
    detail: "Netlify for the web, Render for workers, Convex for the backend",
  },
  {
    letter: "R",
    word: "React",
    detail: "19, with visual elements in exactly one package",
  },
];

/** Everything else in the tin. The label's indented sub-entries. */
export const ALSO_INSIDE: readonly Ingredient[] = [
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
    detail: "dead exports, unused dependencies",
    version: VERSIONS.knip,
  },
  {
    layer: "One aggregate CI gate",
    detail: "fan out, then one required check",
  },
  { layer: "Tokens + component library", detail: "with a story gate" },
];

/** The free-from line along the bottom, the way a label carries allergens. */
export const FREE_FROM: readonly string[] = [
  "Prettier",
  "Turbo",
  "Nx",
  "CSS Modules",
];
