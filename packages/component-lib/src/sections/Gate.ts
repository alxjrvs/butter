import { GATE } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "One handle" on the page: the one config worth arriving for.
 *
 * Its own section and its own anchor, because it is specific, reproducible,
 * and a mistake that ships silently in a lot of repositories.
 */
export function Gate(): Html {
  return SectionShell({
    id: "handle",
    heading: GATE.heading,
    deck: GATE.deck,
    body: html(`    <div class="prose">${GATE.intro}
    </div>
${CodeBlock(GATE.snippet)}
    <div class="prose">${GATE.body}
    </div>`),
  });
}
