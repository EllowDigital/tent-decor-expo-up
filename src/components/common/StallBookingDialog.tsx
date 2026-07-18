import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Copy, Loader2, Store, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { INDUSTRY_CATEGORIES, REGISTER_URL } from "@/data/constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  company: z.string().trim().min(2, "Enter your company or brand").max(120, "Too long"),
  contact: z.string().trim().min(2, "Enter the contact person's name").max(80, "Too long"),
  email: z.string().trim().email("Enter a valid email").max(120, "Too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number"),
  city: z.string().trim().min(2, "Enter your city").max(60, "Too long"),
  category: z.string().min(1, "Select a category"),
  stallSize: z.string().min(1, "Select a stall size"),
  notes: z.string().trim().max(500, "Please keep notes under 500 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

const STALL_SIZES = [
  "3x3 m — Standard",
  "3x6 m — Premium",
  "6x6 m — Corner",
  "9x9 m — Pavilion",
  "Custom (contact us)",
];

type Props = {
  trigger: React.ReactElement;
  eventName?: string;
  eventDate?: string;
  eventVenue?: string;
  /** Open immediately on mount. Used by the lazy loader to preserve first-click UX. */
  defaultOpen?: boolean;
};

export function StallBookingDialog({
  trigger,
  eventName,
  eventDate,
  eventVenue,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [done, setDone] = useState<{ code: string; company: string; email: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      company: "",
      contact: "",
      email: "",
      phone: "",
      city: "",
      category: "",
      stallSize: "",
      notes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    const code =
      "STL-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Date.now().toString(36).slice(-4).toUpperCase();
    setDone({ code, company: values.company, email: values.email });
    toast.success("Stall booking request received", {
      description: "Our team will confirm availability within 48 hours.",
    });
  };

  const reset = () => {
    setDone(null);
    form.reset();
  };

  const copyCode = async () => {
    if (!done) return;
    try {
      await navigator.clipboard.writeText(done.code);
      toast.success("Reference code copied");
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 300);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden max-h-[90dvh] overflow-y-auto">
        {!done ? (
          <>
            <DialogHeader className="p-6 pb-3 bg-pearl border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center">
                  <Store className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <DialogTitle className="font-display text-xl text-charcoal">
                    Book Your Stall
                  </DialogTitle>
                  <DialogDescription className="text-xs mt-0.5">
                    {eventName ? `${eventName} · ` : ""}
                    {eventDate ?? ""}
                    {eventVenue ? ` · ${eventVenue}` : ""}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4" noValidate>
              <Field
                label="Company / Brand"
                id="stall-company"
                error={form.formState.errors.company?.message}
              >
                <Input
                  id="stall-company"
                  autoComplete="organization"
                  placeholder="e.g. Verma Tent House"
                  aria-invalid={!!form.formState.errors.company}
                  {...form.register("company")}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Contact person"
                  id="stall-contact"
                  error={form.formState.errors.contact?.message}
                >
                  <Input
                    id="stall-contact"
                    autoComplete="name"
                    placeholder="Full name"
                    aria-invalid={!!form.formState.errors.contact}
                    {...form.register("contact")}
                  />
                </Field>
                <Field label="City" id="stall-city" error={form.formState.errors.city?.message}>
                  <Input
                    id="stall-city"
                    autoComplete="address-level2"
                    placeholder="e.g. Kanpur"
                    aria-invalid={!!form.formState.errors.city}
                    {...form.register("city")}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" id="stall-email" error={form.formState.errors.email?.message}>
                  <Input
                    id="stall-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    aria-invalid={!!form.formState.errors.email}
                    {...form.register("email")}
                  />
                </Field>
                <Field label="Mobile" id="stall-phone" error={form.formState.errors.phone?.message}>
                  <Input
                    id="stall-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit number"
                    aria-invalid={!!form.formState.errors.phone}
                    {...form.register("phone")}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Category"
                  id="stall-category"
                  error={form.formState.errors.category?.message}
                >
                  <select
                    id="stall-category"
                    aria-invalid={!!form.formState.errors.category}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...form.register("category")}
                  >
                    <option value="">Select category…</option>
                    {INDUSTRY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Stall size"
                  id="stall-size"
                  error={form.formState.errors.stallSize?.message}
                >
                  <select
                    id="stall-size"
                    aria-invalid={!!form.formState.errors.stallSize}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...form.register("stallSize")}
                  >
                    <option value="">Select size…</option>
                    {STALL_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="Notes (optional)"
                id="stall-notes"
                error={form.formState.errors.notes?.message}
              >
                <Textarea
                  id="stall-notes"
                  rows={3}
                  placeholder="Preferred hall, power requirements, corner preference, etc."
                  aria-invalid={!!form.formState.errors.notes}
                  {...form.register("notes")}
                />
              </Field>

              <p className="text-[11px] text-slate-muted leading-relaxed pt-1">
                Submitting reserves your interest. Final allotment and payment are confirmed via the
                official portal.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-11 flex-1"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Request Stall"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-6 sm:p-8 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-gold/15 grid place-items-center">
              <CheckCircle2 className="h-7 w-7 text-gold" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-charcoal">
              Request received, {done.company}.
            </h3>
            <p className="mt-2 text-sm text-slate-muted">
              Our exhibitor team will email{" "}
              <span className="text-charcoal font-medium">{done.email}</span> within 48 hours to
              confirm availability and next steps.
            </p>

            <div className="mt-6 rounded-lg border border-border bg-pearl p-4 flex items-center justify-between gap-3">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-muted">
                  Booking reference
                </p>
                <p className="font-mono text-lg font-semibold text-charcoal tracking-wider">
                  {done.code}
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={copyCode} className="shrink-0">
                <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
              </Button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md h-11 px-5 text-sm font-medium",
                  "bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 flex-1",
                )}
              >
                Complete on portal <ArrowUpRight className="h-4 w-4" />
              </a>
              <Button variant="outline" onClick={() => setOpen(false)} className="h-11">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs uppercase tracking-widest text-slate-muted">
        {label}
      </Label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
