import { createFileRoute, redirect } from "@tanstack/react-router";
import { EDITIONS } from "@/data/constants";

/**
 * Stable, discoverable URL for whichever edition is currently upcoming.
 * Redirects to /events/{year} for the next scheduled edition.
 */
export const Route = createFileRoute("/upcoming")({
  beforeLoad: () => {
    const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
    throw redirect({
      to: "/events/$year",
      params: { year: upcoming.slug },
      replace: true,
    });
  },
});
