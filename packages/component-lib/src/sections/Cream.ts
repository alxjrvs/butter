import { CREAM, INGREDIENTS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { IngredientList } from "../blocks/IngredientList.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "Cream" on the page: what is in the stack, and why it is unremarkable. */
export function Cream(): Html {
  return SectionShell({
    id: "cream",
    heading: CREAM.heading,
    deck: CREAM.deck,
    body: html(`    <div class="prose">${CREAM.intro}
    </div>
${IngredientList(INGREDIENTS)}
    <div class="prose">${CREAM.outro}
    </div>`),
  });
}
