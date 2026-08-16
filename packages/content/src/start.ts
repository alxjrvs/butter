import { type Html, html } from "@butter/core";
import type { Command } from "./types.ts";

export const START: {
  readonly heading: string;
  readonly tree: string;
  readonly body: Html;
  readonly commands: readonly Command[];
} = {
  heading: "Start here",

  tree: `package.json         private · workspaces · catalog · the script surface
bunfig.toml          linker = "isolated" · exact = true
tsconfig.base.json   strict + 5 · every workspace extends it
biome.json           only the divergences from Biome's defaults
lefthook.yml         staged pre-commit · whole-repo pre-push
knip.json            per-workspace entry and project globs
.github/workflows/
  ci.yml             fan out → one always() aggregate gate`,

  body: html(`
      <p>
        Adding this to a repository that already exists: <code>tsconfig.base.json</code> first,
        because it produces the longest list of things to fix and nothing else depends on it
        being clean. Then Biome, then the CI gate, then the hooks. Knip last — it needs the
        others quiet before its output is readable.
      </p>
      <p>
        The order is the opinionated part. Anyone can list seven files.
      </p>`),

  commands: [
    { cmd: "bun install", note: "installs the git hooks too, via prepare" },
    { cmd: "bun run check", note: "lint + typecheck + knip + test + build" },
  ],
};
