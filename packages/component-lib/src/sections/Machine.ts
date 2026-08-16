import { MACHINE } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** The half of reproducibility a repository can't cover. */
export function Machine(): Html {
  return SectionShell({
    id: "machine",
    heading: MACHINE.heading,
    body: html(`    <div class="prose">${MACHINE.intro}
    </div>
${CommandBlock(MACHINE.commands)}
    <div class="prose">${MACHINE.body}
    </div>`),
  });
}
