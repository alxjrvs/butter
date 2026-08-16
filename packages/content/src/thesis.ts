import { type Html, html } from "@butter/core";

export const THESIS: {
  readonly heading: string;
  readonly body: Html;
} = {
  heading: "Every convention here exits non-zero",

  body: html(`
      <p>
        That's the whole opinion. A convention in a README is advice. The same convention as a
        <code>check:*</code> script wired into the CI gate is a fact about the branch.
      </p>
      <p>
        The distinction is survivable while every contributor has read the README. It stops
        being survivable when the contributor writing most of the code reads it once, at the
        top of a session, then works for two hours at a rate no reviewer matches. Advice
        doesn't scale to that. A failing exit code does.
      </p>
      <p>
        So the stack spends its complexity budget on gates rather than guidelines.
        <code>strict</code> plus five more compiler flags instead of a style guide. Biome
        instead of a formatting argument. Knip instead of a reminder to delete dead code. One
        required check instead of a list of things to run before pushing.
      </p>
      <p>
        The rule that follows: anything you would otherwise write as a convention in
        <code>CLAUDE.md</code> becomes a <code>check:*</code> script wired into the gate.
      </p>`),
};
