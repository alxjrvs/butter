import type { StoryModule } from "../story.ts";
import { Churn } from "./Churn.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Churn",
  stories: [{ name: "tbsp 2", render: Churn }],
};
