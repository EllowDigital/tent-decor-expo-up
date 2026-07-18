import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin, Ticket, Store, Users, Sparkles, ChevronDown, Quote, TrendingUp, Building2, Rocket, Award, Plane } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { EDITIONS, GALLERY, INDUSTRY_CATEGORIES, REGISTER_URL, TESTIMONIALS, CURRENT_EVENT_ID } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";

import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildHead(PAGE_SEO.home),
  component: Home,
});

function Home() {
  // Single source of truth: siteConfig.currentEventId. Change that one value
  // each year and the entire homepage (hero, banner, closing CTA) follows.
  const upcoming =
    EDITIONS.find((e) => e.slug === CURRENT_EVENT_ID) ??
    EDITIONS.find((e) => e.status === "upcoming") ??
    EDITIONS[0];
  return (
    <>
      <Hero upcoming={upcoming} />
      <CategoryMarquee />
      <AboutSnippet />
      <WhyAttendExhibit />
      <TwoPaths />
      <GalleryPreview />
      <Testimonials />
      <ClosingCTA upcoming={upcoming} />
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
        <img src={heroBg} alt="" className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/95 via-charcoal/85 to-charcoal/70" />
      </div>

      <div className="relative z-10 flex-1 flex items-center pt-20 sm:pt-24 pb-14 sm:pb-16">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: headline + intro */}
            <div className="lg:col-span-6">
              <Reveal>
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
                  <span className="block text-gradient-gold mt-1">{upcoming.city} {upcoming.year}</span>
                </h1>

                <p className="mt-4 sm:mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
                  {upcoming.summary}
                </p>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-13 px-6 sm:px-7">
                    <Link to="/registration">
                      <Ticket className="mr-2 h-4 w-4" /> Get your E-Pass
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-13 px-6 sm:px-7">
                    <Link to="/event/$slug" params={{ slug: upcoming.slug }}>
                      Event details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right: boarding-pass ticket */}
            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <TicketCard upcoming={upcoming} cd={cd} eventName={eventName} />
              </Reveal>
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
  const fmtDay = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", timeZone: upcoming.timezone ?? "Asia/Kolkata" });
  const fmtMon = (d: Date) => d.toLocaleDateString("en-IN", { month: "short", timeZone: upcoming.timezone ?? "Asia/Kolkata" }).toUpperCase();

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
      <div className="px-5 sm:px-6 py-5 sm:py-6">
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
              <div className="font-display text-3xl sm:text-4xl font-bold text-charcoal leading-none tabular-nums">{fmtDay(start)}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-gold font-medium">{fmtMon(start)}</div>
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
              <div className="font-display text-3xl sm:text-4xl font-bold text-charcoal leading-none tabular-nums">{fmtDay(end)}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-gold font-medium">{fmtMon(end)}</div>
            </div>
          </div>
        )}

        {/* Meta grid */}
        <dl className="mt-5 grid grid-cols-2 gap-4 pt-5 border-t border-dashed border-border">
          <div className="min-w-0">
            <dt className="text-[10px] uppercase tracking-widest text-slate-muted flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold" /> Venue
            </dt>
            <dd className="mt-1 text-sm font-medium text-charcoal leading-snug line-clamp-2">{upcoming.venue}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[10px] uppercase tracking-widest text-slate-muted flex items-center gap-1.5">
              <Users className="h-3 w-3 text-gold" /> Host
            </dt>
            <dd className="mt-1 text-sm font-medium text-charcoal leading-snug line-clamp-2">{upcoming.host}</dd>
          </div>
        </dl>
      </div>

      {/* Perforated separator */}
      <div className="relative">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-charcoal" aria-hidden />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-charcoal" aria-hidden />
        <div className="mx-6 border-t border-dashed border-border" />
      </div>

      {/* Countdown stub */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-pearl">
        {cd ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-slate-muted font-medium">Boarding in</span>
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
                <div key={u.l} className="rounded-md bg-white border border-border py-2 text-center">
                  <div className="font-display font-bold text-charcoal tabular-nums text-lg sm:text-2xl leading-none">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-muted mt-1">{u.l}</div>
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

/* ---------------- CATEGORY MARQUEE ---------------- */

function CategoryMarquee() {
  const items = [...INDUSTRY_CATEGORIES, "Sound", "SFX", "AV & Lighting", "Mandap"];
  const loop = [...items, ...items];
  return (
    <section id="next" aria-label="Industry categories" className="bg-charcoal border-y border-white/10 overflow-hidden scroll-mt-20">
      <div className="relative flex" role="marquee">
        <div className="flex shrink-0 animate-marquee gap-10 py-4 sm:py-5 pr-10 whitespace-nowrap">
          {loop.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white/75 text-sm sm:text-base font-medium tracking-wide">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT SNIPPET ---------------- */

function AboutSnippet() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">About the association</span>
        <h2 className="mt-3 font-display font-bold text-charcoal leading-tight text-[clamp(1.5rem,4vw,2.5rem)]">
          Uniting UP's tent, catering and decor industry since 1998.
        </h2>
        <p className="mt-5 text-slate-muted text-base sm:text-lg leading-relaxed">
          The Tent, Caterers & Decorators Welfare Association of UP is the state's apex body for the wedding and event industry — representing 6,000+ member businesses across 75 districts. The Mahadhiveshan is our flagship expo, hosted in a different city every year.
        </p>
        <div className="mt-7">
          <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10">
            <Link to="/about">Read more about us <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY ATTEND / WHY EXHIBIT (dual grid) ---------------- */

function WhyAttendExhibit() {
  const visit = [
    { icon: Users, title: "Meet the industry", desc: "25,000+ trade buyers, planners and hoteliers across 3 days." },
    { icon: Sparkles, title: "Discover innovation", desc: "New tent, decor, lighting and catering tech from leading brands." },
    { icon: Rocket, title: "Source & partner", desc: "Bulk deals, dealer tie-ups and regional distribution." },
  ];
  const exhibit = [
    { icon: TrendingUp, title: "Generate leads", desc: "Face-to-face with decision makers from UP, Bihar and MP." },
    { icon: Building2, title: "Launch products", desc: "Central stage demos, media coverage and buyer meetings." },
    { icon: Award, title: "Recognition", desc: "Innovation Awards and association-backed policy platforms." },
  ];
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Value for both sides</span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Why attend. Why exhibit.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
                  <Ticket className="h-5 w-5 text-gold" />
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">For Visitors</h3>
              </div>
              <Link to="/visitors" className="text-sm text-gold hover:underline shrink-0">Details →</Link>
            </div>
            <ul className="mt-6 space-y-4">
              {visit.map((v) => (
                <li key={v.title} className="flex items-start gap-3">
                  <span className="h-9 w-9 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
                    <v.icon className="h-4 w-4 text-gold" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold text-charcoal">{v.title}</p>
                    <p className="mt-1 text-sm text-slate-muted leading-relaxed">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-charcoal text-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center">
                  <Store className="h-5 w-5 text-gold" />
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold">For Exhibitors</h3>
              </div>
              <Link to="/exhibitors" className="text-sm text-gold hover:underline shrink-0">Details →</Link>
            </div>
            <ul className="mt-6 space-y-4">
              {exhibit.map((v) => (
                <li key={v.title} className="flex items-start gap-3">
                  <span className="h-9 w-9 shrink-0 rounded-lg bg-gold/15 grid place-items-center">
                    <v.icon className="h-4 w-4 text-gold" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold text-white">{v.title}</p>
                    <p className="mt-1 text-sm text-white/70 leading-relaxed">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */

function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Legacy</span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            What past editions delivered.
          </h2>
          <p className="mt-3 text-slate-muted">Real voices from exhibitors and industry leaders across UP.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border/60 bg-pearl p-6 sm:p-7 flex flex-col">
              <Quote className="h-6 w-6 text-gold" aria-hidden />
              <blockquote className="mt-4 text-charcoal text-sm sm:text-base leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border/60">
                <p className="font-display text-base font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-slate-muted mt-0.5">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


/* WhyAttend removed — replaced by WhyAttendExhibit dual-audience grid above. */


/* ---------------- TWO PATHS ---------------- */

function TwoPaths() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Who it's for</span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Attend as a visitor, or grow as an exhibitor.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          <Link
            to="/visitors"
            className="group rounded-2xl border border-border/60 bg-pearl p-6 sm:p-8 hover:border-gold transition-colors"
          >
            <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
              <Ticket className="h-5 w-5 text-gold" />
            </span>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold text-charcoal">For Visitors</h3>
            <p className="mt-3 text-sm text-slate-muted leading-relaxed">
              Trade buyers, planners and industry professionals — see benefits, schedule and how to get your free E-Pass.
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-charcoal group-hover:text-gold">
              Visitor profile <ArrowRight className="ml-1.5 h-4 w-4" />
            </span>
          </Link>
          <Link
            to="/exhibitors"
            className="group rounded-2xl border border-border/60 bg-charcoal text-white p-6 sm:p-8 hover:border-gold transition-colors"
          >
            <span className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center">
              <Store className="h-5 w-5 text-gold" />
            </span>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold">For Exhibitors</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Stall categories, sizes and what you get. Understand the audience before booking your stall.
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-gold">
              Exhibitor profile <ArrowRight className="ml-1.5 h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY PREVIEW ---------------- */

function GalleryPreview() {
  // 3 on mobile, 4 on tablet, 6 on desktop
  const photos = GALLERY.slice(0, 6);
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-8">
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Moments</span>
            <h2 className="mt-2 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">From the show floor.</h2>
          </div>
          <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10 shrink-0">
            <Link to="/gallery">
              <span className="hidden sm:inline">Full gallery</span>
              <span className="sm:hidden">Gallery</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {photos.map((g, i) => (
            <Link
              key={i}
              to="/gallery"
              className={
                // hide the last 3 on mobile so only 3 are visible; hide last 2 on tablet so 4 are visible
                (i >= 3 ? "hidden md:block " : "") + (i >= 4 ? "md:hidden lg:block " : "") +
                "relative aspect-square overflow-hidden rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              }
              aria-label={g.title}
            >
              <img src={g.src} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLOSING CTA ---------------- */

function ClosingCTA({ upcoming }: { upcoming: (typeof EDITIONS)[number] }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-charcoal">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-white text-[clamp(1.75rem,4.5vw,3rem)] leading-tight">
          Be there in <span className="text-gradient-gold">{upcoming.city} {upcoming.year}</span>.
        </h2>
        <p className="mt-4 text-white/70 text-base sm:text-lg">
          See full event details, or explore visitor and exhibitor pages.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8">
            <Link to="/registration"><Ticket className="mr-2 h-4 w-4" /> Register Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
            <Link to="/event/$slug" params={{ slug: upcoming.slug }}>Event details</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- countdown hook ---------------- */

function useCountdown(iso?: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!iso) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (!iso) return null;
  const target = new Date(iso).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}
