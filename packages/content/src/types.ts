import type { Html } from "@butter/core";

/** A line in a terminal block. `note` renders as an aligned trailing comment. */
export type Command = {
  readonly cmd: string;
  readonly note?: string;
};

/**
 * One of the six words the name is built from.
 *
 * There is no `letter` field: the label picks out `word`'s first character, so
 * storing the initial separately would let the two disagree. `name-key.test.ts`
 * asserts the initials still spell BUTTER.
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
