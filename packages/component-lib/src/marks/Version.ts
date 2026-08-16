import { VERSIONS, type VersionKey } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * A version number, looked up rather than written.
 *
 * Takes a catalog key, never a string, so no version on the page can be typed
 * by hand — a key that isn't in `VERSIONS` fails the typecheck, and a
 * `VERSIONS` entry that doesn't match the root manifest fails
 * `versions.test.ts`. Together those are what make the page's present tense
 * enforceable instead of aspirational.
 */
export function Version(key: VersionKey): Html {
  return html(`<span class="version">${escapeHtml(VERSIONS[key])}</span>`);
}
