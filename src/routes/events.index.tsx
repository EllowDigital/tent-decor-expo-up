import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { EDITIONS } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@/components/common/RegisterLink";
import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/events/")({
  head: () => buildHead(PAGE_SEO.events),
  component: EventsIndex,
});

function EventsIndex() {
  const upcoming = EDITIONS.filter((e) => e.status === "upcoming");
  const past = EDITIONS.filter((e) => e.status === "past");
  const featured = upcoming[0];

  const years = useMemo(() => ["All", ...past.map((p) => p.year)], [past]);
  const [year, setYear] = useState<string>("All");
  const filteredPast = year === "All" ? past : past.filter((p) => p.year === year);

  const totalEditions = EDITIONS.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute -bottom-24 right-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Editions Archive
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05]">
              A decade of <span className="text-gradient-gold">Mahadhiveshan.</span>
            </h1>
            <p className="mt-5 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
              Every year we bring India's tent, catering and decor industry under one roof. Explore
              what's next — and revisit every edition that shaped us.
            </p>
          </div>

          {/* Stat strip */}
          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl">
            {[
              { v: totalEditions, l: "Editions" },
              { v: upcoming.length, l: "Upcoming" },
              { v: past.length, l: "Past" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 sm:px-5 sm:py-4"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold leading-none">
                  {s.v}
                </p>
                <p className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/60">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Upcoming */}
      {featured && (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
                  Upcoming
                </span>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
                  The next Mahadhiveshan.
                </h2>
              </div>
              <RegisterLink size="lg" variant="gold" showIcon>
                Register Now
              </RegisterLink>
            </div>

            <Reveal>
              <Link to="/event/$slug" params={{ slug: featured.slug }} className="block group">
                <Card className="overflow-hidden border-2 border-gold/60 shadow-gold grid lg:grid-cols-[1.15fr_1fr]">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={featured.cover}
                      alt={featured.edition}
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/70 via-charcoal/10 to-transparent" />
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-full bg-gradient-gold text-charcoal text-[10px] sm:text-xs uppercase tracking-[0.24em] font-semibold px-3 py-1.5 sm:px-4">
                      Upcoming
                    </div>
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white lg:hidden">
                      <p className="font-display text-5xl sm:text-6xl font-bold leading-none">
                        {featured.year}
                      </p>
                      <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.24em] text-gold">
                        {featured.edition}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="hidden lg:block">
                      <p className="font-display text-6xl xl:text-7xl font-bold text-gradient-gold leading-none">
                        {featured.year}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">
                        {featured.edition}
                      </p>
                    </div>
                    <h3 className="mt-2 lg:mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
                      {featured.city}
                    </h3>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-muted leading-relaxed">
                      {featured.summary}
                    </p>
                    <div className="mt-5 sm:mt-6 space-y-2.5 text-sm text-slate-muted">
                      <p className="flex gap-2.5 items-start">
                        <Calendar className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>{featured.dates}</span>
                      </p>
                      <p className="flex gap-2.5 items-start">
                        <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>{featured.venue}</span>
                      </p>
                      <p className="flex gap-2.5 items-start">
                        <Users className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>Hosted by {featured.host}</span>
                      </p>
                    </div>
                    <span className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-semibold text-charcoal group-hover:text-gold transition-colors">
                      Explore the edition
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Past editions */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
                Archive
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
                Past editions.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-muted max-w-xl">
                Every Mahadhiveshan has shaped the industry we know today.
              </p>
            </div>

            {/* Year filter */}
            {years.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                      year === y
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white text-charcoal border-border/60 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredPast.length === 0 ? (
            <p className="mt-12 text-center text-slate-muted">No editions found for {year}.</p>
          ) : (
            <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredPast.map((e, i) => (
                <Reveal key={e.year} delay={i * 0.05}>
                  <Link to="/event/$slug" params={{ slug: e.slug }} className="block group h-full">
                    <Card className="overflow-hidden border-border/60 hover-lift bg-white h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={e.cover}
                          alt={e.edition}
                          width={800}
                          height={600}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-display text-4xl sm:text-5xl font-bold leading-none">
                            {e.year}
                          </p>
                          <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-gold">
                            {e.edition}
                          </p>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal">
                          {e.city}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-muted">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gold" /> {e.dates}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-muted line-clamp-3 flex-1">
                          {e.summary}
                        </p>
                        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                          <span className="text-slate-muted">{e.exhibitors} exhibitors</span>
                          <span className="text-gold font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Be part of the <span className="text-gradient-gold">next edition.</span>
          </h2>
          <p className="mt-4 text-white/70 text-base sm:text-lg">
            Reserve your visitor E-Pass or book an exhibitor stall for Mahadhiveshan 2026, Kanpur.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <RegisterLink kind="visitor" size="lg" variant="gold" showIcon>
              Get E-Pass
            </RegisterLink>
            <RegisterLink
              kind="exhibitor"
              size="lg"
              variant="outline"
              showIcon
              className="border-gold/70 text-white hover:bg-gold/10"
            >
              Book a Stall
            </RegisterLink>
            <Button asChild size="lg" variant="ghost" className="text-white hover:text-gold">
              <Link to="/event-details">View event details</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
