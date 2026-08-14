import { z } from "zod";

import { normalizeMessage, normalizeSingleLine } from "@/lib/utils";
import { FLIGHT_TYPES } from "@/lib/reservations";
import { isValidDateInput } from "@/lib/date";

const phonePattern = /^[+\d][\d\s().-]{6,24}$/;
const internationalWhatsAppPattern = /^\+[1-9]\d{7,14}$/;

export const whatsappNumberSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s().-]/g, ""))
  .refine(
    (value) => internationalWhatsAppPattern.test(value),
    "Enter a WhatsApp number with country code, for example +9779856028155"
  );

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Provide a valid email")
    .max(120, "Email is too long"),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Provide a valid phone number"),
  service: z.string().trim().min(2, "Select a valid service").max(120, "Service is too long"),
  message: z.string().trim().min(15, "Message must be at least 15 characters").max(1200, "Message is too long"),
  companyWebsite: z.string().max(0).optional().or(z.literal(""))
});

export type InquiryPayload = z.infer<typeof inquirySchema>;

export function sanitizeInquiry(input: InquiryPayload) {
  return {
    name: normalizeSingleLine(input.name, 80),
    email: normalizeSingleLine(input.email.toLowerCase(), 120),
    phone: normalizeSingleLine(input.phone, 25),
    service: normalizeSingleLine(input.service, 80),
    message: normalizeMessage(input.message, 1200),
    companyWebsite: ""
  };
}

const dateInput = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date")
  .refine(isValidDateInput, "Choose a valid date");

export const reservationSchema = z
  .object({
    customerName: z.string().trim().min(2, "Name is required").max(80),
    customerEmail: z.string().trim().email("Provide a valid email").max(120),
    customerPhone: whatsappNumberSchema,
    tourId: z.string().trim().max(80).optional().or(z.literal("")),
    routeName: z.string().trim().min(2, "Select a route").max(120),
    flightType: z.enum(FLIGHT_TYPES),
    preferredDate: dateInput,
    alternateDate: dateInput.optional().or(z.literal("")),
    passengers: z.coerce.number().int().min(1).max(20),
    pickupPoint: z.string().trim().max(120).optional().or(z.literal("")),
    customerNotes: z.string().trim().max(800).optional().or(z.literal("")),
    source: z.string().trim().max(200).optional().or(z.literal("")),
    companyWebsite: z.string().max(0).optional().or(z.literal(""))
  })
  .superRefine((value, context) => {
    if (value.alternateDate && value.alternateDate < value.preferredDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["alternateDate"],
        message: "Alternate date cannot be before the preferred date"
      });
    }
  });

export type ReservationPayload = z.infer<typeof reservationSchema>;

export function sanitizeReservation(input: ReservationPayload) {
  return {
    customerName: normalizeSingleLine(input.customerName, 80),
    customerEmail: normalizeSingleLine(input.customerEmail.toLowerCase(), 120),
    customerPhone: normalizeSingleLine(input.customerPhone, 25),
    tourId: input.tourId || null,
    routeName: normalizeSingleLine(input.routeName, 120),
    flightType: input.flightType,
    preferredDate: new Date(`${input.preferredDate}T12:00:00.000Z`),
    alternateDate: input.alternateDate ? new Date(`${input.alternateDate}T12:00:00.000Z`) : null,
    passengers: input.passengers,
    pickupPoint: input.pickupPoint ? normalizeSingleLine(input.pickupPoint, 120) : null,
    customerNotes: input.customerNotes ? normalizeMessage(input.customerNotes, 800) : null,
    source: input.source ? normalizeSingleLine(input.source, 200) : null
  };
}
