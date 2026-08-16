import type { StoryModule } from "../story.ts";
import { Band } from "./Band.ts";

export const story: StoryModule = {
  tier: "marks",
  component: "Band",
  stories: [
    {
      name: "wrapper",
      render: () => Band(["Sweet cream", "Grade AA", "Net wt 4 oz"]),
    },
  ],
};
