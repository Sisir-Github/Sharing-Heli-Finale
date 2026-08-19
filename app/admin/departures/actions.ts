"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { isValidDateInput } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import { normalizeSingleLine } from "@/lib/utils";

const departureSchema = z.object({
  tourId: z.string().trim().optional(),
  routeName: z.string().trim().min(2, "Route name is required").max(160),
  departureDate: z.string().trim().refine(isValidDateInput, "Provide a valid departure date"),
  departureTime: z.string().trim().max(40).optional(),
  seatsTotal: z.coerce.number().int().min(1).max(20),
  seatsBooked: z.coerce.number().int().min(0).max(20),
  pricePerSeat: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? Number(value) : null))
    .refine((value) => value === null || (Number.isFinite(value) && value >= 0), "Price must be a positive number"),
  currency: z.string().trim().min(1).max(8).optional(),
  note: z.string().trim().max(300).optional(),
  published: z.string().optional()
});

function parse(formData: FormData) {
  const parsed = departureSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid departure");
  if (parsed.data.seatsBooked > parsed.data.seatsTotal) {
    throw new Error("Seats booked cannot exceed total seats");
  }
  return parsed.data;
}

function toData(data: ReturnType<typeof parse>) {
  return {
    tourId: data.tourId || null,
    routeName: normalizeSingleLine(data.routeName, 160),
    departureDate: new Date(`${data.departureDate}T00:00:00.000Z`),
    departureTime: data.departureTime ? normalizeSingleLine(data.departureTime, 40) : null,
    seatsTotal: data.seatsTotal,
    seatsBooked: data.seatsBooked,
    pricePerSeat: data.pricePerSeat,
    currency: data.currency || "USD",
    note: data.note ? normalizeSingleLine(data.note, 300) : null,
    published: data.published === "on"
  };
}

export async function createDeparture(formData: FormData) {
  await requireAdminSession();
  await prisma.fixedDeparture.create({ data: toData(parse(formData)) });
  revalidatePath("/admin/departures");
  revalidatePath("/");
}

export async function updateDeparture(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing departure id");
  await prisma.fixedDeparture.update({ where: { id }, data: toData(parse(formData)) });
  revalidatePath("/admin/departures");
  revalidatePath("/");
}

export async function deleteDeparture(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing departure id");
  await prisma.fixedDeparture.delete({ where: { id } });
  revalidatePath("/admin/departures");
  revalidatePath("/");
}
