import { EXCLUSIONS } from "@butter/content";
import { type Html, html } from "@butter/core";
import { ExclusionList } from "../blocks/ExclusionList.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** Tablespoon six: read first by half the audience. */
export function Exclusions(): Html {
  return SectionShell({
    id: "exclusions",
    tbsp: 6,
    label: "Exclusions",
    heading: "Not in the stack",
    body: html(`    <div class="prose">
      <p class="lede">
        The fastest way to find out whether a stack shares your priors. Every reason below
        carries a mechanism rather than a preference.
      </p>
    </div>
${ExclusionList(EXCLUSIONS)}`),
  });
}
