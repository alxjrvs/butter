import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "./page.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist");
const outFile = join(outDir, "index.html");

const html = renderPage();

await mkdir(outDir, { recursive: true });
await writeFile(outFile, html, "utf8");

// GitHub Pages serves this repo under /butter/, so a root-absolute reference in
// the built HTML resolves against the wrong origin path and 404s. Nothing in the
// page should need one — the CSS is inlined and the icon is a data URI — so this
// asserts the property instead of trusting it. It is the "promote a convention
// into an executable check" rule applied to the one convention this app has.
const rootAbsolute = /\s(?:href|src)="\//g;
const offenders = html.match(rootAbsolute);
if (offenders !== null) {
  console.error(
    `build: ${offenders.length} root-absolute reference(s) in the built HTML. ` +
      "The site is published under a sub-path (/butter/); use a relative path or a data: URI.",
  );
  process.exit(1);
}

console.log(`build: wrote ${outFile} (${html.length} bytes)`);
