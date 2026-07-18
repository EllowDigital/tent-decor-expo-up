/**
 * Centralised SEO helpers.
 *
 * SITE_URL is the single source of truth for absolute URLs used in
 * canonical <link>, og:url and JSON-LD. Set the env var VITE_SITE_URL
 * in production to override the default.
 */

export const SITE_URL: string = (() => {
  const raw =
    (typeof import.meta !== "undefined" &&
      (import.meta as unknown as { env?: Record<string, string | undefined> })
        .env?.VITE_SITE_URL) ||
    "https://www.tentdecorexpo.com";
  return raw.replace(/\/+$/, "");
})();

const SITE_NAME = "Tent Decor Expo UP";
const ORG_NAME = "Tent, Caterers & Decorators Welfare Association of UP";

/** Turn a route path into an absolute URL for og:url / canonical. */
export const abs = (path: string): string => {
  if (!path) return SITE_URL + "/";
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
};

export type PageSeoInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "event";
  /** Emit a WebPage JSON-LD block (default: true). */
  webPageSchema?: boolean;
  /** Extra JSON-LD blocks to inline. */
  extraJsonLd?: Array<Record<string, unknown>>;
};

type HeadDescriptor = {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
  scripts: Array<{ type: string; children: string }>;
};

export function buildHead(input: PageSeoInput): HeadDescriptor {
  const url = abs(input.path);
  const type = input.type ?? "website";
  const image = input.image ? abs(input.image) : undefined;

  const meta: Array<Record<string, string>> = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }

  const links = [{ rel: "canonical", href: url }];

  const scripts: HeadDescriptor["scripts"] = [];
  if (input.webPageSchema !== false) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: input.title,
        description: input.description,
        url,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
        ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
      }),
    });
  }
  for (const block of input.extraJsonLd ?? []) {
    scripts.push({ type: "application/ld+json", children: JSON.stringify(block) });
  }

  return { meta, links, scripts };
}

/** Site-wide WebSite JSON-LD (goes in __root.tsx). */
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
  inLanguage: "en-IN",
});

/**
 * Registry of the 6 main pages (used both by their routes and by the
 * /debug/seo validator so the two stay in sync).
 */
export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Tent Decor Expo UP — Kanpur 2026 | 4th Mahadhiveshan",
    description:
      "UP's premier B2B tent, decor and event expo. 30 Aug – 1 Sep 2026 at Sanskar Lawn, Kanpur.",
    image: "/assets/og-home.jpg",
  },
  about: {
    path: "/about",
    title: "About — Tent Decor Expo UP",
    description:
      "The Tent, Caterers & Decorators Welfare Association of UP — history, mission, vision and the goals behind Tent Decor Expo UP.",
  },
  events: {
    path: "/events",
    title: "Editions — Tent Decor Expo UP",
    description:
      "Every edition of the Mahadhiveshan — from the 2015 founding congress to Kanpur 2026 and beyond.",
  },
  gallery: {
    path: "/gallery",
    title: "Gallery — Tent Decor Expo UP",
    description:
      "Highlights, aftermovies and unforgettable moments from every edition of the Mahadhiveshan.",
  },
  contact: {
    path: "/contact",
    title: "Contact — Tent Decor Expo UP",
    description:
      "Reach the Kanpur 2026 team — phone, email, venue and social. FAQs answered.",
  },
  registration: {
    path: "/registration",
    title: "Registration & Booking — Tent Decor Expo UP",
    description:
      "Join the next Tent Decor Expo UP — Visitor E-Pass and Exhibitor Stall Booking. Official external portal for the current edition.",
  },
} as const satisfies Record<string, PageSeoInput>;

export type PageKey = keyof typeof PAGE_SEO;

/* -------------------------- validator -------------------------- */

export type SeoIssue = { level: "error" | "warn"; msg: string };

export function validateHead(head: HeadDescriptor, expectedUrl: string): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const get = (pred: (m: Record<string, string>) => boolean) =>
    head.meta.find(pred)?.content || head.meta.find(pred)?.title;

  const title = head.meta.find((m) => "title" in m)?.title;
  const desc = get((m) => m.name === "description");
  const ogTitle = get((m) => m.property === "og:title");
  const ogDesc = get((m) => m.property === "og:description");
  const ogUrl = get((m) => m.property === "og:url");
  const ogType = get((m) => m.property === "og:type");
  const twCard = get((m) => m.name === "twitter:card");
  const canonical = head.links.find((l) => l.rel === "canonical")?.href;

  if (!title) issues.push({ level: "error", msg: "Missing <title>" });
  else if (title.length > 65) issues.push({ level: "warn", msg: `Title ${title.length} chars (>65)` });
  if (!desc) issues.push({ level: "error", msg: "Missing meta description" });
  else if (desc.length > 165) issues.push({ level: "warn", msg: `Description ${desc.length} chars (>165)` });
  if (!ogTitle) issues.push({ level: "error", msg: "Missing og:title" });
  if (!ogDesc) issues.push({ level: "error", msg: "Missing og:description" });
  if (!ogType) issues.push({ level: "error", msg: "Missing og:type" });
  if (!twCard) issues.push({ level: "warn", msg: "Missing twitter:card" });

  if (!ogUrl) issues.push({ level: "error", msg: "Missing og:url" });
  else if (!/^https?:\/\//i.test(ogUrl))
    issues.push({ level: "error", msg: `og:url is not absolute (${ogUrl})` });
  else if (ogUrl !== expectedUrl)
    issues.push({ level: "warn", msg: `og:url ${ogUrl} ≠ expected ${expectedUrl}` });

  if (!canonical) issues.push({ level: "error", msg: "Missing canonical link" });
  else if (!/^https?:\/\//i.test(canonical))
    issues.push({ level: "error", msg: `canonical is not absolute (${canonical})` });
  else if (canonical !== expectedUrl)
    issues.push({ level: "warn", msg: `canonical ${canonical} ≠ expected ${expectedUrl}` });

  for (const s of head.scripts) {
    if (s.type !== "application/ld+json") continue;
    try {
      JSON.parse(s.children);
    } catch (e) {
      issues.push({ level: "error", msg: `JSON-LD parse error: ${(e as Error).message}` });
    }
  }
  const hasWebPage = head.scripts.some(
    (s) => s.type === "application/ld+json" && /"WebPage"/.test(s.children),
  );
  const hasEvent = head.scripts.some(
    (s) => s.type === "application/ld+json" && /"Event"/.test(s.children),
  );
  if (!hasWebPage && !hasEvent)
    issues.push({ level: "warn", msg: "No WebPage or Event JSON-LD block" });

  return issues;
}
