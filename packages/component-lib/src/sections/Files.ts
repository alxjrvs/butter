import { FILES } from "@butter/content";
import { type Html, html, joinHtml } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** The takeaway. */
export function Files(): Html {
  return SectionShell({
    id: "files",
    heading: FILES.heading,
    body: html(`    <div class="prose">${FILES.intro}
    </div>
${joinHtml(FILES.snippets.map(CodeBlock))}`),
  });
}
