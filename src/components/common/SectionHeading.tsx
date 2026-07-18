import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(center && "text-center", "max-w-3xl", center && "mx-auto", className)}>
      {eyebrow && (
        <div className={cn("mb-4 flex items-center gap-3", center && "justify-center")}>
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.05]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-lg text-slate-muted leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}
