import { z } from "zod";

import { normalizeMessage, normalizeSingleLine } from "@/lib/utils";

const phonePattern = /^[+\d][\d\s().-]{6,24}$/;

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
