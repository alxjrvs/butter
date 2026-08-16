import { SPREAD } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "Spread it" on the page: the two onboarding routes.
 *
 * The route headings are `string`, not `Html`, so they get escaped like every
 * other piece of data — the brand in `@butter/core` says which side of that
 * line a value sits on, and these sit on the data side.
 */
export function Spread(): Html {
  return SectionShell({
    id: "spread",
    heading: SPREAD.heading,
    deck: SPREAD.deck,
    body: html(`    <div class="prose">${SPREAD.intro}
      <h3>${escapeHtml(SPREAD.freshHeading)}</h3>${SPREAD.freshIntro}
    </div>
${CommandBlock(SPREAD.freshCommands)}
    <div class="prose">${SPREAD.freshBody}
      <h3>${escapeHtml(SPREAD.existingHeading)}</h3>${SPREAD.existingBody}
    </div>`),
  });
}
