/**
 * Centralized asset registry.
 * All static assets live in /public and are referenced via site-absolute paths.
 * Update this file when adding, moving, or removing assets.
 */

const BASE = "/assets";

export const assets = {
  // Branding (root of /public for stable, shareable URLs)
  logo: "/logo.png",
  favicon: "/favicon.ico",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/manifest.webmanifest",

  // Hero
  heroBg: `${BASE}/hero-bg.jpg`,
  heroResponsive: {
    dir: `${BASE}/responsive`,
    widths: [640, 1024, 1600, 1920] as const,
    webp: (w: number) => `${BASE}/responsive/hero-bg-${w}.webp`,
    jpg: (w: number) => `${BASE}/responsive/hero-bg-${w}.jpg`,
  },

  // Gallery photos
  gallery: {
    g1: `${BASE}/g1.jpg`,
    g2: `${BASE}/g2.jpg`,
    g3: `${BASE}/g3.jpg`,
    g4: `${BASE}/g4.jpg`,
    g5: `${BASE}/g5.jpg`,
    g6: `${BASE}/g6.jpg`,
    g7: `${BASE}/g7.jpg`,
  },

  // Member portraits
  people: {
    p1: `${BASE}/p1.jpg`,
    p2: `${BASE}/p2.jpg`,
    p3: `${BASE}/p3.jpg`,
    p4: `${BASE}/p4.jpg`,
  },

  // Open Graph share cards
  og: {
    home: `${BASE}/og-home.jpg`,
    about: `${BASE}/og-about.jpg`,
    events: `${BASE}/og-events.jpg`,
    gallery: `${BASE}/og-gallery.jpg`,
    members: `${BASE}/og-members.jpg`,
    contact: `${BASE}/og-contact.jpg`,
    visitors: `${BASE}/og-visitors.jpg`,
    exhibitors: `${BASE}/og-exhibitors.jpg`,
    registration: `${BASE}/og-registration.jpg`,
  },
} as const;

export type AssetRegistry = typeof assets;
