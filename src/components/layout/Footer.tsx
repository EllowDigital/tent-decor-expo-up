import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_LINKS, CONTACT } from "@/data/constants";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="bg-white/5 rounded-xl p-4 inline-block border border-white/10">
              <Logo className="h-14 w-auto" />
            </div>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              India's premier B2B congregation for the tent, decor, catering and event industry — hosted in the heart of Uttar Pradesh.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg text-gold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/register" className="hover:text-gold transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-gold mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />{CONTACT.phone}</li>
              <li className="flex gap-3"><Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />{CONTACT.email}</li>
              <li className="flex gap-3"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />{CONTACT.venue}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-gold mb-5">Stay Updated</h4>
            <p className="text-sm text-white/60 mb-4">Get exhibitor announcements, brochure drops and early-bird passes.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input type="email" required placeholder="you@company.in" className="bg-white/5 border-white/15 text-white placeholder:text-white/40" />
              <Button className="bg-gradient-gold text-charcoal">Join</Button>
            </form>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="h-10 w-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>Copyright © 2026 Tent Decor Expo UP. All rights reserved.</p>
          <p className="text-gold/80">Organised by Tent, Caterers & Decorators Welfare Association of UP</p>
        </div>
      </div>
    </footer>
  );
}
