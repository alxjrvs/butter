import { type Html, html } from "@butter/core";
import type { Command } from "./types.ts";

export const WRAPPER: {
  readonly name: string;
  readonly title: string;
  readonly lede: Html;
  readonly proof: string;
  readonly commands: readonly Command[];
} = {
  name: "butter",

  title: "The agentic dev stack that's smooth as butter",

  lede: html(
    "Bun end to end. TypeScript five flags past <code>strict</code>. Biome, Knip and Lefthook " +
      "doing one job each, and exactly one check that has to go green. It's the shape every " +
      "new repo starts in — and the shape this one is in, so nothing below is a sample.",
  ),

  // Deliberately unquantified. Counting the repos dated the claim and pointed
  // at things a reader cannot open; this says the same thing in the tense that
  // matters and stays true without maintenance.
  proof: "In production now.",

  commands: [
    { cmd: "git clone https://github.com/alxjrvs/butter" },
    { cmd: "bun install" },
    { cmd: "bun run check", note: "the whole gate, in one command" },
  ],
};
