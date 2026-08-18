import { type Html, html } from "@butter/core";
import type { Layer } from "./types.ts";

/** The page calls this "Lamination". */
export const LAMINATION: {
  readonly heading: string;
  readonly deck: string;
  readonly intro: Html;
} = {
  heading: "Lamination",
  deck: "Eight layers, bottom to top",

  intro: html(`
      <p>
        Fold butter into dough, roll it flat, fold it again — and the layers stay separate all
        the way through the bake. That is the trick this stack is going for: each layer does
        one job, and it does not leak into the one above it.
      </p>
      <p>
        Summaries below, detail one click down. Nothing here mentions what it replaced.
      </p>`),
};

/**
 * The eight layers of the stack, as they stand.
 *
 * Each one names the choice and the reason for it. None of them mentions what
 * it replaced: a layer is either in the stack or it isn't, and the road here
 * is not the reader's problem.
 */
export const LAYERS: readonly Layer[] = [
  {
    title: "Runtime",
    tag: "bun, end to end",
    body: html(`
        <p>
          Bun is the runtime, package manager, workspace host, test runner and script runner.
          Cross-package work goes through <code>bun run --filter '&lt;pkg&gt;' &lt;script&gt;</code>,
          never a separate task runner. <code>bunfig.toml</code> holds the operational
          knowledge: <code>linker = "isolated"</code>, so a workspace can only import what it
          declares, and <code>exact = true</code>, so lockfile churn stays out of review.
        </p>`),
  },
  {
    title: "Layout",
    tag: "apps/* + packages/*",
    body: html(`
        <p>
          Two workspace directories with fixed meanings: <code>packages/*</code> is libraries,
          <code>apps/*</code> is deployables. The root <code>package.json</code> is private,
          holds no source, and declares the workspaces, the catalog, security overrides and the
          script surface.
        </p>
        <p>
          Inside <code>packages/</code> the graph runs bottom-up: a zero-dependency core, a
          data layer, tokens, then the component library. Apps consume and never re-export.
          Siblings at the same level never import each other, which is what keeps the graph a
          graph.
        </p>`),
  },
  {
    title: "Language",
    tag: "strict, plus five",
    body: html(`
        <p>
          One <code>tsconfig.base.json</code> that every workspace extends. Past
          <code>strict</code>: <code>noUncheckedIndexedAccess</code>,
          <code>noUnusedLocals</code>, <code>noFallthroughCasesInSwitch</code>,
          <code>exactOptionalPropertyTypes</code> and <code>noImplicitOverride</code>. With
          <code>verbatimModuleSyntax</code>, <code>moduleResolution: "Bundler"</code> and
          <code>moduleDetection: "force"</code>.
        </p>
        <p>
          Named exports, <code>import type</code> for types, relative paths over aliases. The
          base config also sets <code>types: ["bun"]</code> outright, because under an isolated
          linker TypeScript's automatic <code>@types/*</code> discovery does not find the
          symlinked package and every <code>node:*</code> import fails to resolve.
        </p>`),
  },
  {
    title: "Gates",
    tag: "biome · lefthook · knip",
    body: html(`
        <p>
          Biome is the single tool for lint and format. Its config carries only the divergences
          from Biome's own defaults, so the file is short enough that every line in it is read.
        </p>
        <p>
          Lefthook runs two tiers, and the split is the point. <strong>pre-commit</strong> is
          cheap and staged-files-only, because it runs on every commit and has to stay under a
          second or it gets bypassed. <strong>pre-push</strong> is expensive and whole-repo,
          which is where a full typecheck and build can afford to live. Knip fails the build on
          dead exports and unused dependencies.
        </p>`),
  },
  {
    title: "CI",
    tag: "one required check",
    body: html(`
        <p>
          Jobs fan out; one aggregate job is the only check branch protection requires. Adding
          a job never means editing branch protection. It is also the easiest thing on this
          page to write in a way that looks right and silently passes forever, which is what
          "One handle" above is about.
        </p>`),
  },
  {
    title: "UI",
    tag: "react 19 · tanstack",
    body: html(`
        <p>
          React 19, with TanStack Router and Query as the app shell. Visual elements live in
          exactly one place — <code>packages/component-lib</code> — styled from
          <code>packages/tokens</code> with style objects and a package-level stylesheet for
          interaction and media state.
        </p>
        <p>
          The workbench lives inside the package rather than beside it, and a story-coverage
          test enforces one component, one story, checked against the taxonomy. A component
          without a story fails CI.
        </p>`),
  },
  {
    title: "Platform",
    tag: "cloudflare first",
    body: html(`
        <p>
          Cloudflare is where a new deployable starts, because one account covers a whole
          deployable: a Worker for anything with a runtime, static assets served out of that
          same Worker rather than a second site, and R2, D1, KV or Queues for whatever state
          the surface needs. One <code>wrangler.jsonc</code> describes all of it, and
          <code>wrangler deploy</code> and <code>wrangler tail</code> are the only two
          commands anybody has to know.
        </p>
        <p>
          That is what earns it the default rather than the region map. Everything here is
          built for a contributor who works fast and reads no dashboard, so a platform whose
          config is a file, whose deploy is a command that exits non-zero and whose logs come
          back down the same pipe is the one the churn can actually reach. A platform whose
          failure mode is "go and click something" is one it cannot.
        </p>
        <p>
          Netlify is first-class beside it and keeps the web surfaces already on it — the
          choice is made per app, the way the mould is, not once for a repository. Render holds
          what has to stay running: a Discord gateway is one long-lived connection and one
          instance, which is a property of the workload rather than a gap to route around.
          Convex where the backend wants to be reactive and typed rather than a store sitting
          next to a worker.
        </p>`),
  },
  {
    title: "Machine",
    tag: "boom",
    body: html(`
        <p>
          A gated repo assumes a machine with the tools on it.
          <a href="https://github.com/alxjrvs/boom">boom</a> declares that machine in one
          <code>boomfile.toml</code> and converges to it — packages, dotfiles, secrets and
          timers — so a fresh laptop arrives able to run the gate.
        </p>`),
  },
];
