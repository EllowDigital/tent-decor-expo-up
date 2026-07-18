import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Store,
  Ticket,
  Search,
  Calendar,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import {
  EDITIONS,
  VISITOR_REGISTER_URL,
  EXHIBITOR_REGISTER_URL,
  CONTACT,
} from "@/data/constants";
import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/registration")({
  head: () => buildHead(PAGE_SEO.registration),
  component: RegistrationPage,
});

function RegistrationPage() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];

  const stats = [
    { k: "Free", v: "Visitor E-Pass" },
    { k: "48 hrs", v: "Exhibitor reply" },
    { k: "14", v: "Verticals" },
    { k: "3 days", v: "Event access" },
  ];

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,theme(colors.gold)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,theme(colors.gold)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              <span className="h-px w-8 bg-gold" /> Registration & Booking
            </span>
            <h1 className="mt-4 font-display font-bold leading-[1.02] text-[clamp(2.25rem,6vw,4.5rem)]">
              Join the next <span className="text-gradient-gold">Expo.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed">
              Two clear paths — visitors get a free E-Pass, exhibitors book
              stall space. Both open in our official registration portal.
            </p>
          </Reveal>

          {/* Event facts row */}
          <div className="mt-8 sm:mt-10 grid gap-3 sm:grid-cols-3 max-w-4xl">
            <FactRow icon={Calendar} label="Edition" value={`${upcoming.edition} · ${upcoming.city} ${upcoming.year}`} />
            <FactRow icon={MapPin} label="Venue" value={upcoming.venue} />
            <FactRow icon={Users} label="Audience" value={upcoming.visitors + " visitors"} />
          </div>

          {/* Stat strip */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map((s) => (
              <div key={s.v} className="bg-charcoal p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold">{s.k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-14 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Pick your path</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              Visitor or exhibitor — start here.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
            {/* Visitor */}
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 flex flex-col transition-all hover:border-gold/50 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center shrink-0">
                  <Ticket className="h-5 w-5 text-gold" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-slate-muted">Path 1 · For Visitors</div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">Visitor E-Pass</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                Trade buyers, planners, hoteliers and industry professionals —
                get a complimentary entry pass valid across all three show days.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-charcoal/80">
                {[
                  "Free entry for verified trade visitors",
                  "Valid across all 3 event days",
                  "Access to launches, panels & networking",
                  "Walk-in registration also available at venue",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 space-y-2">
                <Button asChild size="lg" className="w-full bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12">
                  <a href={VISITOR_REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Generate E-Pass <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <div className="flex flex-wrap gap-3 text-xs text-slate-muted justify-center">
                  <Link to="/visitors" className="hover:text-gold underline-offset-4 hover:underline">Visitor profile</Link>
                  <span aria-hidden>·</span>
                  <Link to="/epass-status" className="hover:text-gold underline-offset-4 hover:underline">Check status</Link>
                </div>
              </div>
            </div>

            {/* Exhibitor */}
            <div className="rounded-2xl border border-gold/30 bg-charcoal text-white p-6 sm:p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-30 pointer-events-none">
                <div className="h-40 w-40 rounded-full bg-gold blur-3xl" />
              </div>
              <div className="relative flex items-center gap-3">
                <span className="h-11 w-11 rounded-lg bg-gold/15 grid place-items-center shrink-0">
                  <Store className="h-5 w-5 text-gold" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-gold/80">Path 2 · For Exhibitors</div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold">Stall Booking</h3>
                </div>
              </div>
              <p className="relative mt-4 text-sm text-white/70 leading-relaxed">
                Manufacturers, lighting providers, catering suppliers, decor
                houses — reserve stall space across 14 industry verticals.
              </p>
              <ul className="relative mt-5 space-y-2 text-sm text-white/85">
                {[
                  "Shell scheme & bare-space stalls",
                  "Prime aisle placement available",
                  "Buyer-seller meeting slots included",
                  "Confirmation within 48 business hours",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto pt-6 space-y-2">
                <Button asChild size="lg" className="w-full bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12">
                  <a href={EXHIBITOR_REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Book Stall Space <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <div className="flex flex-wrap gap-3 text-xs text-white/50 justify-center">
                  <Link to="/exhibitors" className="hover:text-gold underline-offset-4 hover:underline">Exhibitor profile</Link>
                  <span aria-hidden>·</span>
                  <Link to="/event-details" className="hover:text-gold underline-offset-4 hover:underline">Event details</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Explanatory note */}
          <p className="mt-8 text-center text-xs sm:text-sm text-slate-muted max-w-2xl mx-auto">
            Registration links are updated for each new edition. If a link
            doesn't work, contact us — we'll share the latest form directly.
          </p>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="py-14 sm:py-20 bg-white border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            <QuickLink
              to="/epass-status"
              icon={Search}
              eyebrow="Already registered?"
              title="Check your E-Pass status"
              desc="Enter your reference code to view registration details."
            />
            <QuickLink
              to="/event-details"
              icon={Building2}
              eyebrow="Full agenda"
              title="Event details"
              desc="Dates, venue, host partners, and everything on the floor."
            />
            <QuickLink
              to="/contact"
              icon={Mail}
              eyebrow="Group registrations"
              title="Talk to the desk"
              desc="Bulk visitor passes, sponsorship or hospitality queries."
            />
          </div>
        </div>
      </section>

      {/* HELP / SUPPORT */}
      <section className="py-14 sm:py-20 lg:py-24 bg-pearl border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Registration support</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight">
              Need help with registration or booking?
            </h2>
            <p className="mt-3 text-slate-muted">
              Our registration desk can help with group visitor E-Passes, stall
              availability, floor-plan queries and sponsorship options.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-3">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="rounded-2xl border border-border/60 bg-white p-5 sm:p-6 hover:border-gold hover:shadow-lg transition-all block">
              <Phone className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-muted">Registration desk</p>
              <p className="mt-1 font-display text-lg font-semibold text-charcoal">{CONTACT.phone}</p>
              <p className="mt-1 text-xs text-slate-muted">Mon–Sat, 10am–7pm IST</p>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="rounded-2xl border border-border/60 bg-white p-5 sm:p-6 hover:border-gold hover:shadow-lg transition-all block">
              <Mail className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-muted">Email</p>
              <p className="mt-1 font-display text-lg font-semibold text-charcoal break-all">{CONTACT.email}</p>
              <p className="mt-1 text-xs text-slate-muted">Reply within 24 business hours</p>
            </a>
            <Link to="/contact" className="rounded-2xl border border-border/60 bg-white p-5 sm:p-6 hover:border-gold hover:shadow-lg transition-all block">
              <MapPin className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-muted">Full contact</p>
              <p className="mt-1 font-display text-lg font-semibold text-charcoal">Message us</p>
              <p className="mt-1 text-xs text-slate-muted inline-flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FactRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
      <span className="h-9 w-9 shrink-0 rounded-md bg-gold/15 grid place-items-center">
        <Icon className="h-4 w-4 text-gold" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-white/50">{label}</p>
        <p className="mt-0.5 text-sm text-white font-medium leading-snug truncate">{value}</p>
      </div>
    </div>
  );
}

function QuickLink({
  to,
  icon: Icon,
  eyebrow,
  title,
  desc,
}: {
  to: string;
  icon: any;
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border/60 bg-pearl p-6 flex items-start gap-4 hover:border-gold hover:shadow-lg transition-all"
    >
      <span className="h-11 w-11 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
        <Icon className="h-5 w-5 text-gold" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-slate-muted">{eyebrow}</p>
        <p className="mt-1 font-display text-lg font-semibold text-charcoal">{title}</p>
        <p className="mt-1 text-sm text-slate-muted leading-relaxed">{desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-gold font-medium">
          Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
