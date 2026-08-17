import type { AppRef, Mould } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * The shapes, each with the deployables that are in it.
 *
 * Open blocks rather than the `<details>` the layers use, and deliberately so:
 * this section sits directly under that one, and a second collapsed list would
 * read as the same component twice. The links are the payload here — a shape
 * with its examples folded away is a shape nobody clicks.
 */
export function MouldList(moulds: readonly Mould[]): Html {
  const items = moulds
    .map(
      (mould) => `      <article class="mould">
        <h3>
          <b>${escapeHtml(mould.shape)}</b>
          <i>${escapeHtml(mould.tag)}</i>
        </h3>
${mould.body}
${appList(mould.apps)}
      </article>`,
    )
    .join("\n");

  return html(`    <div class="moulds">
${items}
    </div>`);
}

/** The apps, as data: every label and href escaped on the way out. */
function appList(apps: readonly AppRef[]): string {
  const links = apps
    .map(
      (app) =>
        `          <li><a href="${escapeHtml(app.href)}">${escapeHtml(app.label)}</a></li>`,
    )
    .join("\n");

  return `        <ul class="apps">
${links}
        </ul>`;
}
