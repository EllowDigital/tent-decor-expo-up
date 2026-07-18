/**
 * Skeleton placeholders shown while lazy-loaded homepage sections hydrate.
 * Keep dimensions close to the real sections so the layout doesn't shift.
 */
export function BelowFoldSkeleton() {
  return (
    <div aria-hidden className="animate-pulse motion-reduce:animate-none">
      {/* Marquee strip */}
      <div className="h-12 sm:h-14 bg-charcoal/95 border-y border-white/10" />

      {/* About snippet */}
      <div className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="mx-auto h-3 w-40 rounded bg-muted" />
          <div className="mx-auto h-8 sm:h-10 w-3/4 rounded bg-muted" />
          <div className="mx-auto h-4 w-full max-w-2xl rounded bg-muted/70" />
          <div className="mx-auto h-4 w-5/6 max-w-2xl rounded bg-muted/70" />
        </div>
      </div>

      {/* Dual grid */}
      <div className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-2">
          <div className="h-64 rounded-2xl bg-white/70 border border-border/60" />
          <div className="h-64 rounded-2xl bg-charcoal/90" />
        </div>
      </div>

      {/* Gallery preview */}
      <div className="py-16 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
