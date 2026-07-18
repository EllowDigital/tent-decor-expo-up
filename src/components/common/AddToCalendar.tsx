import { Calendar, ChevronDown, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  location?: string;
  start: string; // ISO with offset, e.g. "2026-08-30T09:00:00+05:30"
  end: string; // ISO with offset
  /** IANA timezone label surfaced in .ics (default Asia/Kolkata / IST). */
  timezone?: string;
  className?: string;
  variant?: "gold" | "outline" | "ghostLight";
  size?: "sm" | "md" | "lg";
  label?: string;
};

// Basic-format UTC stamp: YYYYMMDDTHHMMSSZ. Deterministic across devices —
// downstream calendars translate to the viewer's local zone.
function toBasicUtc(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function googleUrl(p: Props) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: p.title,
    // Google honours ctz — pin the intended zone so the imported event
    // displays in IST regardless of the user's local time.
    ctz: p.timezone ?? "Asia/Kolkata",
    dates: `${toBasicUtc(p.start)}/${toBasicUtc(p.end)}`,
    details: p.description ?? "",
    location: p.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function outlookUrl(p: Props) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: p.title,
    body: p.description ?? "",
    location: p.location ?? "",
    startdt: new Date(p.start).toISOString(),
    enddt: new Date(p.end).toISOString(),
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

// Static IST VTIMEZONE block (no DST in India).
const IST_VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Asia/Kolkata",
  "BEGIN:STANDARD",
  "DTSTART:19700101T000000",
  "TZOFFSETFROM:+0530",
  "TZOFFSETTO:+0530",
  "TZNAME:IST",
  "END:STANDARD",
  "END:VTIMEZONE",
].join("\r\n");

function icsBlobUrl(p: Props) {
  const tz = p.timezone ?? "Asia/Kolkata";
  const uid = `tentdecorexpo-${p.start}-${p.title.replace(/\s+/g, "-")}@tentdecorexpo.com`;
  const escape = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const parts = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tent Decor Expo UP//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-TIMEZONE:${tz}`,
    tz === "Asia/Kolkata" ? IST_VTIMEZONE : "",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toBasicUtc(new Date().toISOString())}`,
    // UTC times ensure identical absolute time on every device.
    `DTSTART:${toBasicUtc(p.start)}`,
    `DTEND:${toBasicUtc(p.end)}`,
    `SUMMARY:${escape(p.title)}`,
    p.description ? `DESCRIPTION:${escape(p.description)}` : "",
    p.location ? `LOCATION:${escape(p.location)}` : "",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return URL.createObjectURL(new Blob([parts.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
}

export function AddToCalendar(props: Props) {
  const { variant = "outline", size = "md", className, label = "Add to Calendar" } = props;
  const sizes = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-14 px-7 text-base",
  };
  const variants = {
    gold: "bg-gradient-gold text-charcoal shadow-gold hover:opacity-90",
    outline: "border border-gold text-charcoal hover:bg-gold/10 bg-transparent",
    ghostLight: "border border-white/30 text-white hover:bg-white/10 bg-transparent",
  };

  const downloadIcs = () => {
    const url = icsBlobUrl(props);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.title.replace(/\s+/g, "-")}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all whitespace-nowrap",
          sizes[size],
          variants[variant],
          className,
        )}
        aria-label={label}
      >
        <Calendar className="h-4 w-4" />
        {label}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem asChild>
          <a href={googleUrl(props)} target="_blank" rel="noopener noreferrer">
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={outlookUrl(props)} target="_blank" rel="noopener noreferrer">
            Outlook / Office 365
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => { e.preventDefault(); downloadIcs(); }}>
          <Download className="mr-2 h-4 w-4" />
          Apple / Download .ics
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
