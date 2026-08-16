import {
  Document,
  Exclusions,
  Files,
  Gate,
  Layers,
  Machine,
  Masthead,
  Stack,
  Start,
  Thesis,
} from "@butter/component-lib";
import { html, joinHtml } from "@butter/core";

const TITLE = "butter — the agentic dev stack that's smooth as butter";

const DESCRIPTION =
  "A house stack for TypeScript monorepos: Bun end to end, TypeScript five " +
  "flags past strict, Biome for lint and format, and one required check in CI.";

/**
 * The app composes and emits no markup of its own.
 *
 * Every tag in the built page comes from `@butter/component-lib` and every
 * string from `@butter/content`. The order below is the whole of this file's
 * opinion.
 */
export function renderPage(): string {
  const footer = html(`  <footer>
    <p>
      <a href="https://github.com/alxjrvs/butter">github.com/alxjrvs/butter</a>
      &nbsp;·&nbsp;
      <a href="https://github.com/alxjrvs/boom">github.com/alxjrvs/boom</a>
    </p>
  </footer>`);

  return Document({
    title: TITLE,
    description: DESCRIPTION,
    body: joinHtml(
      [
        Masthead(),
        Stack(),
        Thesis(),
        Layers(),
        Gate(),
        Files(),
        Exclusions(),
        Machine(),
        Start(),
        footer,
      ],
      "\n\n",
    ),
  });
}
