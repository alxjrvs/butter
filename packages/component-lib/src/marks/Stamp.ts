import { escapeHtml, type Html, html } from "@butter/core";

/**
 * The lot code on the end fold: mono, uppercase, letter-spaced.
 *
 * Carries the metadata a page otherwise scatters through prose — where it goes
 * stale without anyone noticing.
 */
export function Stamp(text: string): Html {
  return html(`<p class="stamp">${escapeHtml(text)}</p>`);
}
