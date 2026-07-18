import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail, Phone, Search, Store, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EpassDialog } from "@/components/common/EpassDialog";
import { StallBookingDialog } from "@/components/common/StallBookingDialog";
import { Reveal } from "@/components/common/Reveal";
import { EDITIONS, REGISTER_URL } from "@/data/constants";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: "Registration — Tent Decor Expo UP" },
      {
        name: "description",
        content:
          "One place to register for Tent Decor Expo UP — free Visitor E-Pass or Exhibitor Stall Booking for the upcoming edition.",
      },
      { property: "og:title", content: "Registration — Tent Decor Expo UP" },
      {
        property: "og:description",
        content: "Free Visitor E-Pass or Exhibitor Stall Booking — register for the upcoming Tent Decor Expo UP edition.",
      },
    ],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  const eventName = `${upcoming.edition} · ${upcoming.city} ${upcoming.year}`;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Registration</span>
            <h1 className="mt-3 font-display font-bold text-white leading-[1.05] text-[clamp(1.75rem,4.5vw,3.5rem)]">
              Register for <span className="text-gradient-gold">{upcoming.city} {upcoming.year}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-sm sm:text-base leading-relaxed">
              Choose your path below — visitors get a free E-Pass, exhibitors submit a stall booking request. Both take under 2 minutes.
            </p>
            <div className="mt-5 text-xs text-white/60">
              <span className="uppercase tracking-widest">Event</span>{" "}
              <span className="text-white/90">{eventName}</span>{" · "}
              <span>{upcoming.dates}</span>{" · "}
              <span>{upcoming.venue}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two cards */}
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
                  <div className="text-[10px] uppercase tracking-widest text-slate-muted">For Visitors</div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">Free E-Pass</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                Trade buyers, planners and industry professionals — get a complimentary entry pass to walk the show floor across all 3 days.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-charcoal/80">
                {["Entry to all 3 days", "Access to product launches", "Buyer-seller meetings", "Instant reference code"].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <EpassDialog
                  eventName={eventName}
                  eventDate={upcoming.dates}
                  eventVenue={upcoming.venue}
                  trigger={
                    <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 flex-1">
                      <Ticket className="mr-2 h-4 w-4" /> Get Free E-Pass
                    </Button>
                  }
                />
                <Button asChild size="lg" variant="outline" className="border-gold/60 text-charcoal hover:bg-gold/10 h-12">
                  <Link to="/visitors">Learn more</Link>
                </Button>
              </div>
            </div>

            {/* Exhibitor */}
            <div className="rounded-2xl border border-gold/30 bg-charcoal text-white p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-lg bg-gold/15 grid place-items-center">
                  <Store className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold/80">For Exhibitors</div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold">Stall Booking</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                Reserve your stall across categories including Tent, Decor, Lighting, Sound, SFX, Catering, Furniture and more.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {["Shell & bare stall options", "Prime aisle placement", "Buyer meeting slots", "Confirmation within 48 hours"].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <StallBookingDialog
                  eventName={eventName}
                  eventDate={upcoming.dates}
                  eventVenue={upcoming.venue}
                  trigger={
                    <Button size="lg" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 flex-1">
                      <Store className="mr-2 h-4 w-4" /> Book a Stall
                    </Button>
                  }
                />
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 h-12">
                  <Link to="/exhibitors">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Process</span>
            <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight">
              How registration works.
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Choose your path", d: "Pick Visitor E-Pass or Exhibitor Stall Booking above." },
              { n: "02", t: "Fill the short form", d: "Under 2 minutes — name, contact, city and preference." },
              { n: "03", t: "Save your reference", d: "You'll receive a code (TDX / STL) and a confirmation email." },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-border/60 bg-pearl p-6">
                <div className="font-display text-gold text-2xl">{s.n}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-charcoal">{s.t}</h3>
                <p className="mt-1.5 text-sm text-slate-muted leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Status + external portal + help */}
      <section className="py-14 sm:py-20 bg-pearl border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-white p-6">
            <Search className="h-5 w-5 text-gold" />
            <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">Check E-Pass status</h3>
            <p className="mt-1.5 text-sm text-slate-muted">Already registered? Look up your details with your reference code.</p>
            <Button asChild variant="outline" className="mt-4 border-gold text-charcoal hover:bg-gold/10">
              <Link to="/epass-status">Check status <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white p-6">
            <ArrowRight className="h-5 w-5 text-gold" />
            <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">Official portal</h3>
            <p className="mt-1.5 text-sm text-slate-muted">Prefer registering directly? Head to the official portal.</p>
            <Button asChild variant="outline" className="mt-4 border-gold text-charcoal hover:bg-gold/10">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                {REGISTER_URL.replace(/^https?:\/\//, "")} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white p-6">
            <Mail className="h-5 w-5 text-gold" />
            <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">Need help?</h3>
            <p className="mt-1.5 text-sm text-slate-muted">Our team is happy to assist with group registrations or stall queries.</p>
            <Button asChild variant="outline" className="mt-4 border-gold text-charcoal hover:bg-gold/10">
              <Link to="/contact"><Phone className="mr-2 h-4 w-4" /> Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
