"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { computeItems, computeTotals } from "@/lib/invoice/utils";
import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { saveInvoicePdf } from "@/lib/invoice/store";

const invoiceAdminSchema = z.object({
  invoiceNumber: z.string().min(1),
  issueDate: z.string().min(1),
  paymentDueDate: z.string().min(1),
  senderName: z.string().min(1),
  senderAddress: z.string().min(1),
  senderPhone: z.string().optional(),
  senderEmail: z.string().optional(),
  receiverName: z.string().min(1),
  receiverCompany: z.string().optional(),
  receiverAddress: z.string().min(1),
  receiverCountry: z.string().optional(),
  itemsText: z.string().min(1),
  tax: z.string().optional(),
  discount: z.string().optional(),
  bankName: z.string().min(1),
  accountName: z.string().min(1),
  accountNumber: z.string().min(1),
  swiftBic: z.string().min(1),
  instructions: z.string().min(1),
  note: z.string().optional(),
  customerEmail: z.string().optional()
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
  const data = Object.fromEntries(formData.entries());
  const parsed = invoiceAdminSchema.safeParse(data);
  if (!parsed.success) return;

  const items = computeItems(parseLines(parsed.data.itemsText));
  const totals = computeTotals(items, {
    tax: parsed.data.tax ? Number(parsed.data.tax) : 0,
    discount: parsed.data.discount ? Number(parsed.data.discount) : 0
  });

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
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.invoice.delete({ where: { id } });
  revalidatePath("/admin/invoices");
  return;
}
