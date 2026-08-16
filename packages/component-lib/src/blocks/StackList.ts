import type { SpecRow } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * The stack as a plain list: what each layer is, what it's for, what version.
 *
 * A definition list rather than a table — there is no comparison being made,
 * only a set of things and their descriptions, and a table would promise
 * columns that mean something.
 */
export function StackList(rows: readonly SpecRow[]): Html {
  const items = rows
    .map((row) => {
      const version =
        row.version === undefined
          ? ""
          : ` <span class="v">${escapeHtml(row.version)}</span>`;
      return `      <div>
        <dt>${escapeHtml(row.layer)}${version}</dt>
        <dd>${escapeHtml(row.detail)}</dd>
      </div>`;
    })
    .join("\n");

  return html(`    <dl class="stack">
${items}
    </dl>`);
}
