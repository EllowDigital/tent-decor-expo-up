import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Ticket, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/data/constants";
import { cn } from "@/lib/utils";

type NavChild = { label: string; to: string; description?: string };
type NavItem = { label: string; to: string; children?: readonly NavChild[] };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setOpenMobileGroup(null);
  }, [pathname]);

  const items = NAV_LINKS as readonly NavItem[];

  const isActive = (to: string) =>
    pathname === to || (to !== "/" && pathname.startsWith(to + "/"));

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
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
            {items.map((l) => {
              const active = isActive(l.to) || (l.children?.some((c) => isActive(c.to)) ?? false);
              if (l.children) {
                const menuOpen = openMenu === l.label;
                return (
                  <div
                    key={l.to}
                    className="relative"
                    onMouseEnter={() => { cancelClose(); setOpenMenu(l.label); }}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={menuOpen}
                      onClick={() => setOpenMenu(menuOpen ? null : l.label)}
                      className={cn(
                        "relative inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                        active ? "text-charcoal" : "text-charcoal/70 hover:text-charcoal hover:bg-pearl",
                      )}
                    >
                      {l.label}
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menuOpen && "rotate-180")} />
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-3 right-6 -bottom-0.5 h-[2px] bg-gradient-gold rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {menuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          role="menu"
                          className="absolute right-0 mt-2 w-80 rounded-xl border border-border/60 bg-white shadow-elegant p-2"
                        >
                          {l.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              role="menuitem"
                              className={cn(
                                "block rounded-lg px-3 py-2.5 transition-colors",
                                isActive(c.to) ? "bg-gold/10" : "hover:bg-pearl",
                              )}
                            >
                              <span className="block text-sm font-medium text-charcoal">{c.label}</span>
                              {c.description && (
                                <span className="mt-0.5 block text-xs text-charcoal/60 leading-snug">{c.description}</span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
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
            <Button asChild size="sm" className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-10 px-5">
              <Link to="/registration">
                <Ticket className="mr-1.5 h-4 w-4" /> Register
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
            className="lg:hidden bg-white border-b border-border shadow-elegant max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">
              {items.map((l) => {
                const active = isActive(l.to) || (l.children?.some((c) => isActive(c.to)) ?? false);
                if (l.children) {
                  const isOpen = openMobileGroup === l.label;
                  return (
                    <div key={l.to} className="rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(isOpen ? null : l.label)}
                        aria-expanded={isOpen}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors",
                          active ? "bg-gold/10 text-charcoal" : "text-charcoal/80 hover:bg-pearl",
                        )}
                      >
                        {l.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                      </button>
                      {isOpen && (
                        <div className="pb-2 pl-2">
                          {l.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              className={cn(
                                "block px-4 py-2.5 rounded-md text-sm transition-colors",
                                isActive(c.to) ? "bg-gold/10 text-charcoal" : "text-charcoal/70 hover:bg-pearl",
                              )}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
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
              <div className="pt-3">
                <Button asChild className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 w-full">
                  <Link to="/registration">
                    <Ticket className="mr-1.5 h-4 w-4" /> Register — Visitor or Exhibitor
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
