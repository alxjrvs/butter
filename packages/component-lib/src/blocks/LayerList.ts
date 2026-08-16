import type { Layer } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * The eight layers, one summary line each and the detail on click.
 *
 * Native `<details>` and no JavaScript, so a deep link still lands: a browser
 * opens a closed `<details>` that contains the target of the fragment.
 */
export function LayerList(layers: readonly Layer[]): Html {
  const items = layers
    .map(
      (
        layer,
        index,
      ) => `      <details class="layer"${index === 0 ? " open" : ""}>
        <summary>
          <b>${escapeHtml(layer.n)} · ${escapeHtml(layer.title)}</b>
          <i>${escapeHtml(layer.tag)}</i>
        </summary>
${layer.body}
      </details>`,
    )
    .join("\n");

  return html(`    <div class="layers">
${items}
    </div>`);
}
