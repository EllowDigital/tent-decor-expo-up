import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Ticket, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
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
        // Always opaque enough for high-contrast text — no transparent state
        // (previous transparent state caused nav labels to disappear over light hero backgrounds).
        "fixed top-0 left-0 right-0 z-50 transition-shadow duration-300",
        "bg-white/95 backdrop-blur-xl border-b border-border/60",
        scrolled ? "shadow-soft" : "shadow-none",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Tent Decor Expo UP — Home">
            <Logo className={cn("w-auto transition-all", scrolled ? "h-9 sm:h-11" : "h-10 sm:h-14")} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to + "/"));
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                    active ? "text-charcoal" : "text-charcoal/70 hover:text-charcoal hover:bg-pearl",
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gradient-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="border-gold text-charcoal hover:bg-gold/10 h-10 px-4">
              <Link to="/visitors">
                <Ticket className="mr-1.5 h-4 w-4" /> Visitors
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-10 px-4">
              <Link to="/exhibitors">
                <Store className="mr-1.5 h-4 w-4" /> Exhibitors
              </Link>
            </Button>
          </div>


          <button
            className="lg:hidden p-2 rounded-md text-charcoal hover:bg-pearl"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-border shadow-elegant"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((l) => {
                const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to + "/"));
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      active ? "bg-gold/10 text-charcoal" : "text-charcoal/80 hover:bg-pearl",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="pt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="border-gold text-charcoal hover:bg-gold/10 w-full">
                  <Link to="/visitors">
                    <Ticket className="mr-1.5 h-4 w-4" /> Visitors
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 w-full">
                  <Link to="/exhibitors">
                    <Store className="mr-1.5 h-4 w-4" /> Exhibitors
                  </Link>
                </Button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
