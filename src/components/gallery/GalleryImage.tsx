import { useState } from "react";
import { cn } from "@/lib/utils";

const RATIOS = ["4/5", "1/1", "3/4", "4/3", "5/4"];

type Props = {
  src: string;
  alt: string;
  idx: number;
  priority?: boolean;
};

export function GalleryImage({ src, alt, idx, priority }: Props) {
  const [loaded, setLoaded] = useState(false);
  const ratio = RATIOS[idx % RATIOS.length];

  return (
    <div
      className="relative w-full overflow-hidden bg-pearl"
      style={{ aspectRatio: ratio }}
    >
      {/* Skeleton shimmer */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
          "bg-[linear-gradient(110deg,theme(colors.pearl)_25%,theme(colors.white)_50%,theme(colors.pearl)_75%)] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]",
        )}
      />
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
