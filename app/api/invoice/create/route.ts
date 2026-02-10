import { NextResponse } from "next/server";

import type { InvoiceRecord } from "@/lib/invoice/types";
import { invoiceSchema, sanitizeInvoicePayload } from "@/lib/invoice/validation";
import { computeItems, computeTotals } from "@/lib/invoice/utils";
import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { saveInvoice, saveInvoicePdf, safeInvoiceId } from "@/lib/invoice/store";
import { sendInvoiceEmail } from "@/lib/invoice/email";
import { prisma } from "@/lib/prisma";

function generateInvoiceNumber() {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  return `INV-${stamp}`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = invoiceSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid invoice payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const sanitized = sanitizeInvoicePayload(parsed.data);
    const safeId = safeInvoiceId(sanitized.invoiceNumber || "");
    const invoiceNumber = safeId || generateInvoiceNumber();
    const invoiceNumberDisplay = sanitized.invoiceNumber || invoiceNumber;
    const items = computeItems(sanitized.items);
    const totals = computeTotals(items, sanitized.totals);

    const record: InvoiceRecord = {
      invoiceNumber,
      invoiceNumberDisplay,
      issueDate: sanitized.issueDate,
      paymentDueDate: sanitized.paymentDueDate,
      sender: sanitized.sender,
      receiver: sanitized.receiver,
      items,
      totals,
      paymentInfo: sanitized.paymentInfo,
      note: sanitized.note || "Thank you for your business.",
      customerEmail: sanitized.customerEmail,
      createdAt: new Date().toISOString()
    };

    await prisma.invoice.upsert({
      where: { invoiceNumber },
      update: {
        invoiceNumberDisplay,
        issueDate: sanitized.issueDate,
        paymentDueDate: sanitized.paymentDueDate,
        sender: sanitized.sender,
        receiver: sanitized.receiver,
        paymentInfo: sanitized.paymentInfo,
        note: record.note,
        customerEmail: sanitized.customerEmail,
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
        invoiceNumber,
        invoiceNumberDisplay,
        issueDate: sanitized.issueDate,
        paymentDueDate: sanitized.paymentDueDate,
        sender: sanitized.sender,
        receiver: sanitized.receiver,
        paymentInfo: sanitized.paymentInfo,
        note: record.note,
        customerEmail: sanitized.customerEmail,
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

    await saveInvoice(record);
    const pdfBuffer = await generateInvoicePdf(record);
    await saveInvoicePdf(invoiceNumber, pdfBuffer);

    let emailSent = false;
    if (sanitized.customerEmail) {
      await sendInvoiceEmail(record, pdfBuffer, sanitized.customerEmail);
      emailSent = true;
    }

    return NextResponse.json({
      ok: true,
      invoiceNumber,
      invoiceNumberDisplay,
      viewUrl: `/invoice/${invoiceNumber}`,
      pdfUrl: `/api/invoice/${invoiceNumber}/pdf`,
      emailSent
    });
  } catch (error) {
    console.error("Invoice create failed", error);
    return NextResponse.json({ ok: false, error: "Invoice creation failed" }, { status: 500 });
  }
}
