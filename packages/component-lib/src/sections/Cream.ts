import { ALSO_INSIDE, CREAM, FREE_FROM, NAME_KEY } from "@butter/content";
import { type Html, html } from "@butter/core";
import { NutritionLabel } from "../blocks/NutritionLabel.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "Cream" on the page: what the name stands for, and what is in the tin.
 *
 * The acronym and the ingredient list are the same object. The label's bold
 * rows are the six letters, so a reader gets the name explained and the stack
 * enumerated in one glance instead of two.
 */
export function Cream(): Html {
  return SectionShell({
    id: "cream",
    heading: CREAM.heading,
    deck: CREAM.deck,
    body: html(`    <div class="prose">${CREAM.intro}
    </div>
${NutritionLabel({ nameKey: NAME_KEY, also: ALSO_INSIDE, freeFrom: FREE_FROM })}
    <div class="prose">${CREAM.outro}
    </div>`),
  });
}
