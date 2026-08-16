import { type Html, html } from "@butter/core";

export const CREAM: {
  readonly heading: string;
  readonly deck: string;
  readonly intro: Html;
  readonly outro: Html;
} = {
  heading: "Cream",
  deck: "What goes in",

  intro: html(`
      <p>
        Good butter is mostly a question of good cream. Nothing on this list is exotic, and
        that is deliberate — every piece is something you would probably reach for anyway.
      </p>
      <p>
        The value is not in any single choice. It is in having made all of them once, together,
        so that a new repository starts out already decided. No week of picking a formatter.
        No third opinion about path aliases.
      </p>`),

  outro: html(`
      <p>
        One tool per job, and never a second tool doing the same job differently. That rule on
        its own removes most of the configuration a monorepo usually accumulates, because most
        of that configuration exists to make two overlapping tools agree.
      </p>`),
};
