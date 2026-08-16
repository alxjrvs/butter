import { SECTIONS, WRAPPER } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";

/**
 * The one large field of butter on the page: name, claim, what it is, and
 * three commands that run.
 *
 * The contents line is plain links rather than a rail or a numbered index.
 * Eight headings on one page want a way to jump and nothing more than that.
 *
 * No version strip. It used to print Bun, TypeScript and Biome down to the
 * patch, which is noise on a page about a stack and dated the banner every time
 * Dependabot ran. The page commits to majors instead, in prose, where a major
 * means something.
 */
export function Wrapper(): Html {
  const contents = SECTIONS.map(
    (section) =>
      `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.label)}</a>`,
  ).join("\n      ");

  return html(`  <header class="banner">
    <p class="name">${escapeHtml(WRAPPER.name)}</p>
    <h1>${escapeHtml(WRAPPER.title)}</h1>
    <p class="lede">${WRAPPER.lede}</p>
    <p class="proof">${escapeHtml(WRAPPER.proof)}</p>
    ${CommandBlock(WRAPPER.commands)}
  </header>

  <nav class="contents" aria-label="Contents">
      ${contents}
  </nav>`);
}
