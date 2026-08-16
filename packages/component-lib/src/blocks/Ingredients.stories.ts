import { START } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { Ingredients } from "./Ingredients.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "Ingredients",
  stories: [
    {
      name: "the stack",
      render: () => Ingredients(START.contains, START.free),
    },
  ],
};
