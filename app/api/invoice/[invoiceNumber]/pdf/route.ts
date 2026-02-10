import { NextResponse } from "next/server";

import { loadInvoicePdf, saveInvoicePdf, safeInvoiceId } from "@/lib/invoice/store";
import { getInvoiceRecord } from "@/lib/invoice/db";
import { generateInvoicePdf } from "@/lib/invoice/pdf";

export async function GET(
  _request: Request,
  { params }: { params: { invoiceNumber: string } }
) {
  const invoiceNumber = safeInvoiceId(params.invoiceNumber);
  if (!invoiceNumber) {
    return NextResponse.json({ ok: false, error: "Invalid invoice number" }, { status: 400 });
  }

  const invoice = await getInvoiceRecord(invoiceNumber);
  if (!invoice) {
    return NextResponse.json({ ok: false, error: "Invoice not found" }, { status: 404 });
  }

  let pdfBuffer = await loadInvoicePdf(invoiceNumber);
  if (!pdfBuffer) {
    pdfBuffer = await generateInvoicePdf(invoice);
    await saveInvoicePdf(invoiceNumber, pdfBuffer);
  }

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"invoice-${invoiceNumber}.pdf\"`
    }
  });
}
