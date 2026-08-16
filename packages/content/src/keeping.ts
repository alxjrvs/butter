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
          <strong>Version claims are checked, not remembered.</strong> The page commits to
          majors and nothing finer, because a patch number is noise here and dates the copy
          within a week. A test asserts the major this repository installs is still the one the
          page claims, so a jump to TypeScript 8 turns the build red until somebody decides what
          the page ought to say.
        </li>
        <li>
          <strong>The name key has to spell the name.</strong> The label picks each initial out
          of the word itself, and a test reads those initials back. Add a seventh favourite tool
          or reorder two, and the word the page is named after stops spelling — loudly, at
          build time, rather than quietly to whoever reads down the left edge.
        </li>
        <li>
          <strong>The page's structure comes from one package.</strong> Every section, list and
          panel is a component, and a story-coverage test fails when one has no story, sits in
          the wrong tier, or leaves a story behind after it is deleted. Prose keeps the inline
          markup prose needs — a <code>&lt;code&gt;</code> here, a link there — and that is the
          seam between the two packages rather than a rule being bent.
        </li>
        <li>
          <strong>Every snippet is checked against the file it quotes.</strong> A config gains a
          command, the page keeps showing the old one, CI goes red. That one is here because the
          page had already drifted before anybody noticed.
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
