import type { StoryModule } from "../story.ts";
import { Stamp } from "./Stamp.ts";

export const story: StoryModule = {
  tier: "marks",
  component: "Stamp",
  stories: [
    {
      name: "footer",
      render: () => Stamp("alxjrvs/butter · alxjrvs/boom · net wt 4 oz"),
    },
  ],
};
