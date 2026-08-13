import { notFound } from "next/navigation";

import { safeInvoiceId } from "@/lib/invoice/store";
import { getInvoiceRecordForAccess } from "@/lib/invoice/db";
import { renderInvoiceMarkup } from "@/lib/invoice/template";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type InvoicePageProps = { params: Promise<{ invoiceNumber: string }> };

export async function generateMetadata({ params }: InvoicePageProps) {
  const { invoiceNumber } = await params;
  const invoiceRef = safeInvoiceId(invoiceNumber);
  const invoice = invoiceRef ? await getInvoiceRecordForAccess(invoiceRef, false) : null;
  const titleNumber = invoice?.invoiceNumberDisplay ?? "Invoice";

  return {
    title: `Invoice ${titleNumber}`,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { invoiceNumber } = await params;
  const invoiceRef = safeInvoiceId(invoiceNumber);
  if (!invoiceRef) {
    notFound();
  }

  const session = await getAdminSession();
  const isAdmin = Boolean(session);
  const invoice = await getInvoiceRecordForAccess(invoiceRef, isAdmin);
  if (!invoice) {
    notFound();
  }

  const markup = renderInvoiceMarkup(invoice);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
