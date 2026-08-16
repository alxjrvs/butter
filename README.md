# butter

The Butter Stack — the house stack read out of four monorepos that never shared a template.

**Read it: <https://alxjrvs.github.io/butter/>**

B·U·T·T·E·R — **B**un, **U**nified workspace, **T**ypeScript, **T**anStack, **E**dge-deployed,
**R**eact.

This repository is also an example of the stack it documents: its `package.json`,
`tsconfig.base.json`, `biome.json`, `lefthook.yml` and CI gate are the reference
implementation, and the page is the commentary. See [CLAUDE.md](CLAUDE.md) for the layout and
the gotchas.

```sh
bun install
bun run check   # lint + typecheck + knip + build
bun run build   # → apps/site/dist/index.html
```
