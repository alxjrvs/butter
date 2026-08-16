import type { Glyph as GlyphData } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * One letter of B·U·T·T·E·R, printed as a tile with the rest of its word set
 * beside it. Six of these in a row are the compact statement of what the stack
 * is, which is why they sit directly under the headline.
 */
export function Glyph(glyph: GlyphData): Html {
  return html(
    `<span class="glyph"><b>${escapeHtml(glyph.letter)}</b>` +
      `<i>${escapeHtml(glyph.word)}</i></span>`,
  );
}
