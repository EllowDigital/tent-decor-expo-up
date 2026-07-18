import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Twitter,
  ArrowUpRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT, SOCIAL_LINKS, REGISTER_URL } from "@/data/constants";

const PRIMARY_LINKS = [
  { label: "Home", to: "/" },
  { label: "About the Association", to: "/about" },
  { label: "All Events", to: "/events" },
  { label: "Members & Chapters", to: "/members" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

const ATTEND_LINKS = [
  { label: "For Visitors", to: "/visitors" },
  { label: "For Exhibitors", to: "/exhibitors" },
  { label: "Registration Portal", to: "/registration" },
  { label: "Event Details", to: "/event-details" },
  { label: "E-Pass Status", to: "/epass-status" },
] as const;

const SOCIALS = [
  { icon: Facebook, url: SOCIAL_LINKS.facebook, label: "Facebook" },
  { icon: Instagram, url: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: Youtube, url: SOCIAL_LINKS.youtube, label: "YouTube" },
  { icon: Twitter, url: SOCIAL_LINKS.twitter, label: "Twitter / X" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 rounded-xl p-4 inline-block border border-white/10">
              <Logo className="h-12 sm:h-14 w-auto" />
            </div>
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-sm">
              India's premier B2B congregation for the tent, decor, catering and event industry —
              hosted in the heart of Uttar Pradesh.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base text-gold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {PRIMARY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Attend */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base text-gold mb-4">Attend</h4>
            <ul className="space-y-2.5 text-sm">
              {ATTEND_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold hover:text-gold/80 transition-colors"
                >
                  Official portal <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base text-gold mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="hover:text-gold">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold break-all">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>{CONTACT.venue}</span>
              </li>
            </ul>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6">
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                Announcements
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="you@company.in"
                  aria-label="Email address"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
                />
                <Button className="bg-gradient-gold text-charcoal shrink-0">Join</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Tent Decor Expo UP. All rights reserved.</p>
          <p className="text-gold/80 text-center sm:text-right">
            Organised by Tent, Caterers &amp; Decorators Welfare Association of UP
          </p>
        </div>
      </div>
    </footer>
  );
}
