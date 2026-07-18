import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/PageChrome";
import { websiteJsonLd, organizationJsonLd } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-charcoal">Page not found</h2>
        <p className="mt-2 text-sm text-slate-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-2.5 text-sm font-medium text-charcoal shadow-gold hover:opacity-90 transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-charcoal">This page didn't load</h1>
        <p className="mt-2 text-sm text-slate-muted">
          Something went wrong. Please refresh or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-charcoal"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-md border border-input px-4 py-2 text-sm font-medium text-charcoal hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      // Per-route head() supplies title, description, and og:title/og:description.

      { name: "application-name", content: "Tent Decor Expo UP" },
      { name: "apple-mobile-web-app-title", content: "TDX UP" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "author", content: "Tent, Caterers & Decorators Welfare Association of UP" },
      { name: "publisher", content: "Tent, Caterers & Decorators Welfare Association of UP" },
      { name: "theme-color", content: "#0f0f0f" },
      { name: "msapplication-TileColor", content: "#0f0f0f" },
      { name: "color-scheme", content: "light" },
      { name: "format-detection", content: "telephone=no" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { name: "bingbot", content: "index,follow" },
      { name: "rating", content: "general" },
      { name: "revisit-after", content: "7 days" },
      { name: "language", content: "en-IN" },
      { httpEquiv: "content-language", content: "en-IN" },
      { name: "geo.region", content: "IN-UP" },
      { name: "geo.placename", content: "Kanpur" },
      { name: "geo.position", content: "26.4499;80.3319" },
      { name: "ICBM", content: "26.4499, 80.3319" },
      {
        name: "keywords",
        content:
          "Tent Decor Expo UP, Mahadhiveshan, Kanpur 2026, tent expo India, decor expo, catering expo, wedding industry, event industry, B2B trade show, TCDWA UP",
      },
      // og:title / og:description are set per-route via buildHead().

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tent Decor Expo UP" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@tentdecorexpo" },
      { name: "twitter:creator", content: "@tentdecorexpo" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
        fetchPriority: "high",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteJsonLd()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Canonical URL normalization: strip trailing slashes and known tracking
  // params so bookmarked / shared variants collapse onto the canonical URL
  // that appears in <link rel="canonical"> and sitemap.xml.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, search, hash } = window.location;
    let nextPath = pathname;
    if (nextPath.length > 1 && nextPath.endsWith("/")) {
      nextPath = nextPath.replace(/\/+$/, "");
    }
    let nextSearch = search;
    if (search) {
      const params = new URLSearchParams(search);
      const junk = ["fbclid", "gclid", "msclkid", "mc_cid", "mc_eid", "_hsenc", "_hsmi"];
      let mutated = false;
      for (const k of Array.from(params.keys())) {
        if (junk.includes(k) || k.toLowerCase().startsWith("utm_")) {
          params.delete(k);
          mutated = true;
        }
      }
      if (mutated) {
        const q = params.toString();
        nextSearch = q ? `?${q}` : "";
      }
    }
    if (nextPath !== pathname || nextSearch !== search) {
      window.history.replaceState(null, "", nextPath + nextSearch + hash);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main id="main" className="min-h-dvh pt-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
