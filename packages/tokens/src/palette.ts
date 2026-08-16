/**
 * Two colours: butter yellow and a printing-ink blue, on warm paper.
 *
 * The blue does double duty as the text colour, which is what keeps the page
 * to two inks instead of two inks plus a neutral. Yellow appears in one large
 * field at the top and then only in small quantities — a rule, a highlight, a
 * link underline. Spending it everywhere is what made the earlier draft read
 * as a costume rather than a colour scheme.
 *
 * `LIGHT` is the complete palette; the `Palette` type forces `DARK` to define
 * every key, because a token that exists only in the dark map has no light
 * value at all.
 */

export type Palette = {
  readonly paper: string;
  readonly sunken: string;
  /** body text, and the blue */
  readonly ink: string;
  readonly ink2: string;
  readonly ink3: string;
  readonly rule: string;

  /** butter, at full strength */
  readonly accent: string;
  /** butter, dark enough to set small text on paper */
  readonly accentInk: string;

  /** the one large field of colour, at the top of the page */
  readonly bannerBg: string;
  readonly bannerInk: string;
  readonly bannerInk2: string;

  /** the label's stock — a printed panel sitting on the page */
  readonly labelBg: string;
  readonly labelInk: string;

  readonly termBg: string;
  readonly termInk: string;
  readonly termDim: string;
};

export const LIGHT: Palette = {
  paper: "#fbf7ea",
  sunken: "#f2ecd8",
  ink: "#14264f",
  ink2: "#4c5878",
  ink3: "#8189a1",
  rule: "#ddd4b8",

  accent: "#f5c543",
  accentInk: "#9a7005",

  bannerBg: "#f5c543",
  bannerInk: "#14264f",
  bannerInk2: "#3d4a70",

  labelBg: "#fffdf5",
  labelInk: "#14264f",

  termBg: "#14264f",
  termInk: "#f0e8d2",
  termDim: "#93a3c8",
};

export const DARK: Palette = {
  paper: "#0e1424",
  sunken: "#161d31",
  ink: "#f2ecda",
  ink2: "#a8b0c6",
  ink3: "#79819a",
  rule: "#262f47",

  accent: "#f5c543",
  accentInk: "#f0c14a",

  bannerBg: "#f5c543",
  bannerInk: "#14264f",
  bannerInk2: "#3d4a70",

  labelBg: "#141d33",
  labelInk: "#f2ecda",

  termBg: "#080d1a",
  termInk: "#eae2cc",
  termDim: "#8492b6",
};
