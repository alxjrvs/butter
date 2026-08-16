import type { Snippet } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * A file, not something to type — which is the whole difference from
 * `CommandBlock`, and the reason there are two of these.
 *
 * Every snippet on the site is a literal excerpt of a file in this repository,
 * so the source is escaped as data and never authored as markup.
 */
export function CodeBlock(snippet: Snippet): Html {
  return html(`<figure class="snippet">
<figcaption>${escapeHtml(snippet.caption)}</figcaption>
<pre class="code">${escapeHtml(snippet.source)}</pre>
</figure>`);
}
