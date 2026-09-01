import { BRAND_ZH, COMPANY, getSameAsProfiles, SITE_URL } from "@/lib/constants";
import type { BreadcrumbItem, FaqItem, ReviewInput, TourProductSchemaInput } from "@/lib/seo/types";

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const base = SITE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export const ORG_ID = `${SITE_URL.replace(/\/$/, "")}/#organization`;
export const BUSINESS_ID = `${SITE_URL.replace(/\/$/, "")}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL.replace(/\/$/, "")}/#website`;

type SchemaSettings = {
  companyName: string;
  brandName: string;
  tagline: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4?: string | null;
  logoImage?: string | null;
  socialLinks?: Array<{ href: string; visible?: boolean }>;
};

function resolveSettings(settings?: SchemaSettings) {
  return settings ?? {
    companyName: COMPANY.companyName,
    brandName: COMPANY.brandName,
    tagline: COMPANY.tagline,
    primaryPhone: COMPANY.primaryPhone,
    whatsappNumber: COMPANY.whatsappNumber,
    email: COMPANY.inquiryEmail,
    operatingUnder: COMPANY.operator,
    addressLine1: COMPANY.address.line1,
    addressLine2: COMPANY.address.line2,
    addressLine3: COMPANY.address.line3,
    addressLine4: COMPANY.address.country
  };
}

export function buildOrganizationSchema(settings?: SchemaSettings) {
  const resolved = resolveSettings(settings);
  const sameAs = getSameAsProfiles((settings?.socialLinks || []).filter((link) => link.visible !== false));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: resolved.companyName,
    alternateName: [resolved.brandName, BRAND_ZH.brandName, BRAND_ZH.companyName],
    url: SITE_URL,
    email: resolved.email,
    telephone: resolved.primaryPhone,
    slogan: resolved.tagline,
    description: resolved.tagline,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(resolved.logoImage || "/images/sharing-heli-logo.png"),
      caption: resolved.companyName
    },
    image: absoluteUrl("/images/campaign/sharing-heli-hero.jpg"),
    knowsLanguage: ["en", "ne", "hi", "zh-Hans"],
    areaServed: [
      { "@type": "Country", name: "Nepal" },
      { "@type": "AdministrativeArea", name: "Gandaki Province" },
      { "@type": "Place", name: "Everest / Khumbu region" },
      { "@type": "Place", name: "Annapurna region" },
      { "@type": "Place", name: "Mustang and Muktinath" },
      { "@type": "Place", name: "Langtang and Gosaikunda" }
    ],
    parentOrganization: {
      "@type": "Organization",
      name: COMPANY.operator,
      url: COMPANY.operatorUrl
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${resolved.addressLine1}, ${resolved.addressLine2}`,
      addressLocality: "Pokhara",
      postalCode: "33700",
      addressRegion: "Gandaki Province",
      addressCountry: "NP"
    },
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: resolved.primaryPhone,
        email: resolved.email,
        areaServed: "NP",
        availableLanguage: ["English", "Nepali", "Hindi", "Chinese"]
      },
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        telephone: resolved.whatsappNumber,
        url: `https://wa.me/${resolved.whatsappNumber.replace(/[^\d]/g, "")}`,
        availableLanguage: ["English", "Nepali", "Chinese"]
      }
    ]
  };
}

