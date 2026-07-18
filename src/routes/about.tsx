import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { LEADERSHIP, MILESTONES } from "@/data/constants";
import { Linkedin, Twitter, Mail, Building2, Target, Compass } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tent Decor Expo UP" },
      { name: "description", content: "The story of the Tent, Caterers & Decorators Welfare Association of UP and the Shamiyana Furniture Association, Kanpur — hosts of the 4th Mahadhiveshan." },
      { property: "og:title", content: "About — Tent Decor Expo UP" },
      { property: "og:description", content: "History, mission and vision of India's most influential tent and decor industry body." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative py-28 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Our Story</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-white leading-[1.02]">
            Built by the industry, <br /><span className="text-gradient-gold">for the industry.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed">
            Since 1998, the Tent, Caterers & Decorators Welfare Association of UP has been the voice, the safeguard and the growth engine for thousands of professionals across the state.
          </p>
        </div>
      </section>

      {/* Mission Vision History */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "History", desc: "Founded in 1998 by 42 tent-house owners in Lucknow, the association today represents over 6,000 member businesses across 75 districts of UP." },
            { icon: Target, title: "Mission", desc: "To professionalise, standardise and elevate the tent, catering and decor industry — advocating for members, buyers, and the artisans behind every event." },
            { icon: Compass, title: "Vision", desc: "To make Uttar Pradesh the definitive global destination for wedding and event commerce by 2030." },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <Card className="p-10 h-full border-border/60 hover-lift">
                <div className="h-14 w-14 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                  <b.icon className="h-6 w-6 text-charcoal" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-charcoal">{b.title}</h3>
                <p className="mt-3 text-slate-muted leading-relaxed">{b.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Organizational distinction */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The Organisation" title="Two associations. One movement." />
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <Reveal>
              <Card className="p-10 border-2 border-border h-full">
                <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">Parent Body</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-charcoal">Tent, Caterers & Decorators Welfare Association of UP</h3>
                <p className="mt-5 text-slate-muted leading-relaxed">
                  The apex state-wide body that organised the historic <span className="font-semibold text-charcoal">Lucknow 2025</span> Mahadhiveshan. It represents members across all 75 districts and sets the industry's standards, welfare programmes and government-liaison agenda.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="p-10 border-2 border-gold bg-white h-full shadow-gold">
                <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">2026 Host</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-charcoal">Shamiyana Furniture Association, Kanpur</h3>
                <p className="mt-5 text-slate-muted leading-relaxed">
                  The official host of <span className="font-semibold text-charcoal">Kanpur 2026 — 4th Mahadhiveshan</span>. Kanpur's own industry body brings the expo to the industrial capital of UP, leveraging the city's manufacturing depth and buyer catchment.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Leadership" title="Meet the people driving the change." />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <Card className="overflow-hidden hover-lift group border-border/60">
                  <div className="aspect-square overflow-hidden bg-pearl">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-xl font-semibold text-charcoal">{p.name}</h3>
                    <p className="mt-1 text-sm text-slate-muted">{p.role}</p>
                    <div className="mt-4 flex justify-center gap-3">
                      {[Linkedin, Twitter, Mail].map((I, j) => (
                        <a key={j} href="#" aria-label="social" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                          <I className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-charcoal">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Milestones</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">27 years of leadership.</h2>
          </div>
          <div className="mt-16 relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08}>
                <div className={`relative mb-12 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 h-4 w-4 rounded-full bg-gradient-gold ring-4 ring-charcoal`} />
                    <p className="font-display text-3xl font-bold text-gradient-gold">{m.year}</p>
                    <h4 className="mt-2 font-display text-xl font-semibold text-white">{m.title}</h4>
                    <p className="mt-2 text-white/60 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
