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
import { SITE_URL, websiteJsonLd, organizationJsonLd } from "@/lib/seo";



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
        <p className="mt-2 text-sm text-slate-muted">Something went wrong. Please refresh or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-charcoal"
          >Try again</button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-medium text-charcoal hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tent Decor Expo UP — India's Premier B2B Wedding & Event Expo" },
      { name: "description", content: "Tent Decor Expo UP — Kanpur 2026, the 4th Mahadhiveshan. India's largest B2B exhibition for tent, decor, catering, lighting and event professionals." },
      { name: "author", content: "Tent, Caterers & Decorators Welfare Association of UP" },
      { property: "og:title", content: "Tent Decor Expo UP — Kanpur 2026" },
      { property: "og:description", content: "Connect • Learn • Grow — the 4th Mahadhiveshan of India's wedding and event economy. 30 August – 1 September 2026, Sanskar Lawn, Kanpur." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tent Decor Expo UP" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tent, Caterers & Decorators Welfare Association of UP",
          alternateName: "Tent Decor Expo UP",
          url: SITE_URL,
          description: "Uttar Pradesh's apex tent, catering and decor industry body, organiser of the annual Mahadhiveshan expo.",
        }),
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
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
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
