# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## What This Is

`alxjrvs/butter` is the home of **the Butter Stack** — the house stack read out of four
monorepos that never shared a template. It is two things at once, and the second is the
point:

1. **A document.** `apps/site` builds a single static page — the teardown, the conformance
   matrix, the eight strata, the divergences, the direction of travel — published to
   <https://alxjrvs.github.io/butter/>.
2. **An example of itself.** The repo is built on the stack the page describes, so its own
   config is the reference implementation. A reviewer should be able to read `package.json`,
   `tsconfig.base.json`, `biome.json`, `lefthook.yml` and `.github/workflows/ci.yml` as the
   worked answer, with the page as commentary.

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
apps/site/            the teardown page
  src/build.ts        entry: renders the document, writes dist/, asserts base-path safety
  src/page.ts         the document shell (head, section order, footer)
  src/styles.ts       the whole stylesheet, inlined at build time
  src/sections/*.ts   one module per section of the page
```

## Commands

```sh
bun install       # also installs the git hooks via the prepare script
bun run check     # lint + typecheck + knip + build — the whole gate, locally
bun run build     # writes apps/site/dist/index.html
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
- **Theme tokens have three states and all three are required** (`src/styles.ts`): a bare
  `:root` light palette, a `prefers-color-scheme: dark` block guarded as
  `:root:not([data-theme="light"])`, and a `:root[data-theme="dark"]` block so an explicit
  choice wins over a light system preference. A token defined *only* inside the media query
  has no light value at all.
- **The `<pre>` scaffold block in `sections/distillate.ts` is whitespace-significant** and is
  written flush to column 0 on purpose. Do not re-indent it to match the surrounding markup.
- **Prose in `src/sections/` is authored HTML and is not escaped.** `escapeHtml` is for
  *data* — the matrix cells, the name key. Escaping the prose would double-escape every
  `<code>` in the document.

## Deliberately not here

Absence is a decision too. Do not add these back without a reason that has changed:

- **No framework and no bundler.** One page of static HTML needs neither, and the repo is
  more convincing as an example of the stack when it is not over-built.
- **No `packages/*` workspace.** The root `package.json` declares the glob because that is the
  house shape, but inventing a package to fill it would be ceremony. Add one when something
  real needs to be shared.
- **No `changes` / `dorny/paths-filter` job in CI.** The full stack's CI topology is
  filter → fan out → gate; with one app there is nothing to filter, so the middle step would
  be decoration. The gate is written as though jobs *can* be skipped anyway.
- **No tests.** There is no behavior to test beyond "the page builds", which `build` already
  proves, plus the base-path assertion it carries. Add `bun:test` the moment there is logic
  worth asserting — and add the job to `needs:`.
