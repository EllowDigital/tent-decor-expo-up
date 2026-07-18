/**
 * SITE CONFIG — Global variables that change year-over-year.
 * Edit values here only; every component consumes them via imports.
 */

export const siteConfig = {
  name: "Tent Decor Expo UP",
  shortName: "TDX UP",
  organisation: "Tent, Caterers & Decorators Welfare Association of UP",
  tagline: "Uttar Pradesh's premier B2B trade show for the tent, decor, catering & hospitality industry.",

  /** ID of the event to highlight on the homepage hero & sticky mobile bar. */
  currentEventId: "kanpur-2026",

  contactInfo: {
    phone: "+91 98765 43210",
    email: "info@tentdecorexpoup.in",
    venue: "Sanskar Lawn, Kanpur, Uttar Pradesh 208001",
  },

  socialLinks: {
    facebook: "https://www.facebook.com/tentdecorexpo",
    instagram: "https://www.instagram.com/tentdecorexpo",
    youtube: "https://www.youtube.com/@tentdecorexpo",
    twitter: "https://twitter.com/tentdecorexpo",
  },

  /** External portal URLs — swap once each year, whole site picks them up. */
  registrationLinks: {
    portal: "https://www.tentdecorexpo.com",
    visitorEpass: "https://www.tentdecorexpo.com/e-pass",
    exhibitorStall: "https://www.tentdecorexpo.com/book-stall",
  },

  industryCategories: [
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
  ],

  navLinks: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Events", to: "/events" },
    { label: "Members", to: "/members" },
    { label: "Gallery", to: "/gallery" },
    {
      label: "Attend",
      to: "/registration",
      children: [
        { label: "For Visitors", to: "/visitors", description: "Who should attend & what to expect" },
        { label: "For Exhibitors", to: "/exhibitors", description: "Book a stall, sponsorships & pricing" },
        { label: "Registration", to: "/registration", description: "Central portal for all passes" },
        { label: "E-Pass Status", to: "/epass-status", description: "Check your registration" },
        { label: "Event Details", to: "/event-details", description: "Upcoming edition full details" },
      ],
    },
    { label: "Contact", to: "/contact" },
  ] as const,
} as const;

// Convenience named exports (used across the site).
export const CONTACT = siteConfig.contactInfo;
export const SOCIAL_LINKS = siteConfig.socialLinks;
export const REGISTER_URL = siteConfig.registrationLinks.portal;
export const VISITOR_REGISTER_URL = siteConfig.registrationLinks.visitorEpass;
export const EXHIBITOR_REGISTER_URL = siteConfig.registrationLinks.exhibitorStall;
export const INDUSTRY_CATEGORIES = siteConfig.industryCategories;
export const NAV_LINKS = siteConfig.navLinks;
export const CURRENT_EVENT_ID = siteConfig.currentEventId;
