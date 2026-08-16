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
    "A house stack for TypeScript monorepos. Bun end to end, TypeScript five flags past " +
      "<code>strict</code>, Biome for lint and format, one required check in CI. " +
      "This repository runs it, so the config below is the reference rather than a sample.",
  ),

  proof: "In production across four monorepos.",

  commands: [
    { cmd: "git clone https://github.com/alxjrvs/butter" },
    { cmd: "bun install" },
    { cmd: "bun run check", note: "lint + typecheck + knip + test + build" },
  ],

  versions: ["bun", "typescript", "biome"],
};
