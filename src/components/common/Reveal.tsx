import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Positive margin => trigger BEFORE the element scrolls into view, so
  // above-the-fold content (hero) reveals immediately on mount and below-fold
  // sections pre-animate slightly ahead of the scroll.
  const inView = useInView(ref, { once: true, margin: "200px 0px 200px 0px" });
  // Safety fallback: force-reveal after a short delay in case IntersectionObserver
  // hasn't fired yet (e.g. hydration timing, hidden ancestors during SSR).
  const [forced, setForced] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setForced(true), 600);
    return () => clearTimeout(t);
  }, []);
  const show = inView || forced;

  // Reduced motion: render children with no transform / no animation.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(prefersReducedMotion ? to : 0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (prefersReducedMotion) {
      count.set(to);
      return;
    }
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, to, count, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums inline-flex">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

