import { SPREAD } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "Spread it" on the page: the two onboarding routes. */
export function Spread(): Html {
  return SectionShell({
    id: "spread",
    heading: SPREAD.heading,
    deck: SPREAD.deck,
    body: html(`    <div class="prose">${SPREAD.intro}
      <h3>${SPREAD.freshHeading}</h3>${SPREAD.freshIntro}
    </div>
${CommandBlock(SPREAD.freshCommands)}
    <div class="prose">${SPREAD.freshBody}
      <h3>${SPREAD.existingHeading}</h3>${SPREAD.existingBody}
    </div>`),
  });
}
