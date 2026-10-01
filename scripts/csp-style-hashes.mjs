// Post-build: allow the inlined stylesheet by hash, not by 'unsafe-inline'.
//
// Astro inlines the CSS into each page (build.inlineStylesheets: "always") so
// the first paint doesn't wait on a separate request - on a slow phone that
// request was the only render-blocking thing left. Our CSP is `style-src
// 'self'`, which blocks inline <style> silently, so this adds a 'sha256-…'
// source for each distinct <style> block to dist/_headers. Any other inline
// style is still blocked. check-html.py fails the build if a block's hash is
// missing, so this can't drift.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const pages = readdirSync(dist).filter((f) => f.endsWith(".html"));
const hashes = new Set();
for (const page of pages) {
  const html = readFileSync(join(dist, page), "utf8");
  for (const [, css] of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    hashes.add(`'sha256-${createHash("sha256").update(css, "utf8").digest("base64")}'`);
  }
}

const headersPath = join(dist, "_headers");
const headers = readFileSync(headersPath, "utf8");
const marker = "style-src 'self'";
if (!headers.includes(marker)) throw new Error(`csp-style-hashes: "${marker}" not found in _headers`);
writeFileSync(headersPath, headers.replace(marker, [marker, ...[...hashes].sort()].join(" ")));
console.log(`csp-style-hashes: ${hashes.size} inline stylesheet hash(es) across ${pages.length} pages`);
