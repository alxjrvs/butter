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
 * row per thing, one value per row, and a hierarchy carried by rule weight
 * rather than by a legend the reader has to decode. The bold rows are the six
 * letters of the name, so the acronym gets explained by the same object that
 * lists what is in the tin.
 *
 * The panel is the one place the page uses Helvetica. That is the face real
 * labels are set in, and keeping it inside this border is what makes the thing
 * read as a quoted artifact rather than as the page changing its voice.
 */
function value(version: string | undefined): string {
  return version === undefined ? "—" : escapeHtml(version);
}

export function NutritionLabel(props: NutritionLabelProps): Html {
  const key = props.nameKey
    .map(
      (entry) => `      <div class="lrow">
        <div class="lhead">
          <span><b class="letter">${escapeHtml(entry.letter)}</b>${escapeHtml(entry.word)}</span>
          <span class="lv">${value(entry.version)}</span>
        </div>
        <p class="ldetail">${escapeHtml(entry.detail)}</p>
      </div>`,
    )
    .join("\n");

  const also = props.also
    .map(
      (entry) => `      <div class="lrow sub">
        <div class="lhead">
          <span>${escapeHtml(entry.layer)}</span>
          <span class="lv">${value(entry.version)}</span>
        </div>
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
      <div class="lhead lamount"><span>Amount per repo</span><span>Version</span></div>
      <hr class="hair">
${key}
      <hr class="mid">
${also}
      <hr class="thick">
      <p class="lfree">Contains ${free}.</p>
    </figure>`);
}
