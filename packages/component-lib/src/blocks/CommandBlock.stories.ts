import { SPREAD, WRAPPER } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { CommandBlock } from "./CommandBlock.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "CommandBlock",
  stories: [
    { name: "getting started", render: () => CommandBlock(WRAPPER.commands) },
    { name: "a fresh loaf", render: () => CommandBlock(SPREAD.freshCommands) },
  ],
};
