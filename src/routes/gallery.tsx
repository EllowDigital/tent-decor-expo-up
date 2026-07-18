import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Play, ChevronLeft, ChevronRight, Search, ArrowDownUp,
  Images, Sparkles, LayoutGrid, Camera,
} from "lucide-react";
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
const PAGE = 12;

function hashScore(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type GalleryItem = (typeof GALLERY)[number] & { _idx: number; _pop: number };

function Gallery() {
  const YEARS = useMemo(() => ["All", ...EDITIONS.map((e) => e.year)], []);

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

  useEffect(() => { setVisible(PAGE); }, [category, year, q, sort]);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

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

  const activeFilterCount =
    (category !== "All" ? 1 : 0) + (year !== "All" ? 1 : 0) + (q.trim() ? 1 : 0);

  const stats = useMemo(() => ({
    photos: ALL.length,
    editions: EDITIONS.length,
    categories: CATEGORIES.length - 1,
  }), [ALL.length]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 right-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold blur-[140px]" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Gallery
            </span>
            <h1 className="mt-4 font-display font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Moments that <span className="text-gradient-gold">defined</span> the industry.
            </h1>
            <p className="mt-5 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
              A visual journey across every Mahadhiveshan — the stages, the craft, the crowds, the culture.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
            {[
              { v: `${stats.photos}+`, l: "Photos", Icon: Images },
              { v: stats.editions, l: "Editions", Icon: LayoutGrid },
              { v: stats.categories, l: "Categories", Icon: Camera },
            ].map(({ v, l, Icon }) => (
              <div
                key={l}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 sm:px-5 sm:py-4"
              >
                <Icon className="h-4 w-4 text-gold" />
                <p className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-gold leading-none">
                  {v}
                </p>
                <p className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-3 sm:space-y-4">
          {/* Row 1: search + sort */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:gap-3">
            <div className="relative min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-muted pointer-events-none" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search moments…"
                aria-label="Search moments"
                className="pl-10 h-11 bg-pearl border-border/60"
              />
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger
                aria-label="Sort photos"
                className="h-11 w-[104px] sm:w-40 bg-pearl border-border/60 shrink-0 px-2.5 sm:px-3"
              >
                <ArrowDownUp className="h-4 w-4 text-slate-muted mr-1 shrink-0" aria-hidden />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                  <SelectItem key={k} value={k}>{SORT_LABEL[k]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 2: year chips */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-muted mb-1.5 sm:hidden">Year</div>
            <div className="relative -mx-4 sm:mx-0">
              <div className="overflow-x-auto scrollbar-none px-4 sm:px-0">
                <div className="flex items-center gap-2 whitespace-nowrap pr-2">
                  <span className="hidden sm:inline text-[10px] uppercase tracking-[0.24em] text-slate-muted shrink-0 mr-1">Year</span>
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      aria-pressed={year === y}
                      className={cn(
                        "shrink-0 h-8 px-3.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all border",
                        year === y
                          ? "bg-charcoal text-gold border-charcoal"
                          : "bg-white text-charcoal/70 border-border/60 hover:border-charcoal hover:text-charcoal",
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 to-transparent" />
            </div>
          </div>

          {/* Row 3: category chips */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-muted mb-1.5 sm:hidden">Category</div>
            <div className="relative -mx-4 sm:mx-0">
              <div className="overflow-x-auto scrollbar-none px-4 sm:px-0">
                <div className="flex items-center gap-2 whitespace-nowrap pr-2">
                  <span className="hidden sm:inline text-[10px] uppercase tracking-[0.24em] text-slate-muted shrink-0 mr-1">Category</span>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      aria-pressed={category === c}
                      className={cn(
                        "shrink-0 h-9 px-4 rounded-full text-xs sm:text-sm font-medium transition-all border",
                        category === c
                          ? "bg-gradient-gold text-charcoal border-transparent shadow-sm"
                          : "bg-white text-charcoal/70 border-border/60 hover:border-gold hover:text-charcoal",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 to-transparent" />
            </div>
          </div>

          {/* Row 4: meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-muted">
            <p role="status" aria-live="polite">
              Showing <span className="text-charcoal font-semibold">{Math.min(visible, items.length)}</span>
              {" "}of <span className="text-charcoal font-semibold">{items.length}</span> moments
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setCategory("All"); setYear("All"); setQ(""); }}
                className="inline-flex items-center gap-1.5 text-charcoal font-medium hover:text-gold"
              >
                <X className="h-3.5 w-3.5" /> Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
              </button>
            )}
          </div>
        </div>
      </section>


      {/* MASONRY */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-20 sm:py-28 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-pearl grid place-items-center">
                <Search className="h-5 w-5 text-slate-muted" />
              </div>
              <p className="mt-5 font-display text-xl sm:text-2xl text-charcoal">
                No moments match those filters.
              </p>
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
                className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 lg:gap-5 [column-fill:_balance]"
              >
                {shown.map((g, i) => (
                  <li key={`${g.src}-${g._idx}-${i}`} className="break-inside-avoid mb-3 sm:mb-4 lg:mb-5 inline-block w-full">
                    <Reveal delay={Math.min((i % PAGE) * 0.02, 0.2)}>
                      <button
                        onClick={() => setLightbox(i)}
                        className="block w-full overflow-hidden rounded-xl sm:rounded-2xl group relative bg-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                        aria-label={`Open ${g.title}`}
                      >
                        <img
                          src={g.src}
                          alt={g.title}
                          width={640}
                          height={640}
                          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                          loading="lazy"
                          decoding="async"
                          className="block w-full h-auto max-w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                        />
                        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 rounded-full bg-charcoal/75 backdrop-blur-md text-gold text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                          {g.year || "Archive"}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-5 text-left">
                          <span className="text-[10px] uppercase tracking-[0.24em] text-gold font-semibold">{g.category}</span>
                          <span className="mt-1 text-white font-medium text-sm sm:text-base leading-snug line-clamp-2">{g.title}</span>
                        </span>
                      </button>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <div ref={sentinelRef} aria-hidden className="h-1" />
              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => Math.min(v + PAGE, items.length))}
                    className="inline-flex items-center gap-2 min-h-11 px-6 rounded-full bg-charcoal text-gold text-sm font-semibold hover:bg-charcoal/90 transition-colors"
                  >
                    Load more
                    <span className="text-white/50">· {items.length - visible} left</span>
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
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold font-medium">Aftermovies</span>
            <h2 className="mt-2 font-display font-bold text-charcoal text-3xl sm:text-4xl lg:text-5xl">
              Watch the story unfold.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-muted">
              Short films from recent editions of the Mahadhiveshan.
            </p>
          </div>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Lucknow 2025 — Official Aftermovie", desc: "The 3rd Mahadhiveshan in 3 minutes." },
              { title: "Behind the Mandap", desc: "Craftsmen who build India's grandest weddings." },
              { title: "Voices of the Association", desc: "Members share what the expo means." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <Card className="overflow-hidden border-border/60 bg-white group hover:border-gold/60 hover:shadow-md transition-all">
                  <button
                    type="button"
                    className="relative aspect-video w-full bg-charcoal grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={`Play ${v.title}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/25 via-transparent to-charcoal/50" />
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-gold grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 sm:h-6 sm:w-6 text-charcoal fill-charcoal ml-0.5" />
                    </div>
                  </button>
                  <div className="p-5">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-charcoal">{v.title}</h3>
                    <p className="mt-1 text-sm text-slate-muted">{v.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = (document.activeElement as HTMLElement) ?? null;
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
              className="absolute top-2 right-2 sm:top-4 sm:right-4 h-11 w-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </button>

            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
                className="max-h-[70vh] sm:max-h-[80dvh] max-w-full w-auto h-auto rounded-lg shadow-elegant object-contain"
              />
              <figcaption className="text-center text-white/90 px-4">
                <p id={descId} className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gold font-semibold">
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
