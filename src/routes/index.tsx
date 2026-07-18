import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Ticket, Store, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { STATS, EDITIONS, GALLERY, REGISTER_URL } from "@/data/constants";
import { Reveal, Counter } from "@/components/common/Reveal";
import { Card } from "@/components/ui/card";
import { RegisterLink } from "@/components/common/RegisterLink";
import { EpassDialog } from "@/components/common/EpassDialog";
import { StallBookingDialog } from "@/components/common/StallBookingDialog";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tent Decor Expo UP — Kanpur 2026 | 4th Mahadhiveshan" },
      { name: "description", content: "Connect, learn and grow at UP's premier B2B tent, decor and event expo. 30 Aug – 1 Sep 2026 at Sanskar Lawn, Kanpur." },
      { property: "og:title", content: "Tent Decor Expo UP — Kanpur 2026" },
      { property: "og:description", content: "India's largest B2B expo for tent, decor and catering — organised by the Tent, Caterers & Decorators Welfare Association of UP." },
    ],
  }),
  component: Home,
});

function Home() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  const past = EDITIONS.filter((e) => e.status === "past").slice(0, 1)[0];

  return (
    <>
      <Hero upcoming={upcoming} />
      <FactStrip upcoming={upcoming} />
      <HowToRegister upcoming={upcoming} />
      <Stats />
      <EventsRow upcoming={upcoming} past={past} />
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
    <section className="relative overflow-hidden -mt-16 sm:-mt-20 pt-16 sm:pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/95 via-charcoal/85 to-charcoal/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: heading + CTAs */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
                  {upcoming.status === "upcoming" ? "Upcoming Edition" : "Next Edition"} · {upcoming.year}
                </span>
              </div>

              <h1 className="mt-6 font-display font-bold text-white leading-[1.05] text-[clamp(2rem,5.5vw,4.75rem)]">
                {upcoming.edition}
                <span className="block text-gradient-gold mt-1">{upcoming.city} {upcoming.year}</span>
              </h1>

              <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
                {upcoming.summary}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <EpassDialog
                  eventName={eventName}
                  eventDate={upcoming.dates}
                  eventVenue={upcoming.venue}
                  trigger={
                    <Button
                      size="lg"
                      className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8"
                      aria-label="Start guided E-Pass registration"
                    >
                      <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                    </Button>
                  }
                />
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
                  <Link to="/events/$year" params={{ year: upcoming.year }}>
                    Event details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right: countdown card */}
          {cd && (
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-gold">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium">Counting down</span>
                  </div>

                  <div
                    className="mt-5 grid grid-cols-4 gap-2 sm:gap-3"
                    role="timer"
                    aria-live="polite"
                    aria-label="Time until event starts"
                  >
                    {[
                      { v: cd.days, l: "Days" },
                      { v: cd.hours, l: "Hrs" },
                      { v: cd.minutes, l: "Min" },
                      { v: cd.seconds, l: "Sec" },
                    ].map((u) => (
                      <div key={u.l} className="rounded-lg border border-white/10 bg-charcoal/40 py-3 sm:py-4 text-center">
                        <div className="font-display font-bold text-gold tabular-nums text-2xl sm:text-3xl leading-none">
                          {String(u.v).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 mt-1.5">{u.l}</div>
                      </div>
                    ))}
                  </div>

                  {upcoming.startDate && (
                    <CountdownMeta
                      startISO={upcoming.startDate}
                      endISO={upcoming.endDate}
                      timezone={upcoming.timezone}
                      className="mt-4"
                      tone="light"
                    />
                  )}

                  {upcoming.startDate && upcoming.endDate && (
                    <div className="mt-5 pt-5 border-t border-white/10">
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

/* ---------------- HOW TO REGISTER ---------------- */

function HowToRegister({ upcoming }: { upcoming: (typeof EDITIONS)[number] }) {
  const eventName = `${upcoming.edition} · ${upcoming.city} ${upcoming.year}`;
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">How to attend</span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Two ways to join.
          </h2>
          <p className="mt-4 text-slate-muted leading-relaxed">
            Trade visitors register free in under a minute. Exhibitors can request a stall — our team responds within one business day.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* E-Pass card */}
          <Card className="p-6 sm:p-8 border-border/60 bg-white flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
                <Ticket className="h-5 w-5 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-muted">Visitors</span>
            </div>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold text-charcoal">Free Visitor E-Pass</h3>
            <p className="mt-3 text-sm text-slate-muted leading-relaxed flex-1">
              For trade buyers, planners and industry professionals. Fill a short form and get an instant reference code.
            </p>
            <EpassDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button size="lg" className="mt-6 bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 w-fit">
                  <Ticket className="mr-2 h-4 w-4" /> Get E-Pass
                </Button>
              }
            />
          </Card>

          {/* Stall card */}
          <Card className="p-6 sm:p-8 border-border/60 bg-white flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-charcoal/[0.06] grid place-items-center">
                <Store className="h-5 w-5 text-charcoal" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-muted">Exhibitors</span>
            </div>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold text-charcoal">Exhibitor Stall Booking</h3>
            <p className="mt-3 text-sm text-slate-muted leading-relaxed flex-1">
              From 9 sqm shell schemes to premium custom stalls. Share your requirements and we'll follow up with pricing and layout.
            </p>
            <StallBookingDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button size="lg" variant="outline" className="mt-6 border-charcoal text-charcoal hover:bg-charcoal hover:text-white w-fit">
                  <Store className="mr-2 h-4 w-4" /> Book a Stall
                </Button>
              }
            />
          </Card>
        </div>

        <p className="mt-8 text-xs sm:text-sm text-slate-muted">
          Prefer the full portal? Register at{" "}
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="text-charcoal font-medium underline underline-offset-4 decoration-gold hover:text-gold">
            tentdecorexpo.com
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */

function Stats() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display font-bold text-gradient-gold text-[clamp(2rem,5vw,3.5rem)] leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-muted uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EVENTS ROW ---------------- */

function EventsRow({
  upcoming,
  past,
}: {
  upcoming: (typeof EDITIONS)[number];
  past: (typeof EDITIONS)[number] | undefined;
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-8 sm:mb-10">
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Editions</span>
            <h2 className="mt-2 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
              This year & recent past.
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-charcoal hover:bg-gold/10 shrink-0">
            <Link to="/events">
              <span className="hidden sm:inline">All editions</span>
              <span className="sm:hidden">All</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-6 sm:p-8 border-2 border-gold/50 bg-white">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-gold/15 text-gold text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">Upcoming</span>
              <span className="text-[11px] text-slate-muted">{upcoming.year}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-charcoal">{upcoming.city} {upcoming.year}</h3>
            <p className="text-gold font-medium text-sm mt-1">{upcoming.edition}</p>
            <p className="mt-3 text-sm text-slate-muted leading-relaxed">{upcoming.dates} · {upcoming.venue}.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <EpassDialog
                eventName={`${upcoming.edition} · ${upcoming.city} ${upcoming.year}`}
                eventDate={upcoming.dates}
                eventVenue={upcoming.venue}
                trigger={
                  <Button size="sm" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90">
                    <Ticket className="mr-1.5 h-4 w-4" /> Get E-Pass
                  </Button>
                }
              />
              <Button asChild size="sm" variant="outline" className="border-charcoal/20">
                <Link to="/events/$year" params={{ year: upcoming.year }}>Details</Link>
              </Button>
            </div>
          </Card>

          {past && (
            <Card className="p-6 sm:p-8 border-border bg-charcoal text-white">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/10 text-white/70 text-[10px] uppercase tracking-widest px-2.5 py-1">Recap</span>
                <span className="text-[11px] text-white/50">{past.year}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold">{past.city} {past.year}</h3>
              <p className="text-gold font-medium text-sm mt-1">{past.edition}</p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{past.summary}</p>
              <div className="mt-6">
                <Button asChild size="sm" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                  <Link to="/events/$year" params={{ year: past.year }}>Revisit {past.city} {past.year}</Link>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY PREVIEW ---------------- */

function GalleryPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {GALLERY.slice(0, 8).map((g, i) => (
            <Link
              key={i}
              to="/gallery"
              className="relative aspect-square overflow-hidden rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
          Registration takes under a minute. Free for trade visitors.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <RegisterLink size="lg" variant="gold" showIcon>Register at tentdecorexpo.com</RegisterLink>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the registration site in a new tab">
              Open portal <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
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
