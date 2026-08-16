import { escapeHtml, type Html, html } from "@butter/core";

/**
 * The one place the wrapper touches the copy, and it works because ingredient
 * lists are already written the way this content wants to be: no verbs, no
 * editorialising, no history.
 *
 * Both lists come from the same data as the facts panel, so the two cannot
 * disagree about what is in the stack.
 */
export function Ingredients(
  contains: readonly string[],
  free: readonly string[],
): Html {
  const body = contains.map(escapeHtml).join(", ");
  const without = free.map((item) => `no ${escapeHtml(item)}`).join(", ");

  return html(`    <div class="ingredients">
      <h3>Ingredients</h3>
      <p>${body}.</p>
      <p class="free">Contains ${without}.</p>
    </div>`);
}
