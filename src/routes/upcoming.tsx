import { createFileRoute, redirect } from "@tanstack/react-router";
import { EDITIONS, CURRENT_EVENT_ID } from "@/data/constants";

/**
 * Stable, discoverable URL for whichever edition is currently active.
 * Reads siteConfig.currentEventId — change that one value each year.
 */
export const Route = createFileRoute("/upcoming")({
  beforeLoad: () => {
    const upcoming =
      EDITIONS.find((e) => e.slug === CURRENT_EVENT_ID) ??
      EDITIONS.find((e) => e.status === "upcoming") ??
      EDITIONS[0];
    throw redirect({
      to: "/event/$slug",
      params: { slug: upcoming.slug },
      replace: true,
    });
  },
});
