import type { SectionRef } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/** A stick of butter is scored into eight tablespoons. So is the page. */
const TABLESPOONS = 8;

/**
 * The scored edge of the stick, running down the left margin as the section
 * index — and collapsing to a horizontal strip on narrow screens.
 *
 * The count check is the whole reason this is a component rather than a loop
 * in the page. A ruler that says eight and indexes nine is a device that has
 * quietly stopped meaning anything, so a ninth section fails the build and
 * forces the decision: merge two, or drop the rail.
 */
export function RulerNav(sections: readonly SectionRef[]): Html {
  if (sections.length !== TABLESPOONS) {
    throw new Error(
      `RulerNav: a stick is ${String(TABLESPOONS)} tablespoons, got ${String(sections.length)} ` +
        "sections. Merge two, or drop the rail.",
    );
  }

  const ticks = sections
    .map(
      (section, index) =>
        `    <a href="#${escapeHtml(section.id)}">` +
        `<b>${String(index + 1)}</b>` +
        `<span>${escapeHtml(section.label)}</span></a>`,
    )
    .join("\n");

  return html(`  <nav class="rail" aria-label="Sections">
${ticks}
  </nav>`);
}
