import { START } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "Spread it" on the page: the two onboarding routes. */
export function Start(): Html {
  return SectionShell({
    id: "spread",
    heading: START.heading,
    deck: START.deck,
    body: html(`    <div class="prose">${START.intro}
      <h3>${START.freshHeading}</h3>${START.freshIntro}
    </div>
${CommandBlock(START.freshCommands)}
    <div class="prose">${START.freshBody}
      <h3>${START.existingHeading}</h3>${START.existingBody}
    </div>`),
  });
}
