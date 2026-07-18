import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LEADERSHIP, COMMITTEE, CITY_CHAPTERS } from "@/data/constants";
import { Crown, Users, MapPin, Building2 } from "lucide-react";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — Tent Decor Expo UP" },
      { name: "description", content: "Office-bearers, executive committee and district conveners of the Tent, Caterers & Decorators Welfare Association of UP." },
      { property: "og:title", content: "Members — Tent Decor Expo UP" },
      { property: "og:description", content: "Meet the President, secretariat and committee leading the association across Uttar Pradesh." },
    ],
  }),
  component: Members,
});

function Members() {
  const president = LEADERSHIP[0];
  const officers = LEADERSHIP.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Leadership</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05]">
            The people <span className="text-gradient-gold">leading the association.</span>
          </h1>
          <p className="mt-5 text-white/70 text-base sm:text-lg leading-relaxed">
            Office-bearers and committee of the Tent, Caterers & Decorators Welfare Association of Uttar Pradesh.
          </p>
        </div>
      </section>

      {/* President */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="President" title="Leading the association." />
          <Reveal>
            <Card className="mt-10 overflow-hidden border-2 border-gold shadow-gold grid sm:grid-cols-[240px_1fr] gap-0">
              <div className="aspect-square sm:aspect-auto bg-pearl">
                <img src={president.img} alt={president.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.28em] text-gold font-medium">
                  <Crown className="h-3.5 w-3.5" /> President
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal">{president.name}</h2>
                <p className="mt-2 text-slate-muted">
                  President, Tent, Caterers & Decorators Welfare Association of Uttar Pradesh.
                </p>
                <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                  Guiding the association's state-wide agenda — welfare, policy advocacy and the Mahadhiveshan expo series.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Office bearers */}
      <section className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Secretariat" title="Office-bearers." />
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {officers.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <Card className="overflow-hidden border-border/60 bg-white">
                  <div className="aspect-[4/3] overflow-hidden bg-pearl">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-charcoal">{p.name}</h3>
                    <p className="mt-1 text-sm text-gold">{p.role}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Committee */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Executive Committee" title="District conveners & members." />
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMITTEE.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.04}>
                <Card className="p-5 h-full border-border/60 hover:border-gold/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gold/10 grid place-items-center">
                      <Users className="h-4 w-4 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold text-charcoal truncate">{c.name}</h3>
                      <p className="mt-0.5 text-xs text-slate-muted">{c.role}</p>
                      <p className="mt-2 inline-flex items-center gap-1 text-xs text-charcoal/70">
                        <MapPin className="h-3 w-3 text-gold" /> {c.district}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-muted">
            Representing over 6,000 member businesses across 75 districts of Uttar Pradesh.
          </p>
        </div>
      </section>
    </>
  );
}
