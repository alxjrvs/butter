import { LAYERS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { LayerList } from "../blocks/LayerList.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** Tablespoon three: the spec proper. */
export function Layers(): Html {
  return SectionShell({
    id: "layers",
    tbsp: 3,
    label: "Layers",
    heading: "Eight layers",
    body: html(`    <div class="prose">
      <p class="lede">
        Bottom to top. Each layer names the choice and the reason for it; the detail is one
        click down, so the summary reads as a spine rather than a wall.
      </p>
    </div>
${LayerList(LAYERS)}`),
  });
}
