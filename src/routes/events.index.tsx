import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { EDITIONS } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { RegisterLink } from "@/components/common/RegisterLink";
import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/events/")({
  head: () => buildHead(PAGE_SEO.events),
  component: EventsIndex,
});

function EventsIndex() {
  const upcoming = EDITIONS.filter((e) => e.status === "upcoming");
  const past = EDITIONS.filter((e) => e.status === "past");

  return (
    <>
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Editions</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-white leading-[1.02]">
            A decade of <span className="text-gradient-gold">Mahadhiveshan.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
            Every year we gather the industry under one roof. Explore every edition — past highlights, and what's next.
          </p>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Upcoming" title="The next Mahadhiveshan." />
            <div className="mt-14 grid gap-8">
              {upcoming.map((e, i) => (
                <Reveal key={e.year} delay={i * 0.05}>
                  <Link
                    to="/event/$slug"
                    params={{ slug: e.slug }}
                    className="block group"
                  >
                    <Card className="overflow-hidden border-2 border-gold shadow-gold grid md:grid-cols-[1.2fr_1fr]">
                      <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                        <img src={e.cover} alt={e.edition} width={800} height={600} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/60 via-charcoal/10 to-transparent" />
                        <div className="absolute top-6 left-6 rounded-full bg-gradient-gold text-charcoal text-xs uppercase tracking-[0.28em] font-semibold px-4 py-1.5">
                          Upcoming
                        </div>
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <p className="font-display text-6xl font-bold text-gradient-gold">{e.year}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">{e.edition}</p>
                        <h3 className="mt-4 font-display text-3xl font-bold text-charcoal">
                          {e.city}
                        </h3>
                        <p className="mt-3 text-slate-muted leading-relaxed">{e.summary}</p>
                        <div className="mt-6 space-y-2 text-sm text-slate-muted">
                          <p className="flex gap-2"><Calendar className="h-4 w-4 text-gold shrink-0" /> {e.dates}</p>
                          <p className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0" /> {e.venue}</p>
                          <p className="flex gap-2"><Users className="h-4 w-4 text-gold shrink-0" /> Hosted by {e.host}</p>
                        </div>
                        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
                          Explore the edition <ArrowRight className="h-4 w-4" />
                        </p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <RegisterLink size="lg" variant="gold" showIcon>Register for the Next Edition</RegisterLink>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Archive" title="Past editions." subtitle="Every Mahadhiveshan has shaped the industry we know today." />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((e, i) => (
              <Reveal key={e.year} delay={i * 0.06}>
                <Link
                  to="/event/$slug"
                  params={{ slug: e.slug }}
                  className="block group"
                >
                  <Card className="overflow-hidden border-border/60 hover-lift bg-white h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={e.cover} alt={e.edition} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-display text-4xl font-bold">{e.year}</p>
                        <p className="text-xs uppercase tracking-widest text-gold">{e.edition}</p>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl font-semibold text-charcoal">{e.city}</h3>
                      <p className="mt-2 text-sm text-slate-muted line-clamp-3 flex-1">{e.summary}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-muted">
                        <span>{e.exhibitors} exhibitors</span>
                        <span className="text-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          View <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
