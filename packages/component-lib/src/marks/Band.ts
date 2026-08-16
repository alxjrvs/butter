import { escapeHtml, type Html, html } from "@butter/core";

/**
 * A printed band: hard rules above and below, items spread across the measure.
 *
 * Takes strings only. An item carrying markup is the signal that the thing
 * being built is a block, not a band.
 */
export function Band(items: readonly string[]): Html {
  const cells = items
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
  return html(`<p class="band">${cells}</p>`);
}
