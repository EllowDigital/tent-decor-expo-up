/**
 * ⚠️ This file is a backward-compatibility shim.
 *
 * All editable content now lives in dedicated data modules:
 *   • src/data/siteConfig.ts   → contact info, socials, registration URLs, current event
 *   • src/data/eventsData.ts   → all event editions (upcoming + past)
 *   • src/data/membersData.ts  → core committee + city chapters
 *   • src/data/galleryData.ts  → gallery images + auto-derived categories
 *
 * Prefer importing from those files. This module simply re-exports them under
 * the legacy names used across older components.
 */

import { eventsData, type EventItem } from "./eventsData";
import { coreCommittee, executiveCommittee, cityChapters } from "./membersData";
import { galleryData } from "./galleryData";

export {
  CONTACT,
  SOCIAL_LINKS,
  REGISTER_URL,
  VISITOR_REGISTER_URL,
  EXHIBITOR_REGISTER_URL,
  INDUSTRY_CATEGORIES,
  NAV_LINKS,
  CURRENT_EVENT_ID,
  siteConfig,
} from "./siteConfig";

// ---------- Legacy: EDITIONS (used by /event/$slug, /events, homepage) ----------

export type Edition = {
  year: string;
  slug: string;
  edition: string;
  status: "upcoming" | "past";
  city: string;
  venue: string;
  dates: string;
  startDate?: string;
  endDate?: string;
  timezone?: string;
  host: string;
  exhibitors: string;
  visitors: string;
  summary: string;
  highlights: string[];
  chiefGuests?: { name: string; role: string }[];
  cover: string;
  photos: string[];
};

export const EDITIONS: Edition[] = eventsData.map((e: EventItem) => ({
  year: e.year,
  slug: e.id,
  edition: e.edition,
  status: e.status,
  city: e.city,
  venue: e.venue,
  dates: e.dates,
  startDate: e.startDate,
  endDate: e.endDate,
  timezone: e.timezone,
  host: e.host,
  exhibitors: e.exhibitors,
  visitors: e.visitors,
  summary: e.description,
  highlights: e.highlights,
  chiefGuests: e.chiefGuests,
  cover: e.featuredImage,
  photos: e.galleryImages,
}));

// ---------- Legacy: Members ----------

export const LEADERSHIP = coreCommittee;
export const COMMITTEE = executiveCommittee;
export const CITY_CHAPTERS = cityChapters;

// ---------- Legacy: Gallery ----------

export const GALLERY = galleryData.map((g) => ({
  src: g.src,
  category: g.category,
  title: g.alt,
  year: g.year ?? "",
}));

// ---------- Static content that isn't tied to a specific data domain ----------

export const STATS = [
  { value: 250, suffix: "+", label: "Exhibitors" },
  { value: 25000, suffix: "+", label: "Visitors" },
  { value: 14, suffix: "", label: "Industry Verticals" },
  { value: 3, suffix: " Days", label: "Of Business" },
];

export const FEATURES = [
  {
    title: "Discover Innovation",
    desc: "Explore the newest tent, decor, and hospitality technology from India's leading manufacturers.",
    icon: "Sparkles",
  },
  {
    title: "Business Growth",
    desc: "Meet decision-makers, close bulk orders, and expand your dealer network across North India.",
    icon: "TrendingUp",
  },
  {
    title: "Networking",
    desc: "Connect with 25,000+ event professionals, wedding planners, caterers, and association leaders.",
    icon: "Users",
  },
  {
    title: "Knowledge",
    desc: "Attend expert panels, live demonstrations, and workshops led by the industry's most respected voices.",
    icon: "BookOpen",
  },
];

