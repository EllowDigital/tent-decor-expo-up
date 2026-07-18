import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, ChevronLeft, ChevronRight, Search, ArrowDownUp } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { GALLERY, EDITIONS } from "@/data/constants";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => buildHead(PAGE_SEO.gallery),
  component: Gallery,
});

const CATEGORIES = ["All", "Tent Setup", "Decoration", "Lighting", "Catering", "VIP", "Stage"];
type SortKey = "newest" | "popular" | "az";
const SORT_LABEL: Record<SortKey, string> = {
  newest: "Newest",
  popular: "Popular",
  az: "A–Z",
};
const PAGE = 8;

// Deterministic pseudo-popularity so the ordering is stable across renders.
function hashScore(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type GalleryItem = (typeof GALLERY)[number] & { _idx: number; _pop: number };

function Gallery() {
  const YEARS = useMemo(() => ["All", ...EDITIONS.map((e) => e.year)], []);

  // Enrich once.
  const ALL = useMemo<GalleryItem[]>(
    () => GALLERY.map((g, i) => ({ ...g, _idx: i, _pop: hashScore(g.title) })),
    [],
  );

  const [category, setCategory] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = ALL.filter((g) => {
      if (category !== "All" && g.category !== category) return false;
      if (year !== "All" && g.year !== year) return false;
      if (query && !g.title.toLowerCase().includes(query) && !g.category.toLowerCase().includes(query)) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === "newest") sorted.sort((a, b) => Number(b.year) - Number(a.year) || a._idx - b._idx);
    else if (sort === "popular") sorted.sort((a, b) => b._pop - a._pop);
    else sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [ALL, category, year, q, sort]);

  // Reset window when filters/sort change.
  useEffect(() => { setVisible(PAGE); }, [category, year, q, sort]);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  // Infinite scroll sentinel.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisible((v) => Math.min(v + PAGE, items.length));
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, items.length]);

  const openNext = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % shown.length)),
    [shown.length],
  );
  const openPrev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + shown.length) % shown.length)),
    [shown.length],
  );

  return (
    <>
      {/* HERO */}
      <section className="py-16 sm:py-20 lg:py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-gold font-medium">Gallery</span>
          <h1 className="mt-4 font-display font-bold text-white leading-[1.05] text-[clamp(2rem,6vw,4.5rem)]">
            Moments that <span className="text-gradient-gold">defined</span> the industry.
          </h1>
          <p className="mt-5 text-white/70 text-base sm:text-lg">A visual journey across every Mahadhiveshan edition.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-6 sm:py-8 bg-white border-b border-border sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search + Sort row */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-3xl mx-auto">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-muted pointer-events-none" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search moments…"
                aria-label="Search moments"
                className="pl-11 h-11 bg-pearl border-border/60"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ArrowDownUp className="h-4 w-4 text-slate-muted" aria-hidden />
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger aria-label="Sort photos" className="h-11 w-full sm:w-40 bg-pearl border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                    <SelectItem key={k} value={k}>{SORT_LABEL[k]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Year filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-slate-muted self-center mr-2">Year</span>
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={cn(
                  "min-h-9 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all",
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
            <span className="text-[11px] uppercase tracking-widest text-slate-muted self-center mr-2">Category</span>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "min-h-9 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all",
                  category === c
                    ? "bg-gradient-gold text-charcoal shadow-gold"
                    : "bg-pearl text-slate-muted hover:text-charcoal hover:bg-muted",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-slate-muted" role="status" aria-live="polite">
            Showing <span className="text-charcoal font-semibold">{Math.min(visible, items.length)}</span> of {items.length} moments
          </p>
        </div>
      </section>

      {/* MASONRY */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-charcoal">No moments match those filters.</p>
              <p className="mt-2 text-sm text-slate-muted">Try clearing a filter or the search box.</p>
              <button
                onClick={() => { setCategory("All"); setYear("All"); setQ(""); }}
                className="mt-6 inline-flex items-center min-h-11 px-5 py-2 rounded-full bg-gradient-gold text-charcoal text-sm font-medium shadow-gold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <ul
                role="list"
                className="columns-2 md:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
              >
                {shown.map((g, i) => (
                  <li key={`${g.src}-${g._idx}-${i}`} className="break-inside-avoid">
                    <Reveal delay={Math.min((i % PAGE) * 0.03, 0.3)}>
                      <button
                        onClick={() => setLightbox(i)}
                        className="block w-full overflow-hidden rounded-xl group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                        aria-label={`Open ${g.title}`}
                      >
                        <img
                          src={g.src}
                          alt={g.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-charcoal/70 backdrop-blur-md text-gold text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                          {g.year}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex flex-col justify-end p-4 sm:p-5 text-left">
                          <span className="text-[11px] uppercase tracking-widest text-gold">{g.category}</span>
                          <span className="mt-1 text-white font-medium text-sm sm:text-base">{g.title}</span>
                        </span>
                      </button>
                    </Reveal>
                  </li>
                ))}
              </ul>

              {/* Sentinel + Load more */}
              <div ref={sentinelRef} aria-hidden className="h-1" />
              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => Math.min(v + PAGE, items.length))}
                    className="min-h-11 px-6 rounded-full bg-charcoal text-gold text-sm font-medium hover:bg-charcoal/90"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Aftermovies */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-gold font-medium">Aftermovies</span>
            <h2 className="mt-4 font-display font-bold text-charcoal text-[clamp(1.75rem,4.5vw,3rem)]">Watch the story unfold.</h2>
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Lucknow 2025 — Official Aftermovie", desc: "The 3rd Mahadhiveshan in 3 minutes." },
              { title: "Behind the Mandap", desc: "Craftsmen who build India's grandest weddings." },
              { title: "Voices of the Association", desc: "Members share what the expo means." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <Card className="overflow-hidden hover-lift border-border/60">
                  <button
                    type="button"
                    className="relative aspect-video w-full bg-charcoal grid place-items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={`Play ${v.title}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-gold grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 sm:h-6 sm:w-6 text-charcoal fill-charcoal ml-1" />
                    </div>
                  </button>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-charcoal">{v.title}</h3>
                    <p className="mt-1 text-sm text-slate-muted">{v.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        items={shown}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onPrev={openPrev}
        onNext={openNext}
      />
    </>
  );
}

/* ---------- Accessible Lightbox ---------- */

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const open = index !== null && items[index] !== undefined;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Focus management + focus trap + keyboard nav.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    // Move focus into the dialog.
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); onNext(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); return; }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose, onNext, onPrev]);

  const current = open ? items[index!] : null;
  const titleId = "lightbox-title";
  const descId = "lightbox-desc";

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-md p-3 sm:p-6 grid place-items-center"
          onClick={onClose}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative w-full h-full grid place-items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 min-h-11 min-w-11 h-11 w-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-h-11 min-w-11 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </button>

            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-h-11 min-w-11 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </button>

            <motion.figure
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="flex flex-col items-center gap-3 sm:gap-4 max-w-[95vw]"
            >
              <img
                src={current.src}
                alt={current.title}
                className="max-h-[75vh] sm:max-h-[80dvh] max-w-full w-auto h-auto rounded-lg shadow-elegant object-contain"
              />
              <figcaption className="text-center text-white/90 px-4">
                <p id={descId} className="text-[11px] sm:text-xs uppercase tracking-widest text-gold">
                  {current.category} · {current.year}
                </p>
                <p id={titleId} className="mt-1 font-display text-base sm:text-lg">{current.title}</p>
                <p className="mt-2 text-[11px] text-white/50">
                  {(index ?? 0) + 1} / {items.length} · Use ← → to navigate, Esc to close
                </p>
              </figcaption>
            </motion.figure>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
