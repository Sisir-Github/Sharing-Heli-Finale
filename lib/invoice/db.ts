import { prisma } from "@/lib/prisma";
import type { InvoiceRecord } from "@/lib/invoice/types";

export async function getInvoiceRecord(invoiceNumber: string): Promise<InvoiceRecord | null> {
  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNumber },
    include: { items: true }
  });
  if (!invoice) return null;

  type InvoiceItem = {
    description: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  };

  return {
    invoiceNumber: invoice.invoiceNumber,
    invoiceNumberDisplay: invoice.invoiceNumberDisplay,
    issueDate: invoice.issueDate,
    paymentDueDate: invoice.paymentDueDate,
    sender: invoice.sender as InvoiceRecord["sender"],
    receiver: invoice.receiver as InvoiceRecord["receiver"],
    items: (invoice.items as InvoiceItem[]).map((item) => ({
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
