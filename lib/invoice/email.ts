import { getTransporter } from "@/lib/email";
import type { InvoiceRecord } from "@/lib/invoice/types";

export async function sendInvoiceEmail(
  invoice: InvoiceRecord,
  pdfBuffer: Buffer,
  customerEmail: string
) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: customerEmail,
    subject: `Invoice ${invoice.invoiceNumberDisplay} - Thank you for your purchase`,
    text: [
      "Thank you for your purchase.",
      `Your invoice number is ${invoice.invoiceNumberDisplay}.`,
      "Please find the attached PDF invoice.",
      "",
      "Sharing Heli Nepal Pvt. Ltd."
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
