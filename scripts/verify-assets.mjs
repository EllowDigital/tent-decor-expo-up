#!/usr/bin/env node
/**
 * Post-build asset verifier.
 *
 * Scans the built output (dist/ + .output/) plus source metadata (index.html,
 * manifest.webmanifest, robots.txt) for referenced asset URLs and asserts each
 * one resolves to a real file on disk. Fails the build (exit 1) on any miss.
 *
 * Rationale: we run this offline against the produced bundle so it works
 * identically in local `bun run build` and Netlify — no dev server
 * required, no flaky HTTP.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { globSync } from "glob";
import path from "node:path";

const ROOT = process.cwd();
const SEARCH_ROOTS = ["dist/client", "dist", "public"].filter((d) =>
  existsSync(path.join(ROOT, d)),
);



if (SEARCH_ROOTS.length === 0) {
  console.error("[verify-assets] No build output found. Run `bun run build` first.");
  process.exit(1);
}

// Match src="..." href="..." url(...) and "/assets/..." literals.
const URL_RE =
  /(?:src|href|content)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)|["'](\/(?:assets|images|img|icons|fonts)\/[^"']+)["']/g;

const SKIP_PROTOCOL = /^(https?:|data:|blob:|mailto:|tel:|#|\/\/)/i;

const files = SEARCH_ROOTS.flatMap((r) =>
  globSync(`${r}/**/*.{html,js,mjs,css,webmanifest,xml,txt,json}`, { nodir: true }),
);

const found = new Set();
for (const f of files) {
  let txt;
  try {
    txt = await readFile(f, "utf8");
  } catch {
    continue;
  }
  for (const m of txt.matchAll(URL_RE)) {
    const u = m[1] || m[2] || m[3];
    if (!u || SKIP_PROTOCOL.test(u)) continue;
    if (!u.startsWith("/")) continue; // only site-absolute refs
    if (u.startsWith("/api/") || u.startsWith("/_")) continue;
    // strip query/hash
    const clean = u.split(/[?#]/)[0];
    if (
      !/\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf|mp4|webm|pdf|json|xml|txt|webmanifest)$/i.test(
        clean,
      )
    )
      continue;
    found.add(clean);
  }
}

const roots = SEARCH_ROOTS.filter((r) => r !== "public");
const missing = [];
for (const url of found) {
  const candidates = [...roots.map((r) => path.join(ROOT, r, url)), path.join(ROOT, "public", url)];
  const ok = candidates.some((p) => existsSync(p));
  if (!ok) missing.push(url);
}

console.log(`[verify-assets] Scanned ${files.length} files, checked ${found.size} asset URLs.`);
if (missing.length) {
  console.error(`\n[verify-assets] ❌ ${missing.length} missing asset(s):`);
  for (const m of missing.sort()) console.error("  - " + m);
  process.exit(1);
}
console.log("[verify-assets] ✅ All referenced assets resolve.");
