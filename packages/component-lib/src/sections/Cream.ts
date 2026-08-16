import { ALSO_INSIDE, CREAM, FREE_FROM, NAME_KEY } from "@butter/content";
import { type Html, html } from "@butter/core";
import { NutritionLabel } from "../blocks/NutritionLabel.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "Cream" on the page: what the name stands for, and what is in the tin.
 *
 * The label comes first, and one sentence of lead-in is all that precedes it.
 * Its six bold rows are the six letters, so the panel is the first and only
 * place the acronym gets spelled out — prose that listed the letters ahead of
 * it was explaining the joke before the punchline and made the label a repeat.
 */
export function Cream(): Html {
  return SectionShell({
    id: "cream",
    heading: CREAM.heading,
    deck: CREAM.deck,
    body: html(`    <div class="prose">${CREAM.lead}
    </div>
${NutritionLabel({ nameKey: NAME_KEY, also: ALSO_INSIDE, freeFrom: FREE_FROM })}
    <div class="prose">${CREAM.body}
    </div>`),
  });
}
