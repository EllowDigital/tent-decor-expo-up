/**
 * EVENTS DATA — Add a new object each year to publish a fresh event page.
 * All images live in /public/assets/ — just drop new photos into that folder
 * and reference them as "/assets/filename.jpg".
 */

export type ScheduleItem = {
  day: string;
  date: string;
  title: string;
  desc: string;
};

export type ChiefGuest = {
  name: string;
  role: string;
};

export type EventItem = {
  /** URL slug — used in /event/:id */
  id: string;
  title: string;
  edition: string;
  status: "upcoming" | "past";
  year: string;
  city: string;
  dates: string;
  /** ISO with timezone offset — enables countdown for upcoming events */
  startDate?: string;
  /** ISO with timezone offset — used for calendar exports & "ends on" labels */
  endDate?: string;
  timezone?: string;
  venue: string;
  host: string;
  exhibitors: string;
  visitors: string;
  description: string;
  highlights: string[];
  chiefGuests?: ChiefGuest[];
  /** Hero / cover image path in /public/assets/ */
  featuredImage: string;
  /** Photos shown on the event detail page */
  galleryImages: string[];
  schedule?: ScheduleItem[];
};

export const eventsData: EventItem[] = [
  {
    id: "kanpur-2026",
    title: "4th Mahadhiveshan Kanpur 2026",
    edition: "4th Mahadhiveshan",
    status: "upcoming",
    year: "2026",
    city: "Kanpur",
    dates: "30 August – 1 September 2026",
    startDate: "2026-08-30T09:00:00+05:30",
    endDate: "2026-09-01T20:00:00+05:30",
    timezone: "Asia/Kolkata",
    venue: "Sanskar Lawn, Kanpur",
    host: "Shamiyana Furniture Association",
    exhibitors: "250+",
    visitors: "25,000+",
    description:
      "The largest B2B stage the tent, catering and decor industry has ever seen — hosted by Shamiyana Furniture Association, Kanpur.",
    highlights: [
      "Grand inauguration with chief guest addresses",
      "Curated B2B buyer-seller meetings across 14 verticals",
      "Panel discussions on the future of the wedding economy",
      "Live central-stage demos and Innovation Awards",
      "Three days of hospitality lounges and networking galas",
    ],
    chiefGuests: [
      { name: "Shri Yogi Adityanath", role: "Hon'ble Chief Minister of Uttar Pradesh (Invited)" },
      { name: "Shri Nand Gopal Gupta 'Nandi'", role: "Cabinet Minister, MSME, Govt. of UP (Invited)" },
      { name: "Vijay Kumar", role: "President, TCDWA UP" },
      { name: "Prem Chandra Awasthi", role: "President, Shamiyana Furniture Association" },
    ],
    featuredImage: "/assets/g6.jpg",
    galleryImages: ["/assets/g6.jpg", "/assets/g2.jpg", "/assets/g4.jpg", "/assets/g5.jpg", "/assets/g3.jpg", "/assets/g7.jpg"],
    schedule: [
      { day: "Day 01", date: "30 August 2026", title: "Grand Inauguration", desc: "Ribbon cutting, chief guest addresses, exhibitor hall opens, evening networking gala." },
      { day: "Day 02", date: "31 August 2026", title: "B2B Meetings & Panels", desc: "Curated buyer-seller meetings, panel discussions on the future of the wedding economy, live stage demos." },
      { day: "Day 03", date: "01 September 2026", title: "Awards & Closing", desc: "Innovation Awards ceremony, Mahadhiveshan closing session, association handover." },
    ],
  },
  {
    id: "lucknow-2025",
    title: "3rd Mahadhiveshan Lucknow 2025",
    edition: "3rd Mahadhiveshan",
    status: "past",
    year: "2025",
    city: "Lucknow",
    dates: "12 – 14 September 2025",
    venue: "Awadh Exhibition Grounds, Lucknow",
    host: "Tent, Caterers & Decorators Welfare Association of UP",
    exhibitors: "180",
    visitors: "15,000+",
    description:
      "Three record-breaking days in Lucknow that redefined North India's wedding economy — and set the stage for Kanpur 2026.",
    highlights: [
      "180 exhibitors across 12 verticals",
      "15,000+ trade buyers from UP, Bihar and MP",
      "First-ever Innovation Awards for regional craftsmen",
      "Live wedding mandap demonstrations",
      "Signature Awadhi hospitality dinners",
    ],
    chiefGuests: [
      { name: "Shri Brajesh Pathak", role: "Deputy CM, Uttar Pradesh" },
      { name: "Vijay Kumar", role: "President, TCDWA UP" },
    ],
    featuredImage: "/assets/g1.jpg",
    galleryImages: ["/assets/g1.jpg", "/assets/g4.jpg", "/assets/g2.jpg", "/assets/g5.jpg", "/assets/g3.jpg", "/assets/g7.jpg"],
  },
  {
    id: "varanasi-2019",
    title: "2nd Mahadhiveshan Varanasi 2019",
    edition: "2nd Mahadhiveshan",
    status: "past",
    year: "2019",
    city: "Varanasi",
    dates: "18 – 20 October 2019",
    venue: "Diamond Hotel Grounds, Varanasi",
    host: "Kashi Tent & Decor Association",
    exhibitors: "120",
    visitors: "9,000+",
    description:
      "The regional expansion edition — new chapters formed in Kanpur, Varanasi and Agra, uniting the industry under one voice.",
    highlights: [
      "Formation of 3 new district chapters",
      "First Women's Wing convention",
      "State-level welfare policy roundtable",
    ],
    featuredImage: "/assets/g3.jpg",
    galleryImages: ["/assets/g3.jpg", "/assets/g7.jpg", "/assets/g5.jpg", "/assets/g2.jpg"],
  },
  {
    id: "lucknow-2015",
    title: "1st Mahadhiveshan Lucknow 2015",
    edition: "1st Mahadhiveshan",
    status: "past",
    year: "2015",
    city: "Lucknow",
    dates: "22 – 23 November 2015",
    venue: "Sarojini Nagar Grounds, Lucknow",
    host: "Tent, Caterers & Decorators Welfare Association of UP",
    exhibitors: "60",
    visitors: "4,000",
    description:
      "The founding congress — 400 members from across UP districts came together to build a unified industry voice.",
    highlights: [
      "400 founding members",
      "First state-level industry charter signed",
      "Recognition by UP MSME department",
    ],
    featuredImage: "/assets/g5.jpg",
    galleryImages: ["/assets/g5.jpg", "/assets/g4.jpg", "/assets/g2.jpg"],
  },
];

/** Helper: find an event by id (for /event/:id dynamic pages) */
export const getEventById = (id: string): EventItem | undefined =>
  eventsData.find((e) => e.id === id);

/** Helper: upcoming events (used on homepage hero, upcoming banner, /events) */
export const getUpcomingEvents = (): EventItem[] =>
  eventsData.filter((e) => e.status === "upcoming");

/** Helper: past events archive (used on /events) */
export const getPastEvents = (): EventItem[] =>
  eventsData.filter((e) => e.status === "past");
