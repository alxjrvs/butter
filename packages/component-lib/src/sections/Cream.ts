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
 * The label is emitted AFTER the lead, and that order is about reading rather
 * than layout. A float is placed from where it sits in the flow, so putting the
 * panel first buys it a paragraph more text to wrap around — but the float only
 * exists above 62rem. Below it, and in any reader that follows the document
 * rather than the painting, source order IS the order: the panel would arrive
 * ahead of the sentence that introduces it, "here is the tin" would point
 * backwards, and anything reading aloud would work through eleven rows of
 * ingredients before hearing what they are.
 *
 * The cost is a little more white space under the last line at wide widths.
 * That is the cheaper of the two.
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
