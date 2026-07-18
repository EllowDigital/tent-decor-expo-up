import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { visualizer } from "rollup-plugin-visualizer";

// Enable a treemap of the production client bundle by running:
//   ANALYZE=1 bun run build
// The report is written to dist/stats.html (opened locally).
const analyze = process.env.ANALYZE === "1" || process.env.ANALYZE === "true";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
      // Disable browser caching in dev so image/metadata changes are reflected
      // immediately after HMR. Production builds emit hashed filenames and are
      // served with their platform's default long-lived cache headers.
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
      watch: {
        // Ensure edits to files under public/ and public/assets/ trigger reloads
        // on all platforms (Cloudflare Tunnel + Docker fs can miss inotify).
        ignored: ["**/node_modules/**", "**/dist/**", "**/.output/**"],
      },
    },
    build: {
      // Long-lived hashed filenames for cache busting in production.
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