export function buildLocalBusinessSchema(settings?: SchemaSettings) {
  const resolved = resolveSettings(settings);
  const sameAs = getSameAsProfiles((settings?.socialLinks || []).filter((link) => link.visible !== false));

  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "TouristInformationCenter"],
    "@id": BUSINESS_ID,
    name: resolved.companyName,
    alternateName: BRAND_ZH.companyName,
    description: resolved.tagline,
    url: SITE_URL,
    telephone: resolved.primaryPhone,
    email: resolved.email,
    image: [
      absoluteUrl("/images/campaign/sharing-heli-hero.jpg"),
      absoluteUrl("/images/campaign/everest-helicopter.jpg"),
      absoluteUrl("/images/campaign/annapurna-helicopter.jpg")
    ],
    logo: absoluteUrl(resolved.logoImage || "/images/sharing-heli-logo.png"),
    hasMap: COMPANY.googleMapsUrl,
    parentOrganization: { "@id": ORG_ID },
    currenciesAccepted: "USD, NPR",
    paymentAccepted: "Bank transfer, card, cash",
    priceRange: "$$$",
    knowsLanguage: ["en", "ne", "hi", "zh-Hans"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${resolved.addressLine1}, ${resolved.addressLine2}`,
      addressLocality: "Pokhara",
      postalCode: "33700",
      addressRegion: "Gandaki Province",
      addressCountry: "NP"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "23:00"
      }
    ],
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: [
      { "@type": "Country", name: "Nepal" },
      { "@type": "Place", name: "Everest Base Camp" },
      { "@type": "Place", name: "Annapurna Base Camp" },
      { "@type": "Place", name: "Muktinath" },
      { "@type": "Place", name: "Langtang" }
    ]
  };
}

export function buildWebSiteSchema(settings?: SchemaSettings) {
  const resolved = resolveSettings(settings);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: resolved.brandName,
    alternateName: BRAND_ZH.brandName,
    url: SITE_URL,
    inLanguage: ["en-NP", "zh-Hans"],
    publisher: { "@id": ORG_ID },
    copyrightHolder: { "@id": ORG_ID }
  };
}

export function buildArticleSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  author?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.publishedAt ? { datePublished: new Date(input.publishedAt).toISOString() } : {}),
    ...(input.updatedAt ? { dateModified: new Date(input.updatedAt).toISOString() } : {}),
    author: {
      "@type": "Organization",
      name: input.author || COMPANY.brandName,
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.companyName,
      url: SITE_URL
    },
    inLanguage: "en-NP"
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildProductSchema(input: TourProductSchemaInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    category: "Helicopter Tour",
    brand: {
      "@type": "Brand",
      name: COMPANY.brandName
    },
    url: absoluteUrl(input.path),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Duration",
        value: input.duration
      }
    ]
  };

  if (input.price != null) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: input.currency || "USD",
      price: input.price,
      ...(input.priceValidUntil ? { priceValidUntil: new Date(input.priceValidUntil).toISOString().slice(0, 10) } : {}),
      url: absoluteUrl(input.path),
      seller: {
        "@type": "Organization",
        name: COMPANY.companyName
      }
    };
  }

  return schema;
}

export function buildReviewSchema(review: ReviewInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.authorName
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.ratingValue,
      bestRating: review.bestRating || 5
    }
  };
}

/* ---------------------------------------------------------------------------
 * Travel-specific schema
 * ------------------------------------------------------------------------- */

type TouristTripInput = {
  name: string;
  description: string;
  path: string;
  image?: string;
  duration?: string;
  departureCity?: string | null;
  region?: string | null;
  price?: number | null;
  currency?: string;
  priceValidUntil?: Date | string | null;
  highlights?: string[];
};

/**
 * TouristTrip is the type Google actually understands for a guided route.
 * Product/Offer is emitted separately where a verified price exists — the two
 * are complementary, not duplicates.
 */
export function buildTouristTripSchema(input: TouristTripInput) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: input.name,
    description: input.description,
    url,
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.duration ? { estimatedDuration: input.duration } : {}),
    touristType: ["Sightseeing", "Adventure travel", "Pilgrimage", "Photography"],
    provider: { "@id": ORG_ID },
    ...(input.departureCity
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: { "@type": "Place", name: input.departureCity, address: { "@type": "PostalAddress", addressCountry: "NP" } }
              },
              ...(input.region
                ? [
                    {
                      "@type": "ListItem",
                      position: 2,
                      item: { "@type": "Place", name: input.region, address: { "@type": "PostalAddress", addressCountry: "NP" } }
                    }
                  ]
                : [])
            ]
          }
        }
      : {}),
    ...(input.price
      ? {
          offers: {
            "@type": "Offer",
            price: input.price,
            priceCurrency: input.currency || "USD",
            availability: "https://schema.org/InStock",
            url,
            ...(input.priceValidUntil
              ? { priceValidUntil: new Date(input.priceValidUntil).toISOString().slice(0, 10) }
              : {}),
            seller: { "@id": ORG_ID }
          }
        }
      : {})
  };
}

export function buildTouristDestinationSchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  includes?: string[];
}) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${url}#destination`,
    name: input.name,
    description: input.description,
    url,
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    address: { "@type": "PostalAddress", addressCountry: "NP" },
    ...(input.latitude && input.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: input.latitude, longitude: input.longitude } }
      : {}),
    ...(input.includes?.length
      ? { includesAttraction: input.includes.map((name) => ({ "@type": "TouristAttraction", name })) }
      : {}),
    touristType: ["Sightseeing", "Adventure travel", "Pilgrimage"]
  };
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  image?: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    serviceType: input.serviceType || "Helicopter charter and tour coordination",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Nepal" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/check-availability"),
      servicePhone: COMPANY.primaryPhone,
      availableLanguage: ["English", "Nepali", "Chinese"]
    },
    ...(input.image ? { image: absoluteUrl(input.image) } : {})
  };
}

