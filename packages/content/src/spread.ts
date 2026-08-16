import { type Html, html } from "@butter/core";
import type { Command } from "./types.ts";

/**
 * The page calls this "Spread it". Two routes, because starting fresh and
 * retrofitting are different jobs and the second one is the harder and more
 * common of the two.
 */
export const SPREAD: {
  readonly heading: string;
  readonly deck: string;
  readonly intro: Html;
  readonly freshHeading: string;
  readonly freshIntro: Html;
  readonly freshCommands: readonly Command[];
  readonly freshBody: Html;
  readonly existingHeading: string;
  readonly existingBody: Html;
} = {
  heading: "Spread it",
  deck: "Two ways to start, depending on what you are spreading it on",

  intro: html(`
      <p>
        Butter goes on a fresh loaf differently than it goes on something you baked on Tuesday.
        Both work. They are not the same motion.
      </p>`),

  freshHeading: "On a fresh loaf",

  freshIntro: html(`
      <p>
        Nothing to migrate, so this is the easy one. Clone the repository and run it, or lift
        the seven files out of it into an empty directory and start from there.
      </p>`),

  freshCommands: [
    { cmd: "git clone https://github.com/alxjrvs/butter my-app" },
    { cmd: "cd my-app && bun install", note: "also installs the git hooks" },
    { cmd: "bun run check", note: "lint + typecheck + knip + test + build" },
  ],

  freshBody: html(`
      <p>
        What you get: a private root <code>package.json</code> that holds no source and exists
        to declare the workspaces, the version catalog and the script surface. Two workspace
        directories with fixed meanings — <code>packages/*</code> for libraries,
        <code>apps/*</code> for things you deploy. And a gate you can run in one command,
        locally, that runs the same way in CI.
      </p>
      <p>
        <code>bun install</code> installs the git hooks too, through the <code>prepare</code>
        script, so both tiers are live from the first commit rather than from whenever somebody
        remembers to run the setup step.
      </p>`),

  existingHeading: "On bread you already baked",

  existingBody: html(`
      <p>
        Harder, far more common, and the order matters more than the files do. Added one at a
        time in this order, every step stays readable. Added all at once, you get four thousand
        lines of diff and no idea which change caused which failure.
      </p>
      <ol>
        <li>
          <strong><code>tsconfig.base.json</code> first.</strong> It produces the longest list
          of things to fix and nothing else depends on it being clean, so it is the one worth
          absorbing while you still have patience. Expect
          <code>noUncheckedIndexedAccess</code> to find the most by a wide margin — that is the
          flag earning its place, not a reason to drop it.
        </li>
        <li>
          <strong>Biome next.</strong> One tool for lint and format, which in practice means
          deleting your Prettier and ESLint configs rather than adding a third thing with an
          opinion. The first <code>biome check --write</code> is an enormous diff. Land it on
          its own commit so review has nothing to read.
        </li>
        <li>
          <strong>The CI gate third.</strong> Lint and typecheck are green by now, so wire them
          into one aggregate job and point branch protection at that job alone. Do this before
          the hooks, so enforcement arrives from the outside in and nobody can quietly skip it.
        </li>
        <li>
          <strong>Hooks fourth.</strong> Staged files only on pre-commit, whole repo on
          pre-push. The split is the part that matters: a pre-commit hook that takes longer
          than a second gets bypassed with <code>--no-verify</code>, and a hook everyone
          bypasses is worse than no hook.
        </li>
        <li>
          <strong>Knip last.</strong> It needs the others quiet before its output is readable,
          and it finds more than you expect — unused exports, dependencies nothing imports,
          entry files that stopped being entries two refactors ago.
        </li>
      </ol>
      <p>
        The order is the opinionated part. Anyone can list seven files.
      </p>`),
};
