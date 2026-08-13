import { COMPANY, SITE_URL } from "@/lib/constants";
import type { BreadcrumbItem, FaqItem, ReviewInput, TourProductSchemaInput } from "@/lib/seo/types";

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const base = SITE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

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
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: resolved.companyName,
    alternateName: resolved.brandName,
    url: SITE_URL,
    email: resolved.email,
    telephone: resolved.primaryPhone,
    slogan: resolved.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: resolved.primaryPhone,
        email: resolved.email,
        availableLanguage: ["English"]
      },
      {
        "@type": "ContactPoint",
        contactType: "whatsapp",
        telephone: resolved.whatsappNumber,
        url: `https://wa.me/${resolved.whatsappNumber.replace(/[^\d]/g, "")}`,
        availableLanguage: ["English"]
      }
    ]
  };
}

export function buildLocalBusinessSchema(settings?: SchemaSettings) {
  const resolved = resolveSettings(settings);
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    name: resolved.companyName,
    url: SITE_URL,
    telephone: resolved.primaryPhone,
    email: resolved.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${resolved.addressLine1}, ${resolved.addressLine2}, ${resolved.addressLine3}`,
      addressLocality: "Pokhara",
      postalCode: "33700",
      addressRegion: "Gandaki Province",
      addressCountry: resolved.addressLine4 || "Nepal"
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Nepal"
      }
    ]
  };
}

export function buildWebSiteSchema(settings?: SchemaSettings) {
  const resolved = resolveSettings(settings);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: resolved.brandName,
    url: SITE_URL,
    inLanguage: "en-NP"
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
