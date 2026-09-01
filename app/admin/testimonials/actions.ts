"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { normalizeMessage, normalizeSingleLine } from "@/lib/utils";

const testimonialSchema = z.object({
  quote: z.string().trim().min(20, "Quote is too short").max(1200),
  name: z.string().trim().min(2, "Reviewer name is required").max(80),
  detail: z.string().trim().min(2, "Add the route or flight").max(120),
  rating: z.union([z.coerce.number().int().min(1).max(5), z.literal("")]).optional(),
  source: z.string().trim().max(60).optional(),
  sourceUrl: z.union([z.string().trim().url(), z.literal("")]).optional(),
  reviewedOn: z.union([z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")]).optional(),
  tourSlug: z.string().trim().max(120).optional(),
  order: z.coerce.number().int().min(0).max(999),
  visible: z.string().optional()
});

// Widened until the Prisma client is regenerated with the review SEO fields.
type TestimonialWriteData = Parameters<typeof prisma.testimonial.create>[0]["data"];

function toData(formData: FormData) {
  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid testimonial");
  const data = parsed.data;
  return {
    quote: normalizeMessage(data.quote, 1200),
    name: normalizeSingleLine(data.name, 80),
    detail: normalizeSingleLine(data.detail, 120),
    rating: typeof data.rating === "number" ? data.rating : null,
    source: data.source ? normalizeSingleLine(data.source, 60) : null,
    sourceUrl: data.sourceUrl ? data.sourceUrl : null,
    reviewedOn: data.reviewedOn ? new Date(`${data.reviewedOn}T00:00:00.000Z`) : null,
    tourSlug: data.tourSlug ? normalizeSingleLine(data.tourSlug, 120) : null,
    order: data.order,
    visible: data.visible === "on"
  };
}

function revalidate() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(formData: FormData) {
  await requireAdminSession();
  await prisma.testimonial.create({ data: toData(formData) as unknown as TestimonialWriteData });
  revalidate();
}

export async function updateTestimonial(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing testimonial id");
  await prisma.testimonial.update({ where: { id }, data: toData(formData) as unknown as TestimonialWriteData });
  revalidate();
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing testimonial id");
  await prisma.testimonial.delete({ where: { id } });
  revalidate();
}
