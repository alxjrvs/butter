import type { StoryModule } from "../story.ts";
import { Recipe } from "./Recipe.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Recipe",
  stories: [{ name: "tbsp 5", render: Recipe }],
};
