import { html } from "@butter/core";
import type { StoryModule } from "../story.ts";
import { SectionShell } from "./SectionShell.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "SectionShell",
  stories: [
    {
      name: "chrome only",
      render: () =>
        SectionShell({
          id: "example",
          tbsp: 3,
          label: "Layers",
          heading: "Eight layers",
          body: html('<div class="prose"><p>Body goes here.</p></div>'),
        }),
    },
  ],
};
