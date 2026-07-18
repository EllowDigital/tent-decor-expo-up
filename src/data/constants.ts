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
  { label: "Kanpur 2026", to: "/event-2026" },
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

export const GALLERY = [
  { src: g1, category: "Decoration", title: "Floral Mandap — Lucknow 2025" },
  { src: g2, category: "Tent Setup", title: "Grand Shamiyana Interior" },
  { src: g3, category: "Catering", title: "Silver Chafing Live Counter" },
  { src: g4, category: "Lighting", title: "Fairy Light Installation" },
  { src: g5, category: "VIP", title: "VIP Reception Hall" },
  { src: g6, category: "Decoration", title: "Royal Stage Design" },
  { src: g7, category: "Tent Setup", title: "Shamiyana Fabric Detail" },
  { src: g2, category: "VIP", title: "Chandelier Pavilion" },
  { src: g4, category: "Lighting", title: "Ambient Bulb Canopy" },
];

export const FAQS = [
  { q: "When and where is Kanpur 2026 being held?", a: "The 4th Mahadhiveshan takes place 30 August – 1 September 2026 at Sanskar Lawn, Kanpur." },
  { q: "Is the visitor E-Pass free?", a: "Yes. Trade visitors receive a complimentary E-Pass on registration. Walk-in registration is also available at the venue." },
  { q: "How do I book an exhibitor stall?", a: "Submit the exhibitor booking form on our Registration page. Our team responds within 24 business hours with stall availability and pricing." },
  { q: "Who organises the expo?", a: "Kanpur 2026 is hosted by the Shamiyana Furniture Association, Kanpur, under the umbrella of the Tent, Caterers & Decorators Welfare Association of UP." },
  { q: "Are meals and refreshments provided?", a: "Yes. All registered visitors and exhibitors receive access to hospitality lounges, tea/coffee and lunch on all three days." },
];

export const CONTACT = {
  phone: "+91 98765 43210",
  email: "info@tentdecorexpoup.in",
  venue: "Sanskar Lawn, Kanpur, Uttar Pradesh 208001",
};
