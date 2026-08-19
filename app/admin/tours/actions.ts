"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-auth";
import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { TOUR_CATEGORIES } from "@/lib/tours/categories";
import { PRICE_MODES } from "@/lib/tours/pricing";
import { TOUR_REGIONS } from "@/lib/tours/regions";
import { isSafeLocalImageSource, optionalLocalImageSourceSchema, optionalSafePublicHrefSchema } from "@/lib/safe-url";
import { slugSchema } from "@/lib/admin-validation";

const optionalNumber = z.preprocess(
  (value) => (value === "" || value == null ? undefined : Number(value)),
  z.number().nonnegative().finite().optional()
);

const optionalDate = z.preprocess(
  (value) => (value === "" || value == null ? undefined : new Date(String(value))),
  z.date().optional()
);

const sortOrder = z.preprocess(
  (value) => Number(value),
  z.number().int().nonnegative()
);

function parseFaqs(value?: string) {
  if (!value) return [];

  const items = value
    .split("\n")
    .map((line) => {
      const separator = line.indexOf("|");
      if (separator < 1) return null;
      const question = line.slice(0, separator).trim();
      const answer = line.slice(separator + 1).trim();
      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));

  return items;
}

const localImageList = z.string().optional().refine(
  (value) => !value || value.split(",").map((item) => item.trim()).filter(Boolean).every(isSafeLocalImageSource),
  "Use local image paths beginning with /"
);

const tourSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  region: z.enum(TOUR_REGIONS),
  category: z.enum(TOUR_CATEGORIES),
  sortOrder,
  duration: z.string().min(1),
  currency: z.string().min(1),
  priceMode: z.enum(PRICE_MODES),
  sharedPriceFrom: optionalNumber,
  privateCharterPrice: optionalNumber,
  sharedAvailable: z.string().optional(),
  privateAvailable: z.string().optional(),
  departureCity: z.string().optional(),
  excerpt: z.string().optional(),
  overview: z.string().optional(),
  route: z.string().optional(),
  altitude: z.string().optional(),
  bestTime: z.string().optional(),
  weatherNotes: z.string().optional(),
  cancellationPolicy: z.string().optional(),
  passengerRequirements: z.string().optional(),
  weightSeating: z.string().optional(),
  whatToBring: z.string().optional(),
  photographyInfo: z.string().optional(),
  safetyNotes: z.string().optional(),
  faqs: z.string().optional(),
  operationalNotice: z.string().optional(),
  pricingNote: z.string().optional(),
  priceValidFrom: optionalDate,
  priceValidUntil: optionalDate,
  lastVerifiedAt: optionalDate,
  highlights: z.string().min(1),
  itinerary: z.string().min(1),
  inclusions: z.string().min(1),
  exclusions: z.string().min(1),
  images: localImageList,
  ctaLabel: z.string().optional(),
  ctaHref: optionalSafePublicHrefSchema,
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: optionalLocalImageSourceSchema,
  noindex: z.string().optional(),
  published: z.string().optional(),
  featured: z.string().optional()
}).superRefine((value, context) => {
  if (value.priceValidFrom && value.priceValidUntil && value.priceValidUntil < value.priceValidFrom) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["priceValidUntil"],
      message: "Price validity end cannot be before its start"
    });
  }
});

