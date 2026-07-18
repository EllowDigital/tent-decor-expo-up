import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Building2,
  Users,
  Ticket,
  Store,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  EDITIONS,
  CURRENT_EVENT_ID,
  REGISTER_URL,
  type Edition,
} from "@/data/constants";
import { RegisterLink } from "@/components/common/RegisterLink";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/event-details")({
  loader: () => {
    const edition =
      EDITIONS.find((e) => e.slug === CURRENT_EVENT_ID) ??
      EDITIONS.find((e) => e.status === "upcoming") ??
      EDITIONS[0];
    if (!edition) throw notFound();
    return { edition };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.edition;
    if (!e) return { meta: [{ title: "Event details — Tent Decor Expo UP" }] };
    return buildHead({
      path: "/event-details",
      title: `Event details — ${e.edition} · ${e.city} ${e.year}`,
      description: `${e.dates} · ${e.venue}. ${e.summary}`,
      image: e.cover,
      type: e.status === "upcoming" ? "website" : "article",
    });
  },
  component: EventDetailsPage,
});

function EventDetailsPage() {
  const { edition: e } = Route.useLoaderData() as { edition: Edition };
  const isUpcoming = e.status === "upcoming";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${e.venue}, Uttar Pradesh, India`
  )}&output=embed`;

  const stats = [
    { k: e.exhibitors, v: "Exhibitors" },
    { k: e.visitors, v: "Trade footfall" },
    { k: "14", v: "Verticals" },
    { k: "3 days", v: "Show floor" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <img
            src={e.cover}
            alt=""
            width={1920}
            height={1080}
            sizes="100vw"
            decoding="async"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.28em] backdrop-blur-md ${
              isUpcoming
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-white/20 bg-white/5 text-white/80"
            }`}
          >
            <Sparkles className="h-3 w-3" />
            {isUpcoming ? "Upcoming edition" : "Latest edition"} · {e.edition}
          </span>
          <h1 className="mt-6 font-display font-bold leading-[1.02] text-[clamp(2.25rem,6vw,4.75rem)]">
            {e.city} <span className="text-gradient-gold">{e.year}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/75 text-base sm:text-lg leading-relaxed">
            {e.summary}
          </p>

          {isUpcoming && e.startDate && (
            <CountdownMeta
              startISO={e.startDate}
              endISO={e.endDate}
              timezone={e.timezone}
              tone="light"
              className="mt-8"
            />
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <RegisterLink
              kind="visitor"
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8"
            >
              <Ticket className="h-4 w-4" /> Get Free E-Pass
            </RegisterLink>
            <RegisterLink
              kind="exhibitor"
              variant="outline"
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <Store className="h-4 w-4" /> Book a Stall
            </RegisterLink>
          </div>

          {/* Stat strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map((s) => (
              <div key={s.v} className="bg-charcoal/95 backdrop-blur-sm p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold">
                  {s.k}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/60">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="py-10 sm:py-14 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {[
            { icon: Calendar, label: "Dates", value: e.dates },
            { icon: MapPin, label: "Venue", value: e.venue },
            { icon: Building2, label: "Host partner", value: e.host },
            { icon: Users, label: "Expected footfall", value: e.visitors },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-4 rounded-xl border border-border/60 bg-pearl p-4 sm:p-5"
            >
              <div className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center shrink-0">
                <f.icon className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-slate-muted">
                  {f.label}
                </p>
                <p className="mt-1 font-semibold text-charcoal text-sm sm:text-base leading-snug">
                  {f.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {e.highlights?.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
                Highlights
              </span>
              <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
                What's on the floor.
              </h2>
            </div>
            <ul className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {e.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-white p-4 sm:p-5"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                  <span className="text-sm sm:text-base text-charcoal">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* REGISTER + CALENDAR */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 sm:p-8 border-border/60 flex flex-col">
              <span className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center">
                <Ticket className="h-5 w-5 text-gold" />
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-gold font-medium">
                Visitors
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-charcoal">
                Free E-Pass
              </h2>
              <p className="mt-2 text-slate-muted text-sm leading-relaxed">
                Complimentary trade entry for buyers, planners and industry
                professionals. Register once, access all three show days.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <RegisterLink kind="visitor" size="lg">
                  <Ticket className="h-4 w-4" /> Get E-Pass
                </RegisterLink>
                <Button asChild variant="outline" size="lg" className="border-border">
                  <Link to="/visitors">Visitor profile <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 border-gold/40 bg-charcoal text-white flex flex-col">
              <span className="h-11 w-11 rounded-lg bg-gold/15 grid place-items-center">
                <Store className="h-5 w-5 text-gold" />
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-gold font-medium">
                Exhibitors
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold">
                Book a stall
              </h2>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">
                Reserve a stall to showcase products to thousands of qualified
                buyers. Prime locations sell out early.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <RegisterLink kind="exhibitor" size="lg">
                  <Store className="h-4 w-4" /> Book stall
                </RegisterLink>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Link to="/exhibitors">Exhibitor profile <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>
          </div>

          {isUpcoming && e.startDate && e.endDate && (
            <div className="mt-8 rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center shrink-0">
                  <Calendar className="h-5 w-5 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-muted font-medium">Save the date</p>
                  <p className="font-display text-base sm:text-lg text-charcoal">{e.dates}</p>
                </div>
              </div>
              <div className="sm:ml-auto">
                <AddToCalendar
                  variant="outline"
                  size="md"
                  title={`${e.edition} · ${e.city} ${e.year}`}
                  description={`${e.summary} Register at ${REGISTER_URL}`}
                  location={e.venue}
                  timezone={e.timezone}
                  start={e.startDate}
                  end={e.endDate}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* VENUE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-start">
          <div>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              Venue
            </span>
            <h2 className="mt-3 font-display font-bold text-charcoal leading-tight text-[clamp(1.5rem,4vw,2.5rem)]">
              {e.venue}
            </h2>
            <p className="mt-3 text-slate-muted leading-relaxed">
              {e.city}, Uttar Pradesh. Parking and hospitality lounges on-site
              across all show days.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-border">
                <Link to="/event/$slug" params={{ slug: e.slug }}>
                  Full edition page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-elegant aspect-[4/3] sm:aspect-[16/10]">
            <iframe
              title={`Map — ${e.venue}`}
              src={mapSrc}
              loading="lazy"
              className="w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
