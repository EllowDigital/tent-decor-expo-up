import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { EDITIONS } from "@/data/constants";
import {
  PAGE_SEO,
  SITE_URL,
  abs,
  buildHead,
  validateHead,
  type SeoIssue,
} from "@/lib/seo";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/debug/seo")({
  head: () => ({
    meta: [
      { title: "SEO debug — Tent Decor Expo UP" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: SeoDebug,
});

type Row = {
  key: string;
  path: string;
  url: string;
  head: ReturnType<typeof buildHead>;
  issues: SeoIssue[];
};

function useRows(): Row[] {
  return useMemo(() => {
    const rows: Row[] = [];

    for (const [key, cfg] of Object.entries(PAGE_SEO)) {
      const head = buildHead(cfg);
      rows.push({
        key,
        path: cfg.path,
        url: abs(cfg.path),
        head,
        issues: validateHead(head, abs(cfg.path)),
      });
    }

    for (const e of EDITIONS) {
      const path = `/event/${e.slug}`;
      const url = abs(path);
      const title = `${e.city} ${e.year} · ${e.edition} — Tent Decor Expo UP`;
      const desc = `${e.edition} · ${e.dates} · ${e.venue}. ${e.summary}`;
      const head = buildHead({
        path,
        title,
        description: desc,
        image: e.cover,
        type: e.status === "upcoming" ? "website" : "article",
        extraJsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Event",
            name: `${e.edition} · ${e.city} ${e.year}`,
            startDate: e.startDate,
            endDate: e.endDate,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: e.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: e.city,
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
            },
            image: [abs(e.cover)],
            description: e.summary,
            url,
          },
        ],
      });
      rows.push({ key: `event:${e.slug}`, path, url, head, issues: validateHead(head, url) });
    }
    return rows;
  }, []);
}

function SeoDebug() {
  const rows = useRows();
  const errors = rows.filter((r) => r.issues.some((i) => i.level === "error")).length;
  const warns = rows.filter((r) => r.issues.some((i) => i.level === "warn")).length;
  const clean = rows.length - errors - warns;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
        SEO & structured-data validator
      </h1>
      <p className="mt-2 text-sm text-slate-muted">
        Site URL: <code className="rounded bg-muted px-1.5 py-0.5">{SITE_URL}</code> — set{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">VITE_SITE_URL</code> to override.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">
          {clean} clean
        </span>
        <span className="rounded-full bg-amber-100 text-amber-800 px-3 py-1">
          {warns} with warnings
        </span>
        <span className="rounded-full bg-rose-100 text-rose-800 px-3 py-1">
          {errors} with errors
        </span>
        <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1">
          {rows.length} routes
        </span>
      </div>

      <div className="mt-8 space-y-4">
        {rows.map((r) => (
          <RouteCard key={r.key} row={r} />
        ))}
      </div>
    </section>
  );
}

function RouteCard({ row }: { row: Row }) {
  const title = row.head.meta.find((m) => "title" in m)?.title;
  const desc = row.head.meta.find((m) => m.name === "description")?.content;
  const ogUrl = row.head.meta.find((m) => m.property === "og:url")?.content;
  const canonical = row.head.links.find((l) => l.rel === "canonical")?.href;
  const jsonLd = row.head.scripts
    .filter((s) => s.type === "application/ld+json")
    .map((s) => {
      try {
        return JSON.parse(s.children) as { "@type"?: string };
      } catch {
        return { "@type": "INVALID" };
      }
    });

  const errCount = row.issues.filter((i) => i.level === "error").length;
  const warnCount = row.issues.filter((i) => i.level === "warn").length;

  const badge =
    errCount > 0
      ? { text: `${errCount} error${errCount > 1 ? "s" : ""}`, cls: "bg-rose-100 text-rose-800" }
      : warnCount > 0
      ? { text: `${warnCount} warning${warnCount > 1 ? "s" : ""}`, cls: "bg-amber-100 text-amber-800" }
      : { text: "OK", cls: "bg-emerald-100 text-emerald-800" };

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <code className="text-sm font-medium text-charcoal">{row.path}</code>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.cls}`}>
              {badge.text}
            </span>
          </div>
          <Link
            to={row.path as "/"}
            className="mt-1 inline-block text-xs text-slate-muted hover:text-gold truncate"
          >
            {row.url}
          </Link>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <Field label="Title" value={title} />
        <Field label="Description" value={desc} />
        <Field label="og:url" value={ogUrl} mono />
        <Field label="canonical" value={canonical} mono />
      </dl>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-widest text-slate-muted">JSON-LD</p>
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {jsonLd.length === 0 && (
            <li className="text-xs text-slate-muted">— none —</li>
          )}
          {jsonLd.map((b, i) => (
            <li
              key={i}
              className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
            >
              {b["@type"] || "?"}
            </li>
          ))}
        </ul>
      </div>

      {row.issues.length > 0 && (
        <ul className="mt-4 space-y-1 border-t border-border pt-3 text-xs">
          {row.issues.map((i, idx) => (
            <li
              key={idx}
              className={
                i.level === "error" ? "text-rose-700" : "text-amber-700"
              }
            >
              <span className="font-semibold uppercase mr-1">{i.level}</span>
              {i.msg}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function Field({ label, value, mono }: { label: string; value?: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] uppercase tracking-widest text-slate-muted">{label}</dt>
      <dd
        className={`mt-1 truncate text-charcoal ${mono ? "font-mono text-xs" : ""}`}
        title={value}
      >
        {value || <span className="text-rose-600">missing</span>}
      </dd>
    </div>
  );
}
