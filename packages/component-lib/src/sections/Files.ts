import { FILES } from "@butter/content";
import { type Html, html, joinHtml } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "The recipe" on the page: the config files, unabbreviated. */
export function Files(): Html {
  return SectionShell({
    id: "recipe",
    heading: FILES.heading,
    deck: FILES.deck,
    body: html(`    <div class="prose">${FILES.intro}
    </div>
${joinHtml(FILES.snippets.map(CodeBlock))}`),
  });
}
