import { type Html, html } from "@butter/core";
import type { Snippet } from "./types.ts";

export const GATE: {
  readonly heading: string;
  readonly intro: Html;
  readonly snippet: Snippet;
  readonly body: Html;
} = {
  heading: "The gate, and the two ways to get it wrong",

  intro: html(`
      <p>
        One job is the required check. Every other job reports into it, so branch protection is
        never edited when a job is added or skipped.
      </p>`),

  snippet: {
    caption: ".github/workflows/ci.yml",
    source: `CI-Success:
  name: CI Success
  if: always()
  needs: [lint, typecheck, knip, test, build]
  runs-on: ubuntu-latest
  steps:
    - name: Fail if any dependency failed
      if: contains(needs.*.result, 'failure') || contains(needs.*.result, 'cancelled')
      run: exit 1`,
  },

  body: html(`
      <p>
        <code>if: always()</code> makes the job <em>run</em> regardless of how its dependencies
        finished. It does not make it <em>fail</em> with them. Without that last step the job
        runs, has nothing to do, and reports success — so the one required check is permanently
        green no matter what broke.
      </p>
      <p>
        The condition tests for <code>failure</code> and <code>cancelled</code> rather than for
        "not <code>success</code>". A job legitimately skipped by a path filter then leaves the
        gate passing, instead of blocking the pull request forever.
      </p>
      <p>
        The second mistake is quieter. <code>needs:</code> lists every other job in the file. A
        job missing from that list can never fail the required check, and nothing warns you.
        Add a job, add it to <code>needs:</code> in the same commit.
      </p>`),
};
