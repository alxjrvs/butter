/**
 * Two inks on stock: butter yellow and a printing-ink ultramarine, with a wax
 * paper ground. Dark mode inverts the *stock*, not the scheme — the same two
 * colours, printed the other way round.
 *
 * `LIGHT` is the complete palette. `DARK` must define every key `LIGHT` does,
 * which the `Palette` type enforces: a token that exists only in the dark map
 * has no light value at all, and the page renders one theme's text on the
 * other theme's ground.
 */

export type Palette = {
  /** page ground */
  readonly paper: string;
  /** raised ground: panels, cards */
  readonly surface: string;
  /** recessed ground: code, callouts */
  readonly sunken: string;
  /** body text */
  readonly ink: string;
  /** secondary text */
  readonly ink2: string;
  /** metadata, captions */
  readonly ink3: string;
  readonly rule: string;
  readonly rule2: string;
  /** hard rules and headings — full contrast against paper */
  readonly hard: string;

  /** butter, at full saturation. Never used for text on paper. */
  readonly accent: string;
  /** butter, darkened enough to set small text on paper */
  readonly accentInk: string;
  readonly link: string;
  /** the one spot colour */
  readonly red: string;

  /** the wrapper: masthead ground and its printed ink */
  readonly wrapBg: string;
  readonly wrapInk: string;
  readonly wrapInk2: string;
  readonly wrapRule: string;

  /** the facts panel: wax paper stock */
  readonly panelBg: string;
  readonly panelInk: string;

  /** terminal blocks */
  readonly termBg: string;
  readonly termInk: string;
  readonly termAccent: string;
  readonly termDim: string;
};

export type TokenName = keyof Palette;

export const LIGHT: Palette = {
  paper: "#f6f0de",
  surface: "#fdfaef",
  sunken: "#ede4c8",
  ink: "#101b3e",
  ink2: "#4a5480",
  ink3: "#7c84a4",
  rule: "#d6c9a5",
  rule2: "#bfaf83",
  hard: "#101b3e",

  accent: "#f5c543",
  accentInk: "#a87c06",
  link: "#16327f",
  red: "#b8341f",

  wrapBg: "#f5c543",
  wrapInk: "#16327f",
  wrapInk2: "#0d1f55",
  wrapRule: "#16327f",

  panelBg: "#fcf6e4",
  panelInk: "#0d1f55",

  termBg: "#0d1f55",
  termInk: "#f0e3b8",
  termAccent: "#f5c543",
  termDim: "#98aee4",
};

export const DARK: Palette = {
  paper: "#0a1024",
  surface: "#0f1730",
  sunken: "#141c38",
  ink: "#f4eedc",
  ink2: "#a3abc9",
  ink3: "#737c9f",
  rule: "#232d4d",
  rule2: "#34406a",
  hard: "#f4eedc",

  accent: "#f5c543",
  accentInk: "#f5c543",
  link: "#f5c543",
  red: "#e8705c",

  wrapBg: "#14203f",
  wrapInk: "#f5c543",
  wrapInk2: "#cbd3ec",
  wrapRule: "#f5c543",

  panelBg: "#101a36",
  panelInk: "#f4eedc",

  termBg: "#060b1a",
  termInk: "#e9dcb4",
  termAccent: "#f5c543",
  termDim: "#7e8cb8",
};
