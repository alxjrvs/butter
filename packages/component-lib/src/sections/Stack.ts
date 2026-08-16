import { SPEC } from "@butter/content";
import { type Html, html } from "@butter/core";
import { SectionShell } from "../blocks/SectionShell.ts";
import { SpecPanel } from "../blocks/SpecPanel.ts";

/** Tablespoon one: what the stack is, before any argument for it. */
export function Stack(): Html {
  return SectionShell({
    id: "stack",
    tbsp: 1,
    label: "Stack",
    heading: "Stack Facts",
    body: html(`    <div class="panel-hold">
${SpecPanel({ serving: SPEC.serving, groups: SPEC.groups, free: SPEC.free })}
      <div class="prose">
        <p>
          A nutrition label lists what is in the package. Left column the layer, right column
          the version, rule weights carrying the grouping — core, gates, interface, platform.
        </p>
        <p>
          Versions come from the catalog in the root <code>package.json</code> and are checked
          against it by a test, so nothing here can describe a toolchain nobody is running. An
          em dash means the layer has no pinned version, not that it is missing.
        </p>
      </div>
    </div>`),
  });
}
