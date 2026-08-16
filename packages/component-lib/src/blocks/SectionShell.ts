import { escapeHtml, type Html, html } from "@butter/core";

export type SectionShellProps = {
  /** matches a `SectionRef.id`, so the contents line's anchors resolve */
  readonly id: string;
  readonly heading: string;
  readonly body: Html;
};

/**
 * Anchor, heading, body — and nothing else.
 *
 * Sections compose this rather than each writing their own `<section>`, which
 * keeps the heading level and the anchor convention in one place instead of
 * nine.
 */
export function SectionShell(props: SectionShellProps): Html {
  return html(`  <section id="${escapeHtml(props.id)}">
    <h2>${escapeHtml(props.heading)}</h2>
${props.body}
  </section>`);
}
