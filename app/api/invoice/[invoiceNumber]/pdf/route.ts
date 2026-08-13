import { NextResponse } from "next/server";

import { loadInvoicePdf, saveInvoicePdf, safeInvoiceId } from "@/lib/invoice/store";
import { getInvoiceRecordForAccess } from "@/lib/invoice/db";
import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ invoiceNumber: string }> }
) {
  const { invoiceNumber } = await params;
  const invoiceRef = safeInvoiceId(invoiceNumber);
  if (!invoiceRef) {
    return NextResponse.json({ ok: false, error: "Invalid invoice reference" }, { status: 400 });
  }

  const session = await getAdminSession();
  const isAdmin = Boolean(session);
  const invoice = await getInvoiceRecordForAccess(invoiceRef, isAdmin);
  if (!invoice) {
    return NextResponse.json({ ok: false, error: "Invoice not found" }, { status: 404 });
  }

  let pdfBuffer: Buffer<ArrayBufferLike> | null = await loadInvoicePdf(invoice.invoiceNumber);
  if (!pdfBuffer) {
    pdfBuffer = await generateInvoicePdf(invoice);
    await saveInvoicePdf(invoice.invoiceNumber, pdfBuffer);
  }

  const fileName = safeInvoiceId(invoice.invoiceNumberDisplay || invoice.invoiceNumber) || invoice.invoiceNumber;

  return new NextResponse(Uint8Array.from(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"invoice-${fileName}.pdf\"`,
      "Cache-Control": "private, no-store"
    }
  });
}
