import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { GALLERY } from "@/data/constants";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Tent Decor Expo UP" },
      { name: "description", content: "Highlights, aftermovies and unforgettable moments from previous Mahadhiveshan editions." },
      { property: "og:title", content: "Gallery — Tent Decor Expo UP" },
      { property: "og:description", content: "Tent, decoration, lighting, catering and VIP moments from Lucknow 2025 and beyond." },
    ],
  }),
  component: Gallery,
});

const CATEGORIES = ["All", "Tent Setup", "Decoration", "Lighting", "Catering", "VIP"];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <>
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Gallery</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-white leading-[1.02]">
            Moments that <span className="text-gradient-gold">defined</span> the industry.
          </h1>
          <p className="mt-6 text-white/70 text-lg">A visual journey through past Mahadhiveshan editions.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  filter === c
                    ? "bg-gradient-gold text-charcoal shadow-gold"
                    : "bg-pearl text-slate-muted hover:text-charcoal hover:bg-muted",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((g, i) => (
              <Reveal key={`${g.src}-${i}`} delay={i * 0.03}>
                <button
                  onClick={() => setLightbox(i)}
                  className="block w-full break-inside-avoid overflow-hidden rounded-xl group relative"
                >
                  <img src={g.src} alt={g.title} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-left">
                    <span className="text-xs uppercase tracking-widest text-gold">{g.category}</span>
                    <p className="mt-1 text-white font-medium">{g.title}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
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
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={items[lightbox].src}
              alt={items[lightbox].title}
              className="max-h-[85vh] max-w-[92vw] rounded-lg shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
