import { REGISTER_URL } from "@/data/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "gold" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
};

/**
 * External CTA that links to the registration/E-Pass portal.
 * Opens in a new tab. Use for every "Register", "Get E-Pass", "Book Stall" button.
 */
export function RegisterLink({
  children,
  variant = "gold",
  size = "md",
  className,
  showIcon = false,
  ariaLabel,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all whitespace-nowrap";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-14 px-8 text-base",
  };
  const variants = {
    gold: "bg-gradient-gold text-charcoal shadow-gold hover:opacity-90",
    dark: "bg-charcoal text-gold hover:bg-charcoal/90",
    outline: "border border-gold text-charcoal hover:bg-gold/10",
    ghost: "text-gold hover:text-gold/80 underline-offset-4 hover:underline",
  };

  return (
    <a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {children}
      {showIcon && <ArrowUpRight className="h-4 w-4" />}
    </a>
  );
}
