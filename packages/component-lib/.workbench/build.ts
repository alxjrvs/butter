import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { escapeHtml, html } from "@butter/core";
import { Glob } from "bun";
import { Document } from "../src/document.ts";
import { type StoryModule, TIERS, type Tier } from "../src/story.ts";

/**
 * The workbench, and the one place the house pattern is adapted rather than
 * copied.
 *
 * The stack says the workbench lives *in* the package. It does not say the
 * workbench is Storybook — and Ladle and Storybook both want a bundler and a
 * framework, neither of which this repository has by decision. So this renders
 * every story into one static page using the same document shell the site
 * does, in about forty lines and no new dependencies.
 *
 *   bun run --filter '@butter/component-lib' workbench
 */

const src = join(import.meta.dir, "..", "src");
const outDir = join(import.meta.dir, "dist");

type Loaded = { readonly tier: Tier; readonly module: StoryModule };

const paths = [
  ...new Glob("{marks,blocks,sections}/*.stories.ts").scanSync(src),
]
  .map((path) => path.replaceAll("\\", "/"))
  .sort();

const loaded: Loaded[] = [];
for (const path of paths) {
  const imported = (await import(join(src, path))) as {
    readonly story?: StoryModule;
  };
  if (imported.story !== undefined) {
    loaded.push({ tier: imported.story.tier, module: imported.story });
  }
}

function renderTier(tier: Tier): string {
  const entries = loaded.filter((entry) => entry.tier === tier);
  if (entries.length === 0) {
    return "";
  }

  const bodies = entries
    .map((entry) => {
      const stories = entry.module.stories
        .map(
          // Each story renders inside its own formatting context. The page puts
          // one component per section and lets `section` contain its floats;
          // the workbench puts every story of a tier in ONE section, so without
          // this a floated component (the nutrition label, above 62rem) escapes
          // its own story and the next story's name — and the next component's
          // heading — wrap around it.
          (story) => `      <p class="story-name">${escapeHtml(story.name)}</p>
      <div style="display: flow-root">${story.render()}</div>`,
        )
        .join("\n");

      return `    <h3>${escapeHtml(entry.module.component)}</h3>
${stories}`;
    })
    .join("\n");

  return `  <section id="${tier}">
    <h2>${escapeHtml(tier)} — ${String(entries.length)}</h2>
${bodies}
  </section>`;
}

const body = TIERS.map(renderTier)
  .filter((part) => part !== "")
  .join("\n\n");

const page = Document({
  title: "butter — component workbench",
  description:
    "Every component in @butter/component-lib, rendered from its stories.",
  body: html(`  <header class="banner">
    <p class="name">workbench</p>
    <h1>@butter/component-lib</h1>
    <p class="lede">${String(loaded.length)} components, rendered from their stories.</p>
  </header>

${body}`),
});

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "index.html"), page, "utf8");

console.log(
  `workbench: ${String(loaded.length)} components, ` +
    `${String(loaded.reduce((n, entry) => n + entry.module.stories.length, 0))} stories`,
);
