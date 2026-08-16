import { MASTHEAD, type VersionKey } from "@butter/content";
import { escapeHtml, type Html, html, joinHtml } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { Band } from "../marks/Band.ts";
import { Glyph } from "../marks/Glyph.ts";
import { Version } from "../marks/Version.ts";

const LABELS: Record<VersionKey, string> = {
  bun: "Bun",
  typescript: "TypeScript",
  biome: "Biome",
  knip: "Knip",
  lefthook: "Lefthook",
};

/**
 * The wrapper: the face of the stick, printed in one ink.
 *
 * Three commands, all of which run against the repository as it stands. The
 * third demonstrates the thesis in one line, which is cheaper than a paragraph
 * claiming it.
 */
export function Masthead(): Html {
  const glyphs = joinHtml(MASTHEAD.glyphs.map(Glyph), "");

  const versions = MASTHEAD.versions
    .map((key) => `<span>${escapeHtml(LABELS[key])} ${Version(key)}</span>`)
    .join("");

  return html(`  <header class="wrapper">
    ${Band(["Sweet cream", "Grade AA", "Net wt 4 oz"])}
    <h1>${escapeHtml(MASTHEAD.title)}</h1>
    <div class="glyphs">${glyphs}</div>
    <div class="wrapper-lede">
      <p>${MASTHEAD.lede}</p>
      <p class="proof">${escapeHtml(MASTHEAD.proof)}</p>
    </div>
    ${CommandBlock(MASTHEAD.commands)}
    <p class="wrapper-versions">${versions}</p>
  </header>`);
}
