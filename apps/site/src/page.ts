import { renderDirection } from "./sections/direction.ts";
import { renderDistillate } from "./sections/distillate.ts";
import { renderDivergence } from "./sections/divergence.ts";
import { renderIntro } from "./sections/intro.ts";
import { renderMasthead } from "./sections/masthead.ts";
import { renderMatrix } from "./sections/matrix.ts";
import { renderStrata } from "./sections/strata.ts";
import { styles } from "./styles.ts";

const TITLE = "The Butter Stack";

const DESCRIPTION =
  "The house stack read out of four monorepos that never shared a template: " +
  "Bun workspaces, strict-plus TypeScript, Biome, one aggregate CI gate, " +
  "Netlify + Render + Convex.";

/**
 * A data: URI, not a file.
 *
 * This site is served from https://alxjrvs.github.io/butter/ — a sub-path, not a
 * domain root — so every root-absolute reference (`/favicon.ico` included) would
 * 404. The document therefore ships with no external references at all: the CSS
 * is inlined and the icon is a data URI, which makes the page base-path-agnostic
 * by construction rather than by configuration.
 */
const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E" +
  "%3Crect width='32' height='32' rx='7' fill='%230e6b75'/%3E" +
  "%3Ctext x='16' y='23' font-family='ui-monospace,monospace' font-size='20' " +
  "font-weight='700' fill='%23ffffff' text-anchor='middle'%3EB%3C/text%3E%3C/svg%3E";

const FOOTER = `  <footer>
    Read from six local checkouts — @RANDSUM, SU-SRD, OptFall, BinfiniteLLC/BinfiniteApp, vellum, Hermuz.<br>
    Agent worktrees excluded. Verdicts reflect the four active monorepos only.<br>
    Source: <a href="https://github.com/alxjrvs/butter">github.com/alxjrvs/butter</a>
  </footer>`;

export function renderPage(): string {
  const sections = [
    renderMasthead(),
    renderIntro(),
    renderMatrix(),
    renderStrata(),
    renderDivergence(),
    renderDirection(),
    renderDistillate(),
    FOOTER,
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="description" content="${DESCRIPTION}">
<link rel="icon" href="${FAVICON}">
<title>${TITLE}</title>
<style>${styles}</style>
</head>
<body>
<div class="wrap">

${sections.join("\n\n")}

</div>
</body>
</html>
`;
}
