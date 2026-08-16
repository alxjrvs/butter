import type { Ingredient, NameKeyEntry } from "@butter/content";
import { escapeHtml, type Html, html } from "@butter/core";

export type NutritionLabelProps = {
  readonly nameKey: readonly NameKeyEntry[];
  readonly also: readonly Ingredient[];
  readonly freeFrom: readonly string[];
};

/**
 * Butter Facts — the ingredient list, set as the panel it is imitating.
 *
 * A nutrition label is a very good fit for this data and not only a joke: one
 * row per thing, and a hierarchy carried by rule weight rather than by a legend
 * the reader has to decode. The bold rows are the six words the name is built
 * from, so the acronym gets explained by the same object that lists what is in
 * the tin.
 *
 * The initial is picked out of the word itself rather than printed beside it.
 * "B Bun" said the letter twice; "Bun" with a butter B says it once and still
 * reads down the left edge. `name-key.test.ts` asserts those initials still
 * spell the name.
 *
 * There is no version column. A patch number is noise here, and the one major
 * that earns a mention rides along in its own detail line.
 *
 * The panel is the one place the page uses Helvetica. That is the face real
 * labels are set in, and keeping it inside this border is what makes the thing
 * read as a quoted artifact rather than as the page changing its voice.
 */
function initialled(word: string): string {
  const initial = escapeHtml(word.slice(0, 1));
  const rest = escapeHtml(word.slice(1));
  return `<b class="letter">${initial}</b>${rest}`;
}

export function NutritionLabel(props: NutritionLabelProps): Html {
  const key = props.nameKey
    .map(
      (entry) => `      <div class="lrow">
        <p class="lname">${initialled(entry.word)}</p>
        <p class="ldetail">${escapeHtml(entry.detail)}</p>
      </div>`,
    )
    .join("\n");

  const also = props.also
    .map(
      (entry) => `      <div class="lrow sub">
        <p class="lname">${escapeHtml(entry.layer)}</p>
        <p class="ldetail">${escapeHtml(entry.detail)}</p>
      </div>`,
    )
    .join("\n");

  const free = props.freeFrom
    .map((item) => `no ${escapeHtml(item)}`)
    .join(", ");

  return html(`    <figure class="label">
      <p class="ltitle">Butter Facts</p>
      <p class="lserving">Serving size <b>1 monorepo</b></p>
      <hr class="thick">
      <p class="lamount">Amount per repo</p>
      <hr class="hair">
${key}
      <hr class="mid">
${also}
      <hr class="thick">
      <p class="lfree">Contains ${free}.</p>
    </figure>`);
}
