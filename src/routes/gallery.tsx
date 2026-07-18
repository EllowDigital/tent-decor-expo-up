import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { GALLERY, EDITIONS } from "@/data/constants";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Tent Decor Expo UP" },
      { name: "description", content: "Highlights, aftermovies and unforgettable moments from every edition of the Mahadhiveshan." },
      { property: "og:title", content: "Gallery — Tent Decor Expo UP" },
      { property: "og:description", content: "Tent, decoration, lighting, catering and VIP moments across every edition." },
    ],
  }),
  component: Gallery,
});

const CATEGORIES = ["All", "Tent Setup", "Decoration", "Lighting", "Catering", "VIP", "Stage"];

function Gallery() {
  const YEARS = useMemo(() => ["All", ...EDITIONS.map((e) => e.year)], []);
  const [category, setCategory] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [q, setQ] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GALLERY.filter((g) => {
      if (category !== "All" && g.category !== category) return false;
      if (year !== "All" && g.year !== year) return false;
      if (query && !g.title.toLowerCase().includes(query) && !g.category.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [category, year, q]);

  const openPrev = () => setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const openNext = () => setLightbox((i) => (i === null ? null : (i + 1) % items.length));

  return (
    <>
      {/* HERO */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Gallery</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-white leading-[1.02]">
            Moments that <span className="text-gradient-gold">defined</span> the industry.
          </h1>
          <p className="mt-6 text-white/70 text-lg">A visual journey across every Mahadhiveshan edition.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-10 bg-white border-b border-border sticky top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-muted" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search moments…"
              className="pl-11 h-11 bg-pearl border-border/60"
            />
          </div>

          {/* Year filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-muted self-center mr-2">Year</span>
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all",
                  year === y
                    ? "bg-charcoal text-gold shadow-elegant"
                    : "bg-pearl text-slate-muted hover:text-charcoal hover:bg-muted",
                )}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-muted self-center mr-2">Category</span>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  category === c
                    ? "bg-gradient-gold text-charcoal shadow-gold"
                    : "bg-pearl text-slate-muted hover:text-charcoal hover:bg-muted",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-slate-muted">
            Showing <span className="text-charcoal font-semibold">{items.length}</span> of {GALLERY.length} moments
          </p>
        </div>
      </section>

      {/* MASONRY */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-charcoal">No moments match those filters.</p>
              <p className="mt-2 text-sm text-slate-muted">Try clearing a filter or the search box.</p>
              <button
                onClick={() => { setCategory("All"); setYear("All"); setQ(""); }}
                className="mt-6 inline-flex items-center px-5 py-2 rounded-full bg-gradient-gold text-charcoal text-sm font-medium shadow-gold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map((g, i) => (
                <Reveal key={`${g.src}-${i}`} delay={Math.min(i * 0.03, 0.4)}>
                  <button
                    onClick={() => setLightbox(i)}
                    className="block w-full break-inside-avoid overflow-hidden rounded-xl group relative"
                  >
                    <img src={g.src} alt={g.title} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 rounded-full bg-charcoal/70 backdrop-blur-md text-gold text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                      {g.year}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-left">
                      <span className="text-xs uppercase tracking-widest text-gold">{g.category}</span>
                      <p className="mt-1 text-white font-medium">{g.title}</p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Aftermovies */}
      <section className="py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Aftermovies</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-charcoal">Watch the story unfold.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { title: "Lucknow 2025 — Official Aftermovie", desc: "The 3rd Mahadhiveshan in 3 minutes." },
              { title: "Behind the Mandap", desc: "Craftsmen who build India's grandest weddings." },
              { title: "Voices of the Association", desc: "Members share what the expo means." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <Card className="overflow-hidden hover-lift border-border/60">
                  <div className="relative aspect-video bg-charcoal grid place-items-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
                    <div className="relative h-16 w-16 rounded-full bg-gradient-gold grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-charcoal fill-charcoal ml-1" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-charcoal">{v.title}</h3>
                    <p className="mt-1 text-sm text-slate-muted">{v.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-md grid place-items-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openPrev(); }}
              className="absolute left-4 md:left-8 h-12 w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openNext(); }}
              className="absolute right-4 md:right-8 h-12 w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[lightbox].src}
                alt={items[lightbox].title}
                className="max-h-[80vh] max-w-[92vw] rounded-lg shadow-elegant"
              />
              <div className="text-center text-white/90">
                <p className="text-xs uppercase tracking-widest text-gold">{items[lightbox].category} · {items[lightbox].year}</p>
                <p className="mt-1 font-display text-lg">{items[lightbox].title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
