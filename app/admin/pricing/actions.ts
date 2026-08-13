"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { PRICE_MODES } from "@/lib/tours/pricing";

const optionalNumber = z.preprocess(
  (value) => (value === "" || value == null ? null : Number(value)),
  z.number().nonnegative().finite().nullable()
);

const optionalDate = z.preprocess(
  (value) => (value === "" || value == null ? null : new Date(String(value))),
  z.date().nullable()
);

const pricingSchema = z
  .object({
    id: z.string().min(1),
    currency: z.string().trim().min(3).max(3).transform((value) => value.toUpperCase()),
    priceMode: z.enum(PRICE_MODES),
    sharedPriceFrom: optionalNumber,
    privateCharterPrice: optionalNumber,
    priceValidFrom: optionalDate,
    priceValidUntil: optionalDate,
    pricingNote: z.string().trim().max(500).optional(),
    sharedAvailable: z.string().optional(),
    privateAvailable: z.string().optional(),
    published: z.string().optional()
  })
  .superRefine((value, context) => {
    if (value.priceValidFrom && value.priceValidUntil && value.priceValidUntil < value.priceValidFrom) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["priceValidUntil"],
        message: "Price validity end cannot be before its start"
      });
    }
    if (value.priceMode === "SHARED_PER_PERSON" && value.sharedPriceFrom == null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sharedPriceFrom"],
        message: "Enter a shared fare before showing it publicly"
      });
    }
    if (value.priceMode === "PRIVATE_PER_AIRCRAFT" && value.privateCharterPrice == null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["privateCharterPrice"],
        message: "Enter a private aircraft fare before showing it publicly"
      });
    }
  });

export async function updateTourPricing(formData: FormData) {
  await requireAdminSession();
  const parsed = pricingSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    redirect("/admin/pricing?error=invalid-price");
  }

  const tour = await prisma.tour.update({
    where: { id: parsed.data.id },
    data: {
      currency: parsed.data.currency,
      priceMode: parsed.data.priceMode,
      sharedPriceFrom: parsed.data.sharedPriceFrom,
      privateCharterPrice: parsed.data.privateCharterPrice,
      priceValidFrom: parsed.data.priceValidFrom,
      priceValidUntil: parsed.data.priceValidUntil,
      lastVerifiedAt: parsed.data.priceMode === "LIVE_QUOTE" ? null : new Date(),
      pricingNote: parsed.data.pricingNote || null,
      sharedAvailable: parsed.data.sharedAvailable === "on",
      privateAvailable: parsed.data.privateAvailable === "on",
      published: parsed.data.published === "on"
    },
    select: { slug: true }
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/pricing");
  redirect(`/admin/pricing?saved=${encodeURIComponent(tour.slug)}`);
}
