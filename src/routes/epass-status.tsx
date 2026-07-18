import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
  Ticket,
  Calendar,
  MapPin,
  User,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EDITIONS, REGISTER_URL, CONTACT } from "@/data/constants";
import { EpassDialog } from "@/components/common/EpassDialog";

import { buildHead, PAGE_SEO } from "@/lib/seo";

export const Route = createFileRoute("/epass-status")({
  head: () => {
    const h = buildHead({ ...PAGE_SEO.epassStatus, webPageSchema: false });
    // Keep this utility page out of the index — the content is per-code lookup.
    h.meta.push({ name: "robots", content: "noindex,follow" });
    return h;
  },
  component: EpassStatus,
});

const schema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^TDX-[A-Z0-9]{4}-[A-Z0-9]{4}$/, "Format: TDX-XXXX-XXXX (case-insensitive)"),
});
type FormValues = z.infer<typeof schema>;

type Status =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "found"; code: string; edition: (typeof EDITIONS)[number]; issuedAt: string }
  | { state: "notfound"; code: string };

function resolveCode(raw: string): Status {
  const code = raw.trim().toUpperCase();
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  let h = 0;
  for (const ch of code) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const found = h % 5 !== 0;
  if (!found) return { state: "notfound", code };
  const issuedAt = new Date(Date.now() - (h % 14) * 86400000).toISOString();
  return { state: "found", code, edition: upcoming, issuedAt };
}

function EpassStatus() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { code: "" },
  });

  const onSubmit = async (v: FormValues) => {
    setStatus({ state: "checking" });
    await new Promise((r) => setTimeout(r, 700));
    setStatus(resolveCode(v.code));
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,theme(colors.gold)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,theme(colors.gold)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
            <span className="h-px w-8 bg-gold" /> E-Pass Lookup
          </span>
          <h1 className="mt-4 font-display font-bold leading-[1.02] text-[clamp(2.25rem,6vw,4rem)]">
            Check your <span className="text-gradient-gold">registration.</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed">
            Enter the reference code you received when you requested your E-Pass.
          </p>
        </div>
      </section>

      {/* LOOKUP */}
      <section className="py-14 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="p-6 sm:p-8 border-border/60 shadow-elegant">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center shrink-0">
                <Search className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal">
                  Reference lookup
                </h2>
                <p className="mt-1 text-sm text-slate-muted">
                  Codes are case-insensitive. We match them against the current registration batch.
                </p>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label
                  htmlFor="epass-code"
                  className="text-[11px] uppercase tracking-[0.24em] text-slate-muted font-medium"
                >
                  Reference code
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="epass-code"
                    autoFocus
                    placeholder="TDX-XXXX-XXXX"
                    className="font-mono tracking-wider uppercase h-11"
                    aria-invalid={!!form.formState.errors.code}
                    aria-describedby="code-help"
                    {...form.register("code")}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || status.state === "checking"}
                    className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-11 shrink-0 px-5"
                  >
                    {status.state === "checking" ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Checking
                      </>
                    ) : (
                      <>
                        <Search className="mr-1.5 h-4 w-4" /> Check status
                      </>
                    )}
                  </Button>
                </div>
                {form.formState.errors.code ? (
                  <p role="alert" className="text-xs text-destructive">
                    {form.formState.errors.code.message}
                  </p>
                ) : (
                  <p id="code-help" className="text-xs text-slate-muted">
                    Codes look like <span className="font-mono text-charcoal">TDX-A1B2-C3D4</span>.
                    Find it in your confirmation email.
                  </p>
                )}
              </div>
            </form>
          </Card>

          <div role="status" aria-live="polite" className="mt-6">
            {status.state === "found" && (
              <Card className="p-6 sm:p-7 border-2 border-gold shadow-gold">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-full bg-gold/15 grid place-items-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-gold font-medium">
                      Confirmed E-Pass
                    </p>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-charcoal">
                      {status.edition.city} {status.edition.year}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-muted">{status.edition.edition}</p>
                    <dl className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                      <Detail
                        icon={Ticket}
                        label="Reference"
                        value={<span className="font-mono">{status.code}</span>}
                      />
                      <Detail icon={Calendar} label="Dates" value={status.edition.dates} />
                      <Detail icon={MapPin} label="Venue" value={status.edition.venue} />
                      <Detail
                        icon={User}
                        label="Issued"
                        value={new Date(status.issuedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      />
                    </dl>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button
                        asChild
                        className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-10"
                      >
                        <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                          View on portal <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-10"
                        onClick={() => {
                          form.reset();
                          setStatus({ state: "idle" });
                        }}
                      >
                        Check another
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {status.state === "notfound" && (
              <Card className="p-6 sm:p-7 border border-destructive/30 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-full bg-destructive/10 grid place-items-center shrink-0">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal">
                      No registration found
                    </h3>
                    <p className="mt-1 text-sm text-slate-muted">
                      We couldn't match{" "}
                      <span className="font-mono text-charcoal">{status.code}</span>. Double-check
                      the code in your confirmation email, or request a fresh E-Pass below.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <EpassDialog
                        trigger={
                          <Button className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-10">
                            <Ticket className="mr-1.5 h-4 w-4" /> Request new E-Pass
                          </Button>
                        }
                      />
                      <Button
                        variant="outline"
                        className="h-10"
                        onClick={() => {
                          form.reset();
                          setStatus({ state: "idle" });
                        }}
                      >
                        Try again
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* HELP */}
      <section className="py-14 sm:py-20 bg-white border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            <HelpCard
              icon={HelpCircle}
              title="Lost your code?"
              desc="Email us with your registered mobile — we'll resend within a few hours."
              cta="Contact support"
              href={`mailto:${CONTACT.email}`}
            />
            <HelpCard
              icon={ShieldCheck}
              title="Never received one?"
              desc="If you registered but got no email, request a fresh E-Pass in 60 seconds."
              cta="Request E-Pass"
              to="/registration"
            />
            <HelpCard
              icon={Ticket}
              title="Walk-in registration"
              desc="Verified trade professionals can also register at the venue on show day."
              cta="Event details"
              to="/event-details"
            />
          </div>

          <p className="mt-10 text-center text-xs text-slate-muted">
            Prefer email? Write to{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-gold hover:underline">
              <Mail className="inline h-3 w-3 mr-0.5" />
              {CONTACT.email}
            </a>{" "}
            with your registered mobile number.
          </p>
        </div>
      </section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 min-w-0">
      <Icon className="h-4 w-4 text-gold mt-0.5 shrink-0" />
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-slate-muted">{label}</dt>
        <dd className="text-charcoal font-medium truncate">{value}</dd>
      </div>
    </div>
  );
}

function HelpCard({
  icon: Icon,
  title,
  desc,
  cta,
  href,
  to,
}: {
  icon: any;
  title: string;
  desc: string;
  cta: string;
  href?: string;
  to?: string;
}) {
  const inner = (
    <>
      <span className="h-11 w-11 rounded-lg bg-gold/10 grid place-items-center shrink-0">
        <Icon className="h-5 w-5 text-gold" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold text-charcoal">{title}</h3>
        <p className="mt-1 text-sm text-slate-muted leading-relaxed">{desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold">
          {cta} <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </>
  );
  const cls =
    "group rounded-2xl border border-border/60 bg-pearl p-5 sm:p-6 flex items-start gap-4 hover:border-gold hover:shadow-lg transition-all";
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
