import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Facebook, Instagram, Linkedin, Loader2, Mail, MapPin, Phone, Youtube, Send } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTACT, FAQS } from "@/data/constants";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tent Decor Expo UP" },
      { name: "description", content: "Reach the Kanpur 2026 team — phone, email, venue and social. FAQs answered." },
      { property: "og:title", content: "Contact — Tent Decor Expo UP" },
      { property: "og:description", content: "Get in touch with the Tent Decor Expo UP team." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});
type FormT = z.infer<typeof schema>;

function Contact() {
  return (
    <>
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-gold blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">Get in Touch</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-white leading-[1.02]">
            Let's <span className="text-gradient-gold">talk business.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg">Whether it's a stall enquiry or press access — the team is here.</p>
        </div>
      </section>

      {/* Floating contact cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: Phone, label: "Call", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
            { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
            { icon: MapPin, label: "Venue", value: CONTACT.venue },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <Card className="p-8 glass-card hover-lift">
                <div className="h-14 w-14 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                  <c.icon className="h-6 w-6 text-charcoal" />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-muted">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="mt-2 font-display text-xl text-charcoal hover:text-gold transition-colors block">{c.value}</a>
                ) : (
                  <p className="mt-2 font-display text-xl text-charcoal">{c.value}</p>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full overflow-hidden border-border/60 min-h-[420px]">
              <iframe
                title="Sanskar Lawn, Kanpur"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.32%2C26.44%2C80.36%2C26.48&layer=mapnik&marker=26.46%2C80.34"
                className="h-full w-full min-h-[420px] border-0"
                loading="lazy"
              />
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Answers, before you ask." />
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border border-border/60 rounded-xl px-6 bg-white hover-lift">
                <AccordionTrigger className="text-left font-display text-lg text-charcoal hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-muted leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">Follow the movement</p>
            <div className="mt-6 flex justify-center gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((I, j) => (
                <a key={j} href="#" aria-label="social" className="h-12 w-12 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                  <I className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<FormT>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const onSubmit = async (data: FormT) => {
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent!", { description: `We'll reply to ${data.email} shortly.` });
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <Card className="p-8 lg:p-10 border-border/60 h-full">
      <h2 className="font-display text-3xl font-bold text-charcoal">Send us a message</h2>
      <p className="mt-2 text-slate-muted">Typical response time: under 24 business hours.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-slate-muted">Name</Label>
            <Input {...form.register("name")} placeholder="Your name" />
            {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-slate-muted">Email</Label>
            <Input type="email" {...form.register("email")} placeholder="you@company.in" />
            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-slate-muted">Subject</Label>
          <Input {...form.register("subject")} placeholder="How can we help?" />
          {form.formState.errors.subject && <p className="text-xs text-destructive">{form.formState.errors.subject.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-slate-muted">Message</Label>
          <Textarea rows={6} {...form.register("message")} placeholder="Tell us more…" />
          {form.formState.errors.message && <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-12 bg-gradient-gold text-charcoal shadow-gold">
          {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</> : sent ? "Sent ✓" : <>Send message <Send className="ml-2 h-4 w-4" /></>}
        </Button>
      </form>
    </Card>
  );
}
