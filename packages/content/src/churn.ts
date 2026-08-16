import { type Html, html } from "@butter/core";

/** The page calls this "The churn". It is the argument the whole stack rests on. */
export const CHURN: {
  readonly heading: string;
  readonly deck: string;
  readonly body: Html;
} = {
  heading: "The churn",
  deck: "Why every convention here exits non-zero",

  body: html(`
      <p>
        Cream does not turn into butter because you asked it nicely. It turns because you
        agitate it — the same motion, over and over, until the fat gives up and comes together.
        Nothing about that is clever. It is just relentless, and it does not skip a batch
        because everyone was busy that week.
      </p>
      <p>
        That is the whole opinion here. A convention written in a README is advice, and advice
        is worth exactly the odds that somebody read it. The same convention written as a
        <code>check:*</code> script and wired into the CI gate is a fact about the branch.
      </p>
      <p>
        The difference used to be survivable. Everyone contributing had read the README, or
        would get to it. It stopped being survivable when the contributor writing most of the
        code reads the README once, at the top of a session, and then works for two hours at a
        rate no reviewer matches. Advice does not scale to that. A failing exit code does.
      </p>
      <p>
        So the stack spends its complexity budget on the churn rather than on guidelines:
      </p>
      <ul>
        <li>
          <strong><code>strict</code> plus five more compiler flags</strong>, instead of a style
          guide about handling null
        </li>
        <li><strong>Biome</strong>, instead of an argument about formatting</li>
        <li><strong>Knip</strong>, instead of a note asking people to delete dead code</li>
        <li>
          <strong>One required check</strong>, instead of a list of things to remember before
          pushing
        </li>
      </ul>
      <p>
        The rule that falls out of it is the one worth stealing even if you take nothing else:
        <strong>anything you would otherwise write as a convention should instead become a
        check the gate runs.</strong> If it cannot be, it probably was not a convention. It was
        a preference.
      </p>
      <p>
        This repository holds itself to that. "Every component has a story" and "every version
        on the page matches the one we install" are both conventions somebody could have
        written down and hoped for. They are test files instead, and they fail the build.
      </p>`),
};
