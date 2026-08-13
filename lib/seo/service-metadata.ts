import type { Metadata } from "next";

import { COMPANY, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/page-seo";

type ServiceMetadataInput = {
  title: string;
  shortDescription: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
  noindex?: boolean;
};

export function buildServiceMetadata(service: ServiceMetadataInput | null, path: string): Metadata {
  if (!service) return buildPageMetadata(path);

  const canonical = `${SITE_URL.replace(/\/$/, "")}${path}`;
  const title = service.seoTitle || service.title;
  const description = service.seoDescription || service.shortDescription;
  const image = service.ogImage || "/images/campaign/sharing-heli-hero.jpg";

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
      images: [{ url: image, alt: service.title }]
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: service.noindex || !IS_PRODUCTION_SITE
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
  };
}
