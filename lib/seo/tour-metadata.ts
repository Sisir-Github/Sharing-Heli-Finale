import type { Metadata } from "next";

import { COMPANY, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/page-seo";

type TourMetadataInput = {
  title: string;
  highlights: string;
  excerpt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
  noindex?: boolean;
};

export function buildTourMetadata(tour: TourMetadataInput | null, path: string): Metadata {
  if (!tour) return buildPageMetadata(path);

  const baseUrl = SITE_URL.replace(/\/$/, "");
  const canonical = `${baseUrl}${path}`;
  const title = tour.seoTitle || tour.title;
  const description = tour.seoDescription || tour.excerpt || tour.highlights;
  const image = tour.ogImage || "/images/campaign/sharing-heli-hero.jpg";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_NP",
      title,
      description,
      siteName: COMPANY.brandName,
      url: canonical,
      images: [{ url: image, alt: tour.title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: tour.noindex || !IS_PRODUCTION_SITE
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
  };
}
