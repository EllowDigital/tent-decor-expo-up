import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Calendar, MapPin, Sparkles, TrendingUp, Users, Star, Quote } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { INDUSTRY_CATEGORIES, STATS, FEATURES, TESTIMONIALS, GALLERY } from "@/data/constants";
import { Reveal, Counter } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

const ICONS = { Sparkles, TrendingUp, Users, BookOpen };

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/70 to-charcoal/95" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 backdrop-blur-md px-4 py-2 mb-8">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs uppercase tracking-[0.28em] text-gold font-medium">Kanpur • 30 Aug – 1 Sep 2026</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.02]">
              Welcome to UP's <br />
              <span className="text-gradient-gold">Premier Tent &</span> <br />
              Decor Expo
            </h1>

            <p className="mt-8 text-xl sm:text-2xl text-white/70 font-light tracking-wide">
              Connect <span className="text-gold">•</span> Learn <span className="text-gold">•</span> Grow
            </p>

            <p className="mt-4 max-w-2xl text-white/60 leading-relaxed">
              The 4th Mahadhiveshan of India's tent, catering and decor industry — hosted by the Shamiyana Furniture Association, Kanpur.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gradient-gold text-charcoal hover:opacity-90 shadow-gold h-14 px-8 text-base">
                <Link to="/event-2026">Explore Event <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base bg-transparent">
                <Link to="/gallery">View Gallery</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase"
        >
          Scroll to Explore
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border bg-white overflow-hidden py-6">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...INDUSTRY_CATEGORIES, ...INDUSTRY_CATEGORIES].map((cat, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="font-display text-2xl md:text-3xl text-charcoal/70 hover:text-gold transition-colors">{cat}</span>
              <span className="mx-8 text-gold text-3xl">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO + STATS */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">About the Expo</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              Where India's wedding & event economy converges.
            </h2>
            <p className="mt-6 text-lg text-slate-muted leading-relaxed">
              For three days, Kanpur becomes the beating heart of India's ₹1 lakh crore wedding industry. Tent Decor Expo UP brings together manufacturers, planners, caterers, decorators and buyers under one roof — driving business, innovation and lasting relationships.
            </p>
            <p className="mt-4 text-slate-muted leading-relaxed">
              Organised by the <span className="text-charcoal font-medium">Tent, Caterers & Decorators Welfare Association of UP</span>, the Mahadhiveshan is the industry's most authoritative gathering.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <Card className="p-8 border-border/60 hover-lift bg-white">
                  <div className="font-display text-5xl md:text-6xl font-bold text-gradient-gold">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-sm text-slate-muted uppercase tracking-widest">{s.label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Attend"
            title="A stage built for the industry."
            subtitle="Four reasons Tent Decor Expo UP has become the most anticipated B2B event of the year."
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon as keyof typeof ICONS];
              return (
                <Reveal key={f.title} delay={i * 0.08}>
                  <Card className="p-8 h-full border-border/60 hover-lift bg-white group">
                    <div className="h-14 w-14 rounded-xl bg-gradient-gold grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-charcoal" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-charcoal">{f.title}</h3>
                    <p className="mt-3 text-slate-muted leading-relaxed text-sm">{f.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Event Timeline" title="Legacy meets what's next." />
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Reveal>
              <Card className="p-10 border-2 border-gold/40 bg-white hover-lift relative overflow-hidden">
                <div className="absolute top-4 right-4 rounded-full bg-gold/15 text-gold text-xs uppercase tracking-widest px-3 py-1 font-medium">Upcoming</div>
                <Calendar className="h-8 w-8 text-gold" />
                <h3 className="mt-5 font-display text-3xl font-bold text-charcoal">Kanpur 2026</h3>
                <p className="text-lg text-gold font-medium">4th Mahadhiveshan</p>
                <p className="mt-4 text-slate-muted leading-relaxed">30 August – 1 September 2026 · Sanskar Lawn, Kanpur. Hosted by Shamiyana Furniture Association.</p>
                <Button asChild className="mt-6 bg-gradient-gold text-charcoal">
                  <Link to="/event-2026">Explore Kanpur 2026 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="p-10 border-border bg-charcoal text-white hover-lift relative overflow-hidden">
                <div className="absolute top-4 right-4 rounded-full bg-white/10 text-white/70 text-xs uppercase tracking-widest px-3 py-1">Legacy</div>
                <MapPin className="h-8 w-8 text-gold" />
                <h3 className="mt-5 font-display text-3xl font-bold">Lucknow 2025</h3>
                <p className="text-lg text-gold font-medium">3rd Mahadhiveshan</p>
                <p className="mt-4 text-white/70 leading-relaxed">Organised in Lucknow by the parent association — 15,000+ visitors and 180+ exhibitors marked the largest gathering to date.</p>
                <Button asChild variant="outline" className="mt-6 border-gold text-gold hover:bg-gold/10 bg-transparent">
                  <Link to="/gallery">See Highlights</Link>
                </Button>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-20 bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-muted">Powered by industry leaders</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-70">
            {["Shamiyana Assoc.", "TCDWA UP", "Sanskar Lawn", "UP Tourism", "Awadh Caterers", "Kanpur Chamber"].map((n) => (
              <div key={n} className="text-center font-display text-lg text-charcoal hover:text-gold transition-colors">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Voices" title="Trusted by the industry." />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <Card className="p-8 h-full bg-white border-border/60 hover-lift">
                  <Quote className="h-8 w-8 text-gold/40" />
                  <p className="mt-4 text-charcoal leading-relaxed">"{t.quote}"</p>
                  <div className="mt-6 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-semibold text-charcoal">{t.name}</p>
                    <p className="text-sm text-slate-muted">{t.role}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Moments</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-charcoal">From the show floor.</h2>
            </div>
            <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10">
              <Link to="/gallery">View full gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.slice(0, 8).map((g, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="relative aspect-square overflow-hidden rounded-lg group">
                  <img src={g.src} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-medium">{g.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gold blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Be first in line for <span className="text-gradient-gold">Kanpur 2026</span>.
            </h2>
            <p className="mt-4 text-white/70 text-lg">Get early-bird stall discounts, brochure drops and speaker announcements.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" required placeholder="Your business email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12" />
              <Button className="bg-gradient-gold text-charcoal h-12 px-6 shadow-gold">Subscribe</Button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
