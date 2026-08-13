import { cleanMailHeader, getTransporter } from "@/lib/email";
import type { InvoiceRecord } from "@/lib/invoice/types";

export async function sendInvoiceEmail(
  invoice: InvoiceRecord,
  pdfBuffer: Buffer<ArrayBufferLike>,
  customerEmail: string
) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: cleanMailHeader(process.env.SMTP_FROM || process.env.SMTP_USER || ""),
    to: cleanMailHeader(customerEmail),
    subject: cleanMailHeader(`Invoice ${invoice.invoiceNumberDisplay} - Sharing Heli Nepal`),
    disableFileAccess: true,
    disableUrlAccess: true,
    text: [
      "Thank you for your purchase.",
      `Your invoice number is ${invoice.invoiceNumberDisplay}.`,
      "Please find the attached PDF invoice.",
      "",
      "Sharing Heli Nepal"
    ].join("\n"),
    attachments: [
      {
        filename: `invoice-${invoice.invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf"
      }
    ]
  });
}
