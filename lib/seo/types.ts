export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoPageConfig = {
  /** Page-specific social share image. Falls back to the site hero. */
  ogImage?: string;
  path: string;
  canonicalPath?: string;
  title: string;
  description: string;
  keywords: string[];
  primaryKeyword: string;
  noindex?: boolean;
};

export type TourProductSchemaInput = {
  name: string;
  description: string;
  path: string;
  price?: number;
  currency?: string;
  priceValidUntil?: Date | string | null;
  duration: string;
};

export type ReviewInput = {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
};
