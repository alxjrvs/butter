import { THESIS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";

/** The opinion, and the mechanism that makes it one. */
export function Thesis(): Html {
  return SectionShell({
    id: "thesis",
    heading: THESIS.heading,
    body: html(`    <div class="prose">${THESIS.body}
    </div>`),
  });
}
