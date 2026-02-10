"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const tourSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  duration: z.string().min(1),
  priceFrom: z.string().min(1),
  currency: z.string().min(1),
  highlights: z.string().min(1),
  itinerary: z.string().min(1),
  inclusions: z.string().min(1),
  exclusions: z.string().min(1),
  images: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  published: z.string().optional(),
  featured: z.string().optional()
});

export async function createTour(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = tourSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.tour.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      duration: parsed.data.duration,
      priceFrom: Number(parsed.data.priceFrom),
      currency: parsed.data.currency,
      highlights: parsed.data.highlights,
      itinerary: parsed.data.itinerary,
      inclusions: parsed.data.inclusions,
      exclusions: parsed.data.exclusions,
      images: parsed.data.images ? parsed.data.images.split(",").map((item) => item.trim()).filter(Boolean) : [],
      ctaLabel: parsed.data.ctaLabel || null,
      ctaHref: parsed.data.ctaHref || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      published: parsed.data.published === "on",
      featured: parsed.data.featured === "on"
    }
  });

  revalidatePath("/tours");
  revalidatePath("/admin/tours");
  return;
}

export async function updateTour(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = Object.fromEntries(formData.entries());
  const parsed = tourSchema.safeParse(data);
  if (!parsed.success || !id) return;

  await prisma.tour.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      duration: parsed.data.duration,
      priceFrom: Number(parsed.data.priceFrom),
      currency: parsed.data.currency,
      highlights: parsed.data.highlights,
      itinerary: parsed.data.itinerary,
      inclusions: parsed.data.inclusions,
      exclusions: parsed.data.exclusions,
      images: parsed.data.images ? parsed.data.images.split(",").map((item) => item.trim()).filter(Boolean) : [],
      ctaLabel: parsed.data.ctaLabel || null,
      ctaHref: parsed.data.ctaHref || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      published: parsed.data.published === "on",
      featured: parsed.data.featured === "on"
    }
  });

  revalidatePath("/tours");
  revalidatePath("/admin/tours");
  return;
}

export async function deleteTour(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.tour.delete({ where: { id } });
  revalidatePath("/tours");
  revalidatePath("/admin/tours");
  return;
}
