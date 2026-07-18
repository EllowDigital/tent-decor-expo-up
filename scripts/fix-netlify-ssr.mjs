#!/usr/bin/env node
/**
 * Netlify-only SSR wiring fix.
 *
 * Nitro's beta Netlify preset emits a valid Netlify Function wrapper, but in this
 * project it can route every request to the static renderer template instead of
 * the TanStack Start SSR service. That produces a blank page on Netlify while
 * Cloudflare/Lovable and Vercel remain fine.
 *
 * When building for Netlify, replace the generated main handler with a tiny
 * wrapper that delegates directly to the bundled SSR service. Do nothing for
 * every other deployment target.
 */
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const IS_NETLIFY_BUILD = process.env.DEPLOY_TARGET === "netlify" || process.env.NETLIFY === "true";

if (!IS_NETLIFY_BUILD) {
  process.exit(0);
}

const mainPath = path.join(ROOT, ".netlify/functions/server/main.mjs");
const ssrPath = path.join(ROOT, ".netlify/functions/server/_ssr/ssr.mjs");

if (!existsSync(mainPath) || !existsSync(ssrPath)) {
  console.error("[fix-netlify-ssr] ❌ Netlify SSR bundle is incomplete.");
  console.error("[fix-netlify-ssr] Expected .netlify/functions/server/main.mjs and _ssr/ssr.mjs.");
  process.exit(1);
}

await writeFile(
  mainPath,
  `import ssr from "./_ssr/ssr.mjs";\n\nconst ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;\n\nexport default async function handler(request, context) {\n  request.runtime ??= { name: "netlify" };\n  request.ip ??= request.headers.get("x-nf-client-connection-ip") || undefined;\n\n  const response = await ssr.fetch(request, {}, context);\n  const isr = request.context?.routeRules?.isr?.options;\n\n  if (isr) {\n    const maxAge = typeof isr === "number" ? isr : ONE_YEAR_IN_SECONDS;\n    const revalidateDirective =\n      typeof isr === "number" ? \`stale-while-revalidate=\${ONE_YEAR_IN_SECONDS}\` : "must-revalidate";\n\n    if (!response.headers.has("Cache-Control")) {\n      response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");\n    }\n    response.headers.set(\n      "Netlify-CDN-Cache-Control",\n      \`public, max-age=\${maxAge}, \${revalidateDirective}, durable\`,\n    );\n  }\n\n  return response;\n}\n`,
  "utf8",
);

console.log("[fix-netlify-ssr] ✅ Netlify function now delegates to TanStack SSR.");