export async function createTour(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = tourSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.tour.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      region: parsed.data.region,
      category: parsed.data.category,
      sortOrder: parsed.data.sortOrder,
      duration: parsed.data.duration,
      priceFrom: null,
      currency: parsed.data.currency,
      priceMode: parsed.data.priceMode,
      sharedPriceFrom: parsed.data.sharedPriceFrom ?? null,
      privateCharterPrice: parsed.data.privateCharterPrice ?? null,
      sharedAvailable: parsed.data.sharedAvailable === "on",
      privateAvailable: parsed.data.privateAvailable === "on",
      departureCity: parsed.data.departureCity || null,
      excerpt: parsed.data.excerpt || null,
      overview: parsed.data.overview || null,
      route: parsed.data.route || null,
      altitude: parsed.data.altitude || null,
      bestTime: parsed.data.bestTime || null,
      weatherNotes: parsed.data.weatherNotes || null,
      cancellationPolicy: parsed.data.cancellationPolicy || null,
      passengerRequirements: parsed.data.passengerRequirements || null,
      weightSeating: parsed.data.weightSeating || null,
      whatToBring: parsed.data.whatToBring || null,
      photographyInfo: parsed.data.photographyInfo || null,
      safetyNotes: parsed.data.safetyNotes || null,
      faqs: parseFaqs(parsed.data.faqs),
      operationalNotice: parsed.data.operationalNotice || null,
      pricingNote: parsed.data.pricingNote || null,
      priceValidFrom: parsed.data.priceValidFrom ?? null,
      priceValidUntil: parsed.data.priceValidUntil ?? null,
      lastVerifiedAt: parsed.data.priceMode === "LIVE_QUOTE" ? null : parsed.data.lastVerifiedAt ?? new Date(),
      highlights: parsed.data.highlights,
      itinerary: parsed.data.itinerary,
      inclusions: parsed.data.inclusions,
      exclusions: parsed.data.exclusions,
      images: parsed.data.images ? parsed.data.images.split(",").map((item) => item.trim()).filter(Boolean) : [],
      ctaLabel: parsed.data.ctaLabel || null,
      ctaHref: parsed.data.ctaHref || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      ogImage: parsed.data.ogImage || null,
      noindex: parsed.data.noindex === "on",
      published: parsed.data.published === "on",
      featured: parsed.data.featured === "on"
    }
  });

  revalidatePath("/tours");
  revalidatePath(getCanonicalTourPath(parsed.data.slug));
  revalidatePath("/admin/tours");
  return;
}

export async function updateTour(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const data = Object.fromEntries(formData.entries());
  const parsed = tourSchema.safeParse(data);
  if (!parsed.success || !id) return;

  await prisma.tour.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      region: parsed.data.region,
      category: parsed.data.category,
      sortOrder: parsed.data.sortOrder,
      duration: parsed.data.duration,
      priceFrom: null,
      currency: parsed.data.currency,
      priceMode: parsed.data.priceMode,
      sharedPriceFrom: parsed.data.sharedPriceFrom ?? null,
      privateCharterPrice: parsed.data.privateCharterPrice ?? null,
      sharedAvailable: parsed.data.sharedAvailable === "on",
      privateAvailable: parsed.data.privateAvailable === "on",
      departureCity: parsed.data.departureCity || null,
      excerpt: parsed.data.excerpt || null,
      overview: parsed.data.overview || null,
      route: parsed.data.route || null,
      altitude: parsed.data.altitude || null,
      bestTime: parsed.data.bestTime || null,
      weatherNotes: parsed.data.weatherNotes || null,
      cancellationPolicy: parsed.data.cancellationPolicy || null,
      passengerRequirements: parsed.data.passengerRequirements || null,
      weightSeating: parsed.data.weightSeating || null,
      whatToBring: parsed.data.whatToBring || null,
      photographyInfo: parsed.data.photographyInfo || null,
      safetyNotes: parsed.data.safetyNotes || null,
      faqs: parseFaqs(parsed.data.faqs),
      operationalNotice: parsed.data.operationalNotice || null,
      pricingNote: parsed.data.pricingNote || null,
      priceValidFrom: parsed.data.priceValidFrom ?? null,
      priceValidUntil: parsed.data.priceValidUntil ?? null,
      lastVerifiedAt: parsed.data.priceMode === "LIVE_QUOTE" ? null : parsed.data.lastVerifiedAt ?? new Date(),
      highlights: parsed.data.highlights,
      itinerary: parsed.data.itinerary,
      inclusions: parsed.data.inclusions,
      exclusions: parsed.data.exclusions,
      images: parsed.data.images ? parsed.data.images.split(",").map((item) => item.trim()).filter(Boolean) : [],
      ctaLabel: parsed.data.ctaLabel || null,
      ctaHref: parsed.data.ctaHref || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      ogImage: parsed.data.ogImage || null,
      noindex: parsed.data.noindex === "on",
      published: parsed.data.published === "on",
      featured: parsed.data.featured === "on"
    }
  });

  revalidatePath("/tours");
  revalidatePath(getCanonicalTourPath(parsed.data.slug));
  revalidatePath("/admin/tours");
  return;
}

export async function deleteTour(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.tour.delete({ where: { id } });
  revalidatePath("/tours");
  revalidatePath("/admin/tours");
  return;
}
