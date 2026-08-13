import { prisma } from "@/lib/prisma";
import type { InvoiceRecord } from "@/lib/invoice/types";
import { loadInvoice } from "@/lib/invoice/store";

type InvoiceWithItems = {
  invoiceNumber: string;
  invoiceNumberDisplay: string;
  issueDate: string;
  paymentDueDate: string;
  sender: unknown;
  receiver: unknown;
  paymentInfo: unknown;
  note: string;
  customerEmail: string | null;
  totals: unknown;
  createdAt: Date;
  items: Array<{
    description: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
};

function mapInvoiceRecord(invoice: InvoiceWithItems): InvoiceRecord {
  return {
    invoiceNumber: invoice.invoiceNumber,
    invoiceNumberDisplay: invoice.invoiceNumberDisplay,
    issueDate: invoice.issueDate,
    paymentDueDate: invoice.paymentDueDate,
    sender: invoice.sender as InvoiceRecord["sender"],
    receiver: invoice.receiver as InvoiceRecord["receiver"],
    items: invoice.items.map((item) => ({
      description: item.description,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      lineTotal: item.lineTotal
    })),
    totals: invoice.totals as InvoiceRecord["totals"],
    paymentInfo: invoice.paymentInfo as InvoiceRecord["paymentInfo"],
    note: invoice.note,
    customerEmail: invoice.customerEmail || undefined,
    createdAt: invoice.createdAt.toISOString()
  };
}

export async function getInvoiceRecord(invoiceNumber: string): Promise<InvoiceRecord | null> {
  if (!process.env.DATABASE_URL) return loadInvoice(invoiceNumber);

  let invoice: InvoiceWithItems | null;
  try {
    invoice = await prisma.invoice.findUnique({
      where: { invoiceNumber },
      include: { items: true }
    });
  } catch (error) {
    console.error("invoice_database_read_error", error);
    return loadInvoice(invoiceNumber);
  }
  if (!invoice) return null;

  return mapInvoiceRecord(invoice);
}

export async function getInvoiceRecordByPublicToken(publicToken: string): Promise<InvoiceRecord | null> {
  if (!process.env.DATABASE_URL) return null;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { publicToken },
      include: { items: true }
    });
    return invoice ? mapInvoiceRecord(invoice) : null;
  } catch (error) {
    console.error("invoice_database_token_read_error", error);
    return null;
  }
}

export async function getInvoiceRecordForAccess(ref: string, isAdmin: boolean): Promise<InvoiceRecord | null> {
  const publicInvoice = await getInvoiceRecordByPublicToken(ref);
  if (publicInvoice) return publicInvoice;

  if (!isAdmin) return null;
  return getInvoiceRecord(ref);
}
