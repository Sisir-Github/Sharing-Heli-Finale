import { notFound } from "next/navigation";

import { safeInvoiceId } from "@/lib/invoice/store";
import { getInvoiceRecord } from "@/lib/invoice/db";
import { renderInvoiceMarkup } from "@/lib/invoice/template";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { invoiceNumber: string } }) {
  const invoiceNumber = safeInvoiceId(params.invoiceNumber);
  const invoice = invoiceNumber ? await getInvoiceRecord(invoiceNumber) : null;
  const titleNumber = invoice?.invoiceNumberDisplay ?? invoiceNumber ?? "Invoice";

  return {
    title: `Invoice ${titleNumber}`,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function InvoicePage({ params }: { params: { invoiceNumber: string } }) {
  const invoiceNumber = safeInvoiceId(params.invoiceNumber);
  if (!invoiceNumber) {
    notFound();
  }

  const invoice = await getInvoiceRecord(invoiceNumber);
  if (!invoice) {
    notFound();
  }

  const markup = renderInvoiceMarkup(invoice);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
