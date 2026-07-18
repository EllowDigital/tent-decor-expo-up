import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { galleryData } from "@/data/galleryData";
import { SITE_URL } from "@/lib/seo";

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const Route = createFileRoute("/sitemap-images.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Deduplicate by src to avoid repeated <image:image> entries.
        const seen = new Set<string>();
        const unique = galleryData.filter((g) => {
          if (seen.has(g.src)) return false;
          seen.add(g.src);
          return true;
        });

        const images = unique
          .map((g) =>
            [
              `    <image:image>`,
              `      <image:loc>${SITE_URL}${g.src}</image:loc>`,
              `      <image:title>${escapeXml(g.alt)}</image:title>`,
              `      <image:caption>${escapeXml(g.alt)}</image:caption>`,
              `    </image:image>`,
            ].join("\n"),
          )
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
          `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          `  <url>`,
          `    <loc>${SITE_URL}/gallery</loc>`,
          images,
          `  </url>`,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
