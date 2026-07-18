import { cn } from "@/lib/utils";

/**
 * Responsive hero background image (`public/assets/responsive/hero-bg-*`).
 *
 * Emits a <picture> with AVIF + WebP + JPEG srcsets at 640/1024/1600/1920
 * widths. AVIF is preferred (smallest), then WebP, with JPEG as the universal
 * fallback. Variants are generated from `public/assets/hero-bg.jpg` by
 * `scripts/gen-hero-variants.mjs` (runs on every build via the `prebuild`
 * npm script). Missing formats degrade gracefully — <source> tags without
 * matching files are ignored by the browser.
 */
const WIDTHS = [640, 1024, 1600, 1920] as const;
const base = "/assets/responsive/hero-bg";
const srcSetAvif = WIDTHS.map((w) => `${base}-${w}.avif ${w}w`).join(", ");
const srcSetWebp = WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
const srcSetJpg = WIDTHS.map((w) => `${base}-${w}.jpg ${w}w`).join(", ");

export function HeroBackground({
  className,
  overlayClassName,
  priority = true,
}: {
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
}) {
  return (
    <>
      <picture>
        <source type="image/avif" srcSet={srcSetAvif} sizes="100vw" />
        <source type="image/webp" srcSet={srcSetWebp} sizes="100vw" />
        <img
          src={`${base}-1600.jpg`}
          srcSet={srcSetJpg}
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={cn("h-full w-full object-cover", className)}
          onError={(e) => {
            // Fallback to the bundled source if the CDN cache is cold.
            const img = e.currentTarget as HTMLImageElement;
            if (!img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = "/assets/hero-bg.jpg";
            }
          }}
        />
      </picture>
      {overlayClassName ? <div className={cn("absolute inset-0", overlayClassName)} /> : null}
    </>
  );
}
