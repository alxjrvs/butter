import { MACHINE, MASTHEAD } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { CommandBlock } from "./CommandBlock.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "CommandBlock",
  stories: [
    { name: "getting started", render: () => CommandBlock(MASTHEAD.commands) },
    { name: "long lines", render: () => CommandBlock(MACHINE.commands) },
  ],
};
