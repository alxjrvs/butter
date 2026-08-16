import { HANDLE } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "One handle" on the page: the one config worth arriving for.
 *
 * Its own section and its own anchor, because it is specific, reproducible,
 * and a mistake that ships silently in a lot of repositories.
 */
export function Handle(): Html {
  return SectionShell({
    id: "handle",
    heading: HANDLE.heading,
    deck: HANDLE.deck,
    body: html(`    <div class="prose">${HANDLE.intro}
    </div>
${CodeBlock(HANDLE.snippet)}
    <div class="prose">${HANDLE.body}
    </div>`),
  });
}
