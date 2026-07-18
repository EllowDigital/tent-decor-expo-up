import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { EDITIONS } from "@/data/constants";

// TODO: replace with the production URL once a project domain or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);

        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/events", changefreq: "monthly", priority: "0.8" },
          { path: "/members", changefreq: "monthly", priority: "0.6" },
          { path: "/visitors", changefreq: "monthly", priority: "0.7" },
          { path: "/exhibitors", changefreq: "monthly", priority: "0.7" },
          { path: "/registration", changefreq: "weekly", priority: "0.9" },
          { path: "/gallery", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
          { path: "/epass-status", changefreq: "monthly", priority: "0.4" },
          { path: "/upcoming", changefreq: "weekly", priority: "0.9" },
        ];

        const eventEntries: SitemapEntry[] = EDITIONS.map((e) => ({
          path: `/event/${e.slug}`,
          changefreq: e.status === "upcoming" ? "weekly" : "yearly",
          priority: e.status === "upcoming" ? "0.9" : "0.6",
        }));

        const urls = [...staticEntries, ...eventEntries].map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
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
