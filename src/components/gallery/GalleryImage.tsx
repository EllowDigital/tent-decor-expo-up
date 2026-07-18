import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  idx: number;
  priority?: boolean;
};

export function GalleryImage({ src, alt, priority }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-pearl aspect-[4/5]">
      {/* Skeleton shimmer */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-500 bg-pearl",
          loaded ? "opacity-0" : "opacity-100 animate-pulse",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-charcoal/5" />
      </div>
      <img
        src={src}
        alt={alt}
        width={640}
        height={640}
        sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 block h-full w-full object-cover transition-[opacity,transform] duration-[700ms] ease-out group-hover:scale-[1.04]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
