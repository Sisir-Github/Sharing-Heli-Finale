import { z } from "zod";

import { normalizeMessage, normalizeSingleLine } from "@/lib/utils";
import { isValidDateInput } from "@/lib/date";

const numberField = (label: string) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() !== "" ? Number(value) : value),
    z.number({ invalid_type_error: `${label} must be a number` }).finite().nonnegative()
  );

const optionalNumberField = (label: string) =>
  z
    .preprocess(
      (value) => (typeof value === "string" && value.trim() !== "" ? Number(value) : value),
      z.number({ invalid_type_error: `${label} must be a number` }).finite().nonnegative()
    )
    .optional();

const positiveNumberField = (label: string) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() !== "" ? Number(value) : value),
    z.number({ invalid_type_error: `${label} must be a number` }).finite().positive()
  );

const invoiceDateField = z.string().trim().refine(isValidDateInput, "Use a valid date in YYYY-MM-DD format");

const addressLinesSchema = z
  .array(z.string().trim().min(1).max(120))
  .min(1, "Address is required")
  .max(6, "Address is too long");

const partySchema = z.object({
  name: z.string().trim().min(1).max(120),
  addressLines: addressLinesSchema,
  phone: z.string().trim().max(40).optional(),
  email: z.string().trim().email().max(120).optional(),
  company: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional()
});

const itemSchema = z.object({
  description: z.string().trim().min(1).max(200),
  unitPrice: numberField("Unit price"),
  quantity: positiveNumberField("Quantity"),
  lineTotal: optionalNumberField("Line total")
});

const totalsSchema = z.object({
  subtotal: optionalNumberField("Subtotal"),
  tax: optionalNumberField("Tax"),
  discount: optionalNumberField("Discount"),
  grandTotal: optionalNumberField("Grand total")
});

const paymentInfoSchema = z.object({
  bankName: z.string().trim().min(1).max(120),
  accountName: z.string().trim().min(1).max(120),
  accountNumber: z.string().trim().min(1).max(80),
  swiftBic: z.string().trim().min(1).max(40),
  instructions: z.string().trim().min(1).max(240)
});

export const invoiceSchema = z
  .object({
    invoiceNumber: z.string().trim().min(1).max(40).optional(),
    issueDate: invoiceDateField,
    paymentDueDate: invoiceDateField,
    sender: partySchema,
    receiver: partySchema,
    items: z.array(itemSchema).min(1, "At least one item is required").max(100, "Too many invoice items"),
    totals: totalsSchema.optional(),
    paymentInfo: paymentInfoSchema,
    note: z.string().trim().max(200).optional(),
    customerEmail: z.string().trim().email().max(120).optional()
  })
  .superRefine((value, context) => {
    if (value.paymentDueDate < value.issueDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paymentDueDate"],
        message: "Payment due date cannot be before the issue date"
      });
    }
  });

export type InvoicePayload = z.infer<typeof invoiceSchema>;

export function sanitizeInvoicePayload(payload: InvoicePayload) {
  const sanitizeParty = (party: InvoicePayload["sender"]) => ({
    name: normalizeSingleLine(party.name, 120),
    addressLines: party.addressLines.map((line) => normalizeSingleLine(line, 120)),
    phone: party.phone ? normalizeSingleLine(party.phone, 40) : undefined,
    email: party.email ? normalizeSingleLine(party.email.toLowerCase(), 120) : undefined,
    company: party.company ? normalizeSingleLine(party.company, 120) : undefined,
    country: party.country ? normalizeSingleLine(party.country, 80) : undefined
  });

  return {
    invoiceNumber: payload.invoiceNumber ? normalizeSingleLine(payload.invoiceNumber, 40) : undefined,
    issueDate: normalizeSingleLine(payload.issueDate, 40),
    paymentDueDate: normalizeSingleLine(payload.paymentDueDate, 40),
    sender: sanitizeParty(payload.sender),
    receiver: sanitizeParty(payload.receiver),
    items: payload.items.map((item) => ({
      description: normalizeSingleLine(item.description, 200),
      unitPrice: Number(item.unitPrice),
      quantity: Number(item.quantity),
      lineTotal: item.lineTotal !== undefined ? Number(item.lineTotal) : undefined
    })),
    totals: payload.totals
      ? {
          subtotal: payload.totals.subtotal,
          tax: payload.totals.tax,
          discount: payload.totals.discount,
          grandTotal: payload.totals.grandTotal
        }
      : undefined,
    paymentInfo: {
      bankName: normalizeSingleLine(payload.paymentInfo.bankName, 120),
      accountName: normalizeSingleLine(payload.paymentInfo.accountName, 120),
      accountNumber: normalizeSingleLine(payload.paymentInfo.accountNumber, 80),
      swiftBic: normalizeSingleLine(payload.paymentInfo.swiftBic, 40),
      instructions: normalizeMessage(payload.paymentInfo.instructions, 240)
    },
    note: payload.note ? normalizeSingleLine(payload.note, 200) : "",
    customerEmail: payload.customerEmail
      ? normalizeSingleLine(payload.customerEmail.toLowerCase(), 120)
      : undefined
  };
}
