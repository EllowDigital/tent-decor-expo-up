import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Check, MapPin, Users, X, Building2, Trophy, Ticket, Store } from "lucide-react";
import { EDITIONS, REGISTER_URL, type Edition } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EpassDialog } from "@/components/common/EpassDialog";
import { StallBookingDialog } from "@/components/common/StallBookingDialog";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";

export const Route = createFileRoute("/event/$slug")({
  loader: ({ params }) => {
    const edition = EDITIONS.find((e) => e.slug === params.year);
    if (!edition) throw notFound();
    return { edition };
  },
  head: ({ loaderData, params }) => {
    const e = loaderData?.edition;
    if (!e) {
      return { meta: [{ title: "Edition not found — Tent Decor Expo UP" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${e.city} ${e.year} · ${e.edition} — Tent Decor Expo UP`;
    const desc = `${e.edition} · ${e.dates} · ${e.venue}. ${e.summary}`;
    const path = `/events/${params.year}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: e.status === "upcoming" ? "event" : "article" },
        { property: "og:url", content: path },
        { property: "og:image", content: e.cover },
        { property: "og:image:alt", content: `${e.edition} — ${e.city} ${e.year}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: e.cover },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `${e.edition} · ${e.city} ${e.year}`,
            startDate: e.startDate,
            endDate: e.endDate,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", addressLocality: e.city, addressRegion: "Uttar Pradesh", addressCountry: "IN" } },
            image: [e.cover],
            description: e.summary,
            organizer: { "@type": "Organization", name: e.host, url: "https://www.tentdecorexpo.com" },
          }),
        },
      ],
    };
  },
  component: EditionPage,
  notFoundComponent: EditionNotFound,
});

function EditionNotFound() {
  return (
    <section className="py-32 text-center">
      <h1 className="font-display text-5xl font-bold text-charcoal">Edition not found</h1>
      <p className="mt-4 text-slate-muted">This year hasn't been published yet.</p>
      <div className="mt-8">
        <Button asChild className="bg-gradient-gold text-charcoal">
          <Link to="/events">Browse all editions</Link>
        </Button>
      </div>
    </section>
  );
}

function useCountdown(target?: string) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!target) return;
    const t = new Date(target).getTime();
    const update = () => {
      const diff = t - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function EditionPage() {
  const { edition: e } = Route.useLoaderData() as { edition: Edition };
  const time = useCountdown(e.startDate);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const idx = EDITIONS.findIndex((x) => x.slug === e.slug);
  const prev = EDITIONS[idx + 1];
  const next = EDITIONS[idx - 1];
  const isUpcoming = e.status === "upcoming";

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={e.cover} alt="" className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/95" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All editions
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl"
          >
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] backdrop-blur-md ${
              isUpcoming
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-white/20 bg-white/5 text-white/80"
            }`}>
              {isUpcoming ? "Upcoming Edition" : "Archived Edition"} · {e.edition}
            </span>
            <h1 className="mt-6 font-display text-6xl md:text-8xl font-bold text-white leading-[1.02]">
              {e.city} <span className="text-gradient-gold">{e.year}</span>
            </h1>
            <p className="mt-6 text-xl text-white/70 font-light max-w-2xl">{e.summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {isUpcoming ? (
                <>
                  <EpassDialog
                    eventName={`${e.edition} · ${e.city} ${e.year}`}
                    eventDate={e.dates}
                    eventVenue={e.venue}
                    trigger={
                      <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-14 px-8">
                        <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                      </Button>
                    }
                  />
                  <StallBookingDialog
                    eventName={`${e.edition} · ${e.city} ${e.year}`}
                    eventDate={e.dates}
                    eventVenue={e.venue}
                    trigger={
                      <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent h-14 px-8">
                        <Store className="mr-2 h-4 w-4" /> Book a Stall
                      </Button>
                    }
                  />
                  {e.startDate && e.endDate && (
                    <AddToCalendar
                      variant="ghostLight"
                      size="lg"
                      title={`${e.edition} · ${e.city} ${e.year}`}
                      description={`${e.summary} Register at ${REGISTER_URL}`}
                      location={e.venue}
                      timezone={e.timezone}
                      start={e.startDate}
                      end={e.endDate}
                    />
                  )}
                </>
              ) : (
                <Button asChild size="lg" className="bg-gradient-gold text-charcoal shadow-gold h-14 px-8">
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="py-10 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Calendar, label: "Dates", value: e.dates },
            { icon: MapPin, label: "Venue", value: e.venue },
            { icon: Building2, label: "Host", value: e.host },
            { icon: Users, label: "Visitors", value: e.visitors },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gold/10 grid place-items-center shrink-0">
                <b.icon className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-slate-muted">{b.label}</p>
                <p className="font-semibold text-charcoal truncate">{b.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN (upcoming only) */}
      {isUpcoming && e.startDate && (
        <section className="py-24 bg-pearl">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Countdown</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-charcoal">The clock is running.</h2>
            <div
              className="mt-12 grid grid-cols-4 gap-3 md:gap-6"
              role="timer"
              aria-live="polite"
              aria-label={`Time until ${e.edition} begins`}
            >
              {[
                { label: "Days", v: time.d },
                { label: "Hours", v: time.h },
                { label: "Minutes", v: time.m },
                { label: "Seconds", v: time.s },
              ].map((t) => (
                <Card key={t.label} className="p-4 md:p-8 border-border/60 bg-white shadow-elegant">
                  <div className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-gold tabular-nums">
                    {String(t.v).padStart(2, "0")}
                  </div>
                  <p className="mt-2 text-xs md:text-sm uppercase tracking-widest text-slate-muted">{t.label}</p>
                </Card>
              ))}
            </div>
            <CountdownMeta
              startISO={e.startDate}
              endISO={e.endDate}
              timezone={e.timezone}
              tone="dark"
              className="mt-6 justify-center"
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <EpassDialog
                eventName={`${e.edition} · ${e.city} ${e.year}`}
                eventDate={e.dates}
                eventVenue={e.venue}
                trigger={
                  <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-14 px-8">
                    <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                  </Button>
                }
              />
              <StallBookingDialog
                eventName={`${e.edition} · ${e.city} ${e.year}`}
                eventDate={e.dates}
                eventVenue={e.venue}
                trigger={
                  <Button size="lg" variant="outline" className="border-gold text-charcoal hover:bg-gold/10 h-14 px-8">
                    <Store className="mr-2 h-4 w-4" /> Book Your Stall
                  </Button>
                }
              />
              {e.endDate && (
                <AddToCalendar
                  variant="outline"
                  size="lg"
                  title={`${e.edition} · ${e.city} ${e.year}`}
                  description={`${e.summary} Register at ${REGISTER_URL}`}
                  location={e.venue}
                  timezone={e.timezone}
                  start={e.startDate}
                  end={e.endDate}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">
              {isUpcoming ? "What to expect" : "What happened"}
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              {isUpcoming
                ? `The blueprint for ${e.city} ${e.year}.`
                : `${e.city} ${e.year} in review.`}
            </h2>
            <ul className="mt-8 space-y-4">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-3 items-start">
                  <span className="mt-1 h-6 w-6 rounded-full bg-gradient-gold grid place-items-center shrink-0 shadow-gold">
                    <Check className="h-3.5 w-3.5 text-charcoal" strokeWidth={3} />
                  </span>
                  <span className="text-slate-muted leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Card className="p-5 border-border/60 bg-pearl">
                <p className="text-xs uppercase tracking-widest text-slate-muted">Exhibitors</p>
                <p className="mt-2 font-display text-3xl font-bold text-gradient-gold">{e.exhibitors}</p>
              </Card>
              <Card className="p-5 border-border/60 bg-pearl">
                <p className="text-xs uppercase tracking-widest text-slate-muted">Visitors</p>
                <p className="mt-2 font-display text-3xl font-bold text-gradient-gold">{e.visitors}</p>
              </Card>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {e.photos.slice(0, 4).map((p, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`overflow-hidden rounded-xl group relative ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                >
                  <img src={p} alt={`${e.city} ${e.year}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHOTO GRID */}
      {e.photos.length > 0 && (
        <section className="py-24 bg-pearl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Photo Album"
              title={isUpcoming ? "Behind the making." : `Memories from ${e.city}.`}
            />
            <div className="mt-14 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {e.photos.map((p, i) => (
                <Reveal key={`${p}-${i}`} delay={i * 0.04}>
                  <button
                    onClick={() => setLightbox(i)}
                    className="block w-full break-inside-avoid overflow-hidden rounded-xl group relative"
                  >
                    <img src={p} alt={`${e.city} ${e.year} photo ${i + 1}`} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NAV BETWEEN EDITIONS */}
      <section className="py-16 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {prev ? (
            <Link
              to="/events/$year"
              params={{ year: prev.slug }}
              className="group block"
            >
              <Card className="p-6 border-border/60 hover-lift">
                <p className="text-xs uppercase tracking-widest text-slate-muted flex items-center gap-2">
                  <ArrowLeft className="h-3 w-3" /> Previous edition
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-charcoal group-hover:text-gold transition-colors">
                  {prev.city} {prev.year}
                </p>
                <p className="mt-1 text-sm text-slate-muted">{prev.edition}</p>
              </Card>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to="/events/$year"
              params={{ year: next.slug }}
              className="group block md:text-right"
            >
              <Card className="p-6 border-border/60 hover-lift">
                <p className="text-xs uppercase tracking-widest text-slate-muted flex items-center gap-2 md:justify-end">
                  Next edition <ArrowRight className="h-3 w-3" />
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-charcoal group-hover:text-gold transition-colors">
                  {next.city} {next.year}
                </p>
                <p className="mt-1 text-sm text-slate-muted">{next.edition}</p>
              </Card>
            </Link>
          ) : (
            <Card className="p-6 border-2 border-dashed border-gold/40 bg-gold/5 md:text-right">
              <p className="text-xs uppercase tracking-widest text-gold flex items-center gap-2 md:justify-end">
                <Trophy className="h-3 w-3" /> Latest edition
              </p>
              <p className="mt-3 font-display text-2xl font-bold text-charcoal">You're on the newest one.</p>
              <p className="mt-1 text-sm text-slate-muted">Register at tentdecorexpo.com to be part of it.</p>
            </Card>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && e.photos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-md grid place-items-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={e.photos[lightbox]}
              alt=""
              className="max-h-[85vh] max-w-[92vw] rounded-lg shadow-elegant"
              onClick={(ev) => ev.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
