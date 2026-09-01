import type { FaqItem } from "@/lib/seo/types";

export type LandingSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LandingTable = {
  caption: string;
  note?: string;
  columns: string[];
  rows: string[][];
};

export type LandingContent = {
  path: string;
  eyebrow: string;
  title: string;
  /** One-paragraph direct answer. This is what answer engines quote. */
  answer: string;
  heroImage: string;
  heroImageAlt: string;
  /** Short, scannable facts — the highest-value block for AI extraction. */
  quickFacts: Array<{ label: string; value: string }>;
  sections: LandingSection[];
  table?: LandingTable;
  steps?: Array<{ name: string; text: string }>;
  faqs: FaqItem[];
  related: Array<{ title: string; description: string; href: string }>;
  about?: string[];
  breadcrumbParent?: { name: string; path: string };
  ctaHeading?: string;
  ctaBody?: string;
  /** Regex matching routes in lib/seo/market-rates.ts to show as cited context. */
  marketRatePattern?: RegExp;
  marketRateHeading?: string;
  /** ISO date this page was last fact-checked by the Pokhara desk. */
  reviewedOn?: string;
  /** Search metadata. Falls back to title/answer when omitted. */
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};
