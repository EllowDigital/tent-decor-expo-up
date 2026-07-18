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
      {/* Simple hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-14 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">Get in touch</span>
          <h1 className="mt-3 font-display font-bold text-charcoal leading-[1.05] text-[clamp(2rem,5vw,3.5rem)]">
            Let's <span className="text-gradient-gold">talk business.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-muted text-base sm:text-lg">
            Stall enquiries, press access, sponsorship — the team responds within 24 business hours.
          </p>
        </div>
      </section>

      {/* Form + Info & Map */}
      <section className="py-12 sm:py-16 lg:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: contact form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* RIGHT: info cards + map */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 sm:gap-5 h-full">
              {[
                { icon: Phone, label: "Call", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
                { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: MapPin, label: "Venue", value: CONTACT.venue },
              ].map((c) => (
                <Card key={c.label} className="p-5 sm:p-6 border-border/60 flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
                    <c.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-slate-muted font-medium">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-1 font-display text-base sm:text-lg text-charcoal hover:text-gold transition-colors block truncate">{c.value}</a>
                    ) : (
                      <p className="mt-1 font-display text-base sm:text-lg text-charcoal leading-snug">{c.value}</p>
                    )}
                  </div>
                </Card>
              ))}
              <Card className="flex-1 overflow-hidden border-border/60 min-h-64">
                <iframe
                  title="Sanskar Lawn, Kanpur"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.32%2C26.44%2C80.36%2C26.48&layer=mapnik&marker=26.46%2C80.34"
                  className="h-full w-full min-h-64 lg:min-h-full border-0"
                  loading="lazy"
                />
              </Card>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Answers, before you ask." />
          <Accordion type="single" collapsible className="mt-10 sm:mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border border-border/60 rounded-xl px-5 sm:px-6 bg-white">
                <AccordionTrigger className="text-left font-display text-base sm:text-lg text-charcoal hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-muted leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-medium">Follow the movement</p>
            <div className="mt-5 flex justify-center gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((I, j) => (
                <a key={j} href="#" aria-label="social" className="h-11 w-11 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
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
