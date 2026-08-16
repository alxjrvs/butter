import type { Html } from "@butter/core";

/** A line in a terminal block. `note` renders as an aligned trailing comment. */
export type Command = {
  readonly cmd: string;
  readonly note?: string;
};

/** One letter of B·U·T·T·E·R and the rest of its word. */
export type Glyph = {
  readonly letter: string;
  readonly word: string;
};

/**
 * A row of the facts panel. `lead` rows are the four the stack is named for and
 * render at full weight; the rest are indented, the way a nutrition label
 * subordinates a breakdown to its heading.
 */
export type SpecRow = {
  readonly label: string;
  readonly value: string;
  readonly lead: boolean;
};

export type SpecGroup = {
  readonly rows: readonly SpecRow[];
};

/** One of the eight layers. `body` is authored markup; the rest is data. */
export type Layer = {
  readonly n: string;
  readonly title: string;
  readonly tag: string;
  readonly body: Html;
};

export type Exclusion = {
  readonly term: Html;
  readonly reason: Html;
};

/** A literal excerpt of a file in this repository. */
export type Snippet = {
  readonly caption: string;
  readonly source: string;
};

/** A tablespoon. There are eight, and `RulerNav` refuses any other count. */
export type SectionRef = {
  readonly id: string;
  readonly label: string;
};
