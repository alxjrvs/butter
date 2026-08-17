import type { Html } from "@butter/core";

/** A line in a terminal block. `note` renders as an aligned trailing comment. */
export type Command = {
  readonly cmd: string;
  readonly note?: string;
};

/**
 * One letter of B·U·T·T·E·R, and the choice it stands for.
 *
 * There is no separate `letter`, and that is the point: the letter *is* the
 * first character of `word`, coloured where it already sits. Held as its own
 * field it was printed beside the word — "B Bun" — which announces the acronym
 * twice and lets the two disagree.
 *
 * What stops the key drifting into a list of favourite tools is no longer a
 * required field but `acronym.test.ts`, which asserts the initials still spell
 * the name. That is the stronger rule anyway: a field only demanded that an
 * entry carry *a* letter, not that the letters add up to anything.
 */
export type NameKeyEntry = {
  readonly word: string;
  readonly detail: string;
};

/** Everything else in the tin. Set as the label's indented sub-entries. */
export type Ingredient = {
  readonly layer: string;
  readonly detail: string;
};

/** One of the eight layers. `body` is authored markup; the rest is data. */
export type Layer = {
  readonly title: string;
  readonly tag: string;
  readonly body: Html;
};

export type Exclusion = {
  readonly term: Html;
  readonly reason: Html;
};

/**
 * A deployable this page points at, as data rather than a link in the prose.
 *
 * `href` is absolute and always a public repository: the page is published
 * under a path prefix, so a root-absolute reference would 404 there, and an
 * example a reader cannot open is a claim rather than an example.
 */
export type AppRef = {
  readonly label: string;
  readonly href: string;
};

/**
 * One of the shapes an `apps/*` entry gets pressed into.
 *
 * `apps` is a non-empty tuple rather than an array, which is the difference
 * between requiring the field and requiring an answer: `readonly AppRef[]`
 * admits `[]`, and a shape with nothing in it is the exact claim this section
 * exists to avoid making. Empty is now a compile error.
 */
export type Mould = {
  readonly shape: string;
  readonly tag: string;
  readonly apps: readonly [AppRef, ...AppRef[]];
  readonly body: Html;
};

/**
 * A contiguous run of lines quoted from a file in this repository.
 *
 * `file` is repo-relative and is what `recipe.test.ts` reads to prove the quote
 * still matches. It is required, so a snippet cannot be added without also
 * saying where it came from.
 */
export type Snippet = {
  readonly caption: string;
  readonly file: string;
  readonly source: string;
};

export type SectionRef = {
  readonly id: string;
  readonly label: string;
};
