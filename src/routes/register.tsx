import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Ticket, Store } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { INDUSTRY_CATEGORIES } from "@/data/constants";
import { Reveal } from "@/components/common/Reveal";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Tent Decor Expo UP" },
      { name: "description", content: "Generate your free visitor E-Pass or request an exhibitor stall booking for Kanpur 2026." },
      { property: "og:title", content: "Register for Kanpur 2026" },
      { property: "og:description", content: "Free visitor E-Pass or exhibitor stall booking — reserve your spot at the 4th Mahadhiveshan." },
    ],
  }),
  component: Register,
});

const visitorSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  mobile: z.string().trim().regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().trim().min(2, "City is required").max(80),
  category: z.string().min(1, "Please select a category"),
});
const exhibitorSchema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(120),
  contact: z.string().trim().min(2, "Contact person is required").max(100),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  category: z.string().min(1, "Please select a category"),
  stallSize: z.string().min(1, "Please select a stall size"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
type VisitorForm = z.infer<typeof visitorSchema>;
type ExhibitorForm = z.infer<typeof exhibitorSchema>;

function Register() {
  return (
    <>
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <Logo className="h-14 w-auto" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Register for <span className="text-gradient-gold">Kanpur 2026</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Two paths to the show floor — free visitor pass, or your very own exhibitor stall.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <VisitorCard />
          </Reveal>
          <Reveal delay={0.1}>
            <ExhibitorCard />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function VisitorCard() {
  const [done, setDone] = useState(false);
  const form = useForm<VisitorForm>({
    resolver: zodResolver(visitorSchema),
    defaultValues: { name: "", mobile: "", email: "", city: "", category: "" },
  });

  const onSubmit = async (data: VisitorForm) => {
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Your E-Pass has been generated!", { description: `A confirmation was sent to ${data.email}.` });
    setDone(true);
  };

  return (
    <Card className="p-8 lg:p-10 border-border/60 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
          <Ticket className="h-5 w-5 text-charcoal" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Visitor</p>
          <h2 className="font-display text-2xl font-bold text-charcoal">Free E-Pass Registration</h2>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="h-20 w-20 mx-auto rounded-full bg-gradient-gold grid place-items-center shadow-gold"
            >
              <Check className="h-10 w-10 text-charcoal" strokeWidth={3} />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-charcoal">You're in!</h3>
            <p className="mt-2 text-slate-muted">Your E-Pass has been sent to your email. See you at Sanskar Lawn.</p>
            <Button variant="outline" className="mt-6" onClick={() => { form.reset(); setDone(false); }}>Register another</Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Field label="Full Name" error={form.formState.errors.name?.message}>
              <Input {...form.register("name")} placeholder="Aarav Sharma" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Mobile" error={form.formState.errors.mobile?.message}>
                <Input {...form.register("mobile")} placeholder="+91 98765 43210" />
              </Field>
              <Field label="City" error={form.formState.errors.city?.message}>
                <Input {...form.register("city")} placeholder="Lucknow" />
              </Field>
            </div>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input type="email" {...form.register("email")} placeholder="you@company.in" />
            </Field>
            <Field label="Business Category" error={form.formState.errors.category?.message}>
              <Select onValueChange={(v) => form.setValue("category", v, { shouldValidate: true })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {INDUSTRY_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-12 bg-gradient-gold text-charcoal shadow-gold">
              {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating…</> : "Generate Free E-Pass"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ExhibitorCard() {
  const [done, setDone] = useState(false);
  const form = useForm<ExhibitorForm>({
    resolver: zodResolver(exhibitorSchema),
    defaultValues: { company: "", contact: "", phone: "", email: "", category: "", stallSize: "", message: "" },
  });

  const onSubmit = async (data: ExhibitorForm) => {
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Stall booking request submitted!", { description: `We'll be in touch with ${data.contact} within 24 hours.` });
    setDone(true);
  };

  return (
    <Card className="p-8 lg:p-10 border-2 border-gold bg-white shadow-gold relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-charcoal grid place-items-center">
          <Store className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Exhibitor</p>
          <h2 className="font-display text-2xl font-bold text-charcoal">Stall Booking Request</h2>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
              className="h-20 w-20 mx-auto rounded-full bg-gradient-gold grid place-items-center shadow-gold"
            >
              <Check className="h-10 w-10 text-charcoal" strokeWidth={3} />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-charcoal">Request received.</h3>
            <p className="mt-2 text-slate-muted">Our exhibitor team will reach out within one business day.</p>
            <Button variant="outline" className="mt-6" onClick={() => { form.reset(); setDone(false); }}>Submit another</Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Company" error={form.formState.errors.company?.message}>
                <Input {...form.register("company")} placeholder="Your company" />
              </Field>
              <Field label="Contact Person" error={form.formState.errors.contact?.message}>
                <Input {...form.register("contact")} placeholder="Full name" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone" error={form.formState.errors.phone?.message}>
                <Input {...form.register("phone")} placeholder="+91 98765 43210" />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input type="email" {...form.register("email")} placeholder="you@company.in" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Product Category" error={form.formState.errors.category?.message}>
                <Select onValueChange={(v) => form.setValue("category", v, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Desired Stall Size" error={form.formState.errors.stallSize?.message}>
                <Select onValueChange={(v) => form.setValue("stallSize", v, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                  <SelectContent>
                    {["9 sqm (3×3)", "18 sqm (6×3)", "36 sqm (6×6)", "54 sqm (9×6)", "Custom / Premium"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Message (optional)" error={form.formState.errors.message?.message}>
              <Textarea {...form.register("message")} rows={4} placeholder="Tell us about your products and any special requirements." />
            </Field>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-12 bg-charcoal text-gold hover:bg-charcoal/90">
              {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</> : "Request Stall Booking"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-widest text-slate-muted">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
