import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, XCircle, Search, Loader2, Ticket, Calendar, MapPin, User, Mail, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EDITIONS, REGISTER_URL } from "@/data/constants";
import { EpassDialog } from "@/components/common/EpassDialog";

export const Route = createFileRoute("/epass-status")({
  head: () => ({
    meta: [
      { title: "E-Pass Status — Tent Decor Expo UP" },
      { name: "description", content: "Enter your E-Pass reference code to view your registration details and completion status for Tent Decor Expo UP." },
      { property: "og:title", content: "E-Pass Status — Tent Decor Expo UP" },
      { property: "og:description", content: "Look up your Tent Decor Expo UP E-Pass registration by reference code." },
      { property: "og:url", content: "/epass-status" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "E-Pass Status — Tent Decor Expo UP" },
      { name: "twitter:description", content: "Look up your Tent Decor Expo UP E-Pass registration." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/epass-status" }],
  }),
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

// Deterministic mock — same code always resolves the same way, so users can share/re-check.
function resolveCode(raw: string): Status {
  const code = raw.trim().toUpperCase();
  const upcoming = EDITIONS.find((e) => e.status === "upcoming") ?? EDITIONS[0];
  // Simple hash → decide found vs not-found deterministically.
  let h = 0;
  for (const ch of code) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const found = h % 5 !== 0; // ~80% pretend-found
  if (!found) return { state: "notfound", code };
  const issuedAt = new Date(Date.now() - (h % 14) * 86400000).toISOString();
  return { state: "found", code, edition: upcoming, issuedAt };
}

function EpassStatus() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const form = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { code: "" } });

  const onSubmit = async (v: FormValues) => {
    setStatus({ state: "checking" });
    await new Promise((r) => setTimeout(r, 700));
    setStatus(resolveCode(v.code));
  };

  return (
    <>
      <section className="relative py-20 sm:py-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">E-Pass Lookup</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05]">
            Check your <span className="text-gradient-gold">registration.</span>
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
            Enter the reference code you received when you requested your E-Pass.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="p-6 sm:p-8 border-border/60">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="epass-code" className="text-xs uppercase tracking-widest text-slate-muted">
                  Reference code
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="epass-code"
                    autoFocus
                    placeholder="TDX-XXXX-XXXX"
                    className="font-mono tracking-wider uppercase"
                    aria-invalid={!!form.formState.errors.code}
                    aria-describedby="code-help"
                    {...form.register("code")}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || status.state === "checking"}
                    className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-10 shrink-0"
                  >
                    {status.state === "checking" ? (
                      <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Checking</>
                    ) : (
                      <><Search className="mr-1.5 h-4 w-4" /> Check</>
                    )}
                  </Button>
                </div>
                {form.formState.errors.code ? (
                  <p role="alert" className="text-xs text-red-600">{form.formState.errors.code.message}</p>
                ) : (
                  <p id="code-help" className="text-xs text-slate-muted">
                    Codes look like <span className="font-mono">TDX-A1B2-C3D4</span>. It's in your confirmation email.
                  </p>
                )}
              </div>
            </form>
          </Card>

          <div role="status" aria-live="polite" className="mt-6">
            {status.state === "found" && (
              <Card className="p-6 border-2 border-gold shadow-gold">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gold/15 grid place-items-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-widest text-gold font-medium">Confirmed E-Pass</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-charcoal">
                      {status.edition.city} {status.edition.year}
                    </h2>
                    <p className="mt-1 text-sm text-slate-muted">{status.edition.edition}</p>
                    <dl className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                      <Detail icon={Ticket} label="Reference" value={<span className="font-mono">{status.code}</span>} />
                      <Detail icon={Calendar} label="Dates" value={status.edition.dates} />
                      <Detail icon={MapPin} label="Venue" value={status.edition.venue} />
                      <Detail
                        icon={User}
                        label="Issued"
                        value={new Date(status.issuedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      />
                    </dl>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <a
                        href={REGISTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md h-10 px-4 text-sm font-medium bg-gradient-gold text-charcoal shadow-gold hover:opacity-90"
                      >
                        View on portal <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <Button variant="outline" onClick={() => { form.reset(); setStatus({ state: "idle" }); }}>
                        Check another
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {status.state === "notfound" && (
              <Card className="p-6 border border-red-200 bg-red-50/50">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 grid place-items-center shrink-0">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-lg font-semibold text-charcoal">No registration found</h2>
                    <p className="mt-1 text-sm text-slate-muted">
                      We couldn't match <span className="font-mono text-charcoal">{status.code}</span>. Double-check the code in your confirmation email, or request a fresh E-Pass below.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <EpassDialog
                        trigger={
                          <Button className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-10">
                            <Ticket className="mr-1.5 h-4 w-4" /> Request new E-Pass
                          </Button>
                        }
                      />
                      <Button variant="outline" onClick={() => { form.reset(); setStatus({ state: "idle" }); }}>
                        Try again
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <p className="mt-10 text-center text-xs text-slate-muted">
            Lost your reference? Email <a href="mailto:info@tentdecorexpo.com" className="text-gold hover:underline"><Mail className="inline h-3 w-3 mr-0.5" />info@tentdecorexpo.com</a> with your registered mobile.
          </p>
        </div>
      </section>
    </>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Ticket; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-gold mt-0.5 shrink-0" />
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-slate-muted">{label}</dt>
        <dd className="text-charcoal font-medium truncate">{value}</dd>
      </div>
    </div>
  );
}
