/**
 * GALLERY DATA — Filter tabs on /gallery are generated automatically
 * from the `category` values present in this array.
 * Drop new photos into /public/assets/ and reference as "/assets/filename.jpg".
 */

export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  /** Optional edition year for the year filter */
  year?: string;
};

export const galleryData: GalleryImage[] = [
  {
    src: "/assets/g1.jpg",
    alt: "Floral mandap installation, Lucknow 2025",
    category: "Decoration",
    year: "2025",
  },
  {
    src: "/assets/g2.jpg",
    alt: "Grand shamiyana interior with royal drapery",
    category: "Tent Setup",
    year: "2025",
  },
  {
    src: "/assets/g3.jpg",
    alt: "Silver chafing dishes at a live catering counter",
    category: "Catering",
    year: "2019",
  },
  {
    src: "/assets/g4.jpg",
    alt: "Fairy light installation across a wedding pavilion",
    category: "Lighting",
    year: "2025",
  },
  {
    src: "/assets/g5.jpg",
    alt: "VIP reception hall with chandelier lighting",
    category: "VIP",
    year: "2015",
  },
  {
    src: "/assets/g6.jpg",
    alt: "Royal stage design preview for Kanpur 2026",
    category: "Decoration",
    year: "2026",
  },
  {
    src: "/assets/g7.jpg",
    alt: "Close-up of shamiyana fabric detailing",
    category: "Tent Setup",
    year: "2019",
  },
  { src: "/assets/g2.jpg", alt: "Chandelier-lit pavilion", category: "VIP", year: "2025" },
  { src: "/assets/g4.jpg", alt: "Ambient bulb canopy", category: "Lighting", year: "2025" },
  { src: "/assets/g3.jpg", alt: "Live kitchen showcase", category: "Catering", year: "2025" },
  { src: "/assets/g5.jpg", alt: "Presidential lounge setup", category: "VIP", year: "2019" },
  {
    src: "/assets/g7.jpg",
    alt: "Modular pavilion frame installation",
    category: "Tent Setup",
    year: "2015",
  },
  { src: "/assets/g6.jpg", alt: "Central awards stage", category: "Stage", year: "2025" },
  {
    src: "/assets/g1.jpg",
    alt: "Marigold and rose floral backdrop",
    category: "Decoration",
    year: "2025",
  },
];

/** Auto-derived category list — powers the filter pills */
export const galleryCategories = Array.from(new Set(galleryData.map((g) => g.category)));

/** Auto-derived year list — powers the year filter */
export const galleryYears = Array.from(
  new Set(galleryData.map((g) => g.year).filter((y): y is string => Boolean(y))),
).sort((a, b) => Number(b) - Number(a));
