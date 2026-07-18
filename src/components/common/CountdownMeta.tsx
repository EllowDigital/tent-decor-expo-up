import { Clock } from "lucide-react";

type Props = {
  startISO: string;
  endISO?: string;
  timezone?: string;
  className?: string;
  tone?: "light" | "dark";
};

function fmt(iso: string, tz?: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: tz,
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleString();
  }
}

function tzShort(tz?: string) {
  if (!tz) return "";
  try {
    const parts = new Intl.DateTimeFormat("en-IN", {
      timeZone: tz,
      timeZoneName: "short",
    }).formatToParts(new Date());
    return parts.find((p) => p.type === "timeZoneName")?.value ?? tz;
  } catch {
    return tz;
  }
}

/**
 * Small label shown near countdown timers so users know exactly what the timer
 * refers to: when the event starts, when it ends, and in which timezone.
 */
export function CountdownMeta({ startISO, endISO, timezone, className, tone = "light" }: Props) {
  const base = tone === "light" ? "text-white/70" : "text-slate-muted";
  const strong = tone === "light" ? "text-white" : "text-charcoal";
  const tz = tzShort(timezone);
  return (
    <div
      className={
        "inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm " +
        base +
        (className ? " " + className : "")
      }
      role="note"
      aria-label="Countdown reference"
    >
      <Clock className="h-3.5 w-3.5 opacity-70" aria-hidden />
      <span>
        Counting down to <span className={"font-medium " + strong}>{fmt(startISO, timezone)}</span>
      </span>
      {endISO && (
        <>
          <span className="opacity-40">·</span>
          <span>
            Ends <span className={"font-medium " + strong}>{fmt(endISO, timezone)}</span>
          </span>
        </>
      )}
      {tz && (
        <>
          <span className="opacity-40">·</span>
          <span className="uppercase tracking-widest text-[10px] sm:text-[11px]">{tz}</span>
        </>
      )}
    </div>
  );
}
