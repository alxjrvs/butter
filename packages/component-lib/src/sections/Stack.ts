import { SPEC } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";
import { StackList } from "../blocks/StackList.ts";

/** What the stack is, before any argument for it. */
export function Stack(): Html {
  return SectionShell({
    id: "stack",
    heading: "The stack",
    body: html(`    <div class="prose">
      <p>
        Versions are read from the catalog in the root <code>package.json</code> and checked
        against it by a test, so nothing here describes a toolchain nobody is running.
      </p>
    </div>
${StackList(SPEC)}`),
  });
}
