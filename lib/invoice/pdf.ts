import { chromium } from "playwright";

import { renderInvoiceHtml } from "@/lib/invoice/template";
import type { InvoiceRecord } from "@/lib/invoice/types";

export async function generateInvoicePdf(invoice: InvoiceRecord) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = renderInvoiceHtml(invoice);

  await page.setContent(html, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });

  const buffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" }
  });

  await page.close();
  await browser.close();

  return Buffer.from(buffer);
}
