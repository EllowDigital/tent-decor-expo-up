import { Link } from "@tanstack/react-router";
import { EDITIONS } from "@/data/constants";
import { Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Sticky bottom bar on mobile only. Surfaces the next upcoming edition and
 * a one-tap link into the Visitors profile page.
 */
export function MobileEventBar() {
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  if (!upcoming) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-white/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-3xl px-3 py-2.5 flex items-center gap-3">
        <Link
          to="/events/$year"
          params={{ year: upcoming.year }}
          className="flex items-center gap-2 min-w-0 flex-1"
          aria-label={`View ${upcoming.edition} in ${upcoming.city}`}
        >
          <span className="h-9 w-9 shrink-0 rounded-full bg-gradient-gold grid place-items-center">
            <Calendar className="h-4 w-4 text-charcoal" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-widest text-gold font-medium">Upcoming</span>
            <span className="block truncate text-xs font-medium text-charcoal">
              {upcoming.city} · {upcoming.dates}
            </span>
          </span>
        </Link>
        <Button
          asChild
          size="sm"
          className="shrink-0 bg-gradient-gold text-charcoal shadow-gold hover:opacity-90"
        >
          <Link to="/registration" aria-label="Register — Visitor or Exhibitor">
            <Ticket className="mr-1.5 h-4 w-4" /> Register
          </Link>
        </Button>
      </div>
    </div>
  );
}

