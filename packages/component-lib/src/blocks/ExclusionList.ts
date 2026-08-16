import type { Exclusion } from "@butter/content";
import { type Html, html } from "@butter/core";

/**
 * Term and reason, as a definition list — because that is what it is, and a
 * table would imply a comparison that isn't being made.
 */
export function ExclusionList(items: readonly Exclusion[]): Html {
  const rows = items
    .map(
      (item) => `      <div>
        <dt>${item.term}</dt>
        <dd>${item.reason}</dd>
      </div>`,
    )
    .join("\n");

  return html(`    <dl class="exclusions">
${rows}
    </dl>`);
}
