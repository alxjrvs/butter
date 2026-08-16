const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

/**
 * Escape a string for HTML text or an attribute value.
 *
 * Used only where markup is built from *data* (the conformance matrix, the name
 * key). Authored prose stays raw in its template literal — escaping it would
 * mean double-escaping every `<code>` in the document.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ENTITIES[char] ?? char);
}
