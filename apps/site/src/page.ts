import {
  Document,
  Exclusions,
  Files,
  Gate,
  Layers,
  Machine,
  Masthead,
  Stack,
  Stamp,
  Start,
  Thesis,
} from "@butter/component-lib";
import { SECTIONS } from "@butter/content";
import { html, joinHtml } from "@butter/core";

const TITLE = "The Butter Stack";

const DESCRIPTION =
  "The agentic dev stack that's smooth as butter. A house stack for TypeScript " +
  "monorepos: Bun end to end, TypeScript five flags past strict, Biome, and one " +
  "required check in CI.";

/**
 * The app composes and emits no markup of its own.
 *
 * Every tag in the built page comes from `@butter/component-lib` and every
 * string from `@butter/content`, which is the house rule about where visual
 * elements live, applied to the one app in this repository. The order below is
 * the whole of this file's opinion — and it has to stay eight long, because
 * `RulerNav` throws otherwise.
 */
export function renderPage(): string {
  const tablespoons = [
    Stack(),
    Thesis(),
    Layers(),
    Gate(),
    Files(),
    Exclusions(),
    Machine(),
    Start(),
  ];

  const footer = html(`  <footer>
    ${Stamp("github.com/alxjrvs/butter · github.com/alxjrvs/boom · net wt 4 oz")}
  </footer>`);

  return Document({
    title: TITLE,
    description: DESCRIPTION,
    sections: SECTIONS,
    body: joinHtml([Masthead(), ...tablespoons, footer], "\n\n"),
  });
}
