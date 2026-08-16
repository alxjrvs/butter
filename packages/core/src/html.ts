/**
 * The bottom of the graph: zero dependencies, and the one domain concept every
 * package above it shares — the difference between authored markup and data.
 *
 * CLAUDE.md states that rule as prose: "Prose in src/sections/ is authored HTML
 * and is not escaped. escapeHtml is for *data*." Prose can be ignored, so it is
 * a type here instead. A component takes `Html` where it will emit a value
 * verbatim and `string` where it will escape one, which makes the distinction
 * a compile error rather than a review comment.
 */

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

declare const HTML_BRAND: unique symbol;

/** Authored markup. Emitted verbatim, never escaped. */
export type Html = string & { readonly [HTML_BRAND]: true };

/**
 * Mark a string as authored markup.
 *
 * The only way to produce an `Html`, so every unescaped byte in the built page
 * traces back to a call site that said so.
 */
export function html(value: string): Html {
  return value as Html;
}

/** Escape a string for HTML text or an attribute value. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ENTITIES[char] ?? char);
}

/** Join rendered fragments, preserving the brand. */
export function joinHtml(parts: readonly Html[], separator = "\n"): Html {
  return html(parts.join(separator));
}
