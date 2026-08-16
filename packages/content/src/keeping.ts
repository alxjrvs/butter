import { type Html, html } from "@butter/core";

export const KEEPING: {
  readonly heading: string;
  readonly deck: string;
  readonly body: Html;
} = {
  heading: "Keeping",
  deck: "How this stays true after everyone walks away",

  body: html(`
      <p>
        Butter keeps if you handle it right and turns on you if you don't. A stack document has
        the same failure mode, and a worse one: the day it stops matching the repository it
        describes, it is not merely useless. It is confidently wrong, which costs more than
        saying nothing.
      </p>
      <p>
        So the page you are reading defends itself, using the same trick it is selling.
      </p>
      <ul>
        <li>
          <strong>Every version here is looked up, never typed.</strong> The component that
          prints one takes a catalog key rather than a string, and a test asserts every entry
          against the root <code>package.json</code> and <code>.bun-version</code>. Bump a
          dependency without updating the content and CI goes red.
        </li>
        <li>
          <strong>Every snippet is a literal excerpt</strong> of a file in this repository, not
          a tidied-up retelling of one.
        </li>
        <li>
          <strong>Markup lives in exactly one package</strong>, and a story-coverage test fails
          when a component has no story, or sits in the wrong tier, or has a story left behind
          after the component was deleted.
        </li>
        <li>
          <strong>Prose versus data is a type.</strong> Authored markup is a branded
          <code>Html</code> value and there is one function that produces it, so "prose renders
          raw, data gets escaped" is a compile error rather than a comment somebody has to
          remember.
        </li>
      </ul>
      <p>
        One last thing, because a repository is only half of reproducibility — the machine
        underneath it has to actually have the tools.
        <a href="https://github.com/alxjrvs/boom">boom</a> declares that machine in one
        <code>boomfile.toml</code> and converges to it: packages, dotfiles, secrets, timers,
        journaled so it can be rolled back. Its <code>boom code reap</code> also clears out
        spent agent worktrees by content rather than by SHA, which is the reason squash-merged
        branches stop piling up forever. Different tool, different repository, spreads on the
        same bread.
      </p>`),
};
