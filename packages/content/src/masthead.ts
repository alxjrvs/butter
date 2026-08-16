import { type Html, html } from "@butter/core";
import type { Command } from "./types.ts";
import type { VersionKey } from "./versions.ts";

export const MASTHEAD: {
  readonly name: string;
  readonly title: string;
  readonly lede: Html;
  readonly proof: string;
  readonly commands: readonly Command[];
  readonly versions: readonly VersionKey[];
} = {
  name: "butter",

  title: "The agentic dev stack that's smooth as butter",

  lede: html(
    "Bun end to end. TypeScript five flags past <code>strict</code>. Biome, Knip and Lefthook " +
      "doing one job each, and exactly one check that has to go green. It's the shape every " +
      "new repo starts in — and the shape this one is in, so nothing below is a sample.",
  ),

  proof: "In production across four monorepos.",

  commands: [
    { cmd: "git clone https://github.com/alxjrvs/butter" },
    { cmd: "bun install" },
    { cmd: "bun run check", note: "the whole gate, in one command" },
  ],

  versions: ["bun", "typescript", "biome"],
};
