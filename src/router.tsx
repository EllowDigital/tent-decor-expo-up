import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Prefetch route JS on hover/focus of any <Link>, dramatically reducing
    // navigation latency for CTAs like /registration, /visitors, /exhibitors.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
