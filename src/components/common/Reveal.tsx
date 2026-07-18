import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="tabular-nums"
    >
      {inView ? <AnimatedNumber to={to} /> : 0}
      {suffix}
    </motion.span>
  );
}

function AnimatedNumber({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <motion.span
      ref={ref}
      initial={{ innerText: "0" }}
      animate={{ innerText: to.toString() }}
      transition={{ duration: 2, ease: "easeOut" }}
      onUpdate={(v) => {
        if (ref.current) {
          const n = Math.round(parseFloat(String(v.innerText)) || 0);
          ref.current.innerText = n.toLocaleString();
        }
      }}
    />
  );
}
