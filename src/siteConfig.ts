// Central place for business details — edit these to rebrand the site.
export const siteConfig = {
  businessName: "Snap Squad Photo Booth",
  tagline: "Open-air photo booths for weddings, parties & corporate events",
  ownerName: "Alex Rivera",
  email: "hello@snapsquadbooth.com",
  phone: "(555) 123-4567",
  serviceArea: "Serving the greater metro area and within 60 miles",
  instagram: "https://instagram.com",
  bookingNotifyEmail: "luke.simoni2001@gmail.com",
};

export type FrameProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  accent: string;
};

export const frameProducts: FrameProduct[] = [
  {
    id: "classic-white",
    name: "Classic White Strip",
    description: "Timeless white border, perfect for any event theme.",
    price: 8,
    image:
      "linear-gradient(160deg, #fdfcf9 0%, #f3f1ea 100%)",
    accent: "#111827",
  },
  {
    id: "blush-floral",
    name: "Blush Floral",
    description: "Soft pink florals framing your photostrip — a wedding favorite.",
    price: 10,
    image: "linear-gradient(160deg, #fde2e4 0%, #fad2e1 100%)",
    accent: "#9d174d",
  },
  {
    id: "gold-foil",
    name: "Gold Foil Elegance",
    description: "Metallic gold accents for a black-tie or anniversary event.",
    price: 12,
    image: "linear-gradient(160deg, #2b2b2b 0%, #4a4a4a 100%)",
    accent: "#d4af37",
  },
  {
    id: "neon-nights",
    name: "Neon Nights",
    description: "Bold neon colors for birthdays, prom, and dance parties.",
    price: 10,
    image: "linear-gradient(160deg, #1e1b4b 0%, #4c1d95 100%)",
    accent: "#22d3ee",
  },
  {
    id: "corporate-clean",
    name: "Corporate Clean",
    description: "Minimal frame with logo placement — great for company events.",
    price: 9,
    image: "linear-gradient(160deg, #e2e8f0 0%, #cbd5e1 100%)",
    accent: "#1e40af",
  },
  {
    id: "holiday-cheer",
    name: "Holiday Cheer",
    description: "Festive red and green trim for seasonal parties.",
    price: 9,
    image: "linear-gradient(160deg, #fee2e2 0%, #dcfce7 100%)",
    accent: "#b91c1c",
  },
];
