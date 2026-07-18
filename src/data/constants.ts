import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

// External registration & E-Pass portal. All CTAs across the site link here.
export const REGISTER_URL = "https://www.tentdecorexpo.com";

export const INDUSTRY_CATEGORIES = [
  "Tent Infrastructure",
  "Decoration",
  "Catering Services",
  "Hospitality",
  "Light Decoration",
  "Kitchen Equipment",
  "Beverages",
  "Food Products",
  "Wedding Planning",
  "Furniture",
  "Fabric",
  "Stage Design",
  "Wedding Accessories",
  "Event Management",
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Editions", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

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
  { title: "Lighting Design", desc: "Ambient, façade and architectural lighting.", icon: "Lightbulb" },
  { title: "Catering & Kitchen", desc: "Equipment, chafing dishes, live counters.", icon: "ChefHat" },
  { title: "Furniture & Fabric", desc: "Seating, drapes, upholstery and linens.", icon: "Armchair" },
  { title: "Wedding Planning", desc: "Full-service planners and destination specialists.", icon: "Heart" },
  { title: "Beverages & F&B", desc: "Mocktail bars, tea/coffee, dessert stations.", icon: "GlassWater" },
  { title: "Event Management", desc: "Sound, AV, ticketing, and end-to-end production.", icon: "Megaphone" },
];

export const SCHEDULE = [
  { day: "Day 01", date: "30 August 2026", title: "Grand Inauguration", desc: "Ribbon cutting, chief guest addresses, exhibitor hall opens, evening networking gala." },
  { day: "Day 02", date: "31 August 2026", title: "B2B Meetings & Panels", desc: "Curated buyer-seller meetings, panel discussions on the future of the wedding economy, live stage demos." },
  { day: "Day 03", date: "01 September 2026", title: "Awards & Closing", desc: "Innovation Awards ceremony, Mahadhiveshan closing session, association handover." },
];

export const TESTIMONIALS = [
  { quote: "Lucknow 2025 was a turning point for us. We closed contracts worth ₹1.2 Cr on the show floor.", name: "Rakesh Verma", role: "MD, Verma Tent House" },
  { quote: "The energy, the crowd, the association leaders — every serious buyer in UP was in one hall.", name: "Anita Sharma", role: "Founder, Anita Weddings" },
  { quote: "Kanpur 2026 will be the largest B2B stage our industry has ever seen. Booking early is a must.", name: "Prem Chandra Awasthi", role: "President, Shamiyana Furniture Association" },
];

export const MILESTONES = [
  { year: "1998", title: "Association Founded", desc: "Tent, Caterers & Decorators Welfare Association of UP is established to unify the industry." },
  { year: "2015", title: "1st Mahadhiveshan", desc: "The first state-level congress brings together 400 members across UP districts." },
  { year: "2019", title: "2nd Mahadhiveshan", desc: "Regional expansion — chapters formed in Kanpur, Varanasi and Agra." },
  { year: "2025", title: "Lucknow 2025", desc: "The 3rd Mahadhiveshan hosted in Lucknow — 15,000+ visitors, 180 exhibitors." },
  { year: "2026", title: "Kanpur 2026", desc: "4th Mahadhiveshan — hosted by Shamiyana Furniture Association, Kanpur." },
];

export const LEADERSHIP = [
  { name: "Prem Chandra Awasthi", role: "President, Shamiyana Furniture Association", img: p2 },
  { name: "Rajeev Kumar Singh", role: "General Secretary", img: p1 },
  { name: "Meera Agrawal", role: "Women's Wing Convener", img: p3 },
  { name: "Sandeep Tiwari", role: "Treasurer & Trade Chair", img: p4 },
];

// Multi-year editions. Add a new entry each year to publish a fresh event page.
export type Edition = {
  year: string;
  slug: string;
  edition: string;
  status: "upcoming" | "past";
  city: string;
  venue: string;
  dates: string;
  startDate?: string; // ISO — enables countdown for upcoming editions
  endDate?: string; // ISO — end of the event (used for calendar exports & labels)
  timezone?: string; // IANA tz for display (e.g. "Asia/Kolkata")
  host: string;
  exhibitors: string;
  visitors: string;
  summary: string;
  highlights: string[];
  cover: string;
  photos: string[];
};

