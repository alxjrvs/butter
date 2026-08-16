import { SECTIONS } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { RulerNav } from "./RulerNav.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "RulerNav",
  stories: [{ name: "eight tablespoons", render: () => RulerNav(SECTIONS) }],
};
