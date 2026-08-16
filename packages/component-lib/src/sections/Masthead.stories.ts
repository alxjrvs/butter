import type { StoryModule } from "../story.ts";
import { Masthead } from "./Masthead.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Masthead",
  stories: [{ name: "the wrapper", render: Masthead }],
};
