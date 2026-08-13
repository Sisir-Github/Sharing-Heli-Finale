import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import type { InvoiceRecord } from "@/lib/invoice/types";
import { invoiceSchema, sanitizeInvoicePayload } from "@/lib/invoice/validation";
import { computeItems, computeTotals } from "@/lib/invoice/utils";
import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { saveInvoice, saveInvoicePdf, safeInvoiceId } from "@/lib/invoice/store";
import { sendInvoiceEmail } from "@/lib/invoice/email";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

const MAX_BODY_BYTES = 64 * 1024;

function generateInvoiceNumber() {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  return `INV-${stamp}`;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ ok: false, error: "Content-Type must be application/json" }, { status: 415 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Request payload is too large" }, { status: 413 });
    }
    const payload = JSON.parse(rawBody) as unknown;
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

    const invoice = await prisma.invoice.upsert({
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
        publicToken: randomUUID(),
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
    let emailWarning: string | undefined;
    if (sanitized.customerEmail) {
      try {
        await sendInvoiceEmail(record, pdfBuffer, sanitized.customerEmail);
        emailSent = true;
      } catch (error) {
        console.error("invoice_email_error", error);
        emailWarning = "Invoice saved, but the email could not be sent.";
      }
    }

    return NextResponse.json({
      ok: true,
      invoiceNumber,
      invoiceNumberDisplay,
      viewUrl: `/invoice/${invoice.publicToken}`,
      pdfUrl: `/api/invoice/${invoice.publicToken}/pdf`,
      emailSent,
      ...(emailWarning ? { warning: emailWarning } : {})
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ ok: false, error: "Invalid request payload" }, { status: 400 });
    }
    console.error("Invoice create failed", error);
    return NextResponse.json({ ok: false, error: "Invoice creation failed" }, { status: 500 });
  }
}
