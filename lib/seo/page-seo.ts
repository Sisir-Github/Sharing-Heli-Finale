import type { Metadata } from "next";

import { COMPANY, SITE_URL } from "@/lib/constants";
import type { SeoPageConfig } from "@/lib/seo/types";

const seoPages: Record<string, SeoPageConfig> = {
  "/": {
    path: "/",
    title: "Luxury Helicopter Tours & Charter in Nepal | Sharing Heli",
    description:
      "Experience luxury helicopter tours, private charter, pilgrimage flights, rescue support, and aerial services in Nepal with experienced mountain pilots at Sharing Heli.",
    keywords: [
      "luxury helicopter tour Nepal",
      "helicopter tours in Nepal",
      "helicopter charter Nepal",
      "Sharing Heli"
    ],
    primaryKeyword: "luxury helicopter tour Nepal"
  },
  "/services": {
    path: "/services",
    title: "Helicopter Services in Nepal | Charter, Rescue, Cargo",
    description:
      "Explore premium helicopter services in Nepal including charter, emergency rescue, aerial photography, pilgrimage flights, and cargo transport by Sharing Heli.",
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
      "Discover signature Nepal helicopter tours to Everest Base Camp, Annapurna Base Camp, and Muktinath with luxury comfort, safety-first planning, and direct support.",
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
    description:
      "Contact Sharing Heli Nepal Pvt. Ltd. for charter, tours, rescue, and pilgrimage flights. Call +977-9802855690 or WhatsApp +977-9856028155 for 24/7 support.",
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
  "/everest-base-camp-helicopter-tour-nepal": {
    path: "/everest-base-camp-helicopter-tour-nepal",
    title: "Everest Base Camp Helicopter Tour Nepal | Sharing Heli",
    description:
      "Book an Everest Base Camp helicopter tour in Nepal with expert mountain pilots, safety-focused operations, and premium aerial views from Sharing Heli.",
    keywords: [
      "Everest Base Camp helicopter tour Nepal",
      "Everest helicopter tour",
      "luxury Everest helicopter flight",
      "EBC heli tour Nepal"
    ],
    primaryKeyword: "Everest Base Camp helicopter tour Nepal"
  },
  "/annapurna-base-camp-helicopter-tour-nepal": {
    path: "/annapurna-base-camp-helicopter-tour-nepal",
    title: "Annapurna Base Camp Helicopter Tour Nepal | Sharing Heli",
    description:
      "Fly to Annapurna Base Camp by helicopter with premium comfort, scenic high-altitude routing, and trusted operations from Sharing Heli Nepal.",
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
      "Plan a Muktinath helicopter pilgrimage tour in Nepal with reliable scheduling, experienced crew, and smooth charter support from Sharing Heli.",
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
      "Arrange private helicopter charter in Nepal for business, travel, pilgrimage, or custom routes with fast coordination and premium service standards.",
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
    title: "Emergency Helicopter Rescue Nepal | Rapid Air Support",
    description:
      "Access rapid emergency helicopter rescue support in Nepal through experienced dispatch coordination and mountain flight expertise from Sharing Heli.",
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
    title: "Luxury Helicopter Tour Nepal | Premium Himalayan Flights",
    description:
      "Choose luxury helicopter tours in Nepal with curated itineraries, high-comfort cabin experience, and elite operational planning by Sharing Heli.",
    keywords: [
      "luxury helicopter tour Nepal",
      "premium helicopter Nepal",
      "VIP helicopter tour Nepal",
      "Himalayan luxury helicopter"
    ],
    primaryKeyword: "luxury helicopter tour Nepal"
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
  title: `${COMPANY.brandName} | Luxury Helicopter Service in Nepal`,
  description:
    "Premium helicopter charters, Himalayan tours, pilgrimage missions, emergency rescue, and aerial operations by Sharing Heli Nepal Pvt. Ltd.",
  keywords: ["Sharing Heli", "helicopter Nepal"],
  primaryKeyword: "helicopter Nepal"
};

function normalizePath(pathname: string) {
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }
  return pathname;
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

  const robots = config.noindex
    ? {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
          "max-image-preview": "large" as const
        }
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const
        }
      };

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-NP": canonicalUrl,
        "x-default": canonicalUrl
      }
    },
    openGraph: {
      type: "website",
      locale: "en_NP",
      title: config.title,
      description: config.description,
      siteName: COMPANY.brandName,
      url: canonicalUrl
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description
    },
    robots
  };
}

export const INDEXABLE_PATHS = Object.values(seoPages)
  .filter((page) => !page.noindex)
  .map((page) => page.path);
