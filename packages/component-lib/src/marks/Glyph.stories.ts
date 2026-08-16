import { MASTHEAD } from "@butter/content";
import { joinHtml } from "@butter/core";
import type { StoryModule } from "../story.ts";
import { Glyph } from "./Glyph.ts";

export const story: StoryModule = {
  tier: "marks",
  component: "Glyph",
  stories: [
    {
      name: "the name key",
      render: () => joinHtml(MASTHEAD.glyphs.map(Glyph), ""),
    },
  ],
};
