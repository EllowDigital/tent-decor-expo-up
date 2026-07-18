import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Download, ArrowRight, Tent, Palette, Lightbulb, ChefHat, Armchair, Heart, GlassWater, Megaphone } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EXHIBITOR_CATEGORIES, SCHEDULE } from "@/data/constants";

export const Route = createFileRoute("/event-2026")({
  head: () => ({
    meta: [
      { title: "Kanpur 2026 · 4th Mahadhiveshan — Tent Decor Expo UP" },
      { name: "description", content: "The 4th Mahadhiveshan hosted by Shamiyana Furniture Association, Kanpur. 30 Aug – 1 Sep 2026 at Sanskar Lawn." },
      { property: "og:title", content: "Kanpur 2026 · 4th Mahadhiveshan" },
      { property: "og:description", content: "3 days · 250+ exhibitors · 25,000+ visitors. Book your stall today." },
    ],
  }),
  component: Event2026,
});

const ICONS = { Tent, Palette, Lightbulb, ChefHat, Armchair, Heart, GlassWater, Megaphone };

function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function Event2026() {
  const time = useCountdown(new Date("2026-08-30T09:00:00+05:30"));

  return (
    <>
      {/* HERO BANNER */}
      <section className="relative py-32 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold">
            4th Mahadhiveshan
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-8xl font-bold text-white leading-[1.02]">
            Kanpur <span className="text-gradient-gold">2026</span>
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto">
            The largest B2B stage the tent, catering and decor industry has ever seen — hosted by Shamiyana Furniture Association.
          </p>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="py-10 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-8">
          {[
            { icon: Calendar, label: "Dates", value: "30 Aug – 1 Sep 2026" },
            { icon: MapPin, label: "Venue", value: "Sanskar Lawn, Kanpur" },
            { icon: Users, label: "Host", value: "Shamiyana Furniture Assoc." },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gold/10 grid place-items-center shrink-0">
                <b.icon className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-slate-muted">{b.label}</p>
                <p className="font-semibold text-charcoal truncate">{b.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Countdown to Kanpur 2026</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-charcoal">The clock is running.</h2>
          <div className="mt-12 grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: "Days", v: time.d },
              { label: "Hours", v: time.h },
              { label: "Minutes", v: time.m },
              { label: "Seconds", v: time.s },
            ].map((t) => (
              <Card key={t.label} className="p-4 md:p-8 border-border/60 bg-white shadow-elegant">
                <div className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-gold tabular-nums">
                  {String(t.v).padStart(2, "0")}
                </div>
                <p className="mt-2 text-xs md:text-sm uppercase tracking-widest text-slate-muted">{t.label}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-gold text-charcoal shadow-gold h-14 px-8">
              <Link to="/register">Book Your Stall <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-charcoal text-charcoal h-14 px-8">
              <Download className="mr-2 h-4 w-4" /> Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Exhibitor Categories" title="8 verticals under one roof." subtitle="Curated pavilions that make discovery effortless for every buyer." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXHIBITOR_CATEGORIES.map((c, i) => {
              const Icon = ICONS[c.icon as keyof typeof ICONS];
              return (
                <Reveal key={c.title} delay={i * 0.06}>
                  <Card className="p-6 h-full border-border/60 hover-lift group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center shadow-gold group-hover:rotate-6 transition-transform">
                      <Icon className="h-5 w-5 text-charcoal" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">{c.title}</h3>
                    <p className="mt-2 text-sm text-slate-muted">{c.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Schedule" title="Three days of business, culture and celebration." />
          <div className="mt-14 space-y-4">
            {SCHEDULE.map((s, i) => (
              <Reveal key={s.day} delay={i * 0.08}>
                <Card className="p-8 border-border/60 bg-white hover-lift grid md:grid-cols-[180px_1fr] gap-6 items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">{s.day}</p>
                    <p className="mt-2 font-display text-2xl font-bold text-charcoal">{s.date}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-charcoal">{s.title}</h3>
                    <p className="mt-2 text-slate-muted leading-relaxed">{s.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS + FLOORPLAN */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Exhibitor Benefits</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-charcoal">Why exhibit at Kanpur 2026?</h2>
            <ul className="mt-8 space-y-4">
              {[
                "Face-to-face access to 25,000+ verified trade buyers",
                "Featured brand listing in the official 2026 exhibitor directory",
                "Dedicated B2B meeting lounges with pre-scheduled buyer intros",
                "Live demo slots on the central stage",
                "Marketing amplification across the association's channels",
              ].map((b) => (
                <li key={b} className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gold shrink-0" />
                  <span className="text-slate-muted">{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 bg-gradient-gold text-charcoal shadow-gold h-12 px-6">
              <Link to="/register">Request Stall Booking</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <Card className="aspect-[4/3] border-2 border-dashed border-gold/40 bg-gold/5 grid place-items-center p-8">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-gold mx-auto" />
                <p className="mt-4 font-display text-2xl text-charcoal">Floor Plan</p>
                <p className="mt-2 text-sm text-slate-muted">Interactive floor plan releases with the brochure — Q1 2026.</p>
                <Button variant="outline" className="mt-6 border-gold text-charcoal">
                  <Download className="mr-2 h-4 w-4" /> Get notified
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
