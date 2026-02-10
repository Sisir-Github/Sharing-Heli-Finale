export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoPageConfig = {
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
  fromPriceUsd: number;
  duration: string;
};

export type ReviewInput = {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
};
