import type { Metadata } from "next";

import { BRAND_ZH, buildLanguageAlternates, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import type { ZhPageContent } from "@/lib/i18n/zh";

const base = SITE_URL.replace(/\/$/, "");

/**
 * Metadata for a Chinese page, paired with its English counterpart through
 * reciprocal hreflang. Both directions must exist for search engines to treat
 * them as one cluster — the English side is emitted by buildLanguageAlternates
 * in lib/seo/page-seo.ts.
 */
export function buildZhMetadata(content: ZhPageContent): Metadata {
  const canonical = `${base}${content.path}`;
  const languages = buildLanguageAlternates(content.englishPath, true);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_NP"],
      title: content.metaTitle,
      description: content.metaDescription,
      siteName: BRAND_ZH.brandName,
      url: canonical,
      images: [{ url: content.heroImage, width: 1200, height: 630, alt: content.heroImageAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [content.heroImage]
    },
    other: {
      "content-language": "zh-Hans"
    },
    robots: IS_PRODUCTION_SITE
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: true }
  };
}
