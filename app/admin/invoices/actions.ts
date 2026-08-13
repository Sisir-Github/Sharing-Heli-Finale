"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { computeItems, computeTotals } from "@/lib/invoice/utils";
import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { saveInvoicePdf } from "@/lib/invoice/store";
import { requireAdminSession } from "@/lib/admin-auth";
import { dateInputSchema } from "@/lib/admin-validation";

const optionalEmail = z.string().trim().max(120).optional().refine(
  (value) => !value || z.string().email().safeParse(value).success,
  "Use a valid email"
);

const optionalNonnegativeNumber = z.string().trim().optional().refine(
  (value) => !value || (Number.isFinite(Number(value)) && Number(value) >= 0),
  "Use a nonnegative number"
);

function hasValidInvoiceLines(value: string) {
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!lines.length || lines.length > 100) return false;
  return lines.every((line) => {
    const [description, unitPrice, quantity, extra] = line.split("|").map((part) => part.trim());
    return !extra
      && Boolean(description)
      && Number.isFinite(Number(unitPrice))
      && Number(unitPrice) >= 0
      && Number.isFinite(Number(quantity))
      && Number(quantity) > 0;
  });
}

const invoiceAdminSchema = z.object({
  invoiceNumber: z.string().trim().min(1).max(40).regex(/^[A-Za-z0-9_-]+$/),
  issueDate: dateInputSchema,
  paymentDueDate: dateInputSchema,
  senderName: z.string().min(1),
  senderAddress: z.string().min(1),
  senderPhone: z.string().optional(),
  senderEmail: optionalEmail,
  receiverName: z.string().min(1),
  receiverCompany: z.string().optional(),
  receiverAddress: z.string().min(1),
  receiverCountry: z.string().optional(),
  itemsText: z.string().min(1).refine(hasValidInvoiceLines, "Use Description | UnitPrice | Quantity for each line"),
  tax: optionalNonnegativeNumber,
  discount: optionalNonnegativeNumber,
  bankName: z.string().min(1),
  accountName: z.string().min(1),
  accountNumber: z.string().min(1),
  swiftBic: z.string().min(1),
  instructions: z.string().min(1),
  note: z.string().optional(),
  customerEmail: optionalEmail
}).superRefine((value, context) => {
  if (value.paymentDueDate < value.issueDate) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["paymentDueDate"],
      message: "Payment due date cannot be before the issue date"
    });
  }
});

function parseLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [description, unitPrice, quantity] = line.split("|").map((part) => part.trim());
      return {
        description,
        unitPrice: Number(unitPrice),
        quantity: Number(quantity)
      };
    });
}

export async function createInvoice(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = invoiceAdminSchema.safeParse(data);
  if (!parsed.success) return;

  const items = computeItems(parseLines(parsed.data.itemsText));
  const totals = computeTotals(items, {
    tax: parsed.data.tax ? Number(parsed.data.tax) : 0,
    discount: parsed.data.discount ? Number(parsed.data.discount) : 0
  });
  if (totals.grandTotal < 0) return;

  const sender = {
    name: parsed.data.senderName,
    addressLines: parsed.data.senderAddress.split("\n").map((line) => line.trim()).filter(Boolean),
    phone: parsed.data.senderPhone || undefined,
    email: parsed.data.senderEmail || undefined
  };

  const receiver = {
    name: parsed.data.receiverName,
    company: parsed.data.receiverCompany || undefined,
    addressLines: parsed.data.receiverAddress.split("\n").map((line) => line.trim()).filter(Boolean),
    country: parsed.data.receiverCountry || undefined
  };

  const paymentInfo = {
    bankName: parsed.data.bankName,
    accountName: parsed.data.accountName,
    accountNumber: parsed.data.accountNumber,
    swiftBic: parsed.data.swiftBic,
    instructions: parsed.data.instructions
  };

  const invoice = await prisma.invoice.upsert({
    where: { invoiceNumber: parsed.data.invoiceNumber },
    update: {
      invoiceNumberDisplay: parsed.data.invoiceNumber,
      issueDate: parsed.data.issueDate,
      paymentDueDate: parsed.data.paymentDueDate,
      sender,
      receiver,
      paymentInfo,
      note: parsed.data.note || "Thank you for your business.",
      customerEmail: parsed.data.customerEmail || null,
      totals,
      items: {
        deleteMany: {},
        create: items.map((item) => ({
          description: item.description,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          lineTotal: item.lineTotal
        }))
      }
    },
    create: {
      invoiceNumber: parsed.data.invoiceNumber,
      publicToken: randomUUID(),
      invoiceNumberDisplay: parsed.data.invoiceNumber,
      issueDate: parsed.data.issueDate,
      paymentDueDate: parsed.data.paymentDueDate,
      sender,
      receiver,
      paymentInfo,
      note: parsed.data.note || "Thank you for your business.",
      customerEmail: parsed.data.customerEmail || null,
      totals,
      items: {
        create: items.map((item) => ({
          description: item.description,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          lineTotal: item.lineTotal
        }))
      }
    }
  });

  const pdfBuffer = await generateInvoicePdf({
    invoiceNumber: invoice.invoiceNumber,
    invoiceNumberDisplay: invoice.invoiceNumberDisplay,
    issueDate: invoice.issueDate,
    paymentDueDate: invoice.paymentDueDate,
    sender,
    receiver,
    items,
    totals,
    paymentInfo,
    note: invoice.note,
    customerEmail: invoice.customerEmail || undefined,
    createdAt: invoice.createdAt.toISOString()
  });
  await saveInvoicePdf(invoice.invoiceNumber, pdfBuffer);

  revalidatePath("/admin/invoices");
  return;
}

export async function deleteInvoice(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.invoice.delete({ where: { id } });
  revalidatePath("/admin/invoices");
  return;
}
