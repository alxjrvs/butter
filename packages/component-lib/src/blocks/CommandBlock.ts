import type { Command } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

/**
 * Prompt, command, aligned trailing comment.
 *
 * No output, no spinner, no invented timings — a mocked terminal showing
 * results the reader can't reproduce is the fastest way to lose one. Alignment
 * is computed from the longest command that has a note, so adding a long line
 * doesn't leave the comment column ragged.
 */
export function CommandBlock(lines: readonly Command[]): Html {
  const width = lines.reduce(
    (widest, line) =>
      line.note === undefined ? widest : Math.max(widest, line.cmd.length),
    0,
  );

  const rendered = lines
    .map((line) => {
      const cmd = `<i>$</i> ${escapeHtml(line.cmd)}`;
      if (line.note === undefined) {
        return cmd;
      }
      const pad = " ".repeat(Math.max(1, width - line.cmd.length + 3));
      return `${cmd}${pad}<u># ${escapeHtml(line.note)}</u>`;
    })
    .join("\n");

  return html(`<pre class="term">${rendered}</pre>`);
}
