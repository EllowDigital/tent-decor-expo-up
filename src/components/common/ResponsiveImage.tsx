import { cn } from "@/lib/utils";
import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading" | "decoding"> & {
  /** Rendered aspect. Used to compute width/height for CLS-free layout. */
  width?: number;
  height?: number;
  /** Above-the-fold hero images: true. Everything else: false. */
  priority?: boolean;
  /** CSS sizes hint for the browser's srcset picker. */
  sizes?: string;
};

/**
 * ResponsiveImage — a thin wrapper that enforces sane defaults for every
 * `<img>` on the site:
 *  - explicit intrinsic width/height (prevents CLS)
 *  - `loading="lazy"` + `decoding="async"` for below-the-fold images
 *  - `fetchpriority="high"` + eager for above-the-fold heroes
 *  - a `sizes` hint so the browser can pick the right resource
 *
 * The project ships single-resolution JPEGs, so we don't emit a multi-density
 * srcset — but keeping `sizes` + width/height means when we later add
 * variants (via a build plugin or CDN), a single prop change lights them up
 * everywhere.
 */
export function ResponsiveImage({
  className,
  width,
  height,
  priority = false,
  sizes = "100vw",
  alt = "",
  ...rest
}: Props) {
  return (
    <img
      {...rest}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn(className)}
    />
  );
}
