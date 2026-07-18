import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Building2, Users, Ticket, Store, ArrowRight } from "lucide-react";
import { EDITIONS, CURRENT_EVENT_ID, REGISTER_URL, type Edition } from "@/data/constants";
import { RegisterLink } from "@/components/common/RegisterLink";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { CountdownMeta } from "@/components/common/CountdownMeta";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildHead } from "@/lib/seo";

/**
 * Stable public URL for the currently active edition.
 * Reads siteConfig.currentEventId — change that one value each year
 * and every fact on this page updates automatically.
 */
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
      type: e.status === "upcoming" ? "event" : "article",
    });
  },
  component: EventDetailsPage,
});

function EventDetailsPage() {
  const { edition: e } = Route.useLoaderData() as { edition: Edition };
  const isUpcoming = e.status === "upcoming";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${e.venue}, Uttar Pradesh, India`)}&output=embed`;

  const facts = [
    { icon: Calendar, label: "Dates", value: e.dates },
    { icon: MapPin, label: "Venue", value: e.venue },
    { icon: Building2, label: "Host partner", value: e.host },
    { icon: Users, label: "Expected footfall", value: e.visitors },
  ];

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-charcoal text-white -mt-16 sm:-mt-20 pt-24 sm:pt-32 pb-14 sm:pb-20">
        <div className="absolute inset-0">
          <img src={e.cover} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.28em] backdrop-blur-md ${
            isUpcoming ? "border-gold/50 bg-gold/10 text-gold" : "border-white/20 bg-white/5 text-white/80"
          }`}>
            {isUpcoming ? "Upcoming edition" : "Latest edition"} · {e.edition}
          </span>
          <h1 className="mt-5 sm:mt-6 font-display font-bold leading-[1.05] text-[clamp(2rem,6vw,4.5rem)]">
            {e.city} <span className="text-gradient-gold">{e.year}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 text-base sm:text-lg font-light">{e.summary}</p>

          {isUpcoming && e.startDate && (
            <CountdownMeta
              startISO={e.startDate}
              endISO={e.endDate}
              timezone={e.timezone}
              tone="light"
              className="mt-6"
            />
          )}
        </div>
      </section>

      {/* FACTS */}
      <section className="py-10 sm:py-14 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-gold/10 grid place-items-center shrink-0">
                <f.icon className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-muted">{f.label}</p>
                <p className="font-semibold text-charcoal text-sm sm:text-base">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTER + CALENDAR */}
      <section className="py-16 sm:py-24 bg-pearl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <Card className="p-6 sm:p-8 border-border/60 bg-white shadow-elegant">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-gold font-medium">Visitors</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-charcoal">Free E-Pass</h2>
            <p className="mt-2 text-slate-muted text-sm leading-relaxed">
              Complimentary trade entry for buyers, planners and industry professionals. Register once, access all three show days.
            </p>
            <RegisterLink kind="visitor" size="lg" className="mt-6 w-full sm:w-auto">
              <Ticket className="h-4 w-4" /> Get Free E-Pass
            </RegisterLink>
          </Card>

          <Card className="p-6 sm:p-8 border-border/60 bg-white shadow-elegant">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-gold font-medium">Exhibitors</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-charcoal">Book a stall</h2>
            <p className="mt-2 text-slate-muted text-sm leading-relaxed">
              Reserve a stall to showcase products to thousands of qualified buyers. Prime locations sell out early.
            </p>
            <RegisterLink kind="exhibitor" variant="outline" size="lg" className="mt-6 w-full sm:w-auto">
              <Store className="h-4 w-4" /> Book Your Stall
            </RegisterLink>
          </Card>
        </div>

        {isUpcoming && e.startDate && e.endDate && (
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8 flex flex-wrap items-center gap-3">
            <p className="text-sm text-slate-muted">Save the date to your calendar:</p>
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
        )}
      </section>

      {/* VENUE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-gold font-medium">Venue</span>
            <h2 className="mt-3 font-display font-bold text-charcoal leading-tight text-[clamp(1.5rem,4vw,2.5rem)]">
              {e.venue}
            </h2>
            <p className="mt-3 text-slate-muted leading-relaxed">
              {e.city}, Uttar Pradesh. Parking and hospitality lounges on-site across all show days.
            </p>
            <Button asChild variant="outline" className="mt-6 border-gold text-charcoal hover:bg-gold/10">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.venue)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="mt-6">
              <Link
                to="/event/$slug"
                params={{ slug: e.slug }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline underline-offset-4"
              >
                Full edition page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-elegant aspect-[16/10]">
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
