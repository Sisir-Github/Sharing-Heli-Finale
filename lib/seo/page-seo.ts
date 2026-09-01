import type { Metadata } from "next";

import { buildLanguageAlternates, COMPANY, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import { LANDING_META, LANDING_PAGES, LANDING_PATHS } from "@/lib/seo/landing";
import type { SeoPageConfig } from "@/lib/seo/types";

const seoPages: Record<string, SeoPageConfig> = {
  "/": {
    path: "/",
    title: "Helicopter Tours & Charter Nepal | Sharing Heli",
    description:
      "Plan shared helicopter flights and private charters in Nepal with Pokhara-based support, clear operational guidance, and current fare confirmation.",
    keywords: [
      "helicopter tours Nepal",
      "helicopter tours in Nepal",
      "helicopter charter Nepal",
      "Sharing Heli"
    ],
    primaryKeyword: "helicopter tours Nepal"
  },
  "/services": {
    path: "/services",
    title: "Helicopter Services Nepal | Charter & Flight Support",
    description:
      "Explore helicopter charter, shared tours, pilgrimage flight planning, urgent flight coordination, aerial photography, and cargo support in Nepal.",
    keywords: [
      "helicopter services Nepal",
      "emergency helicopter rescue Nepal",
      "helicopter cargo Nepal",
      "aerial photography helicopter Nepal"
    ],
    primaryKeyword: "helicopter services Nepal"
  },
  "/tours": {
    path: "/tours",
    title: "Nepal Helicopter Tours | Everest, Annapurna, Muktinath",
    description:
      "Explore helicopter tours for the Everest and Annapurna regions and Muktinath, with current availability and operational details confirmed directly.",
    keywords: [
      "Nepal helicopter tours",
      "Everest Base Camp helicopter tour",
      "Annapurna helicopter tour",
      "Muktinath helicopter tour"
    ],
    primaryKeyword: "Nepal helicopter tours"
  },
  "/contact": {
    path: "/contact",
    title: "Contact Sharing Heli Nepal | Book Helicopter Service",
    description: `Contact Sharing Heli Nepal for tours and charter planning. Call ${COMPANY.primaryPhone} or WhatsApp ${COMPANY.whatsappNumber} for current availability.`,
    keywords: [
      "contact helicopter Nepal",
      "book helicopter Nepal",
      "Sharing Heli contact",
      "Pokhara helicopter booking"
    ],
    primaryKeyword: "contact helicopter Nepal"
  },
  "/guides": {
    path: "/guides",
    title: "Nepal Helicopter Guides | Safety, Seasons, Planning",
    description:
      "Read expert Nepal helicopter guides on best travel seasons, Everest tour safety, and helicopter vs trekking comparisons from Sharing Heli.",
    keywords: [
      "Nepal helicopter guide",
      "Everest helicopter safety guide",
      "best season helicopter Nepal",
      "helicopter vs trekking Nepal"
    ],
    primaryKeyword: "Nepal helicopter guide"
  },
  "/safety-flight-information": {
    path: "/safety-flight-information",
    title: "Nepal Helicopter Safety & Flight Information Guide",
    description:
      "Review weather, passenger weight, baggage, operator disclosure, cancellation, and confirmation questions for helicopter flights in Nepal.",
    keywords: ["Nepal helicopter safety", "helicopter baggage Nepal", "helicopter weather policy Nepal"],
    primaryKeyword: "Nepal helicopter safety"
  },
  "/faq": {
    path: "/faq",
    title: "Nepal Helicopter Flight FAQs | Sharing Heli",
    description:
      "Read practical answers about helicopter availability, shared seats, private charter, weather, quotes, passenger details, and flight confirmation in Nepal.",
    keywords: ["Nepal helicopter flight FAQ", "helicopter booking questions Nepal"],
    primaryKeyword: "Nepal helicopter flight FAQ"
  },
  "/about-us": {
    path: "/about-us",
    title: "About Sharing Heli Nepal | Pokhara Flight Support",
    description:
      "Learn about Sharing Heli Nepal, its Lakeside Pokhara office, relationship with Pokhara Flight Centre, and flight coordination process.",
    keywords: ["Sharing Heli Nepal", "Pokhara helicopter flight support", "Sharing Heli Pokhara"],
    primaryKeyword: "Sharing Heli Nepal"
  },
  "/blog": {
    path: "/blog",
    title: "Nepal Helicopter Travel Articles | Sharing Heli",
    description:
      "Read practical Nepal helicopter travel articles covering weather, route planning, shared flights, passenger preparation, and charter decisions.",
    keywords: ["Nepal helicopter travel blog", "helicopter tour planning Nepal"],
    primaryKeyword: "Nepal helicopter travel blog"
  },
  "/destinations": {
    path: "/destinations",
    title: "Nepal Helicopter Destinations | Sharing Heli",
    description:
      "Review practical helicopter destination information for Annapurna, Everest, Muktinath, Pokhara, and custom route requests in Nepal.",
    keywords: ["Nepal helicopter destinations", "Annapurna helicopter route", "Everest helicopter route"],
    primaryKeyword: "Nepal helicopter destinations"
  },
  "/privacy-policy": {
    path: "/privacy-policy",
    title: "Privacy Policy | Sharing Heli Nepal",
    description: "Read how Sharing Heli Nepal handles inquiry, booking, invoice, and website information.",
    keywords: ["Sharing Heli privacy policy"],
    primaryKeyword: "Sharing Heli privacy policy"
  },
  "/terms-and-conditions": {
    path: "/terms-and-conditions",
    title: "Terms And Conditions | Sharing Heli Nepal",
    description:
      "Review general conditions for helicopter inquiries, quotes, bookings, payments, and weather-dependent flight planning in Nepal.",
    keywords: ["Sharing Heli terms and conditions"],
    primaryKeyword: "Sharing Heli terms and conditions"
  },
  "/helicopter-tours/shared-helicopter-flights": {
    path: "/helicopter-tours/shared-helicopter-flights",
    title: "Shared Helicopter Flights Nepal | Sharing Heli",
    description:
      "Learn how shared helicopter flights in Nepal work, request current seat availability, and compare per-person departures with private charter options.",
    keywords: ["shared helicopter flights Nepal", "helicopter seat sharing Nepal", "group joining helicopter Nepal"],
    primaryKeyword: "shared helicopter flights Nepal"
  },
  "/check-availability": {
    path: "/check-availability",
    title: "Reserve a Helicopter Flight | Sharing Heli Nepal",
    description: "Submit a helicopter reservation request for a preferred Nepal route and date, then receive current availability, pricing, and confirmation steps.",
    keywords: ["helicopter reservation Nepal"],
    primaryKeyword: "helicopter reservation Nepal",
    noindex: true
  },
  "/everest-base-camp-helicopter-tour-nepal": {
    path: "/everest-base-camp-helicopter-tour-nepal",
    title: "Everest Region Helicopter Tour Nepal | Sharing Heli",
    description:
      "Request an Everest region helicopter tour with routing, landing options, availability, and current fare confirmed for the day's operating conditions.",
    keywords: [
      "Everest Base Camp helicopter tour Nepal",
      "Everest helicopter tour",
      "Everest region helicopter flight",
      "EBC heli tour Nepal"
    ],
    primaryKeyword: "Everest Base Camp helicopter tour Nepal"
  },
  "/annapurna-base-camp-helicopter-tour-nepal": {
    path: "/annapurna-base-camp-helicopter-tour-nepal",
    title: "Annapurna Base Camp Helicopter Tour Nepal | Sharing Heli",
    description:
      "Request an Annapurna region helicopter flight from Pokhara with routing, landing conditions, and current quote details confirmed before booking.",
    keywords: [
      "Annapurna Base Camp helicopter tour Nepal",
      "Annapurna helicopter tour",
      "ABC helicopter package",
      "Annapurna heli flight"
    ],
    primaryKeyword: "Annapurna Base Camp helicopter tour Nepal"
  },
  "/muktinath-helicopter-tour-nepal": {
    path: "/muktinath-helicopter-tour-nepal",
    title: "Muktinath Helicopter Tour Nepal | Pilgrimage Flights",
    description:
      "Plan a Muktinath helicopter pilgrimage request from Pokhara with timing, landing access, weather, and current quote details reviewed first.",
    keywords: [
      "Muktinath helicopter tour Nepal",
      "Muktinath pilgrimage helicopter",
      "religious helicopter tour Nepal",
      "Muktinath charter"
    ],
    primaryKeyword: "Muktinath helicopter tour Nepal"
  },
  "/helicopter-charter-nepal": {
    path: "/helicopter-charter-nepal",
    title: "Private Helicopter Charter Nepal | Sharing Heli",
    description:
      "Arrange private helicopter charter in Nepal for business, travel, pilgrimage, or custom routes with direct route and availability coordination.",
    keywords: [
      "private helicopter charter Nepal",
      "helicopter charter Nepal",
      "VIP helicopter Nepal",
      "custom helicopter route Nepal"
    ],
    primaryKeyword: "private helicopter charter Nepal"
  },
  "/emergency-helicopter-rescue-nepal": {
    path: "/emergency-helicopter-rescue-nepal",
    title: "Emergency Helicopter Flight Coordination Nepal",
    description:
      "Request urgent helicopter flight coordination in Nepal. Dispatch remains subject to weather, aircraft, permissions, and operator confirmation.",
    keywords: [
      "emergency helicopter rescue Nepal",
      "mountain rescue helicopter Nepal",
      "air ambulance Nepal helicopter",
      "rescue helicopter Pokhara"
    ],
    primaryKeyword: "emergency helicopter rescue Nepal"
  },
  "/pokhara-helicopter-service": {
    path: "/pokhara-helicopter-service",
    title: "Pokhara Helicopter Service | Sharing Heli Nepal",
    description:
      "Get reliable helicopter service from Pokhara for tours, charter, rescue, and pilgrimage missions with trusted local expertise and responsive support.",
    keywords: [
      "Pokhara helicopter service",
      "helicopter from Pokhara",
      "Pokhara helicopter charter",
      "Pokhara helicopter tour"
    ],
    primaryKeyword: "Pokhara helicopter service"
  },
  "/luxury-helicopter-tour-nepal": {
    path: "/luxury-helicopter-tour-nepal",
    title: "Custom Helicopter Tour Nepal | Private Himalayan Flights",
    description:
      "Request a tailored Nepal helicopter tour with private routing, direct Pokhara coordination, and current operating details confirmed before booking.",
    keywords: [
      "custom helicopter tour Nepal",
      "private helicopter Nepal",
      "VIP helicopter tour Nepal",
      "Himalayan helicopter charter"
    ],
    primaryKeyword: "custom helicopter tour Nepal"
  },
  "/guides/best-time-helicopter-tours-nepal": {
    path: "/guides/best-time-helicopter-tours-nepal",
    title: "Best Time for Helicopter Tours in Nepal | Expert Guide",
    description:
      "Learn the best seasons, weather patterns, and flight windows for helicopter tours in Nepal with practical planning insights from Sharing Heli experts.",
    keywords: [
      "best time helicopter tours Nepal",
      "Nepal helicopter tour season",
      "Everest helicopter weather",
      "Annapurna helicopter best month"
    ],
    primaryKeyword: "best time helicopter tours Nepal"
  },
  "/guides/is-everest-base-camp-helicopter-tour-safe": {
    path: "/guides/is-everest-base-camp-helicopter-tour-safe",
    title: "Is Everest Helicopter Tour Safe? | Safety Guide Nepal",
    description:
      "Understand Everest Base Camp helicopter tour safety factors, altitude planning, weather checks, and operational safeguards in this expert Nepal guide.",
    keywords: [
      "is Everest helicopter tour safe",
      "Everest helicopter safety",
      "EBC helicopter risk",
      "Nepal helicopter tour safety"
    ],
    primaryKeyword: "is Everest helicopter tour safe"
  },
  "/guides/helicopter-vs-trekking-nepal": {
    path: "/guides/helicopter-vs-trekking-nepal",
    title: "Helicopter vs Trekking in Nepal | Which Is Better?",
    description:
      "Compare helicopter tours and trekking in Nepal by time, comfort, safety, cost, and accessibility to choose the right Himalayan travel experience.",
    keywords: [
      "helicopter vs trekking Nepal",
      "Everest helicopter vs trek",
      "Annapurna helicopter vs trekking",
      "Nepal travel comparison"
    ],
    primaryKeyword: "helicopter vs trekking Nepal"
  },
  "/contact/charter": {
    path: "/contact/charter",
    canonicalPath: "/contact",
    title: "Charter Inquiry | Sharing Heli Nepal",
    description: "Send a private helicopter charter inquiry to Sharing Heli Nepal.",
    keywords: ["charter inquiry Nepal"],
    primaryKeyword: "charter inquiry Nepal",
    noindex: true
  },
  "/contact/everest-base-camp-helicopter-tour": {
    path: "/contact/everest-base-camp-helicopter-tour",
    canonicalPath: "/contact",
    title: "Everest Tour Inquiry | Sharing Heli Nepal",
    description: "Send an Everest Base Camp helicopter tour inquiry to Sharing Heli Nepal.",
    keywords: ["Everest tour inquiry Nepal"],
    primaryKeyword: "Everest tour inquiry Nepal",
    noindex: true
  },
  "/contact/annapurna-base-camp-tour": {
    path: "/contact/annapurna-base-camp-tour",
    canonicalPath: "/contact",
    title: "Annapurna Tour Inquiry | Sharing Heli Nepal",
    description: "Send an Annapurna Base Camp helicopter tour inquiry to Sharing Heli Nepal.",
    keywords: ["Annapurna tour inquiry Nepal"],
    primaryKeyword: "Annapurna tour inquiry Nepal",
    noindex: true
  },
  "/contact/muktinath-pilgrimage-tour": {
    path: "/contact/muktinath-pilgrimage-tour",
    canonicalPath: "/contact",
    title: "Muktinath Inquiry | Sharing Heli Nepal",
    description: "Send a Muktinath pilgrimage helicopter tour inquiry to Sharing Heli Nepal.",
    keywords: ["Muktinath inquiry Nepal"],
    primaryKeyword: "Muktinath inquiry Nepal",
    noindex: true
  }
};

const fallbackSeo: SeoPageConfig = {
  path: "/",
  title: `${COMPANY.brandName} | Helicopter Service in Nepal`,
  description:
    "Shared helicopter flights, private charters, Himalayan tours, and flight coordination by Sharing Heli Nepal.",
  keywords: ["Sharing Heli", "helicopter Nepal"],
  primaryKeyword: "helicopter Nepal"
};

function normalizePath(pathname: string) {
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }
  return pathname;
}

