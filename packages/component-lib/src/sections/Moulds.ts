import { MOULDS, MOULDS_LIST } from "@butter/content";
import { type Html, html } from "@butter/core";
import { MouldList } from "../blocks/MouldList.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "Moulds" on the page: the four shapes on top of the layers, and who is in them. */
export function Moulds(): Html {
  return SectionShell({
    id: "moulds",
    heading: MOULDS.heading,
    deck: MOULDS.deck,
    body: html(`    <div class="prose">${MOULDS.intro}
    </div>
${MouldList(MOULDS_LIST)}
    <div class="prose outro">${MOULDS.outro}
    </div>`),
  });
}
