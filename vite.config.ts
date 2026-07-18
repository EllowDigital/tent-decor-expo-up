import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { visualizer } from "rollup-plugin-visualizer";

// Enable a treemap of the production client bundle by running:
//   ANALYZE=1 bun run build
// The report is written to dist/stats.html (opened locally).
const analyze = process.env.ANALYZE === "1" || process.env.ANALYZE === "true";

export default defineConfig({
  // Pure static SPA build. TanStack Start's SPA mode emits a static shell
  // (dist/client/index.html) plus per-route prerendered HTML, so Netlify
  // (and any static host) serves the site with zero server functions.
  tanstackStart: {
    spa: {
      enabled: true,
      // Every unmatched path falls back to this prerendered shell (SPA fallback).
      maskPath: "/",
    },
    // Prerender each route to its own HTML file for SEO / social sharing.
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/events" },
      { path: "/event-details" },
      { path: "/members" },
      { path: "/visitors" },
      { path: "/exhibitors" },
      { path: "/registration" },
      { path: "/gallery" },
      { path: "/contact" },
      { path: "/upcoming" },
    ],
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
