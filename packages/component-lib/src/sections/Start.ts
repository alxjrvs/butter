import { START } from "@butter/content";
import { type Html, html } from "@butter/core";
import { CodeBlock } from "../blocks/CodeBlock.ts";
import { CommandBlock } from "../blocks/CommandBlock.ts";
import { SectionShell } from "../blocks/SectionShell.ts";

/** The page closes on an action rather than a caveat. */
export function Start(): Html {
  return SectionShell({
    id: "start",
    heading: START.heading,
    body: html(`${CodeBlock({ caption: "the scaffold", source: START.tree })}
    <div class="prose">${START.body}
    </div>
${CommandBlock(START.commands)}`),
  });
}
