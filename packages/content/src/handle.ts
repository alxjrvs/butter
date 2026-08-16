import { type Html, html } from "@butter/core";
import type { Snippet } from "./types.ts";

export const HANDLE: {
  readonly heading: string;
  readonly deck: string;
  readonly intro: Html;
  readonly snippet: Snippet;
  readonly body: Html;
} = {
  heading: "One handle",
  deck: "The aggregate CI gate, and the two ways to get it wrong",

  intro: html(`
      <p>
        A churn has one crank. You turn it, and either the butter comes or it does not — there
        is no partial credit and nothing else to go and check.
      </p>
      <p>
        CI works the same way here. Jobs fan out as wide as you like, and exactly one of them is
        what branch protection requires. Add a job, and branch protection never has to be
        touched again.
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
        Which brings us to the two ways this goes wrong. Both of them look completely fine in
        review, and both of them fail silently rather than loudly, which is the worst way for a
        gate to fail.
      </p>
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
