import type { SpecGroup } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

export type SpecPanelProps = {
  readonly serving: string;
  readonly groups: readonly SpecGroup[];
  readonly free: string;
};

/**
 * Stack Facts — a nutrition label, which is a format that already does what
 * this data needs: one row per item, one value per row, hierarchy carried by
 * rule weight rather than by a legend the reader has to decode.
 */
export function SpecPanel(props: SpecPanelProps): Html {
  const groups = props.groups
    .map((group) =>
      group.rows
        .map(
          (row) =>
            `      <div class="row${row.lead ? " lead" : ""}">` +
            `<b>${escapeHtml(row.label)}</b>` +
            `<span>${escapeHtml(row.value)}</span></div>`,
        )
        .join("\n"),
    )
    .join('\n      <hr class="mid">\n');

  return html(`    <div class="facts">
      <p class="facts-title">Stack Facts</p>
      <p class="facts-serving">${escapeHtml(props.serving)}</p>
      <hr class="thick">
      <p class="facts-amount">Amount per repo</p>
      <hr>
      <p class="facts-dv">Version</p>
${groups}
      <hr class="thick">
      <p class="facts-free">${escapeHtml(props.free)}</p>
    </div>`);
}
