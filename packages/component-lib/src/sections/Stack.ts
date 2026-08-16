import { CREAM, SPEC } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";
import { StackList } from "../blocks/StackList.ts";

/** "Cream" on the page: what is in the stack, and why it is unremarkable. */
export function Stack(): Html {
  return SectionShell({
    id: "cream",
    heading: CREAM.heading,
    deck: CREAM.deck,
    body: html(`    <div class="prose">${CREAM.intro}
    </div>
${StackList(SPEC)}
    <div class="prose">${CREAM.outro}
    </div>`),
  });
}
