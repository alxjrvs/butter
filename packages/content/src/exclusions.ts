import { html } from "@butter/core";
import type { Exclusion } from "./types.ts";

/**
 * Read before the inclusions by half the audience — it is the fastest way to
 * find out whether a stack shares your priors.
 *
 * Every reason carries a mechanism. "We don't like Prettier" is a preference;
 * "two formatters disagree about the same file" is a reason. Nothing here is
 * described as departing or on the way out: it is in the stack or it isn't.
 */
export const EXCLUSIONS: readonly Exclusion[] = [
  {
    term: html("Prettier"),
    reason: html(
      "Biome formats. Two formatters disagree about the same file, and the disagreement " +
        "lands in every diff that touches it.",
    ),
  },
  {
    term: html("Turbo, Nx"),
    reason: html(
      "<code>bun run --filter '*' &lt;script&gt;</code> covers cross-package work. Neither " +
        "earns a config file.",
    ),
  },
  {
    term: html("Tailwind"),
    reason: html(
      "Tokens plus style objects, with a package-level stylesheet for interaction and media " +
        "state. Components render through react-native-web where they need to, and class " +
        "strings don't survive that.",
    ),
  },
  {
    term: html("CSS Modules"),
    reason: html(
      "Plain side-effect <code>.css</code> imports. Scoping comes from the component library " +
        "owning every visual element, so there is nothing left to collide with.",
    ),
  },
  {
    term: html("Path aliases"),
    reason: html(
      "Relative imports. <code>@/</code> is configured in tsconfig, the bundler and the test " +
        "runner, and it hides the dependency graph from Knip.",
    ),
  },
  {
    term: html(
      "<code>any</code> · <code>as unknown as T</code> · <code>let</code>",
    ),
    reason: html(
      "Banned by GritQL plugins in Biome, so the ban is a check rather than a review comment.",
    ),
  },
  {
    term: html("A bundler, here"),
    reason: html(
      "This site is one static page written by a Bun script. A bundler would be the largest " +
        "dependency in the repository and the page would not change.",
    ),
  },
];
