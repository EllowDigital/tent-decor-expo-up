import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Send,
  Clock,
  MessageSquare,
  Building2,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT, FAQS, SOCIAL_LINKS } from "@/data/constants";
import { buildHead, PAGE_SEO, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildHead({
      ...PAGE_SEO.contact,
      extraJsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
        faqJsonLd(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
      ],
    }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  topic: z.string().min(1, "Choose a topic"),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Min. 10 characters").max(1000),
});
type FormT = z.infer<typeof schema>;

const TOPICS = [
  "Visitor / E-Pass",
  "Exhibitor / Stall booking",
  "Sponsorship",
  "Press & Media",
  "Partnership",
  "General enquiry",
];

const STATS = [
  { k: "6,000+", v: "Members" },
  { k: "24 hrs", v: "Response time" },
  { k: "12+", v: "Cities" },
  { k: "Mon–Sat", v: "10:00 – 18:00 IST" },
];

function Contact() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,theme(colors.gold)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,theme(colors.gold)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 lg:gap-12 items-end">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
                <span className="h-px w-8 bg-gold" /> Contact
              </span>
              <h1 className="mt-4 font-display font-bold leading-[1.02] text-[clamp(2.25rem,6vw,4.5rem)]">
                Let's <span className="text-gradient-gold">talk business.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed">
                Stall enquiries, press access, sponsorship — the Tent Decor Expo UP secretariat
                responds within 24 business hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-11 px-5 bg-gradient-gold text-charcoal shadow-gold">
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-2 h-4 w-4" /> Call now
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-5 border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {STATS.map((s) => (
              <div key={s.v} className="bg-charcoal p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold">{s.k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT CARDS ============ */}
      <section className="py-14 sm:py-20 bg-pearl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <CopyCard
              icon={Phone}
              label="Call the office"
              value={CONTACT.phone}
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              cta="Dial"
            />
            <CopyCard
              icon={Mail}
              label="Email us"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              cta="Compose"
            />
            <CopyCard
              icon={MapPin}
              label="Visit the venue"
              value={CONTACT.venue}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                CONTACT.venue,
              )}`}
              cta="Directions"
              external
            />
          </div>
        </div>
      </section>

      {/* ============ FORM + MAP ============ */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: form */}
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* RIGHT: map + hours */}
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-4 sm:gap-5">
                  <Card className="overflow-hidden border-border/60 p-0">
                    <div className="aspect-[4/3] w-full">
                      <iframe
                        title="Sanskar Lawn, Kanpur"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=80.32%2C26.44%2C80.36%2C26.48&layer=mapnik&marker=26.46%2C80.34"
                        className="h-full w-full border-0"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 border-t border-border/60 flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-display text-base text-charcoal">{CONTACT.venue}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            CONTACT.venue,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center text-sm text-gold hover:underline"
                        >
                          Open in Google Maps
                          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 sm:p-6 border-border/60">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-muted font-medium">
                          Office hours
                        </p>
                        <p className="mt-1 font-display text-base text-charcoal">
                          Monday – Saturday · 10:00 – 18:00 IST
                        </p>
                        <p className="mt-0.5 text-sm text-slate-muted">
                          Closed on Sundays & national holidays.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 sm:p-6 border-border/60">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-muted font-medium">
                          Secretariat
                        </p>
                        <p className="mt-1 font-display text-base text-charcoal">
                          Tent, Caterers & Decorators Welfare Association of UP
                        </p>
                        <p className="mt-0.5 text-sm text-slate-muted">
                          Head office · Lucknow, Uttar Pradesh
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-pearl">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Answers, before you ask." />
          <Accordion type="single" collapsible className="mt-10 sm:mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`f-${i}`}
                className="border border-border/60 rounded-xl px-5 sm:px-6 bg-white"
              >
                <AccordionTrigger className="text-left font-display text-base sm:text-lg text-charcoal hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-muted leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============ SOCIAL ============ */}
      <section className="py-16 sm:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium">
            Follow the movement
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Stay close to every edition.
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Behind-the-scenes, launch dates and exhibitor spotlights — first on our social channels.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            {[
              { I: Facebook, href: SOCIAL_LINKS?.facebook ?? "#", label: "Facebook" },
              { I: Instagram, href: SOCIAL_LINKS?.instagram ?? "#", label: "Instagram" },
              { I: Linkedin, href: "#", label: "LinkedIn" },
              { I: Youtube, href: SOCIAL_LINKS?.youtube ?? "#", label: "YouTube" },
            ].map(({ I, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-11 w-11 grid place-items-center rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold hover:bg-white/5 transition-colors"
              >
                <I className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* -------- Contact info card with copy button -------- */
function CopyCard({
  icon: Icon,
  label,
  value,
  href,
  cta,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };
  return (
    <Card className="group relative p-6 sm:p-7 border-border/60 hover:border-gold/50 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
          <Icon className="h-5 w-5 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-muted font-medium">
            {label}
          </p>
          <p className="mt-1.5 font-display text-base sm:text-lg text-charcoal leading-snug break-words">
            {value}
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <Button asChild size="sm" className="h-9 px-4 bg-charcoal text-white hover:bg-charcoal/90">
          <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {cta}
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCopy}
          className="h-9 px-3 border-border"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
}

/* -------- Form -------- */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<FormT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = async (data: FormT) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent!", {
      description: `We'll reply to ${data.email} within 24 business hours.`,
    });
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <Card className="p-6 sm:p-8 lg:p-10 border-border/60">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 shrink-0 rounded-lg bg-gold/10 grid place-items-center">
          <Send className="h-5 w-5 text-gold" />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
            Send us a message
          </h2>
          <p className="mt-1 text-slate-muted text-sm sm:text-base">
            Typical response time: under 24 business hours.
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 sm:mt-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name" error={form.formState.errors.name?.message}>
            <Input {...form.register("name")} placeholder="Your name" />
          </Field>
          <Field label="Email" error={form.formState.errors.email?.message}>
            <Input type="email" {...form.register("email")} placeholder="you@company.in" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone (optional)">
            <Input type="tel" {...form.register("phone")} placeholder="+91 …" />
          </Field>
          <Field label="Topic" error={form.formState.errors.topic?.message}>
            <select
              {...form.register("topic")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40"
              defaultValue=""
            >
              <option value="" disabled>
                Select a topic
              </option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Subject" error={form.formState.errors.subject?.message}>
          <Input {...form.register("subject")} placeholder="How can we help?" />
        </Field>

        <Field label="Message" error={form.formState.errors.message?.message}>
          <Textarea rows={6} {...form.register("message")} placeholder="Tell us more…" />
        </Field>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-12 bg-gradient-gold text-charcoal shadow-gold text-base font-medium"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
            </>
          ) : sent ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Sent
            </>
          ) : (
            <>
              Send message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-xs text-slate-muted">
          By sending this message you agree to be contacted by the Tent Decor Expo UP team regarding
          your enquiry.
        </p>
      </form>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] uppercase tracking-[0.24em] text-slate-muted font-medium">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
