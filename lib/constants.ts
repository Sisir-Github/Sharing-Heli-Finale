export const COMPANY = {
  companyName: "Sharing Heli Nepal",
  brandName: "Sharing Heli Nepal",
  tagline: "Helicopter tours and charter support in Nepal",
  operator: "Pokhara Flight Centre Tours & Travel Pvt. Ltd.",
  operatorUrl: "https://www.pokharaflightcentre.com/",
  operatingLine: "Operated by Pokhara Flight Centre Tours & Travel Pvt. Ltd.",
  inquiryEmail: "info@pokharaflightcentre.com",
  primaryPhone: "+977-9856028155",
  whatsappNumber: "+977-9856028155",
  whatsappLink: "https://wa.me/9779856028155",
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/Pokharaflightcentre" },
    { label: "Instagram", href: "https://www.instagram.com/pokharaflightcentre/" },
    { label: "YouTube", href: "https://www.youtube.com/@pokharaflightcentre" }
  ],
  googleMapsUrl: "https://maps.app.goo.gl/16jqdvkPbzSqX3PC7",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=28.2103132%2C83.9570783&z=17&output=embed",
  address: {
    line1: "Lakeside-6, 15 Street No.",
    line2: "Pokhara 33700",
    line3: "Kaski, Gandaki Province",
    country: "Nepal"
  },
  geo: {
    latitude: 28.2103132,
    longitude: 83.9570783
  }
} as const;

type ContactSource = Partial<{
  primaryPhone: string | null;
  whatsappNumber: string | null;
  email: string | null;
  operatingUnder: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  addressLine3: string | null;
  addressLine4: string | null;
}>;

export function resolveContactSettings(settings?: ContactSource | null) {
  return {
    primaryPhone: settings?.primaryPhone || COMPANY.primaryPhone,
    whatsappNumber: settings?.whatsappNumber || COMPANY.whatsappNumber,
    email: settings?.email || COMPANY.inquiryEmail,
    operatingUnder: settings?.operatingUnder || COMPANY.operatingLine,
    addressLine1: settings?.addressLine1 || COMPANY.address.line1,
    addressLine2: settings?.addressLine2 || COMPANY.address.line2,
    addressLine3: settings?.addressLine3 || COMPANY.address.line3,
    addressLine4: settings?.addressLine4 || COMPANY.address.country
  };
}

export const NAV_LINKS = [
  { label: "Home", href: "/", groupLabel: null },
  { label: "About Us", href: "/about-us", groupLabel: null },
  { label: "All Services", href: "/services", groupLabel: "Services" },
  { label: "Private Helicopter Charter", href: "/helicopter-charter-nepal", groupLabel: "Services" },
  { label: "Pokhara Helicopter Service", href: "/pokhara-helicopter-service", groupLabel: "Services" },
  { label: "Emergency Flight Coordination", href: "/emergency-helicopter-rescue-nepal", groupLabel: "Services" },
  { label: "All Heli Tours", href: "/tours", groupLabel: "Heli Tours" },
  { label: "Everest Region Tour", href: "/everest-base-camp-helicopter-tour-nepal", groupLabel: "Heli Tours" },
  { label: "Annapurna Base Camp Tour", href: "/annapurna-base-camp-helicopter-tour-nepal", groupLabel: "Heli Tours" },
  { label: "Shared Helicopter Flights", href: "/helicopter-tours/shared-helicopter-flights", groupLabel: "Heli Tours" },
  { label: "Muktinath Helicopter Tour", href: "/muktinath-helicopter-tour-nepal", groupLabel: "Pilgrimage Tours" },
  { label: "Muktinath Travel Guide", href: "/blog/muktinath-helicopter-tour-from-pokhara", groupLabel: "Pilgrimage Tours" },
  { label: "Contact", href: "/contact", groupLabel: null },
  { label: "Blog", href: "/blog", groupLabel: null }
] as const;

export const INQUIRY_SERVICES = [
  "Charter",
  "Heli Tours",
  "Pilgrimage Tours",
  "Emergency Flight Coordination",
  "Aerial Photography",
  "Cargo Transport",
  "Everest Region Helicopter Tour",
  "Annapurna Base Camp Tour",
  "Muktinath Pilgrimage Tour",
  "General Inquiry"
] as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sharingheli.com";

export const CANONICAL_HOST = "sharingheli.com";

export const IS_PRODUCTION_SITE = (() => {
  try {
    return new URL(SITE_URL).hostname === CANONICAL_HOST;
  } catch {
    return false;
  }
})();

export const CONTACT_SERVICE_PATHS = {
  charter: "/contact/charter",
  everest: "/contact/everest-base-camp-helicopter-tour",
  annapurna: "/contact/annapurna-base-camp-tour",
  muktinath: "/contact/muktinath-pilgrimage-tour"
} as const;
