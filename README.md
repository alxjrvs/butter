# butter

The agentic dev stack that's smooth as butter — a house stack for TypeScript monorepos.

**Read it: <https://alxjrvs.github.io/butter/>**

B·U·T·T·E·R — **B**un, **U**nified workspace, **T**ypeScript, **T**anStack, **E**dge-deployed,
**R**eact.

This repository is also an example of the stack it documents. Its `package.json`,
`tsconfig.base.json`, `biome.json`, `lefthook.yml`, CI gate and `packages/*` graph are the
reference implementation, and the page is the commentary. See [CLAUDE.md](CLAUDE.md) for the
layout and the gotchas.

```sh
bun install
bun run check       # lint + typecheck + knip + test + build
bun run build       # → apps/site/dist/index.html
bun run workbench   # → packages/component-lib/.workbench/dist/index.html
```

## The graph

The site is built the way the stack says to build one: content is data, the page's structure
is built in exactly one package, and both of those are checked rather than asked for.

```
packages/core            the Html brand + escapeHtml. Zero dependencies.
packages/content         every string on the page, typed. No page structure.
packages/tokens          the two-ink palette and the type stacks.
packages/component-lib   builds every section, list and panel. blocks / sections.
apps/site                composes them. Emits no markup of its own.
```

Four tests hold it together. `story-coverage.test.ts` fails when a component has no story or
sits in the wrong tier. `versions.test.ts` fails when the TypeScript major the page claims stops
matching the one the repo installs. `name-key.test.ts` fails when the label's initials stop
spelling BUTTER. `recipe.test.ts` fails when a config snippet stops matching the file it was
quoted from.
