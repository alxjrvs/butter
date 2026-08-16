# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## What This Is

`alxjrvs/butter` is the home of **the Butter Stack**. It is two things at once, and the
second is the point:

1. **A document.** `apps/site` builds a single static page — what the stack is, the eight
   layers, the aggregate gate, the files, the exclusions, the machine layer — published to
   <https://alxjrvs.github.io/butter/>. It describes the stack **as it stands**: no survey of
   how it got here, no conformance percentages, no migrations in flight, no dated caveats.
2. **An example of itself.** The repo is built on the stack the page describes, so its own
   config and its own package graph are the reference implementation. A reviewer should be
   able to read `package.json`, `tsconfig.base.json`, `biome.json`, `lefthook.yml`,
   `.github/workflows/ci.yml` and `packages/*` as the worked answer, with the page as
   commentary.

That recursion is the constraint that governs changes here: **a change to the page's claims
that the repo could honor, but doesn't, is a bug.**

## Layout

```
package.json          private, workspaces + catalog, no source
bunfig.toml           linker + install policy
.bun-version          the one place the Bun version is written
tsconfig.base.json    strict-plus; every workspace extends it
biome.json            ONLY divergences from Biome's defaults
lefthook.yml          two-tier: staged pre-commit, expensive pre-push
knip.json             per-workspace entry/project globs
.github/workflows/
  ci.yml              fan-out → ONE always() aggregate gate
  pages.yml           build apps/site → GitHub Pages

packages/             the house graph, bottom-up. Siblings never import siblings.
  core/               zero-dependency: the Html brand + escapeHtml
  content/            every string on the page, as typed data. No markup.
    versions.test.ts  asserts VERSIONS matches the catalog and .bun-version
  tokens/             framework-agnostic: the two-ink palette + two type stacks
  component-lib/      the ONLY place markup lives
    src/marks|blocks|sections/   the taxonomy; one story file each
    src/{document,story,styles}.ts   package infrastructure, no stories
    .workbench/build.ts          the workbench, in the package
    story-coverage.test.ts       1 component = 1 story, taxonomy-checked
apps/
  site/
    src/build.ts      entry: renders, writes dist/, asserts base-path safety
    src/page.ts       section order and nothing else — the app emits no markup
```

## Commands

```sh
bun install       # also installs the git hooks via the prepare script
bun run check     # lint + typecheck + knip + test + build — the whole gate, locally
bun run build     # writes apps/site/dist/index.html
bun run test      # story coverage + version drift
bun run workbench # renders every story → packages/component-lib/.workbench/dist
bun run format    # biome check --write
```

## Gotchas

Each of these is a decision, not an accident. Changing one is fine; changing one without
reading why is how the property it protects gets lost.

- **The CI aggregate gate must propagate failure.** `CI-Success` in `ci.yml` is the only
  required status check. `if: always()` makes that job *run* regardless of its dependencies;
  it does **not** make it *fail* with them. Without the `exit 1` step, the job runs, does
  nothing, and reports success — so the required check is permanently green no matter what
  broke. The step tests for `failure`/`cancelled` rather than for "not `success`", so a
  legitimately **skipped** job leaves the gate passing instead of blocking the PR forever.
- **`needs:` must list every other job in the file.** A job missing from that list can never
  fail the required check, and nothing warns you. Add a job, add it to `needs:` in the same
  commit.
- **`biome.json` carries only divergences.** No `rules` block (that is Biome's recommended
  set), no `linter.enabled` (already true). The three-ish keys present are each load-bearing:
  - `vcs.useIgnoreFile` — Biome does **not** read `.gitignore` by default. Without it a bare
    `biome check` descends into `.claude/worktrees/`, which holds full copies of this repo.
    `vcs.enabled` + `clientKind` exist only to switch that on.
  - `formatter.indentStyle: "space"` — Biome's default is **tab**, and `useEditorconfig`
    defaults to false, so an `.editorconfig` alone would not change it.
- **The site is published under `/butter/`, not a domain root.** Any root-absolute `href`/`src`
  404s there. The page therefore has no external references at all — CSS is inlined, the icon
  is a `data:` URI — which makes it base-path-agnostic by construction rather than by
  configuration. `build.ts` asserts that property and exits non-zero if a root-absolute
  reference appears, because a convention worth stating is worth executing.
- **`tsconfig.base.json` sets `types: ["bun"]` explicitly.** With `linker = "isolated"`,
  TypeScript's automatic `@types/*` discovery does not find the symlinked `@types/bun`, and
  every `node:*` import fails to resolve. This is not belt-and-braces; remove it and
  `bun run typecheck` breaks.
- **Theme tokens have three states and all three are required**
  (`packages/component-lib/src/styles.ts`, generated from `packages/tokens`): a bare
  `:root` light palette, a `prefers-color-scheme: dark` block guarded as
  `:root:not([data-theme="light"])`, and a `:root[data-theme="dark"]` block so an explicit
  choice wins over a light system preference. A token defined *only* inside the media query
  has no light value at all.
- **`.banner` centres with a grid column, not `margin: auto`.** Each banner child sets its own
  `margin`, and a margin shorthand on a more specific selector silently wins over the auto
  centring — which is how the header stops lining up with the sections below it. The column is
  `46rem` minus the banner's own padding so the two agree.
- **Authored markup vs data is a type, not a convention.** `packages/core` exports an `Html`
  brand and `html()` is the only way to make one. A component takes `Html` where it emits a
  value verbatim and `string` where it escapes one, so the old "prose is not escaped, data is"
  rule is now a compile error rather than a comment. Escaping the prose would double-escape
  every `<code>` in the document.
- **Yellow appears once, at the top.** One field of butter and then paper the rest of the way.
  A second yellow panel further down turns it into a pattern and costs the first one its
  emphasis — the earlier draft wrapped every element in the packaging and read as costume.
- **Versions are looked up, never typed.** `VERSIONS` in `packages/content` is the only place
  a version is written for display, `Version` takes a key rather than a string, and
  `versions.test.ts` asserts every entry against the catalog and `.bun-version`. That is what
  keeps the page's present tense true after a dependency bump.

## Deliberately not here

Absence is a decision too. Do not add these back without a reason that has changed:

- **No framework and no bundler.** One page of static HTML needs neither, and the repo is
  more convincing as an example of the stack when it is not over-built.
- **No framework in the workbench.** Ladle and Storybook both want a bundler and a framework.
  The stack's claim is that the workbench lives *in* the package, not that it is Storybook, so
  `.workbench/build.ts` renders every story to one static page in about forty lines.
- **No `changes` / `dorny/paths-filter` job in CI.** The full stack's CI topology is
  filter → fan out → gate; with one app there is nothing to filter, so the middle step would
  be decoration. The gate is written as though jobs *can* be skipped anyway.
- **No tests of rendered markup.** The two test files assert *rules* — every component has a
  story in the right tier, every printed version matches the manifest. Snapshotting the HTML
  would make every copy edit a two-file change and would assert nothing the build doesn't.
