import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { visualizer } from "rollup-plugin-visualizer";

// Enable a treemap of the production client bundle by running:
//   ANALYZE=1 bun run build
// The report is written to dist/stats.html (opened locally).
const analyze = process.env.ANALYZE === "1" || process.env.ANALYZE === "true";

export default defineConfig({
  // No custom SSR entry, no Nitro preset. TanStack Start's default build emits
  // client assets to `dist/` — perfect for pure static hosting on Netlify,
  // Vercel (static), or Cloudflare Pages. SPA fallback is handled per-platform
  // (see netlify.toml).
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
      watch: {
        ignored: ["**/node_modules/**", "**/dist/**", "**/.output/**"],
      },
    },
    build: {
      assetsInlineLimit: 4096,
    },
    plugins: analyze
      ? [
          visualizer({
            filename: "dist/stats.html",
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            open: false,
          }),
        ]
      : [],
  },
});
