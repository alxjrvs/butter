import { MASTHEAD, SECTIONS, type VersionKey } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { Version } from "../marks/Version.ts";

const LABELS: Record<VersionKey, string> = {
  bun: "Bun",
  typescript: "TypeScript",
  biome: "Biome",
  knip: "Knip",
  lefthook: "Lefthook",
};

/**
 * The one large field of butter on the page: name, claim, what it is, and
 * three commands that run.
 *
 * The contents line is plain links rather than a rail or a numbered index.
 * Eight headings on one page want a way to jump and nothing more than that.
 */
export function Masthead(): Html {
  const versions = MASTHEAD.versions
    .map((key) => `<span>${escapeHtml(LABELS[key])} ${Version(key)}</span>`)
    .join("");

  const contents = SECTIONS.map(
    (section) =>
      `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.label)}</a>`,
  ).join("\n      ");

  return html(`  <header class="banner">
    <p class="name">${escapeHtml(MASTHEAD.name)}</p>
    <h1>${escapeHtml(MASTHEAD.title)}</h1>
    <p class="lede">${MASTHEAD.lede}</p>
    <p class="proof">${escapeHtml(MASTHEAD.proof)}</p>
    ${CommandBlock(MASTHEAD.commands)}
    <p class="versions">${versions}</p>
  </header>

  <nav class="contents" aria-label="Contents">
      ${contents}
  </nav>`);
}
