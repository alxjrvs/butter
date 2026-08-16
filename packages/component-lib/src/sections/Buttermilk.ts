import { BUTTERMILK, EXCLUSIONS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { ExclusionList } from "../blocks/ExclusionList.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "Buttermilk" on the page: what the churn drains off. */
export function Buttermilk(): Html {
  return SectionShell({
    id: "buttermilk",
    heading: BUTTERMILK.heading,
    deck: BUTTERMILK.deck,
    body: html(`    <div class="prose">${BUTTERMILK.intro}
    </div>
${ExclusionList(EXCLUSIONS)}`),
  });
}
