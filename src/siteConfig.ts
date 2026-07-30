// Central place for business details — edit these to rebrand the site.
export const siteConfig = {
  businessName: "Developed",
  tagline: "In the business of making memories tangible",
  bioLine: "Photo booth rentals • Film-inspired moments",
  ownerName: "Alex Rivera",
  email: "hello@developedphoto.co",
  phone: "(555) 123-4567",
  serviceArea: "Serving the greater metro area and within 60 miles",
  instagram: "https://www.instagram.com/developed_photo/",
  tiktok: "https://www.tiktok.com/@developedphoto",
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
    id: "ivory-classic",
    name: "Ivory Classic",
    description: "Clean cream border with a minimal stamp mark — timeless for any event.",
    price: 8,
    image: "linear-gradient(160deg, #f7f1e4 0%, #ede2ce 100%)",
    accent: "#8a2a26",
  },
  {
    id: "crimson-stamp",
    name: "Crimson Stamp",
    description: "Our signature look — bold crimson border inspired by a photo-lab stamp.",
    price: 10,
    image: "linear-gradient(160deg, #8a2a26 0%, #6b1f1c 100%)",
    accent: "#f7f1e4",
  },
  {
    id: "sepia-tone",
    name: "Sepia Tone",
    description: "Warm, faded sepia tones for a true vintage-film feel.",
    price: 10,
    image: "linear-gradient(160deg, #c8a878 0%, #9c7a4d 100%)",
    accent: "#1c1613",
  },
  {
    id: "midnight-noir",
    name: "Midnight Noir",
    description: "High-contrast black and white — moody, cinematic, film-noir inspired.",
    price: 12,
    image: "linear-gradient(160deg, #2a221d 0%, #1c1613 100%)",
    accent: "#f7f1e4",
  },
  {
    id: "film-negative",
    name: "Film Negative",
    description: "Sprocket-hole trim styled after a real 35mm negative strip.",
    price: 11,
    image: "linear-gradient(160deg, #3a312b 0%, #1c1613 100%)",
    accent: "#c8a878",
  },
  {
    id: "matte-minimal",
    name: "Matte Minimal",
    description: "Stripped-down matte black frame with your event's date in fine print.",
    price: 9,
    image: "linear-gradient(160deg, #2a221d 0%, #3a312b 100%)",
    accent: "#8a2a26",
  },
];
