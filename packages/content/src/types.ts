import type { Html } from "@butter/core";

/** A line in a terminal block. `note` renders as an aligned trailing comment. */
export type Command = {
  readonly cmd: string;
  readonly note?: string;
};

/** One row of the stack list: what it is, what it's for, what version. */
export type SpecRow = {
  readonly layer: string;
  readonly detail: string;
  readonly version?: string;
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

/** A literal excerpt of a file in this repository. */
export type Snippet = {
  readonly caption: string;
  readonly source: string;
};

export type SectionRef = {
  readonly id: string;
  readonly label: string;
};
