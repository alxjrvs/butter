import { type Html, html } from "@butter/core";
import type { Snippet } from "./types.ts";

/**
 * Every snippet is a literal excerpt of a file in this repository, quoted so a
 * reader can diff the page against the tree it describes.
 */
export const FILES: {
  readonly heading: string;
  readonly intro: Html;
  readonly snippets: readonly Snippet[];
} = {
  heading: "Five files and a workflow",

  intro: html(`
      <p>
        These are the files, not a description of them. Each one is short on purpose: a config
        that carries only its divergences from a tool's defaults is a config that gets read.
      </p>`),

  snippets: [
    {
      caption: "bunfig.toml",
      source: `[install]
# Strict node_modules: a workspace can only import what it declares.
linker = "isolated"
# Lockfile churn is review noise. Pin exactly and let Dependabot do the bumping.
exact = true`,
    },
    {
      caption: "tsconfig.base.json — the flags past strict",
      source: `"strict": true,
"noUncheckedIndexedAccess": true,
"noUnusedLocals": true,
"noFallthroughCasesInSwitch": true,
"exactOptionalPropertyTypes": true,
"noImplicitOverride": true,

"verbatimModuleSyntax": true,
"types": ["bun"]`,
    },
    {
      caption: "biome.json — the whole file",
      source: `{
  "$schema": "https://biomejs.dev/schemas/2.5.8/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "formatter": { "indentStyle": "space" }
}`,
    },
    {
      caption: "lefthook.yml — two tiers",
      source: `pre-commit:          # cheap, staged files only, under a second
  parallel: true
  commands:
    biome:
      glob: "*.{ts,tsx,js,jsx,json,jsonc}"
      run: bunx biome check --write --no-errors-on-unmatched {staged_files}
      stage_fixed: true

pre-push:            # expensive, whole repo, once per push
  parallel: true
  commands:
    typecheck: { run: bun run typecheck }
    build: { run: bun run build }`,
    },
    {
      caption: "package.json — the script surface",
      source: `"scripts": {
  "build": "bun run --filter '*' build",
  "typecheck": "bun run --filter '*' typecheck",
  "lint": "biome check",
  "knip": "knip",
  "test": "bun test",
  "check": "bun run lint && bun run typecheck && bun run knip && bun run test && bun run build"
}`,
    },
  ],
};
