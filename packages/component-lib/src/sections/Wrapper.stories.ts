import type { StoryModule } from "../story.ts";
import { Wrapper } from "./Wrapper.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Wrapper",
  stories: [{ name: "the wrapper", render: Wrapper }],
};
