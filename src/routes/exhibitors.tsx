import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Store,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Target,
  Megaphone,
  Sparkles,
  FileText,
  Handshake,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { assets } from "@/lib/assets";
const exhibitorImg = assets.gallery.g6;
import { Button } from "@/components/ui/button";
import { EDITIONS, EXHIBITOR_CATEGORIES, REGISTER_URL } from "@/data/constants";
import { StallBookingDialog } from "@/components/common/StallBookingDialog";

import { buildHead, PAGE_SEO, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/exhibitors")({
  head: () =>
    buildHead({
      ...PAGE_SEO.exhibitors,
      extraJsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Attend", path: "/registration" },
          { name: "For Exhibitors", path: "/exhibitors" },
        ]),
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
    {
      title: "Shell Scheme",
      size: "9 – 18 sqm",
      tone: "muted",
      desc: "Ready-to-use booth with fascia, lights, plug points and furniture. Best for first-time exhibitors.",
      includes: ["Modular walls & fascia", "2 spotlights", "1 plug point", "Table + 2 chairs"],
    },
    {
      title: "Bare Space",
      size: "18 – 36 sqm",
      tone: "featured",
      desc: "Design and build your own custom stall. Ideal for established brands with a bespoke identity.",
      includes: [
        "Raw floor space",
        "Custom build allowed",
        "Prime aisle options",
        "Overnight security",
      ],
    },
    {
      title: "Premium Pavilion",
      size: "48 sqm+",
      tone: "muted",
      desc: "Prime hall locations for anchor brands. Includes hospitality lounge and priority signage.",
      includes: [
        "Anchor hall placement",
        "Hospitality lounge",
        "Priority signage",
        "Awards submission",
      ],
    },
  ];

  const process = [
    {
      icon: FileText,
      title: "Submit enquiry",
      desc: "Share stall size, product category and preferred hall.",
    },
    {
      icon: Handshake,
      title: "Team callback",
      desc: "Our exhibitor desk confirms availability within 24 business hours.",
    },
    {
      icon: Store,
      title: "Reserve & pay",
      desc: "Confirm the stall with an advance and receive floor-plan proof.",
    },
    {
      icon: Trophy,
      title: "Show up & sell",
      desc: "Move-in one day prior. Meet buyers across three focused days.",
    },
  ];

  const stats = [
    { k: "250+", v: "Exhibitors" },
    { k: "14", v: "Verticals" },
    { k: "9 sqm", v: "Starting stall" },
    { k: "3 days", v: "Selling floor" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,theme(colors.gold)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,theme(colors.gold)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7 min-w-0">
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
                <span className="h-px w-8 bg-gold" /> For Exhibitors
              </span>
              <h1 className="mt-4 font-display font-bold leading-[1.02] text-[clamp(2.25rem,6vw,4.5rem)]">
                Grow as an <span className="text-gradient-gold">exhibitor.</span>
              </h1>
              <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
                Meet decision-makers, launch products, and close orders on the floor. Choose a shell
                scheme or design a bespoke pavilion.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <StallBookingDialog
                  eventName={eventName}
                  eventDate={upcoming.dates}
                  eventVenue={upcoming.venue}
                  trigger={
                    <Button
                      size="lg"
                      className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8"
                    >
                      <Store className="mr-2 h-4 w-4" /> Request Stall Booking
                    </Button>
                  }
                />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8"
                >
                  <Link to="/event/$slug" params={{ slug: upcoming.slug }}>
                    Event details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold font-medium">
                  Upcoming edition
                </p>
                <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  {upcoming.edition} · {upcoming.city} {upcoming.year}
                </p>
                <dl className="mt-5 space-y-3.5">
                  <MetaRow icon={Calendar} label="Dates" value={upcoming.dates} />
                  <MetaRow icon={MapPin} label="Venue" value={upcoming.venue} />
                  <MetaRow
                    icon={Users}
                    label="Audience"
                    value={`${upcoming.exhibitors} exhibitors · ${upcoming.visitors} visitors`}
                  />
                </dl>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map((s) => (
              <div key={s.v} className="bg-charcoal p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold">{s.k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STALL TYPES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              Stall types
            </span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              Three formats, one purpose.
            </h2>
            <p className="mt-3 text-slate-muted">
              Pick the right footprint for your brand. We'll handle logistics — you focus on
              selling.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
            {stallTypes.map((s) => {
              const featured = s.tone === "featured";
              return (
                <div
                  key={s.title}
                  className={
                    featured
                      ? "relative rounded-2xl border border-gold/40 bg-charcoal text-white p-6 sm:p-7 shadow-gold flex flex-col"
                      : "relative rounded-2xl border border-border/60 bg-pearl p-6 sm:p-7 flex flex-col"
                  }
                >
                  {featured && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gradient-gold text-charcoal text-[10px] uppercase tracking-[0.24em] font-semibold px-3 py-1 shadow-gold">
                      Most popular
                    </span>
                  )}
                  <span
                    className={`h-10 w-10 rounded-lg grid place-items-center ${featured ? "bg-gold/15" : "bg-gold/10"}`}
                  >
                    <Store className="h-5 w-5 text-gold" />
                  </span>
                  <h3
                    className={`mt-5 font-display text-xl font-semibold ${featured ? "text-white" : "text-charcoal"}`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${featured ? "text-gold" : "text-gold/80"} font-medium`}
                  >
                    {s.size}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${featured ? "text-white/70" : "text-slate-muted"}`}
                  >
                    {s.desc}
                  </p>
                  <ul
                    className={`mt-5 space-y-2 text-sm ${featured ? "text-white/85" : "text-charcoal/80"}`}
                  >
                    {s.includes.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS SPLIT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="min-w-0">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={exhibitorImg}
                  alt="Exhibitors at Tent Decor Expo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
                What you get
              </span>
              <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
                Everything a serious exhibitor needs.
              </h2>
              <p className="mt-4 text-slate-muted leading-relaxed">
                Shell fabrication, utility connections, hospitality — handled. You show up, plug in,
                and sell.
              </p>
              <ul className="mt-6 grid gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                    <span className="text-sm sm:text-base text-charcoal">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                Prefer the full portal form?{" "}
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal font-medium underline underline-offset-4 decoration-gold hover:text-gold"
                >
                  tentdecorexpo.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING PROCESS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              Booking process
            </span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              From enquiry to floor in four steps.
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
                    <s.icon className="h-5 w-5 text-gold" />
                  </span>
                  <span className="font-display text-3xl font-bold text-gold/25 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-muted leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              Categories
            </span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Verticals on the floor.
            </h2>
          </div>
          <div className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXHIBITOR_CATEGORIES.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-border/60 bg-white p-5 transition-all hover:border-gold/50 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-widest">Category</span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-charcoal">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-charcoal">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-3 py-1.5">
            <Target className="h-3.5 w-3.5 text-gold" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
              Limited stalls
            </span>
          </div>
          <h2 className="mt-5 font-display font-bold text-white text-[clamp(1.75rem,4.5vw,2.75rem)]">
            Reserve your presence.
          </h2>
          <p className="mt-4 text-white/70">
            Share your requirements — our team responds within one business day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <StallBookingDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8"
                >
                  <Store className="mr-2 h-4 w-4" /> Request Stall Booking
                </Button>
              }
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8"
            >
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

function MetaRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-8 w-8 shrink-0 rounded-md bg-gold/15 grid place-items-center">
        <Icon className="h-4 w-4 text-gold" />
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-white/50">{label}</dt>
        <dd className="mt-0.5 text-sm text-white font-medium leading-snug">{value}</dd>
      </div>
    </div>
  );
}
