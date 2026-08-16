import type { StoryModule } from "../story.ts";
import { Buttermilk } from "./Buttermilk.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Buttermilk",
  stories: [{ name: "tbsp 6", render: Buttermilk }],
};
