import { THESIS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";

/** Tablespoon two: the opinion, and the mechanism that makes it one. */
export function Thesis(): Html {
  return SectionShell({
    id: "thesis",
    tbsp: 2,
    label: "Thesis",
    heading: THESIS.heading,
    body: html(`    <div class="prose">${THESIS.body}
    </div>`),
  });
}
