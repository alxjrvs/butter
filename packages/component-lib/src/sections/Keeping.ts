import { KEEPING } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";

/**
 * "Keeping" on the page: the checks that stop the document drifting from the
 * repository, and the one paragraph boom gets.
 */
export function Keeping(): Html {
  return SectionShell({
    id: "keeping",
    heading: KEEPING.heading,
    deck: KEEPING.deck,
    body: html(`    <div class="prose">${KEEPING.body}
    </div>`),
  });
}
