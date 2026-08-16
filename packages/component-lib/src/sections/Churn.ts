import { CHURN } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "The churn" on the page: the argument the whole stack rests on. */
export function Churn(): Html {
  return SectionShell({
    id: "churn",
    heading: CHURN.heading,
    deck: CHURN.deck,
    body: html(`    <div class="prose">${CHURN.body}
    </div>`),
  });
}
