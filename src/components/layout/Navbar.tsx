import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { RegisterLink } from "@/components/common/RegisterLink";
import { NAV_LINKS } from "@/data/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-white/10 backdrop-blur-md border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Home">
            <Logo className={cn("w-auto transition-all", scrolled ? "h-9 sm:h-11" : "h-10 sm:h-14")} />

          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-charcoal" : "text-slate-muted hover:text-charcoal",
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gradient-gold rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <RegisterLink variant="outline">Get E-Pass</RegisterLink>
            <RegisterLink variant="gold" showIcon>Book Stall</RegisterLink>
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-charcoal"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-border shadow-elegant"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    pathname === l.to ? "bg-gold/10 text-charcoal" : "text-slate-muted hover:bg-muted",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 grid grid-cols-2 gap-2">
                <RegisterLink variant="outline">Get E-Pass</RegisterLink>
                <RegisterLink variant="gold">Book Stall</RegisterLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
