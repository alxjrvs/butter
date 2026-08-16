import { RECIPE } from "@butter/content";
import { type Html, html, joinHtml } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "The recipe" on the page: the config files, unabbreviated. */
export function Recipe(): Html {
  return SectionShell({
    id: "recipe",
    heading: RECIPE.heading,
    deck: RECIPE.deck,
    body: html(`    <div class="prose">${RECIPE.intro}
    </div>
${joinHtml(RECIPE.snippets.map(CodeBlock))}`),
  });
}
