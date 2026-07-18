import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Store, CheckCircle2, Calendar, MapPin, Users, Target, Megaphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EDITIONS, EXHIBITOR_CATEGORIES, REGISTER_URL } from "@/data/constants";
import { StallBookingDialog } from "@/components/common/StallBookingDialog";

export const Route = createFileRoute("/exhibitors")({
  head: () => ({
    meta: [
      { title: "For Exhibitors — Tent Decor Expo UP" },
      { name: "description", content: "Exhibitor profile for Tent Decor Expo UP. Stall categories, sizes, audience and how to book your presence at the Mahadhiveshan." },
      { property: "og:title", content: "Exhibitor Profile — Tent Decor Expo UP" },
      { property: "og:description", content: "Book a stall at UP's largest B2B tent, decor & catering expo. Shell schemes and premium custom stalls available." },
    ],
  }),
  component: ExhibitorsPage,
});

function ExhibitorsPage() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  const eventName = `${upcoming.edition} · ${upcoming.city} ${upcoming.year}`;

  const benefits = [
    "Direct access to 25,000+ trade visitors from UP, Bihar & MP",
    "Shell scheme from 9 sqm — premium custom stalls available",
    "Listing on the official event portal & printed directory",
    "Curated buyer-seller meetings arranged by district conveners",
    "Central stage slot options for live product demonstrations",
    "Innovation Awards submission for eligible categories",
  ];

  const stallTypes = [
    { title: "Shell Scheme (9–18 sqm)", desc: "Ready-to-use booth with fascia, lights, plug points and furniture. Best for first-time exhibitors." },
    { title: "Bare Space (18–36 sqm)", desc: "Design and build your own custom stall. Ideal for established brands with a bespoke identity." },
    { title: "Premium Pavilion (48 sqm+)", desc: "Prime hall locations for anchor brands. Includes hospitality lounge and priority signage." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Exhibitor Profile</span>
          <h1 className="mt-3 font-display font-bold leading-[1.05] text-[clamp(2rem,5vw,4rem)]">
            Grow as an <span className="text-gradient-gold">exhibitor</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed">
            Meet decision-makers, launch products, and close orders on the floor. Choose a shell scheme or design a bespoke pavilion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <StallBookingDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8">
                  <Store className="mr-2 h-4 w-4" /> Request Stall Booking
                </Button>
              }
            />
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
              <Link to="/events/$year" params={{ year: upcoming.year }}>
                Event details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <Meta icon={Calendar} label="Dates" value={upcoming.dates} />
            <Meta icon={MapPin} label="Venue" value={upcoming.venue} />
            <Meta icon={Users} label="Audience" value={`${upcoming.exhibitors} exhibitors · ${upcoming.visitors} visitors`} />
          </dl>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">What you get</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Everything a serious exhibitor needs.
            </h2>
            <p className="mt-4 text-slate-muted leading-relaxed">
              We handle logistics — from shell fabrication and utility connections to hospitality. You focus on selling.
            </p>
            <p className="mt-4 text-sm">
              Prefer to fill the full portal form?{" "}
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="text-charcoal font-medium underline underline-offset-4 decoration-gold hover:text-gold">
                tentdecorexpo.com
              </a>
            </p>
          </div>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-border/60 bg-white p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                <span className="text-sm sm:text-base text-charcoal">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stall types */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Stall types</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Three formats, one purpose.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
            {stallTypes.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border/60 bg-pearl p-6 sm:p-7">
                <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
                  <Store className="h-5 w-5 text-gold" />
                </span>
                <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Categories</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Verticals on the floor.
            </h2>
          </div>
          <div className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXHIBITOR_CATEGORIES.map((c) => (
              <div key={c.title} className="rounded-xl border border-border/60 bg-white p-5">
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-widest">Category</span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-charcoal">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-charcoal">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-3 py-1.5">
            <Target className="h-3.5 w-3.5 text-gold" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">Limited stalls</span>
          </div>
          <h2 className="mt-5 font-display font-bold text-white text-[clamp(1.75rem,4.5vw,2.75rem)]">
            Reserve your presence.
          </h2>
          <p className="mt-4 text-white/70">Share your requirements — our team responds within one business day.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <StallBookingDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8">
                  <Store className="mr-2 h-4 w-4" /> Request Stall Booking
                </Button>
              }
            />
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
              <Link to="/contact">
                <Megaphone className="mr-2 h-4 w-4" /> Talk to us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Meta({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-9 w-9 shrink-0 rounded-md bg-gold/15 grid place-items-center">
        <Icon className="h-4 w-4 text-gold" />
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-white/50">{label}</dt>
        <dd className="mt-0.5 text-sm sm:text-base text-white font-medium leading-snug">{value}</dd>
      </div>
    </div>
  );
}
