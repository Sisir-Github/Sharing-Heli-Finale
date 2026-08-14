"use server";

import { randomBytes } from "node:crypto";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { FLIGHT_TYPES, PAYMENT_STATUSES, RESERVATION_STATUSES } from "@/lib/reservations";
import { getNepalDateInput, isValidDateInput } from "@/lib/date";
import { whatsappNumberSchema } from "@/lib/validation";

const optionalAmount = z.preprocess(
  (value) => (value === "" || value == null ? null : Number(value)),
  z.number().nonnegative().finite().nullable()
);

const optionalDate = z.preprocess(
  (value) => (value === "" || value == null ? null : new Date(`${String(value)}T12:00:00.000Z`)),
  z.date().nullable()
);

const updateSchema = z
  .object({
    id: z.string().min(1),
    status: z.enum(RESERVATION_STATUSES),
    paymentStatus: z.enum(PAYMENT_STATUSES),
    confirmedDate: optionalDate,
    quotedAmount: optionalAmount,
    depositAmount: optionalAmount,
    currency: z.string().trim().min(3).max(3).transform((value) => value.toUpperCase()),
    assignedAircraft: z.string().trim().max(100).optional(),
    pickupPoint: z.string().trim().max(120).optional(),
    adminNotes: z.string().trim().max(2000).optional()
  })
  .superRefine((value, context) => {
    if (value.quotedAmount != null && value.depositAmount != null && value.depositAmount > value.quotedAmount) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["depositAmount"],
        message: "Deposit cannot exceed the quoted amount"
      });
    }
  });

export async function updateReservation(formData: FormData) {
  await requireAdminSession();
  const parsed = updateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return;

  await prisma.reservation.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      paymentStatus: parsed.data.paymentStatus,
      confirmedDate: parsed.data.confirmedDate,
      quotedAmount: parsed.data.quotedAmount,
      depositAmount: parsed.data.depositAmount,
      currency: parsed.data.currency,
      assignedAircraft: parsed.data.assignedAircraft || null,
      pickupPoint: parsed.data.pickupPoint || null,
      adminNotes: parsed.data.adminNotes || null
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
}

const manualSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  customerEmail: z.string().trim().email().max(120),
  customerPhone: whatsappNumberSchema,
  routeName: z.string().trim().min(2).max(120),
  flightType: z.enum(FLIGHT_TYPES),
  preferredDate: z.string().refine(isValidDateInput, "Choose a valid date"),
  passengers: z.coerce.number().int().min(1).max(20),
  customerNotes: z.string().trim().max(800).optional()
});

export async function createManualReservation(formData: FormData) {
  await requireAdminSession();
  const parsed = manualSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return;
  if (parsed.data.preferredDate < getNepalDateInput()) return;
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");

  await prisma.reservation.create({
    data: {
      bookingReference: `SH-${date}-${randomBytes(3).toString("hex").toUpperCase()}`,
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail.toLowerCase(),
      customerPhone: parsed.data.customerPhone,
      routeName: parsed.data.routeName,
      flightType: parsed.data.flightType,
      preferredDate: new Date(`${parsed.data.preferredDate}T12:00:00.000Z`),
      passengers: parsed.data.passengers,
      customerNotes: parsed.data.customerNotes || null,
      source: "admin"
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
}
