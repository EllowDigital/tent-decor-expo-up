/**
 * Lazy wrappers for the E-Pass and Stall Booking dialogs.
 *
 * These dialogs are heavy: they pull in react-hook-form, @hookform/resolvers,
 * zod, sonner and the Radix Dialog surface. Only a small minority of visitors
 * actually open them, so we keep those modules out of the initial route
 * bundle and load them on first interaction.
 *
 * Behavior preserved:
 * - Trigger renders identically before load (same element the caller passed).
 * - Module is prefetched on hover / focus / touchstart to eliminate the
 *   click-to-open delay for anyone showing purchase intent.
 * - On the first click we import the real dialog and mount it with
 *   `defaultOpen`, so the user still gets the dialog on that same tap.
 */
import { cloneElement, lazy, Suspense, useCallback, useRef, useState } from "react";
import type { ComponentType, MouseEvent, ReactElement } from "react";

type SharedProps = {
  trigger: ReactElement<Record<string, unknown>>;
  eventName?: string;
  eventDate?: string;
  eventVenue?: string;
};

type WithDefaultOpen<P> = P & { defaultOpen?: boolean };

const EpassDialogLazy = lazy(() =>
  import("./EpassDialog").then((m) => ({ default: m.EpassDialog })),
);
const StallBookingDialogLazy = lazy(() =>
  import("./StallBookingDialog").then((m) => ({ default: m.StallBookingDialog })),
);

function useLazyDialog(prefetch: () => Promise<unknown>) {
  const [loaded, setLoaded] = useState(false);
  const prefetched = useRef(false);

  const doPrefetch = useCallback(() => {
    if (prefetched.current) return;
    prefetched.current = true;
    // Fire and forget — errors are swallowed; a later click will retry.
    prefetch().catch(() => {
      prefetched.current = false;
    });
  }, [prefetch]);

  const activate = useCallback(() => {
    doPrefetch();
    setLoaded(true);
  }, [doPrefetch]);

  return { loaded, doPrefetch, activate };
}

function LazyDialogShell<P extends SharedProps>({
  Component,
  props,
  prefetch,
}: {
  Component: ComponentType<WithDefaultOpen<P>>;
  props: P;
  prefetch: () => Promise<unknown>;
}) {
  const { loaded, doPrefetch, activate } = useLazyDialog(prefetch);

  if (loaded) {
    return (
      <Suspense fallback={null}>
        <Component {...(props as P & { defaultOpen?: boolean })} defaultOpen />
      </Suspense>
    );
  }

  const original = props.trigger;
  const originalProps = (original.props ?? {}) as {
    onClick?: (e: MouseEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
    onFocus?: (e: MouseEvent) => void;
    onTouchStart?: (e: MouseEvent) => void;
  };

  const trigger = cloneElement(original, {
    onClick: (e: MouseEvent) => {
      originalProps.onClick?.(e);
      if (!e.defaultPrevented) activate();
    },
    onMouseEnter: (e: MouseEvent) => {
      originalProps.onMouseEnter?.(e);
      doPrefetch();
    },
    onFocus: (e: MouseEvent) => {
      originalProps.onFocus?.(e);
      doPrefetch();
    },
    onTouchStart: (e: MouseEvent) => {
      originalProps.onTouchStart?.(e);
      doPrefetch();
    },
  });

  return trigger;
}

export function EpassDialog(props: SharedProps) {
  return (
    <LazyDialogShell
      Component={EpassDialogLazy}
      props={props}
      prefetch={() => import("./EpassDialog")}
    />
  );
}

export function StallBookingDialog(props: SharedProps) {
  return (
    <LazyDialogShell
      Component={StallBookingDialogLazy}
      props={props}
      prefetch={() => import("./StallBookingDialog")}
    />
  );
}
