import { type Html, html } from "@butter/core";
import type { Command, Glyph } from "./types.ts";
import type { VersionKey } from "./versions.ts";

export const MASTHEAD: {
  readonly title: string;
  readonly glyphs: readonly Glyph[];
  readonly lede: Html;
  readonly proof: string;
  readonly commands: readonly Command[];
  readonly versions: readonly VersionKey[];
} = {
  title: "The agentic dev stack that's smooth as butter",

  glyphs: [
    { letter: "B", word: "un" },
    { letter: "U", word: "nified workspace" },
    { letter: "T", word: "ypeScript" },
    { letter: "T", word: "anStack" },
    { letter: "E", word: "dge-deployed" },
    { letter: "R", word: "eact" },
  ],

  lede: html(
    "A house stack for TypeScript monorepos. Bun end to end, TypeScript five flags past " +
      "<code>strict</code>, Biome for lint and format, one required check in CI.",
  ),

  proof: "In production across four monorepos.",

  commands: [
    { cmd: "git clone https://github.com/alxjrvs/butter" },
    { cmd: "bun install" },
    { cmd: "bun run check", note: "lint + typecheck + knip + test + build" },
  ],

  versions: ["bun", "typescript", "biome"],
};
