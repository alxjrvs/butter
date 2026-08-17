import { ALSO_INSIDE, CREAM, FREE_FROM, NAME_KEY } from "@butter/content";
import { type Html, html } from "@butter/core";
import { NutritionLabel } from "../blocks/NutritionLabel.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "Cream" on the page: what the name stands for, and what is in the tin.
 *
 * Its six bold rows are the six letters, so the panel is the first and only
 * place the acronym gets spelled out — prose that listed the letters ahead of
 * it was explaining the joke before the punchline and made the label a repeat.
 *
 * The label is emitted BEFORE the prose it sits beside, because it floats: a
 * float is placed from where it appears in the flow, so markup order is what
 * decides how much text gets to wrap around it. Emitted after the lead it
 * started a paragraph lower and left the panel hanging past the end of the
 * section's last line. "Here is the tin" still lands — the tin is right there,
 * alongside the sentence, rather than under it.
 */
export function Cream(): Html {
  return SectionShell({
    id: "cream",
    heading: CREAM.heading,
    deck: CREAM.deck,
    body: html(`${NutritionLabel({ nameKey: NAME_KEY, also: ALSO_INSIDE, freeFrom: FREE_FROM })}
    <div class="prose">${CREAM.lead}
    </div>
    <div class="prose">${CREAM.body}
    </div>`),
  });
}
