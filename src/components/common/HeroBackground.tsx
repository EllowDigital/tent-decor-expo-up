import { cn } from "@/lib/utils";

/**
 * Responsive hero background image (`public/assets/responsive/hero-bg-*`).
 *
 * Emits a <picture> with WebP + JPEG srcsets at 640/1024/1600/1920 widths so
 * mobile fetches ~80 KB instead of the 360 KB source. Variants are generated
 * from `src/assets/hero-bg.jpg` by `scripts/gen-hero-variants.mjs` (runs on
 * every build via the `prebuild` npm script).
 */
const WIDTHS = [640, 1024, 1600, 1920] as const;
const base = "/assets/responsive/hero-bg";
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
