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
  { label: "Services", href: "/services", groupLabel: null },
  { label: "Heli Tours", href: "/tours", groupLabel: null },
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

/**
 * The one hostname allowed to be indexed.
 *
 * Any other host - a staging subdomain such as new.sharingheli.com, a preview
 * URL, or localhost - serves robots.txt as "Disallow: /" and a noindex meta on
 * every page. That default is deliberate: a fully crawlable copy of the site on
 * a second hostname competes with the real domain for the same keywords and
 * splits its ranking signals.
 *
 * To make a different host the indexable one, set NEXT_PUBLIC_CANONICAL_HOST
 * and NEXT_PUBLIC_SITE_URL to match, then rebuild (NEXT_PUBLIC_* values are
 * compiled into the bundle).
 */
export const CANONICAL_HOST = process.env.NEXT_PUBLIC_CANONICAL_HOST || "sharingheli.com";

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

/* ---------------------------------------------------------------------------
 * Internationalisation
 * ------------------------------------------------------------------------- */

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_CONFIG: Record<Locale, {
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  pathPrefix: string;
  label: string;
  schemaLanguage: string;
}> = {
  en: {
    htmlLang: "en-NP",
    hreflang: "en",
    ogLocale: "en_NP",
    pathPrefix: "",
    label: "English",
    schemaLanguage: "English"
  },
  zh: {
    htmlLang: "zh-Hans",
    hreflang: "zh-Hans",
    ogLocale: "zh_CN",
    pathPrefix: "/zh",
    label: "简体中文",
    schemaLanguage: "Chinese"
  }
};

/** Localised brand naming used in Chinese metadata, schema and page copy. */
export const BRAND_ZH = {
  companyName: "尼泊尔共享直升机",
  brandName: "Sharing Heli Nepal 尼泊尔共享直升机",
  tagline: "尼泊尔直升机观光与包机服务",
  city: "博卡拉",
  country: "尼泊尔"
} as const;

/**
 * Builds the hreflang alternate map for a canonical English path.
 * Only pass paths that genuinely exist in both languages.
 */
export function buildLanguageAlternates(englishPath: string, hasChinese: boolean) {
  const base = SITE_URL.replace(/\/$/, "");
  const path = englishPath === "/" ? "" : englishPath;
  const languages: Record<string, string> = {
    en: `${base}${path || "/"}`,
    "en-NP": `${base}${path || "/"}`,
    "x-default": `${base}${path || "/"}`
  };
  if (hasChinese) {
    languages["zh-Hans"] = `${base}/zh${path}`;
    languages["zh-CN"] = `${base}/zh${path}`;
  }
  return languages;
}

/* ---------------------------------------------------------------------------
 * Entity signals (sameAs) — real, verifiable profiles only.
 * Add extra profiles via NEXT_PUBLIC_PROFILE_URLS as a comma-separated list.
 * ------------------------------------------------------------------------- */

export function getSameAsProfiles(extraLinks: Array<{ href: string }> = []) {
  const fromEnv = (process.env.NEXT_PUBLIC_PROFILE_URLS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const all = [
    ...COMPANY.socialLinks.map((link) => link.href),
    ...extraLinks.map((link) => link.href),
    COMPANY.operatorUrl,
    ...fromEnv
  ];
  return Array.from(new Set(all.filter((href) => /^https?:\/\//i.test(href))));
}

/* ---------------------------------------------------------------------------
 * Search-engine verification tokens (set the ones you actually own)
 * ------------------------------------------------------------------------- */

export const SEARCH_VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
  baidu: process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION || "",
  sogou: process.env.NEXT_PUBLIC_SOGOU_SITE_VERIFICATION || "",
  shenma: process.env.NEXT_PUBLIC_SHENMA_SITE_VERIFICATION || "",
  so360: process.env.NEXT_PUBLIC_360_SITE_VERIFICATION || "",
  yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || "",
  naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || ""
} as const;
