import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin, Ticket, Store, Users, Sparkles, Trophy, Handshake, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { EDITIONS, GALLERY, INDUSTRY_CATEGORIES, REGISTER_URL } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tent Decor Expo UP — Kanpur 2026 | 4th Mahadhiveshan" },
      { name: "description", content: "UP's premier B2B tent, decor and event expo. 30 Aug – 1 Sep 2026 at Sanskar Lawn, Kanpur." },
      { property: "og:title", content: "Tent Decor Expo UP — Kanpur 2026" },
      { property: "og:description", content: "India's largest B2B expo for tent, decor and catering — organised by the Tent, Caterers & Decorators Welfare Association of UP." },
    ],
  }),
  component: Home,
});

function Home() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  return (
    <>
      <Hero upcoming={upcoming} />
      <CategoryMarquee />
      <FactStrip upcoming={upcoming} />
      <WhyAttend />
      <TwoPaths />
      <GalleryPreview />
      <ClosingCTA upcoming={upcoming} />
    </>
  );
}

/* ---------------- HERO ---------------- */

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
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-3 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
                    Upcoming Edition · {upcoming.year}
                  </span>
                </div>

                <h1 className="mt-4 sm:mt-5 font-display font-bold text-white leading-[1.05] text-[clamp(1.75rem,5vw,4.25rem)]">
                  {upcoming.edition}
                  <span className="block text-gradient-gold mt-1">{upcoming.city} {upcoming.year}</span>
                </h1>

                <p className="mt-3 sm:mt-4 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {upcoming.summary}
                </p>

                <dl className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                  <MetaRow icon={Calendar} label="Dates" value={upcoming.dates} />
                  <MetaRow icon={MapPin} label="Venue" value={upcoming.venue} />
                </dl>

                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                  <Button asChild size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-11 sm:h-13 px-5 sm:px-7">
                    <Link to="/registration">
                      <Ticket className="mr-2 h-4 w-4" /> Register Now
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent h-11 sm:h-13 px-5 sm:px-7">
                    <Link to="/events/$year" params={{ year: upcoming.year }}>
                      Event details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            {cd && (
              <div className="lg:col-span-5">
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-gold">
                      <Calendar className="h-4 w-4" />
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium">Counting down</span>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="polite">
                      {[
                        { v: cd.days, l: "Days" },
                        { v: cd.hours, l: "Hrs" },
                        { v: cd.minutes, l: "Min" },
                        { v: cd.seconds, l: "Sec" },
                      ].map((u) => (
                        <div key={u.l} className="rounded-lg border border-white/10 bg-charcoal/40 py-2.5 sm:py-3.5 text-center">
                          <div className="font-display font-bold text-gold tabular-nums text-xl sm:text-3xl leading-none">
                            {String(u.v).padStart(2, "0")}
                          </div>
                          <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 mt-1">{u.l}</div>
                        </div>
                      ))}
                    </div>

                    {upcoming.startDate && (
                      <CountdownMeta
                        startISO={upcoming.startDate}
                        endISO={upcoming.endDate}
                        timezone={upcoming.timezone}
                        className="mt-3 sm:mt-4"
                        tone="light"
                      />
                    )}

                    {upcoming.startDate && upcoming.endDate && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <AddToCalendar
                          variant="ghostLight"
                          size="sm"
                          title={eventName}
                          description={`${upcoming.summary} Register at ${REGISTER_URL}`}
                          location={upcoming.venue}
                          timezone={upcoming.timezone}
                          start={upcoming.startDate}
                          end={upcoming.endDate}
                          label="Add to Calendar"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            )}
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

function MetaRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-8 w-8 shrink-0 rounded-md bg-gold/15 grid place-items-center">
        <Icon className="h-4 w-4 text-gold" />
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-white/50">{label}</dt>
        <dd className="mt-0.5 text-sm sm:text-base text-white font-medium leading-snug">{value}</dd>
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

/* ---------------- FACT STRIP ---------------- */

function FactStrip({ upcoming }: { upcoming: (typeof EDITIONS)[number] }) {
  const facts = [
    { icon: Calendar, label: "Dates", value: upcoming.dates },
    { icon: MapPin, label: "Venue", value: upcoming.venue },
    { icon: Users, label: "Scale", value: `${upcoming.exhibitors} exhibitors · ${upcoming.visitors} visitors` },
  ];
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {facts.map((f) => (
            <div key={f.label} className="flex items-start gap-3 py-5 sm:py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
                <f.icon className="h-4 w-4 text-gold" />
              </div>
              <div className="min-w-0">
                <dt className="text-[10px] uppercase tracking-widest text-slate-muted">{f.label}</dt>
                <dd className="mt-0.5 text-sm sm:text-base text-charcoal font-medium leading-snug">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- WHY / WHAT WE DO ---------------- */

function WhyAttend() {
  const items = [
    { icon: Sparkles, title: "One state, one stage", desc: "The only expo that brings every tent, catering and decor vertical of UP under a single roof." },
    { icon: Handshake, title: "Real B2B business", desc: "Curated buyer-seller meetings and district conveners ensure every visitor is a decision maker." },
    { icon: Trophy, title: "Recognition & policy", desc: "Innovation awards, association-led policy sessions, and skill programs that lift the whole industry." },
  ];
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Why & what</span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            What Tent Decor Expo UP does.
          </h2>
          <p className="mt-4 text-slate-muted leading-relaxed">
            Organised by the Tent, Caterers & Decorators Welfare Association of UP — a Mahadhiveshan hosted in a different city every year to grow the wedding and event economy of Uttar Pradesh.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-border/60 bg-white p-6 sm:p-7">
              <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
                <i.icon className="h-5 w-5 text-gold" />
              </span>
              <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-charcoal">{i.title}</h3>
              <p className="mt-2 text-sm text-slate-muted leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            <Link to="/events/$year" params={{ year: upcoming.year }}>Event details</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
            <Link to="/visitors">Visitor info</Link>
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