export const EDITIONS: Edition[] = [
  {
    year: "2026",
    slug: "2026",
    edition: "4th Mahadhiveshan",
    status: "upcoming",
    city: "Kanpur",
    venue: "Sanskar Lawn, Kanpur",
    dates: "30 August – 1 September 2026",
    startDate: "2026-08-30T09:00:00+05:30",
    endDate: "2026-09-01T20:00:00+05:30",
    timezone: "Asia/Kolkata",
    host: "Shamiyana Furniture Association",
    exhibitors: "250+",
    visitors: "25,000+",
    summary:
      "The largest B2B stage the tent, catering and decor industry has ever seen — hosted by Shamiyana Furniture Association, Kanpur.",
    highlights: [
      "Grand inauguration with chief guest addresses",
      "Curated B2B buyer-seller meetings across 14 verticals",
      "Panel discussions on the future of the wedding economy",
      "Live central-stage demos and Innovation Awards",
      "Three days of hospitality lounges and networking galas",
    ],
    cover: g6,
    photos: [g6, g2, g4, g5, g3, g7],
  },
  {
    year: "2025",
    slug: "2025",
    edition: "3rd Mahadhiveshan",
    status: "past",
    city: "Lucknow",
    venue: "Awadh Exhibition Grounds, Lucknow",
    dates: "12 – 14 September 2025",
    host: "Tent, Caterers & Decorators Welfare Association of UP",
    exhibitors: "180",
    visitors: "15,000+",
    summary:
      "Three record-breaking days in Lucknow that redefined North India's wedding economy — and set the stage for Kanpur 2026.",
    highlights: [
      "180 exhibitors across 12 verticals",
      "15,000+ trade buyers from UP, Bihar and MP",
      "First-ever Innovation Awards for regional craftsmen",
      "Live wedding mandap demonstrations",
      "Signature Awadhi hospitality dinners",
    ],
    cover: g1,
    photos: [g1, g4, g2, g5, g3, g7],
  },
  {
    year: "2019",
    slug: "2019",
    edition: "2nd Mahadhiveshan",
    status: "past",
    city: "Varanasi",
    venue: "Diamond Hotel Grounds, Varanasi",
    dates: "18 – 20 October 2019",
    host: "Kashi Tent & Decor Association",
    exhibitors: "120",
    visitors: "9,000+",
    summary:
      "The regional expansion edition — new chapters formed in Kanpur, Varanasi and Agra, uniting the industry under one voice.",
    highlights: [
      "Formation of 3 new district chapters",
      "First Women's Wing convention",
      "State-level welfare policy roundtable",
    ],
    cover: g3,
    photos: [g3, g7, g5, g2],
  },
  {
    year: "2015",
    slug: "2015",
    edition: "1st Mahadhiveshan",
    status: "past",
    city: "Lucknow",
    venue: "Sarojini Nagar Grounds, Lucknow",
    dates: "22 – 23 November 2015",
    host: "Tent, Caterers & Decorators Welfare Association of UP",
    exhibitors: "60",
    visitors: "4,000",
    summary:
      "The founding congress — 400 members from across UP districts came together to build a unified industry voice.",
    highlights: [
      "400 founding members",
      "First state-level industry charter signed",
      "Recognition by UP MSME department",
    ],
    cover: g5,
    photos: [g5, g4, g2],
  },
];

// Gallery — each item is tagged by category AND edition year for dual filtering.
export const GALLERY = [
  { src: g1, category: "Decoration", title: "Floral Mandap — Lucknow 2025", year: "2025" },
  { src: g2, category: "Tent Setup", title: "Grand Shamiyana Interior", year: "2025" },
  { src: g3, category: "Catering", title: "Silver Chafing Live Counter", year: "2019" },
  { src: g4, category: "Lighting", title: "Fairy Light Installation", year: "2025" },
  { src: g5, category: "VIP", title: "VIP Reception Hall", year: "2015" },
  { src: g6, category: "Decoration", title: "Royal Stage Design — Kanpur 2026 Preview", year: "2026" },
  { src: g7, category: "Tent Setup", title: "Shamiyana Fabric Detail", year: "2019" },
  { src: g2, category: "VIP", title: "Chandelier Pavilion", year: "2025" },
  { src: g4, category: "Lighting", title: "Ambient Bulb Canopy", year: "2025" },
  { src: g3, category: "Catering", title: "Live Kitchen Showcase", year: "2025" },
  { src: g5, category: "VIP", title: "Presidential Lounge", year: "2019" },
  { src: g7, category: "Tent Setup", title: "Modular Pavilion Frame", year: "2015" },
  { src: g6, category: "Stage", title: "Central Awards Stage", year: "2025" },
  { src: g1, category: "Decoration", title: "Marigold & Rose Backdrop", year: "2025" },
];

export const FAQS = [
  { q: "When and where is Kanpur 2026 being held?", a: "The 4th Mahadhiveshan takes place 30 August – 1 September 2026 at Sanskar Lawn, Kanpur." },
  { q: "Is the visitor E-Pass free?", a: "Yes. Trade visitors receive a complimentary E-Pass at tentdecorexpo.com. Walk-in registration is also available at the venue." },
  { q: "How do I book an exhibitor stall?", a: "Head to tentdecorexpo.com and submit the exhibitor booking form. Our team responds within 24 business hours with stall availability and pricing." },
  { q: "Who organises the expo?", a: "Kanpur 2026 is hosted by the Shamiyana Furniture Association, Kanpur, under the umbrella of the Tent, Caterers & Decorators Welfare Association of UP." },
  { q: "Are meals and refreshments provided?", a: "Yes. All registered visitors and exhibitors receive access to hospitality lounges, tea/coffee and lunch on all three days." },
];

export const CONTACT = {
  phone: "+91 98765 43210",
  email: "info@tentdecorexpoup.in",
  venue: "Sanskar Lawn, Kanpur, Uttar Pradesh 208001",
};
