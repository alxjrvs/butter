import type { SectionRef } from "@butter/content";
import { escapeHtml, type Html } from "@butter/core";
import { RulerNav } from "./blocks/RulerNav.ts";
import { styles } from "./styles.ts";

/**
 * The document shell — head, rail, main.
 *
 * Package infrastructure rather than a component: it renders `<head>` rather
 * than page content, so it sits outside the marks/blocks/sections taxonomy and
 * has no story. `story-coverage.test.ts` knows the short list of files allowed
 * to live here, which is what stops "outside the taxonomy" becoming a place to
 * put anything.
 *
 * The icon is a data URI and the stylesheet is inlined, so the document carries
 * no external references at all. That is what makes it base-path-agnostic under
 * https://alxjrvs.github.io/butter/ by construction rather than by config, and
 * `build.ts` asserts it.
 */
const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E" +
  "%3Crect width='32' height='32' fill='%23f5c543'/%3E" +
  "%3Crect x='2' y='2' width='28' height='28' fill='none' stroke='%2316327f' " +
  "stroke-width='2'/%3E" +
  "%3Ctext x='16' y='24' font-family='Georgia,serif' font-size='21' font-weight='700' " +
  "fill='%2316327f' text-anchor='middle'%3EB%3C/text%3E%3C/svg%3E";

export type DocumentProps = {
  readonly title: string;
  readonly description: string;
  readonly sections: readonly SectionRef[];
  readonly body: Html;
};

export function Document(props: DocumentProps): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="description" content="${escapeHtml(props.description)}">
<link rel="icon" href="${FAVICON}">
<title>${escapeHtml(props.title)}</title>
<style>${styles}</style>
</head>
<body>
<div class="shell">
${RulerNav(props.sections)}
  <main>

${props.body}

  </main>
</div>
</body>
</html>
`;
}
