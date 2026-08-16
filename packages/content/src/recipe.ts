import { type Html, html } from "@butter/core";
import type { Snippet } from "./types.ts";

/**
 * Every snippet is a contiguous run of lines from the file it names, quoted so
 * a reader can diff the page against the tree it describes.
 *
 * `recipe.test.ts` asserts exactly that, line for line, against the real files.
 * Before the test existed the lefthook snippet had quietly fallen a commit
 * behind — it was missing the `test` command while the package.json snippet
 * beside it already listed one, so the page contradicted itself in two places
 * a reader could see at once.
 */
export const RECIPE: {
  readonly heading: string;
  readonly deck: string;
  readonly intro: Html;
  readonly snippets: readonly Snippet[];
} = {
  heading: "The recipe",
  deck: "Every config file, in full",

  intro: html(`
      <p>
        No abbreviating and no "and so on" — these are lifted straight out of the repository,
        and a test asserts that they still match the files they came from. If one of these
        drifts, CI goes red before you ever read a stale page.
      </p>
      <p>
        Each one is short on purpose. A config that carries only its divergences from a tool's
        defaults is a config somebody actually reads, and every line in it means something.
      </p>`),

  snippets: [
    {
      caption: "bunfig.toml",
      file: "bunfig.toml",
      source: `[install]
# Strict node_modules: a workspace can only import what it declares. The house
# default, and only inverted where a toolchain demands it (an Expo tree needs
# \`hoisted\` to stay single-instance).
linker = "isolated"
# Lockfile churn is review noise. Pin exactly and let Dependabot do the bumping.
exact = true`,
    },
    {
      caption: "tsconfig.base.json — the flags past strict",
      file: "tsconfig.base.json",
      source: `"strict": true,
"noUncheckedIndexedAccess": true,
"noUnusedLocals": true,
"noFallthroughCasesInSwitch": true,
"exactOptionalPropertyTypes": true,
"noImplicitOverride": true,`,
    },
    {
      caption: "biome.json — the whole file",
      file: "biome.json",
      source: `{
  "$schema": "https://biomejs.dev/schemas/2.5.8/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "formatter": {
    "indentStyle": "space"
  }
}`,
    },
    {
      caption: "lefthook.yml — the expensive tier",
      file: "lefthook.yml",
      source: `pre-push:
  parallel: true
  commands:
    typecheck:
      run: bun run typecheck
    test:
      run: bun test
    build:
      run: bun run build`,
    },
    {
      caption: "package.json — the script surface",
      file: "package.json",
      source: `"scripts": {
    "build": "bun run --filter '*' build",
    "typecheck": "bun run --filter '*' typecheck",
    "lint": "biome check",
    "format": "biome check --write",
    "knip": "knip",
    "test": "bun test",
    "workbench": "bun run --filter '@butter/component-lib' workbench",
    "check": "bun run lint && bun run typecheck && bun run knip && bun run test && bun run build",`,
    },
  ],
};
