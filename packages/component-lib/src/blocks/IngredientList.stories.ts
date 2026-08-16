import { INGREDIENTS } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { IngredientList } from "./IngredientList.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "IngredientList",
  stories: [
    { name: "the stack", render: () => IngredientList(INGREDIENTS) },
    {
      name: "no version",
      render: () => IngredientList(INGREDIENTS.slice(5, 6)),
    },
  ],
};
