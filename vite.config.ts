import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { visualizer } from "rollup-plugin-visualizer";

// Enable a treemap of the production client bundle by running:
//   ANALYZE=1 bun run build
// The report is written to dist/stats.html.
const analyze = process.env.ANALYZE === "1" || process.env.ANALYZE === "true";

export default defineConfig({
  // Netlify plugin owns SSR wiring, so disable Nitro entirely.
  nitro: false,

  tanstackStart: {
    server: { entry: "server" },
  },

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
    plugins: [
      // Official Netlify integration for TanStack Start — handles SSR
      // function output, redirects, and headers automatically.
      netlify(),
      ...(analyze
        ? [
            visualizer({
              filename: "dist/stats.html",
              template: "treemap",
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
    ],
  },
});
