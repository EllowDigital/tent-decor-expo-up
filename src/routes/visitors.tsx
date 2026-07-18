import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ticket, CheckCircle2, Calendar, MapPin, Users, Handshake, ShieldCheck, BadgeCheck } from "lucide-react";
import visitorImg from "@/assets/g1.jpg";
import { Button } from "@/components/ui/button";
import { EDITIONS, REGISTER_URL } from "@/data/constants";
import { EpassDialog } from "@/components/common/EpassDialog";

export const Route = createFileRoute("/visitors")({
  head: () => ({
    meta: [
      { title: "For Visitors — Tent Decor Expo UP" },
      { name: "description", content: "Trade visitor profile for Tent Decor Expo UP. Learn what a Visitor E-Pass includes, who should attend, and how to register." },
      { property: "og:title", content: "Visitor Profile — Tent Decor Expo UP" },
      { property: "og:description", content: "Free trade E-Pass for planners, buyers and industry professionals attending the Mahadhiveshan." },
    ],
  }),
  component: VisitorsPage,
});

function VisitorsPage() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  const eventName = `${upcoming.edition} · ${upcoming.city} ${upcoming.year}`;

  const includes = [
    "Free 3-day trade access to the show floor",
    "Access to all panels, keynotes and stage demos",
    "Networking lounge & association hospitality",
    "Innovation Awards evening ceremony",
    "Digital badge with QR check-in",
  ];
  const audience = [
    { icon: Users, title: "Wedding planners", desc: "Regional and destination planners scouting vendors and mandap makers." },
    { icon: Handshake, title: "Trade buyers", desc: "Bulk buyers, distributors and dealers across tent, decor and F&B." },
    { icon: BadgeCheck, title: "Association members", desc: "TCDWA UP members and delegates from partner associations." },
    { icon: ShieldCheck, title: "Industry professionals", desc: "Catering leads, decor artists, F&B teams and equipment operators." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Visitor Profile</span>
          <h1 className="mt-3 font-display font-bold leading-[1.05] text-[clamp(2rem,5vw,4rem)]">
            Attend as a <span className="text-gradient-gold">trade visitor</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed">
            The Visitor E-Pass is free for verified trade professionals. Meet 250+ exhibitors across 14 verticals in three focused days.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <EpassDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8">
                  <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                </Button>
              }
            />
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8">
              <Link to="/event/$slug" params={{ slug: upcoming.slug }}>
                Event details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <Meta icon={Calendar} label="Dates" value={upcoming.dates} />
            <Meta icon={MapPin} label="Venue" value={upcoming.venue} />
            <Meta icon={Users} label="Expected footfall" value={upcoming.visitors} />
          </dl>
        </div>
      </section>

      {/* Z-pattern: text left, image right */}
      <section className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2 min-w-0">
              <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Who should attend</span>
              <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
                Your E-Pass, in one line.
              </h2>
              <p className="mt-4 text-slate-muted leading-relaxed">
                Complete a 60-second form to receive a reference code, then finish verification on the official portal.
              </p>
              <ul className="mt-6 space-y-3">
                {includes.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                    <span className="text-sm sm:text-base text-charcoal">{i}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="text-charcoal font-medium underline underline-offset-4 decoration-gold hover:text-gold">
                  tentdecorexpo.com
                </a>
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
                <img src={visitorImg} alt="Trade visitors at Tent Decor Expo" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Who attends</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Built for serious buyers.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audience.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6">
                <span className="h-9 w-9 rounded-lg bg-gold/10 grid place-items-center">
                  <a.icon className="h-4 w-4 text-gold" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-muted leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-charcoal">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-[clamp(1.75rem,4.5vw,2.75rem)]">
            Ready to attend?
          </h2>
          <p className="mt-4 text-white/70">Get your reference code in under a minute.</p>
          <div className="mt-8 flex justify-center">
            <EpassDialog
              eventName={eventName}
              eventDate={upcoming.dates}
              eventVenue={upcoming.venue}
              trigger={
                <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8">
                  <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                </Button>
              }
            />
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
        <dd className="mt-0.5 text-sm sm:text-base text-white font-medium">{value}</dd>
      </div>
    </div>
  );
}
