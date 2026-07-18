import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Ticket,
  Store,
  Users,
  Sparkles,
  Quote,
  TrendingUp,
  Building2,
  Rocket,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EDITIONS, GALLERY, INDUSTRY_CATEGORIES, TESTIMONIALS } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";

/**
 * Below-the-fold homepage sections. Rendered inside a <Suspense> boundary on
 * the home route so the hero chunk downloads and paints first.
 */
export default function BelowFold({ upcoming }: { upcoming: (typeof EDITIONS)[number] }) {
  return (
    <>
      <CategoryMarquee />
      <AboutSnippet />
      <WhyAttendExhibit />
      <TwoPaths />
      <GalleryPreview />
      <Testimonials />
      <ClosingCTA upcoming={upcoming} />
    </>
  );
}

function CategoryMarquee() {
  const items = [...INDUSTRY_CATEGORIES, "Sound", "SFX", "AV & Lighting", "Mandap"];
  const loop = [...items, ...items];
  return (
    <section
      id="next"
      aria-label="Industry categories"
      className="bg-charcoal border-y border-white/10 overflow-hidden scroll-mt-20"
    >
      <div className="relative flex" role="marquee">
        <div className="flex shrink-0 animate-marquee gap-10 py-4 sm:py-5 pr-10 whitespace-nowrap motion-reduce:animate-none">
          {loop.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-white/75 text-sm sm:text-base font-medium tracking-wide"
            >
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSnippet() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
          About the association
        </span>
        <h2 className="mt-3 font-display font-bold text-charcoal leading-tight text-[clamp(1.5rem,4vw,2.5rem)]">
          Uniting UP's tent, catering and decor industry since 1998.
        </h2>
        <p className="mt-5 text-slate-muted text-base sm:text-lg leading-relaxed">
          The Tent, Caterers & Decorators Welfare Association of UP is the state's apex body for the
          wedding and event industry — representing 6,000+ member businesses across 75 districts.
          The Mahadhiveshan is our flagship expo, hosted in a different city every year.
        </p>
        <div className="mt-7">
          <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10">
            <Link to="/about">
              Read more about us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyAttendExhibit() {
  const visit = [
    {
      icon: Users,
      title: "Meet the industry",
      desc: "25,000+ trade buyers, planners and hoteliers across 3 days.",
    },
    {
      icon: Sparkles,
      title: "Discover innovation",
      desc: "New tent, decor, lighting and catering tech from leading brands.",
    },
    {
      icon: Rocket,
      title: "Source & partner",
      desc: "Bulk deals, dealer tie-ups and regional distribution.",
    },
  ];
  const exhibit = [
    {
      icon: TrendingUp,
      title: "Generate leads",
      desc: "Face-to-face with decision makers from UP, Bihar and MP.",
    },
    {
      icon: Building2,
      title: "Launch products",
      desc: "Central stage demos, media coverage and buyer meetings.",
    },
    {
      icon: Award,
      title: "Recognition",
      desc: "Innovation Awards and association-backed policy platforms.",
    },
  ];
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
            Value for both sides
          </span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Why attend. Why exhibit.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
                    <Ticket className="h-5 w-5 text-gold" />
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
                    For Visitors
                  </h3>
                </div>
                <Link to="/visitors" className="text-sm text-gold hover:underline shrink-0">
                  Details →
                </Link>
              </div>
              <ul className="mt-6 space-y-4">
                {visit.map((v) => (
                  <li key={v.title} className="flex items-start gap-3">
                    <span className="h-9 w-9 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
                      <v.icon className="h-4 w-4 text-gold" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-base font-semibold text-charcoal">
                        {v.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-muted leading-relaxed">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gold/30 bg-charcoal text-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center">
                    <Store className="h-5 w-5 text-gold" />
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold">For Exhibitors</h3>
                </div>
                <Link to="/exhibitors" className="text-sm text-gold hover:underline shrink-0">
                  Details →
                </Link>
              </div>
              <ul className="mt-6 space-y-4">
                {exhibit.map((v) => (
                  <li key={v.title} className="flex items-start gap-3">
                    <span className="h-9 w-9 shrink-0 rounded-lg bg-gold/15 grid place-items-center">
                      <v.icon className="h-4 w-4 text-gold" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-base font-semibold text-white">{v.title}</p>
                      <p className="mt-1 text-sm text-white/70 leading-relaxed">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TwoPaths() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
            Who it's for
          </span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Attend as a visitor, or grow as an exhibitor.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          <Link
            to="/visitors"
            className="group rounded-2xl border border-border/60 bg-pearl p-6 sm:p-8 hover:border-gold transition-colors"
          >
            <span className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center">
              <Ticket className="h-5 w-5 text-gold" />
            </span>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold text-charcoal">
              For Visitors
            </h3>
            <p className="mt-3 text-sm text-slate-muted leading-relaxed">
              Trade buyers, planners and industry professionals — see benefits, schedule and how to
              get your free E-Pass.
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-charcoal group-hover:text-gold">
              Visitor profile <ArrowRight className="ml-1.5 h-4 w-4" />
            </span>
          </Link>
          <Link
            to="/exhibitors"
            className="group rounded-2xl border border-border/60 bg-charcoal text-white p-6 sm:p-8 hover:border-gold transition-colors"
          >
            <span className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center">
              <Store className="h-5 w-5 text-gold" />
            </span>
            <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold">For Exhibitors</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Stall categories, sizes and what you get. Understand the audience before booking your
              stall.
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-gold">
              Exhibitor profile <ArrowRight className="ml-1.5 h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const photos = GALLERY.slice(0, 6);
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-8">
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
              Moments
            </span>
            <h2 className="mt-2 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
              From the show floor.
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-gold text-charcoal hover:bg-gold/10 shrink-0"
          >
            <Link to="/gallery">
              <span className="hidden sm:inline">Full gallery</span>
              <span className="sm:hidden">Gallery</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {photos.map((g, i) => (
            <Link
              key={i}
              to="/gallery"
              className={
                (i >= 3 ? "hidden md:block " : "") +
                (i >= 4 ? "md:hidden lg:block " : "") +
                "relative aspect-square overflow-hidden rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              }
              aria-label={g.title}
            >
              <img
                src={g.src}
                alt={g.title}
                width={480}
                height={480}
                sizes="(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 30vw"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
            Legacy
          </span>
          <h2 className="mt-3 font-display font-bold text-charcoal text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            What past editions delivered.
          </h2>
          <p className="mt-3 text-slate-muted">
            Real voices from exhibitors and industry leaders across UP.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-border/60 bg-pearl p-6 sm:p-7 flex flex-col"
            >
              <Quote className="h-6 w-6 text-gold" aria-hidden />
              <blockquote className="mt-4 text-charcoal text-sm sm:text-base leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border/60">
                <p className="font-display text-base font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-slate-muted mt-0.5">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA({ upcoming }: { upcoming: (typeof EDITIONS)[number] }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-charcoal">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-white text-[clamp(1.75rem,4.5vw,3rem)] leading-tight">
          Be there in{" "}
          <span className="text-gradient-gold">
            {upcoming.city} {upcoming.year}
          </span>
          .
        </h2>
        <p className="mt-4 text-white/70 text-base sm:text-lg">
          See full event details, or explore visitor and exhibitor pages.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-12 sm:h-14 px-6 sm:px-8"
          >
            <Link to="/registration">
              <Ticket className="mr-2 h-4 w-4" /> Register Now
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 bg-transparent h-12 sm:h-14 px-6 sm:px-8"
          >
            <Link to="/event/$slug" params={{ slug: upcoming.slug }}>
              Event details
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
