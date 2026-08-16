import { THESIS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "The churn" on the page: the argument the whole stack rests on. */
export function Thesis(): Html {
  return SectionShell({
    id: "churn",
    heading: THESIS.heading,
    deck: THESIS.deck,
    body: html(`    <div class="prose">${THESIS.body}
    </div>`),
  });
}
