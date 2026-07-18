import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import { ArrowRight, MapPin, Ticket, Users, ChevronDown, Plane } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EDITIONS, REGISTER_URL, CURRENT_EVENT_ID } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";
import { HeroBackground } from "@/components/common/HeroBackground";
import { BelowFoldSkeleton } from "@/components/home/BelowFoldSkeleton";

import { buildHead, PAGE_SEO } from "@/lib/seo";

// Below-fold sections load in their own chunk so the hero paints first.
const BelowFold = lazy(() => import("@/components/home/BelowFold"));

export const Route = createFileRoute("/")({
  head: () => {
    const base = buildHead(PAGE_SEO.home);
    return {
      ...base,
      links: [
        ...base.links,
        // Preload the AVIF LCP variant — the <picture> in <HeroBackground />
        // picks AVIF first on supporting browsers. The srcset lets the browser
        // pick the right width; sizes="100vw" matches the hero layout.
        {
          rel: "preload",
          as: "image",
          href: "/assets/responsive/hero-bg-1600.avif",
          type: "image/avif",
          fetchPriority: "high",
          imageSrcSet:
            "/assets/responsive/hero-bg-640.avif 640w, /assets/responsive/hero-bg-1024.avif 1024w, /assets/responsive/hero-bg-1600.avif 1600w, /assets/responsive/hero-bg-1920.avif 1920w",
          imageSizes: "100vw",
        },
        // WebP preload as a secondary hint for browsers that skip AVIF.
        {
          rel: "preload",
          as: "image",
          href: "/assets/responsive/hero-bg-1600.webp",
          type: "image/webp",
          imageSrcSet:
            "/assets/responsive/hero-bg-640.webp 640w, /assets/responsive/hero-bg-1024.webp 1024w, /assets/responsive/hero-bg-1600.webp 1600w, /assets/responsive/hero-bg-1920.webp 1920w",
          imageSizes: "100vw",
        },
      ],
    };
  },
  component: Home,
});

function Home() {
  const upcoming =
    EDITIONS.find((e) => e.slug === CURRENT_EVENT_ID) ??
    EDITIONS.find((e) => e.status === "upcoming") ??
    EDITIONS[0];
  return (
    <>
      <Hero upcoming={upcoming} />
      <Suspense fallback={<BelowFoldSkeleton />}>
        <BelowFold upcoming={upcoming} />
      </Suspense>
    </>
  );
}

/* ---------------- HERO (boarding-pass ticket) ---------------- */

function Hero({ upcoming }: { upcoming: (typeof EDITIONS)[number] }) {
  const cd = useCountdown(upcoming.startDate);
  const eventName = `${upcoming.edition} · ${upcoming.city} ${upcoming.year}`;

  return (
    <section
      className="relative overflow-hidden -mt-16 sm:-mt-20 min-h-[100svh] flex flex-col"
      aria-label="Upcoming edition"
    >
      <div className="absolute inset-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/95 via-charcoal/85 to-charcoal/70" />
      </div>

      <div className="relative z-10 flex-1 flex items-center pt-20 sm:pt-24 pb-14 sm:pb-16">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: headline + intro */}
            <div className="lg:col-span-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-3 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
                    Next edition · {upcoming.year}
                  </span>
                </div>

                <h1 className="mt-5 font-display font-bold text-white leading-[1.02] text-[clamp(2rem,5.5vw,4.5rem)]">
                  {upcoming.edition}
                  <span className="block text-gradient-gold mt-1">
                    {upcoming.city} {upcoming.year}
                  </span>
                </h1>

                <p className="mt-4 sm:mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
                  {upcoming.summary}
                </p>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-13 px-6 sm:px-7"
                  >
                    <Link to="/registration">
                      <Ticket className="mr-2 h-4 w-4" /> Get your E-Pass
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-13 px-6 sm:px-7"
                  >
                    <Link to="/event/$slug" params={{ slug: upcoming.slug }}>
                      Event details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: boarding-pass ticket */}
            <div className="lg:col-span-6">
              <TicketCard upcoming={upcoming} cd={cd} eventName={eventName} />
            </div>
          </div>

        </div>
      </div>

      <a
        href="#next"
        aria-label="Scroll to next section"
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 items-center gap-2 text-white/60 hover:text-gold text-[10px] uppercase tracking-[0.3em] transition-colors"
      >
        Scroll <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

