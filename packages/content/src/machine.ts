import { type Html, html } from "@butter/core";
import type { Command } from "./types.ts";

export const MACHINE: {
  readonly heading: string;
  readonly intro: Html;
  readonly commands: readonly Command[];
  readonly body: Html;
} = {
  heading: "The machine underneath",

  intro: html(`
      <p>
        A gated repo assumes a machine that has the tools. boom declares that machine: one
        <code>boomfile.toml</code> in your dotfiles repo, and <code>boom source</code> converges
        to it — packages, dotfiles, secrets, timers — journaling each change so
        <code>boom rollback</code> can undo it.
      </p>`),

  commands: [
    {
      cmd: "curl -fsSL https://raw.githubusercontent.com/alxjrvs/boom/main/install.sh | sh",
    },
    {
      cmd: "boom source set alxjrvs/dotfiles",
      note: "clone the config repo and converge",
    },
    { cmd: "boom verify", note: "drift check — exit 0 ok / 2 warn / 1 fail" },
    { cmd: "boom code reap", note: "remove spent agent worktrees" },
  ],

  body: html(`
      <p>
        <code>verify</code> turns "works on my machine" into a status code, which is the version
        of that sentence a CI job can read.
      </p>
      <p>
        <code>code reap</code> is the one that earns its place after a week of agent work.
        Claude Code won't remove a worktree whose commits exist on no remote, and it tests SHA
        identity — so a squash-merged branch always fails that test, because the content landed
        on the default branch under a new SHA. Worktrees accumulate and sessions can't be
        closed. <code>reap</code> re-asks the question by content, using git's patch-id
        equivalence, and removes a worktree only when it is clean, unlocked, and either pushed
        or already merged. It deletes directories and never branch refs.
      </p>`),
};