/** Listing pages: tells search engines what the collection contains and in what order. */
export function buildItemListSchema(input: {
  name: string;
  path: string;
  items: Array<{ name: string; path: string; description?: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(input.path)}#itemlist`,
    name: input.name,
    numberOfItems: input.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.image ? { image: absoluteUrl(item.image) } : {})
    }))
  };
}

export function buildHowToSchema(input: {
  name: string;
  description: string;
  path: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: input.name,
    description: input.description,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#step-${index + 1}`
    }))
  };
}

/**
 * WebPage node with `speakable`. Speakable marks the passages an assistant or
 * voice surface should read aloud — which in practice is the answer-first
 * summary at the top of each page.
 */
export function buildWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
  inLanguage?: string;
  dateModified?: Date | string;
  primaryImage?: string;
  about?: string[];
  /** Set when a named desk has fact-checked the page (E-E-A-T signal). */
  reviewedOn?: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: input.inLanguage || "en-NP",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(input.primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(input.primaryImage) } }
      : {}),
    ...(input.dateModified ? { dateModified: new Date(input.dateModified).toISOString() } : {}),
    ...(input.about?.length ? { about: input.about.map((name) => ({ "@type": "Thing", name })) } : {}),
    author: { "@id": ORG_ID },
    ...(input.reviewedOn
      ? {
          reviewedBy: { "@id": ORG_ID },
          lastReviewed: input.reviewedOn
        }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]", "h1"]
    }
  };
}

/* ---------------------------------------------------------------------------
 * Reviews — emitted only from verified, attributable review data.
 * ------------------------------------------------------------------------- */

export type VerifiedReview = {
  id: string;
  author: string;
  rating: number;
  body: string;
  datePublished: string;
  source?: string;
  sourceUrl?: string;
  itemPath?: string;
};

/**
 * Returns Review + AggregateRating nodes, or null when there is no real review
 * data. Never call this with invented reviews: fabricated rating markup is a
 * documented cause of manual spam actions, and the rich result is worthless if
 * it gets the site penalised.
 */
export function buildReviewGraph(reviews: VerifiedReview[], itemPath = "/") {
  if (!reviews.length) return null;
  const url = absoluteUrl(itemPath);
  const ratings = reviews.map((review) => review.rating).filter((value) => value > 0);
  if (!ratings.length) return null;
  const average = ratings.reduce((total, value) => total + value, 0) / ratings.length;

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": BUSINESS_ID,
    name: COMPANY.companyName,
    url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(average.toFixed(1)),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      "@id": `${url}#review-${review.id}`,
      author: { "@type": "Person", name: review.author },
      datePublished: review.datePublished,
      reviewBody: review.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      ...(review.sourceUrl ? { url: review.sourceUrl } : {}),
      ...(review.source ? { publisher: { "@type": "Organization", name: review.source } } : {})
    }))
  };
}
