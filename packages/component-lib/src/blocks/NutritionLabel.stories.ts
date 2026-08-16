import { ALSO_INSIDE, FREE_FROM, NAME_KEY } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { NutritionLabel } from "./NutritionLabel.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "NutritionLabel",
  stories: [
    {
      name: "butter facts",
      render: () =>
        NutritionLabel({
          nameKey: NAME_KEY,
          also: ALSO_INSIDE,
          freeFrom: FREE_FROM,
        }),
    },
    {
      name: "no sub-entries",
      render: () =>
        NutritionLabel({
          nameKey: NAME_KEY.slice(0, 2),
          also: [],
          freeFrom: FREE_FROM,
        }),
    },
  ],
};
