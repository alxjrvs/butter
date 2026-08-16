import { LAMINATION, LAYERS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { LayerList } from "../blocks/LayerList.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** "Lamination" on the page: the eight layers, summaries with detail on click. */
export function Layers(): Html {
  return SectionShell({
    id: "lamination",
    heading: LAMINATION.heading,
    deck: LAMINATION.deck,
    body: html(`    <div class="prose">${LAMINATION.intro}
    </div>
${LayerList(LAYERS)}`),
  });
}
