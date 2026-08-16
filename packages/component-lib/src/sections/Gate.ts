import { GATE } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * Tablespoon four: the one config on the page worth arriving for.
 *
 * Its own section and its own anchor, because it is specific, reproducible,
 * and a mistake that ships silently in a lot of repositories.
 */
export function Gate(): Html {
  return SectionShell({
    id: "gate",
    tbsp: 4,
    label: "Gate",
    heading: GATE.heading,
    body: html(`    <div class="prose">${GATE.intro}
    </div>
${CodeBlock(GATE.snippet)}
    <div class="prose">${GATE.body}
    </div>`),
  });
}
