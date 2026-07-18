// Generate a static sitemap.xml and refresh robots.txt Sitemap line at build time.
// Runs as a prebuild step so Netlify (and every target) ships a pure-static sitemap.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = (process.env.VITE_SITE_URL || "https://www.tentdecorexpo.com").replace(/\/$/, "");

// Parse event ids from eventsData.ts (id: "slug-year") without requiring a TS loader.
const eventsSource = readFileSync(path.join(ROOT, "src/data/eventsData.ts"), "utf8");
const eventIds = [...eventsSource.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/events", changefreq: "monthly", priority: "0.9" },
  { path: "/event-details", changefreq: "weekly", priority: "0.9" },
  { path: "/members", changefreq: "monthly", priority: "0.7" },
  { path: "/visitors", changefreq: "monthly", priority: "0.8" },
  { path: "/exhibitors", changefreq: "monthly", priority: "0.8" },
  { path: "/registration", changefreq: "weekly", priority: "0.9" },
  { path: "/gallery", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
];

const eventRoutes = eventIds.map((id) => ({
  path: `/event/${id}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const urls = [...staticRoutes, ...eventRoutes]
  .map(
    (e) =>
      `  <url>\n    <loc>${SITE_URL}${e.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(path.join(ROOT, "public/sitemap.xml"), xml);
console.log(`[gen-sitemap] wrote public/sitemap.xml (${staticRoutes.length + eventRoutes.length} URLs)`);
