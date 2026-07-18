import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Ticket,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Handshake,
  ShieldCheck,
  BadgeCheck,
  ClipboardCheck,
  Mail,
  Sparkles,
  QrCode,
  DoorOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { assets } from "@/lib/assets";
const visitorImg = assets.gallery.g1;
import { Button } from "@/components/ui/button";
import { EDITIONS, REGISTER_URL } from "@/data/constants";
import { EpassDialog } from "@/components/common/EpassDialog";

import { buildHead, PAGE_SEO, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/visitors")({
  head: () =>
    buildHead({
      ...PAGE_SEO.visitors,
      extraJsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Attend", path: "/registration" },
          { name: "For Visitors", path: "/visitors" },
        ]),
      ],
    }),
  component: VisitorsPage,
});

function VisitorsPage() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  const eventName = `${upcoming.edition} · ${upcoming.city} ${upcoming.year}`;

  const includes = [
    "Free 3-day trade access to the show floor",
    "All panels, keynotes and stage demonstrations",
    "Networking lounge & association hospitality",
    "Innovation Awards evening ceremony",
    "Digital badge with QR check-in",
    "Directory of 250+ exhibitors",
  ];

  const audience = [
    {
      icon: Users,
      title: "Wedding planners",
      desc: "Regional and destination planners scouting vendors and mandap makers.",
    },
    {
      icon: Handshake,
      title: "Trade buyers",
      desc: "Bulk buyers, distributors and dealers across tent, decor and F&B.",
    },
    {
      icon: BadgeCheck,
      title: "Association members",
      desc: "TCDWA UP members and delegates from partner associations.",
    },
    {
      icon: ShieldCheck,
      title: "Industry professionals",
      desc: "Catering leads, decor artists, F&B teams and equipment operators.",
    },
  ];

  const steps = [
    {
      icon: ClipboardCheck,
      title: "Fill the E-Pass form",
      desc: "60 seconds — name, business, city, and mobile number.",
    },
    {
      icon: Mail,
      title: "Get your reference code",
      desc: "We email a TDX code you can bookmark and share with your team.",
    },
    {
      icon: QrCode,
      title: "Receive your digital badge",
      desc: "A QR badge arrives 7 days before the show — save it to your wallet.",
    },
    {
      icon: DoorOpen,
      title: "Walk in — skip the queue",
      desc: "Scan at the trade entry lane for priority access on all three days.",
    },
  ];

  const stats = [
    { k: "Free", v: "Trade entry" },
    { k: "3 days", v: "Show access" },
    { k: "250+", v: "Exhibitors to meet" },
    { k: "25,000+", v: "Trade footfall" },
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
                <span className="h-px w-8 bg-gold" /> For Visitors
              </span>
              <h1 className="mt-4 font-display font-bold leading-[1.02] text-[clamp(2.25rem,6vw,4.5rem)]">
                Attend as a <span className="text-gradient-gold">trade visitor.</span>
              </h1>
              <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
                The Visitor E-Pass is free for verified trade professionals. Meet 250+ exhibitors
                across 14 verticals in three focused days.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <EpassDialog
                  eventName={eventName}
                  eventDate={upcoming.dates}
                  eventVenue={upcoming.venue}
                  trigger={
                    <Button
                      size="lg"
                      className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8"
                    >
                      <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
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
                  <MetaRow icon={Users} label="Expected footfall" value={upcoming.visitors} />
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

      {/* HOW TO ATTEND — TIMELINE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              How to attend
            </span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              From code to check-in in four steps.
            </h2>
          </div>

          <ol className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
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

      {/* WHAT'S INCLUDED — split */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="min-w-0 order-2 lg:order-1">
              <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
                What's included
              </span>
              <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
                Your E-Pass, unpacked.
              </h2>
              <p className="mt-4 text-slate-muted leading-relaxed">
                One code. Three days. Everything the show has to offer — with zero cost for verified
                trade professionals.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {includes.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                    <span className="text-sm sm:text-base text-charcoal">{i}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-muted">
                Prefer the official portal?{" "}
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
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={visitorImg}
                  alt="Trade visitors at Tent Decor Expo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center gap-2 text-white/90">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-xs sm:text-sm">
                    Trusted by 25,000+ trade visitors every edition
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              Who attends
            </span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Built for serious buyers.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audience.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6 transition-all hover:border-gold/50 hover:shadow-lg"
              >
                <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
                  <a.icon className="h-5 w-5 text-gold" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-muted leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-charcoal">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
              Free · Trade only
            </span>
          </span>
          <h2 className="mt-5 font-display font-bold text-white text-[clamp(1.75rem,4.5vw,2.75rem)]">
            Ready to attend?
          </h2>
          <p className="mt-4 text-white/70">
            Get your reference code in under a minute — no card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <EpassDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8"
                >
                  <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                </Button>
              }
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8"
            >
              <Link to="/epass-status">
                Check E-Pass status <ArrowRight className="ml-2 h-4 w-4" />
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
