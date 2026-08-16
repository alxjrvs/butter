import { html } from "@butter/core";
import type { StoryModule } from "../story.ts";
import { SectionShell } from "./SectionShell.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "SectionShell",
  stories: [
    {
      name: "heading and deck",
      render: () =>
        SectionShell({
          id: "example",
          heading: "Buttermilk",
          deck: "What gets poured off",
          body: html('<div class="prose"><p>Body goes here.</p></div>'),
        }),
    },
  ],
};