function TicketCard({
  upcoming,
  cd,
  eventName,
}: {
  upcoming: (typeof EDITIONS)[number];
  cd: ReturnType<typeof useCountdown>;
  eventName: string;
}) {
  const start = upcoming.startDate ? new Date(upcoming.startDate) : null;
  const end = upcoming.endDate ? new Date(upcoming.endDate) : null;
  const fmtDay = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      day: "2-digit",
      timeZone: upcoming.timezone ?? "Asia/Kolkata",
    });
  const fmtMon = (d: Date) =>
    d
      .toLocaleDateString("en-IN", {
        month: "short",
        timeZone: upcoming.timezone ?? "Asia/Kolkata",
      })
      .toUpperCase();

  return (
    <div className="relative rounded-2xl bg-white text-charcoal shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Top stub */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 py-3 bg-charcoal text-white">
        <div className="flex min-w-0 items-center gap-2">
          <Plane className="h-3.5 w-3.5 text-gold shrink-0" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white/80 truncate">
            <span className="sm:hidden">Boarding Pass</span>
            <span className="hidden sm:inline">Mahadhiveshan Boarding Pass</span>
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-gold font-medium shrink-0">
          {upcoming.edition}
        </span>
      </div>

      {/* Main body */}
      <div className="px-4 sm:px-6 py-5 sm:py-6">
        {/* Route: FROM → TO */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-slate-muted">From</p>
            <p className="mt-1 font-display text-lg sm:text-xl font-bold text-charcoal leading-tight truncate">
              You
            </p>
          </div>
          <div className="flex items-center gap-1 text-gold" aria-hidden>
            <span className="h-px w-4 sm:w-8 bg-gold/40" />
            <ArrowRight className="h-4 w-4" />
            <span className="h-px w-4 sm:w-8 bg-gold/40" />
          </div>
          <div className="min-w-0 text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-muted">To</p>
            <p className="mt-1 font-display text-lg sm:text-xl font-bold text-charcoal leading-tight truncate">
              {upcoming.city}
            </p>
          </div>
        </div>

        {/* Date block */}
        {start && end && (
          <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-charcoal leading-none tabular-nums">
                {fmtDay(start)}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-gold font-medium">
                {fmtMon(start)}
              </div>
            </div>
            <div className="relative">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-[10px] uppercase tracking-[0.28em] text-slate-muted">
                  3 Days
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-charcoal leading-none tabular-nums">
                {fmtDay(end)}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-gold font-medium">
                {fmtMon(end)}
              </div>
            </div>
          </div>
        )}

        {/* Meta grid */}
        <dl className="mt-5 grid grid-cols-2 gap-4 pt-5 border-t border-dashed border-border">
          <div className="min-w-0">
            <dt className="text-[10px] uppercase tracking-widest text-slate-muted flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold" /> Venue
            </dt>
            <dd className="mt-1 text-sm font-medium text-charcoal leading-snug line-clamp-2">
              {upcoming.venue}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[10px] uppercase tracking-widest text-slate-muted flex items-center gap-1.5">
              <Users className="h-3 w-3 text-gold" /> Host
            </dt>
            <dd className="mt-1 text-sm font-medium text-charcoal leading-snug line-clamp-2">
              {upcoming.host}
            </dd>
          </div>
        </dl>
      </div>

      {/* Perforated separator */}
      <div className="relative">
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-charcoal"
          aria-hidden
        />
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-charcoal"
          aria-hidden
        />
        <div className="mx-6 border-t border-dashed border-border" />
      </div>

      {/* Countdown stub */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-pearl">
        {cd ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-slate-muted font-medium">
                Boarding in
              </span>
              {upcoming.startDate && upcoming.endDate && (
                <AddToCalendar
                  variant="outline"
                  size="sm"
                  title={eventName}
                  description={`${upcoming.summary} Register at ${REGISTER_URL}`}
                  location={upcoming.venue}
                  timezone={upcoming.timezone}
                  start={upcoming.startDate}
                  end={upcoming.endDate}
                  label="Add to Calendar"
                  className="w-full sm:w-auto"
                />
              )}
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2" role="timer" aria-live="polite">
              {[
                { v: cd.days, l: "Days" },
                { v: cd.hours, l: "Hrs" },
                { v: cd.minutes, l: "Min" },
                { v: cd.seconds, l: "Sec" },
              ].map((u) => (
                <div
                  key={u.l}
                  className="rounded-md bg-white border border-border py-2 text-center"
                >
                  <div className="font-display font-bold text-charcoal tabular-nums text-lg sm:text-2xl leading-none">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-muted mt-1">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
            {upcoming.startDate && (
              <CountdownMeta
                startISO={upcoming.startDate}
                endISO={upcoming.endDate}
                timezone={upcoming.timezone}
                className="mt-3"
                tone="dark"
              />
            )}
          </>
        ) : (
          <p className="text-sm text-slate-muted">Dates coming soon.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- countdown hook ---------------- */

function useCountdown(iso?: string) {
  const target = iso ? new Date(iso).getTime() : 0;
  // Start at target so SSR and first client render both produce zeros → no hydration mismatch.
  const [now, setNow] = useState(target);
  useEffect(() => {
    if (!iso) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (!iso) return null;
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}
