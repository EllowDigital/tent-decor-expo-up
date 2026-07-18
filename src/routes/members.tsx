import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LEADERSHIP, COMMITTEE, CITY_CHAPTERS } from "@/data/constants";
import { Crown, Users, MapPin, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — Tent Decor Expo UP" },
      { name: "description", content: "Office-bearers, executive committee and district conveners of the Tent, Caterers & Decorators Welfare Association of UP." },
      { property: "og:title", content: "Members — Tent Decor Expo UP" },
      { property: "og:description", content: "Meet the President, secretariat and committee leading the association across Uttar Pradesh." },
      { property: "og:url", content: "/members" },
    ],
    links: [{ rel: "canonical", href: "/members" }],
  }),
  component: Members,
});

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ name, img, size = "md" }: { name: string; img?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-11 w-11 text-xs",
    md: "h-14 w-14 text-sm",
    lg: "h-16 w-16 text-base",
  };
  if (img) {
    return (
      <img
        src={img}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-gold/40 shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${sizes[size]} shrink-0 rounded-full bg-gradient-gold text-charcoal grid place-items-center font-display font-bold ring-2 ring-gold/40`}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}

function Members() {
  const president = LEADERSHIP[0];
  const officers = LEADERSHIP.slice(1);

  const districts = useMemo(() => {
    const s = new Set<string>();
    COMMITTEE.forEach((c) => c.district && s.add(c.district));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("All");

  const filteredCommittee = useMemo(() => {
    const query = q.trim().toLowerCase();
    return COMMITTEE.filter((c) => {
      const inDistrict = district === "All" || c.district === district;
      const inQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.role.toLowerCase().includes(query) ||
        (c.district ?? "").toLowerCase().includes(query);
      return inDistrict && inQuery;
    });
  }, [q, district]);

  const totalPeople = 1 + officers.length + COMMITTEE.length + CITY_CHAPTERS.reduce((s, c) => s + c.members.length, 0);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 left-1/3 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute -bottom-24 right-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Leadership
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05]">
              The people <span className="text-gradient-gold">leading the association.</span>
            </h1>
            <p className="mt-5 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
              Office-bearers, executive committee and city chapters of the Tent, Caterers &amp; Decorators Welfare Association of Uttar Pradesh.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            {[
              { v: "6,000+", l: "Member Businesses" },
              { v: "75", l: "Districts" },
              { v: CITY_CHAPTERS.length, l: "City Chapters" },
              { v: totalPeople, l: "Committee Members" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 sm:px-5 sm:py-4"
              >
                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-gold leading-none">
                  {s.v}
                </p>
                <p className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* President */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="overflow-hidden border-2 border-gold/60 shadow-gold grid md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]">
              <div className="relative aspect-[4/5] md:aspect-auto bg-pearl overflow-hidden">
                {president.img ? (
                  <img
                    src={president.img}
                    alt={president.name}
                    width={680}
                    height={850}
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 100vw"
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center">
                    <Avatar name={president.name} size="lg" />
                  </div>
                )}
                <div className="absolute top-4 left-4 rounded-full bg-gradient-gold text-charcoal text-[10px] sm:text-xs uppercase tracking-[0.24em] font-semibold px-3 py-1.5 inline-flex items-center gap-1.5">
                  <Crown className="h-3.5 w-3.5" /> President
                </div>
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-medium">
                  Office of the President
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
                  {president.name}
                </h2>
                <p className="mt-3 text-slate-muted text-sm sm:text-base">
                  President, Tent, Caterers &amp; Decorators Welfare Association of Uttar Pradesh.
                </p>
                <p className="mt-5 text-sm sm:text-base text-slate-muted leading-relaxed border-l-2 border-gold/60 pl-4">
                  Guiding the association's state-wide agenda — welfare of member businesses, policy advocacy, and the Mahadhiveshan expo series that brings the entire industry under one roof.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Secretariat */}
      <section className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
              Secretariat
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              Office-bearers.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-muted">
              The core team leading day-to-day operations of the state association.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {officers.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <Card className="overflow-hidden border-border/60 bg-white h-full flex flex-col group hover:border-gold/60 transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden bg-pearl">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={p.name}
                        width={640}
                        height={480}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center">
                        <Avatar name={p.name} size="lg" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-gold font-medium">
                      {p.role}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg sm:text-xl font-semibold text-charcoal">
                      {p.name}
                    </h3>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
                Executive Committee
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
                District conveners &amp; members.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-muted">
                Representing over 6,000 member businesses across 75 districts of Uttar Pradesh.
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-muted pointer-events-none" />
              <Input
                type="search"
                placeholder="Search by name, role or district"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9 h-11 bg-pearl border-border/60"
                aria-label="Search committee members"
              />
            </div>
          </div>

          {/* District filter chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setDistrict(d)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                  district === d
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-white text-charcoal border-border/60 hover:border-gold hover:text-gold"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {filteredCommittee.length === 0 ? (
            <p className="mt-16 text-center text-slate-muted">
              No members found. Try clearing the filter or search.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredCommittee.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.03}>
                  <Card className="p-5 h-full border-border/60 hover:border-gold/60 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 min-w-0">
                      <Avatar name={c.name} img={c.img} />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-base sm:text-lg font-semibold text-charcoal truncate">
                          {c.name}
                        </h3>
                        <p className="mt-0.5 text-xs sm:text-sm text-gold truncate">{c.role}</p>
                        {c.district && (
                          <p className="mt-2 inline-flex items-center gap-1 text-xs text-charcoal/70">
                            <MapPin className="h-3 w-3 text-gold shrink-0" />
                            <span className="truncate">{c.district}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* City Chapters */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
              City Chapters
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              Local committees across UP.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-muted">
              Tap a city to see its local president, secretary and committee.
            </p>
          </div>

          <div className="mt-10">
            <Tabs defaultValue={CITY_CHAPTERS[0].city} className="w-full">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 scrollbar-none">
                <TabsList className="inline-flex h-auto flex-nowrap gap-1 bg-white border border-border/60 p-1 rounded-full">
                  {CITY_CHAPTERS.map((c) => (
                    <TabsTrigger
                      key={c.city}
                      value={c.city}
                      className="whitespace-nowrap rounded-full data-[state=active]:bg-gradient-gold data-[state=active]:text-charcoal data-[state=active]:shadow-sm text-charcoal/70 hover:text-charcoal px-4 py-2 text-xs sm:text-sm font-medium"
                    >
                      {c.city}
                      <span className="ml-1.5 text-[10px] opacity-70">{c.members.length}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {CITY_CHAPTERS.map((c) => (
                <TabsContent key={c.city} value={c.city} className="mt-8 focus-visible:outline-none">
                  <div className="flex items-center gap-2 text-slate-muted text-xs sm:text-sm">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-medium">
                      {c.city} chapter
                    </span>
                    <span className="text-slate-muted/60">·</span>
                    <span>{c.members.length} members</span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {c.members.map((m, i) => (
                      <Reveal key={m.name} delay={i * 0.03}>
                        <Card className="p-5 h-full border-border/60 bg-white hover:border-gold/60 hover:shadow-md transition-all">
                          <div className="flex items-start gap-4 min-w-0">
                            <Avatar name={m.name} img={m.img} />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-display text-base sm:text-lg font-semibold text-charcoal truncate">
                                {m.name}
                              </h3>
                              <p className="mt-0.5 text-xs sm:text-sm text-gold truncate">{m.role}</p>
                              <p className="mt-2 inline-flex items-center gap-1 text-xs text-charcoal/70">
                                <MapPin className="h-3 w-3 text-gold shrink-0" />
                                <span className="truncate">{c.city}</span>
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Reveal>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 sm:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
            Join Us
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Become part of the <span className="text-gradient-gold">TCDWA UP</span> family.
          </h2>
          <p className="mt-4 text-white/70 text-base sm:text-lg">
            If you run a tent, catering, decor or hospitality business in Uttar Pradesh — get in touch with your nearest city chapter.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 h-14 px-8 rounded-md bg-gradient-gold text-charcoal font-medium shadow-gold hover:opacity-90 transition-opacity"
          >
            <Users className="h-4 w-4" /> Contact your chapter
          </a>
        </div>
      </section>
    </>
  );
}