export const EXHIBITOR_CATEGORIES = [
  { title: "Tent Infrastructure", desc: "Frames, canopies, and modular pavilions.", icon: "Tent" },
  { title: "Stage & Decoration", desc: "Mandap, floral, drape and stage design.", icon: "Palette" },
  {
    title: "Lighting Design",
    desc: "Ambient, façade and architectural lighting.",
    icon: "Lightbulb",
  },
  {
    title: "Catering & Kitchen",
    desc: "Equipment, chafing dishes, live counters.",
    icon: "ChefHat",
  },
  {
    title: "Furniture & Fabric",
    desc: "Seating, drapes, upholstery and linens.",
    icon: "Armchair",
  },
  {
    title: "Wedding Planning",
    desc: "Full-service planners and destination specialists.",
    icon: "Heart",
  },
  {
    title: "Beverages & F&B",
    desc: "Mocktail bars, tea/coffee, dessert stations.",
    icon: "GlassWater",
  },
  {
    title: "Event Management",
    desc: "Sound, AV, ticketing, and end-to-end production.",
    icon: "Megaphone",
  },
];

export const SCHEDULE = [
  {
    day: "Day 01",
    date: "30 August 2026",
    title: "Grand Inauguration",
    desc: "Ribbon cutting, chief guest addresses, exhibitor hall opens, evening networking gala.",
  },
  {
    day: "Day 02",
    date: "31 August 2026",
    title: "B2B Meetings & Panels",
    desc: "Curated buyer-seller meetings, panel discussions on the future of the wedding economy, live stage demos.",
  },
  {
    day: "Day 03",
    date: "01 September 2026",
    title: "Awards & Closing",
    desc: "Innovation Awards ceremony, Mahadhiveshan closing session, association handover.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Lucknow 2025 was a turning point for us. We closed contracts worth ₹1.2 Cr on the show floor.",
    name: "Rakesh Verma",
    role: "MD, Verma Tent House",
  },
  {
    quote:
      "The energy, the crowd, the association leaders — every serious buyer in UP was in one hall.",
    name: "Anita Sharma",
    role: "Founder, Anita Weddings",
  },
  {
    quote:
      "Kanpur 2026 will be the largest B2B stage our industry has ever seen. Booking early is a must.",
    name: "Prem Chandra Awasthi",
    role: "President, Shamiyana Furniture Association",
  },
];

export const MILESTONES = [
  {
    year: "1998",
    title: "Association Founded",
    desc: "Tent, Caterers & Decorators Welfare Association of UP is established to unify the industry.",
  },
  {
    year: "2015",
    title: "1st Mahadhiveshan",
    desc: "The first state-level congress brings together 400 members across UP districts.",
  },
  {
    year: "2019",
    title: "2nd Mahadhiveshan",
    desc: "Regional expansion — chapters formed in Kanpur, Varanasi and Agra.",
  },
  {
    year: "2025",
    title: "Lucknow 2025",
    desc: "The 3rd Mahadhiveshan hosted in Lucknow — 15,000+ visitors, 180 exhibitors.",
  },
  {
    year: "2026",
    title: "Kanpur 2026",
    desc: "4th Mahadhiveshan — hosted by Shamiyana Furniture Association, Kanpur.",
  },
];

export const FAQS = [
  {
    q: "When and where is Kanpur 2026 being held?",
    a: "The 4th Mahadhiveshan takes place 30 August – 1 September 2026 at Sanskar Lawn, Kanpur.",
  },
  {
    q: "Is the visitor E-Pass free?",
    a: "Yes. Trade visitors receive a complimentary E-Pass at tentdecorexpo.com. Walk-in registration is also available at the venue.",
  },
  {
    q: "How do I book an exhibitor stall?",
    a: "Head to tentdecorexpo.com and submit the exhibitor booking form. Our team responds within 24 business hours with stall availability and pricing.",
  },
  {
    q: "Who organises the expo?",
    a: "Kanpur 2026 is hosted by the Shamiyana Furniture Association, Kanpur, under the umbrella of the Tent, Caterers & Decorators Welfare Association of UP.",
  },
  {
    q: "Are meals and refreshments provided?",
    a: "Yes. All registered visitors and exhibitors receive access to hospitality lounges, tea/coffee and lunch on all three days.",
  },
];