// High-intent landing pages register their metadata here so sitemap, hreflang
// and metadata generation all pick them up from one place.
for (const path of LANDING_PATHS) {
  const meta = LANDING_META[path];
  const landing = LANDING_PAGES[path];
  if (meta) {
    seoPages[path] = { path, ...meta, ...(landing?.heroImage ? { ogImage: landing.heroImage } : {}) };
  }
}

export function getPageSeo(pathname: string) {
  return seoPages[normalizePath(pathname)] || fallbackSeo;
}

function toAbsoluteUrl(pathname: string) {
  const cleanSiteUrl = SITE_URL.replace(/\/$/, "");
  const cleanPath = normalizePath(pathname);
  return `${cleanSiteUrl}${cleanPath}`;
}

export function buildPageMetadata(pathname: string): Metadata {
  const config = getPageSeo(pathname);
  const canonicalPath = config.canonicalPath || config.path;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);

  const robots = config.noindex || !IS_PRODUCTION_SITE
    ? {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1
        }
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1
        }
      };

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternates(config.path, CHINESE_PAGE_PATHS.has(config.path))
    },
    openGraph: {
      type: "website",
      locale: "en_NP",
      title: config.title,
      description: config.description,
      siteName: COMPANY.brandName,
      url: canonicalUrl,
      images: [
        {
          url: config.ogImage || "/images/campaign/sharing-heli-hero.jpg",
          width: 1200,
          height: 630,
          alt: config.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.ogImage || "/images/campaign/sharing-heli-hero.jpg"]
    },
    robots
  };
}

/**
 * Paths that also exist under /zh. Used to emit correct hreflang pairs — never
 * list a path here until the Chinese page actually ships, or Google will drop
 * the annotation for the whole cluster.
 */
export const CHINESE_PAGE_PATHS = new Set<string>([
  "/",
  "/tours",
  "/services",
  "/about-us",
  "/contact",
  "/faq",
  "/everest-base-camp-helicopter-tour-nepal",
  "/annapurna-base-camp-helicopter-tour-nepal",
  "/muktinath-helicopter-tour-nepal"
]);

/** Full SEO page registry, exposed for sitemap, llms.txt and internal linking. */
export const SEO_PAGES = seoPages;

export const INDEXABLE_PATHS = Object.values(seoPages)
  .filter((page) => !page.noindex)
  .map((page) => page.path);
