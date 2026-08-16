import { FILES } from "@butter/content";
import { type Html, html, joinHtml } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** Tablespoon five: the takeaway. */
export function Files(): Html {
  return SectionShell({
    id: "files",
    tbsp: 5,
    label: "Files",
    heading: FILES.heading,
    body: html(`    <div class="prose">${FILES.intro}
    </div>
${joinHtml(FILES.snippets.map(CodeBlock))}`),
  });
}
