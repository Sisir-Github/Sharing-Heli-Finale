export const COMPANY = {
  companyName: "Sharing Heli Nepal Pvt. Ltd.",
  brandName: "Sharing Heli",
  tagline: "Elevate Your Journey Above the Himalayas",
  operator: "Pokhara Flight Centre Tours & Travel Pvt. Ltd.",
  inquiryEmail: "rishi8848@gmail.com",
  primaryPhone: "+977-9802855690",
  whatsappNumber: "+977-9856028155",
  whatsappLink: "https://wa.me/9779856028155",
  address: {
    line1: "Lakeside-6, 15 Street No.",
    line2: "Pokhara 33700",
    line3: "Kaski, Gandaki Province",
    country: "Nepal"
  },
  geo: {
    latitude: 28.2096,
    longitude: 83.9856
  }
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tours", href: "/tours" },
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/contact" }
] as const;

export const INQUIRY_SERVICES = [
  "Charter",
  "Heli Tours",
  "Pilgrimage Tours",
  "Emergency Rescue",
  "Aerial Photography",
  "Cargo Transport",
  "Everest Base Camp Helicopter Tour",
  "Annapurna Base Camp Tour",
  "Muktinath Pilgrimage Tour",
  "General Inquiry"
] as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sharingheli.com";

export const CANONICAL_HOST = "sharingheli.com";

export const CONTACT_SERVICE_PATHS = {
  charter: "/contact/charter",
  everest: "/contact/everest-base-camp-helicopter-tour",
  annapurna: "/contact/annapurna-base-camp-tour",
  muktinath: "/contact/muktinath-pilgrimage-tour"
} as const;
