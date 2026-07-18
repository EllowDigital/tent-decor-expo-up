import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ExternalLink, Mail, MapPin, Phone, Store, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { EDITIONS, VISITOR_REGISTER_URL, EXHIBITOR_REGISTER_URL, CONTACT } from "@/data/constants";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: "Registration & Booking — Tent Decor Expo UP" },
      {
        name: "description",
        content: "Join the next Tent Decor Expo UP — Visitor E-Pass and Exhibitor Stall Booking. Official external portal for the current edition.",
      },
      { property: "og:title", content: "Registration & Booking — Tent Decor Expo UP" },
      {
        property: "og:description",
        content: "Get your Visitor E-Pass or book Exhibitor stall space for the upcoming Tent Decor Expo UP edition.",
      },
      { property: "og:url", content: "/registration" },
    ],
    links: [{ rel: "canonical", href: "/registration" }],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Registration & Booking</span>
            <h1 className="mt-3 font-display font-bold text-white leading-[1.05] text-[clamp(1.75rem,4.5vw,3.5rem)]">
              Join the next <span className="text-gradient-gold">Expo.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-sm sm:text-base leading-relaxed">
              Two clear paths — visitors get a free E-Pass, exhibitors book stall space. Both open in our official registration portal.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
              <span><span className="uppercase tracking-widest text-white/40">Edition</span>{" "}<span className="text-white/90">{upcoming.edition} · {upcoming.city} {upcoming.year}</span></span>
              <span><span className="uppercase tracking-widest text-white/40">Dates</span>{" "}<span className="text-white/90">{upcoming.dates}</span></span>
              <span><span className="uppercase tracking-widest text-white/40">Venue</span>{" "}<span className="text-white/90">{upcoming.venue}</span></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-14 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {/* Visitor */}
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center">
                  <Ticket className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-muted">Path 1 · For Visitors</div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">Visitor E-Pass</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                Trade buyers, planners, hoteliers and industry professionals — get a complimentary entry pass valid across all three show days.
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
              <div className="mt-auto pt-6">
                <Button asChild size="lg" className="w-full bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12">
                  <a href={VISITOR_REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Generate E-Pass <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-2 text-[11px] text-slate-muted text-center">Opens on our official portal · updated every year</p>
              </div>
            </div>

            {/* Exhibitor */}
            <div className="rounded-2xl border border-gold/30 bg-charcoal text-white p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-lg bg-gold/15 grid place-items-center">
                  <Store className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold/80">Path 2 · For Exhibitors</div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold">Stall Booking</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                Manufacturers, lighting providers, catering suppliers, decor houses — reserve stall space across 14 industry verticals.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
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
              <div className="mt-auto pt-6">
                <Button asChild size="lg" className="w-full bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12">
                  <a href={EXHIBITOR_REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Book Stall Space <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-2 text-[11px] text-white/50 text-center">Opens on our official portal · updated every year</p>
              </div>
            </div>
          </div>

          {/* Explanatory note */}
          <p className="mt-8 text-center text-xs sm:text-sm text-slate-muted max-w-2xl mx-auto">
            Registration links are updated for each new edition. If a link doesn't work, please contact us — we'll share the latest form directly.
          </p>
        </div>
      </section>

      {/* HELP / SUPPORT */}
      <section className="py-14 sm:py-20 bg-white border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Registration Support</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight">
              Need help with registration or booking?
            </h2>
            <p className="mt-3 text-slate-muted">
              Our registration desk can help with group visitor E-Passes, stall availability, floor-plan queries and sponsorship options.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-3">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6 hover:border-gold transition-colors block">
              <Phone className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-muted">Registration Desk</p>
              <p className="mt-1 font-display text-lg font-semibold text-charcoal">{CONTACT.phone}</p>
              <p className="mt-1 text-xs text-slate-muted">Mon–Sat, 10am–7pm IST</p>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6 hover:border-gold transition-colors block">
              <Mail className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-muted">Email</p>
              <p className="mt-1 font-display text-lg font-semibold text-charcoal break-all">{CONTACT.email}</p>
              <p className="mt-1 text-xs text-slate-muted">Reply within 24 business hours</p>
            </a>
            <Link to="/contact" className="rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6 hover:border-gold transition-colors block">
              <MapPin className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-muted">Full contact page</p>
              <p className="mt-1 font-display text-lg font-semibold text-charcoal">Message us</p>
              <p className="mt-1 text-xs text-slate-muted inline-flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
