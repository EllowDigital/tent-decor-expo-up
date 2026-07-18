import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Copy, Loader2, Ticket, ArrowUpRight } from "lucide-react";
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
import { REGISTER_URL } from "@/data/constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(120, "Email is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number"),
  city: z
    .string()
    .trim()
    .min(2, "Please enter your city")
    .max(60, "City is too long"),
  role: z
    .string()
    .trim()
    .min(2, "Please describe your role or business")
    .max(80, "Too long"),
});

type FormValues = z.infer<typeof schema>;

type Trigger = React.ReactElement;

type Props = {
  trigger: Trigger;
  eventName?: string;
  eventDate?: string;
  eventVenue?: string;
};

export function EpassDialog({ trigger, eventName, eventDate, eventVenue }: Props) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<{ code: string; name: string; email: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", phone: "", city: "", role: "" },
  });

  const onSubmit = async (values: FormValues) => {
    // Simulated processing — the official portal remains the source of truth.
    await new Promise((r) => setTimeout(r, 700));
    const code =
      "TDX-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Date.now().toString(36).slice(-4).toUpperCase();
    setDone({ code, name: values.name, email: values.email });
    toast.success("E-Pass request received", {
      description: "Check your email for confirmation. Save your reference code.",
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
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {!done ? (
          <>
            <DialogHeader className="p-6 pb-3 bg-pearl border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center">
                  <Ticket className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <DialogTitle className="font-display text-xl text-charcoal">
                    Get your Free E-Pass
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
                label="Full name"
                id="epass-name"
                error={form.formState.errors.name?.message}
              >
                <Input
                  id="epass-name"
                  autoComplete="name"
                  placeholder="e.g. Rakesh Verma"
                  aria-invalid={!!form.formState.errors.name}
                  {...form.register("name")}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Email"
                  id="epass-email"
                  error={form.formState.errors.email?.message}
                >
                  <Input
                    id="epass-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    aria-invalid={!!form.formState.errors.email}
                    {...form.register("email")}
                  />
                </Field>
                <Field
                  label="Mobile"
                  id="epass-phone"
                  error={form.formState.errors.phone?.message}
                >
                  <Input
                    id="epass-phone"
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
                  label="City"
                  id="epass-city"
                  error={form.formState.errors.city?.message}
                >
                  <Input
                    id="epass-city"
                    autoComplete="address-level2"
                    placeholder="e.g. Lucknow"
                    aria-invalid={!!form.formState.errors.city}
                    {...form.register("city")}
                  />
                </Field>
                <Field
                  label="Role / Business"
                  id="epass-role"
                  error={form.formState.errors.role?.message}
                >
                  <Input
                    id="epass-role"
                    placeholder="e.g. Wedding planner"
                    aria-invalid={!!form.formState.errors.role}
                    {...form.register("role")}
                  />
                </Field>
              </div>

              <p className="text-[11px] text-slate-muted leading-relaxed pt-1">
                By submitting you agree to receive event updates. Your details are only
                used to issue this E-Pass.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-gradient-gold text-charcoal shadow-gold hover:opacity-90 h-11 flex-1"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Issuing…
                    </>
                  ) : (
                    "Confirm E-Pass"
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
              You're on the list, {done.name.split(" ")[0]}.
            </h3>
            <p className="mt-2 text-sm text-slate-muted">
              A confirmation is on the way to{" "}
              <span className="text-charcoal font-medium">{done.email}</span>. Save
              your reference code for the venue.
            </p>

            <div className="mt-6 rounded-lg border border-border bg-pearl p-4 flex items-center justify-between gap-3">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-muted">
                  Reference
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
