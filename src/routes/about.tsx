import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { MILESTONES } from "@/data/constants";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Building2,
  Target,
  Compass,
  ShieldCheck,
  Handshake,
  GraduationCap,
  Scale,
  Sparkles,
  ArrowRight,
  Users,
  MapPin,
  Award,
} from "lucide-react";
import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => buildHead(PAGE_SEO.about),
  component: About,
});

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Member Welfare",
    desc: "Group insurance, dispute redressal and welfare funds for tent-house owners, caterers, decorators and their workers.",
  },
  {
    icon: Scale,
    title: "Policy & Advocacy",
    desc: "Represents the industry before state departments on licensing, GST, venue regulations and labour policy.",
  },
  {
    icon: GraduationCap,
    title: "Skill & Standards",
    desc: "Training programmes, safety certifications and quality benchmarks that raise service standards across UP.",
  },
  {
    icon: Handshake,
    title: "Trade & Networking",
    desc: "Organises the Mahadhiveshan expo series to open new B2B markets for members across the country.",
  },
];

const STATS = [
  { icon: Users, value: "6,000+", label: "Member businesses" },
  { icon: MapPin, value: "75", label: "UP districts covered" },
  { icon: Award, value: "27+", label: "Years of leadership" },
  { icon: Building2, value: "12+", label: "City chapters" },
];

function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 sm:py-28 lg:py-32 bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1080}
            sizes="100vw"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/90 to-charcoal" />
        </div>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] text-gold font-medium">
            About the Association
          </span>
          <h1 className="mt-4 font-display font-bold text-white leading-[1.05] text-[clamp(2rem,6vw,4.5rem)]">
            Built by the industry, <br className="hidden sm:block" />
            <span className="text-gradient-gold">for the industry.</span>
          </h1>
          <p className="mt-5 sm:mt-6 text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            The{" "}
            <span className="text-white font-medium">
              Tent, Caterers &amp; Decorators Welfare Association of Uttar Pradesh
            </span>{" "}
            — the apex, state-wide body representing tent houses, caterers, decorators and event
            professionals since 1998.
          </p>
        </div>
      </section>

      {/* Stat strip */}
      <section className="bg-white border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-pearl/40 p-5 sm:p-6 text-center"
              >
                <s.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gold mx-auto" />
                <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {s.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History / Mission / Vision */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who We Are"
            title="One voice for Uttar Pradesh's event industry."
          />
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: Building2,
                title: "History",
                desc: "Founded in 1998 by 42 tent-house owners in Lucknow, the association today represents over 6,000 member businesses across 75 districts of Uttar Pradesh.",
              },
              {
                icon: Target,
                title: "Mission",
                desc: "To professionalise, standardise and elevate the tent, catering and decor industry — advocating for members, buyers and the artisans behind every event.",
              },
              {
                icon: Compass,
                title: "Vision",
                desc: "To make Uttar Pradesh the definitive national destination for wedding and event commerce by 2030 — recognised, regulated and celebrated.",
              },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <Card className="p-6 sm:p-8 lg:p-10 h-full border-border/60">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                    <b.icon className="h-5 w-5 sm:h-6 sm:w-6 text-charcoal" />
                  </div>
                  <h3 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl font-bold text-charcoal">
                    {b.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-muted leading-relaxed">
                    {b.desc}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What We Do" title="Four pillars of the association." />
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <Card className="p-6 sm:p-7 h-full border-border/60 bg-white">
                  <div className="h-11 w-11 rounded-lg border border-gold/40 bg-gold/5 grid place-items-center">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-lg font-semibold text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-muted leading-relaxed">{p.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Goals" title="What we're working towards." />
          <div className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "Register every professional tent, catering and decor business in UP under one recognised body.",
              "Establish safety, hygiene and pricing standards adopted state-wide.",
              "Build direct market access for members through the annual Mahadhiveshan expo.",
              "Secure government recognition of the event industry as a formal economic sector.",
              "Run welfare, health and skilling programmes for artisans and daily-wage workers.",
              "Position Uttar Pradesh as India's leading wedding-and-events destination.",
            ].map((g, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-border/60 bg-pearl/50">
                  <Sparkles className="h-4 w-4 text-gold mt-1 shrink-0" />
                  <p className="text-sm sm:text-base text-charcoal leading-relaxed">{g}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-charcoal">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] text-gold font-medium">
              Milestones
            </span>
            <h2 className="mt-3 sm:mt-4 font-display font-bold text-white text-[clamp(1.75rem,4.5vw,3rem)] leading-tight">
              Nearly three decades of leadership.
            </h2>
          </div>
          <div className="mt-12 sm:mt-16 relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <div
                  className={`relative mb-10 sm:mb-12 md:grid md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                >
                  <div
                    className={`pl-12 md:pl-0 ${
                      i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 h-4 w-4 rounded-full bg-gradient-gold ring-4 ring-charcoal" />
                    <p className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
                      {m.year}
                    </p>
                    <h3 className="mt-1.5 sm:mt-2 font-display text-lg sm:text-xl font-semibold text-white">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-white/60 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA row */}
      <section className="py-14 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-4">
          <Link to="/members" className="group">
            <Card className="p-6 sm:p-7 h-full border-border/60 hover:border-gold transition-colors">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
                Leadership
              </p>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-charcoal">
                Meet our office-bearers &amp; committee
              </h3>
              <p className="mt-2 text-sm text-slate-muted">
                President, secretariat and district conveners of the association.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                View members{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>
          <Link to="/events" className="group">
            <Card className="p-6 sm:p-7 h-full border-border/60 hover:border-gold transition-colors">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
                Mahadhiveshan
              </p>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-charcoal">
                Every edition, every host, every year
              </h3>
              <p className="mt-2 text-sm text-slate-muted">
                Explore all past and upcoming editions of Tent Decor Expo UP.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                View editions{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>
        </div>
      </section>
    </>
  );
}
