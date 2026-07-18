import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, CheckCircle2, Ticket, Store, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { STATS, EDITIONS, GALLERY, REGISTER_URL } from "@/data/constants";
import { Reveal, Counter } from "@/components/common/Reveal";
import { Card } from "@/components/ui/card";
import { RegisterLink } from "@/components/common/RegisterLink";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tent Decor Expo UP — Kanpur 2026 | 4th Mahadhiveshan" },
      { name: "description", content: "Connect, learn and grow at UP's premier B2B tent, decor and event expo. 30 Aug – 1 Sep 2026 at Sanskar Lawn, Kanpur." },
      { property: "og:title", content: "Tent Decor Expo UP — Kanpur 2026" },
      { property: "og:description", content: "India's largest B2B expo for tent, decor and catering — hosted by Shamiyana Furniture Association." },
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
      <HowToRegister />
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
  return (
    <section className="relative overflow-hidden -mt-16 sm:-mt-20 pt-16 sm:pt-20">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
              {upcoming.status === "upcoming" ? "Upcoming Edition" : "Next Edition"}
            </span>
          </div>

          <h1 className="mt-6 font-display font-bold text-white leading-[1.05] text-[clamp(2.25rem,6.5vw,5.5rem)] max-w-4xl">
            {upcoming.edition}: <span className="text-gradient-gold">{upcoming.city} {upcoming.year}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-white/75 text-base sm:text-lg leading-relaxed">
            {upcoming.summary}
          </p>

          {/* Key facts */}
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl">
            <Fact icon={<Calendar className="h-4 w-4" />} label="Dates" value={upcoming.dates} />
            <Fact icon={<MapPin className="h-4 w-4" />} label="Venue" value={upcoming.venue} />
            <Fact icon={<Users className="h-4 w-4" />} label="Scale" value={`${upcoming.exhibitors} exhibitors · ${upcoming.visitors} visitors`} />
          </dl>

          {/* Countdown */}
          {cd && (
            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
              {[
                { v: cd.days, l: "Days" },
                { v: cd.hours, l: "Hours" },
                { v: cd.minutes, l: "Min" },
                { v: cd.seconds, l: "Sec" },
              ].map((u) => (
                <div key={u.l} className="min-w-[68px] rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gold tabular-nums">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{u.l}</div>
                </div>
              ))}
            </div>
          )}

          {/* Primary CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
            <RegisterLink size="lg" variant="gold" showIcon ariaLabel="Get your free E-Pass at tentdecorexpo.com">
              Get Free E-Pass
            </RegisterLink>
            <RegisterLink size="lg" variant="outline" ariaLabel="Book an exhibitor stall at tentdecorexpo.com" className="border-white/40 text-white hover:bg-white/10">
              Book Exhibitor Stall
            </RegisterLink>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 h-14 px-6">
              <Link to="/events/$year" params={{ year: upcoming.year }}>
                Event details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Registration is free and hosted at{" "}
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-light">
              tentdecorexpo.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-widest">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-sm sm:text-[15px] text-white font-medium leading-snug">{value}</p>
    </div>
  );
}

/* ---------------- HOW TO REGISTER ---------------- */

function HowToRegister() {
  const steps = [
    {
      icon: Ticket,
      title: "Free Visitor E-Pass",
      desc: "For trade buyers, planners and industry professionals. Instant confirmation to your inbox.",
      cta: "Get E-Pass",
    },
    {
      icon: Store,
      title: "Exhibitor Stall Booking",
      desc: "9 sqm to premium custom stalls. Our team responds within one business day.",
      cta: "Book a Stall",
    },
    {
      icon: CheckCircle2,
      title: "Arrive & Attend",
      desc: "Show your E-Pass at the venue. Walk-in registration is also available on all three days.",
      cta: null,
    },
  ];
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">How to attend</span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Three simple steps.
          </h2>
          <p className="mt-4 text-slate-muted leading-relaxed">
            Registration for every edition happens at <span className="text-charcoal font-medium">tentdecorexpo.com</span>. It only takes a minute.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative">
                <Card className="h-full p-6 sm:p-7 border-border/60">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-slate-muted">Step {i + 1}</div>
                      <h3 className="mt-0.5 font-display text-lg sm:text-xl font-semibold text-charcoal">{s.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-muted leading-relaxed">{s.desc}</p>
                  {s.cta && (
                    <RegisterLink size="sm" variant="outline" className="mt-5" showIcon>
                      {s.cta}
                    </RegisterLink>
                  )}
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */

function Stats() {
  return (
    <section className="py-14 sm:py-16 bg-pearl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Editions</span>
            <h2 className="mt-2 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)]">
              This year & recent past.
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-charcoal hover:bg-gold/10">
            <Link to="/events">All editions <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
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
              <RegisterLink size="sm" variant="gold" showIcon>Register</RegisterLink>
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
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Moments</span>
            <h2 className="mt-2 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)]">From the show floor.</h2>
          </div>
          <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10">
            <Link to="/gallery">Full gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent h-14 px-8">
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
