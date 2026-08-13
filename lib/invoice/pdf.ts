import PDFDocument from "pdfkit";

import { COMPANY } from "@/lib/constants";
import type { InvoiceRecord } from "@/lib/invoice/types";
import { formatCurrency, formatDateSafe } from "@/lib/invoice/utils";

const PAGE_WIDTH = 595.28;
const MARGIN = 46;
const INK = "#0b1f2a";
const MUTED = "#5c7180";
const BLUE = "#38b7e6";
const BORDER = "#d7eaf3";
const PALE_BLUE = "#eef9fe";

function collectPdf(doc: PDFKit.PDFDocument) {
  const chunks: Buffer[] = [];

  return new Promise<Buffer<ArrayBufferLike>>((resolve, reject) => {
    doc.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
}

function textBlock(doc: PDFKit.PDFDocument, label: string, lines: Array<string | undefined>, x: number, y: number, width: number) {
  doc.font("Helvetica-Bold").fontSize(8).fillColor(BLUE).text(label.toUpperCase(), x, y, { width });
  let currentY = y + 15;

  lines.filter(Boolean).forEach((line, index) => {
    doc
      .font(index === 0 ? "Helvetica-Bold" : "Helvetica")
      .fontSize(index === 0 ? 10 : 9)
      .fillColor(index === 0 ? INK : MUTED)
      .text(String(line), x, currentY, { width, lineGap: 2 });
    currentY = doc.y + 3;
  });

  return currentY;
}

function drawTotalRow(doc: PDFKit.PDFDocument, label: string, value: string, y: number, bold = false) {
  const x = PAGE_WIDTH - MARGIN - 190;
  doc
    .font(bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(bold ? 11 : 9)
    .fillColor(bold ? INK : MUTED)
    .text(label, x, y, { width: 95 });
  doc
    .font(bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(bold ? 11 : 9)
    .fillColor(INK)
    .text(value, x + 95, y, { width: 95, align: "right" });
}

export async function generateInvoicePdf(invoice: InvoiceRecord): Promise<Buffer<ArrayBufferLike>> {
  const doc = new PDFDocument({
    size: "A4",
    margin: MARGIN,
    bufferPages: true,
    info: {
      Title: `Invoice ${invoice.invoiceNumberDisplay}`,
      Author: "Sharing Heli Nepal"
    }
  });
  const pdfBuffer = collectPdf(doc);

  doc.rect(0, 0, PAGE_WIDTH, 126).fill(PALE_BLUE);
  doc.rect(0, 124, PAGE_WIDTH, 2).fill(BLUE);

  doc.font("Helvetica-Bold").fontSize(22).fillColor(INK).text("Sharing Heli Nepal", MARGIN, 42);
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(COMPANY.operatingLine, MARGIN, 70);
  doc.font("Helvetica-Bold").fontSize(28).fillColor(BLUE).text("INVOICE", 390, 42, { width: 155, align: "right" });
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(invoice.invoiceNumberDisplay, 390, 76, { width: 155, align: "right" });

  const senderLines = [
    invoice.sender.name,
    invoice.sender.company,
    ...invoice.sender.addressLines,
    invoice.sender.phone,
    invoice.sender.email
  ];
  const receiverLines = [
    invoice.receiver.name,
    invoice.receiver.company,
    ...invoice.receiver.addressLines,
    invoice.receiver.country,
    invoice.receiver.phone,
    invoice.receiver.email
  ];

  const leftBottom = textBlock(doc, "From", senderLines, MARGIN, 158, 225);
  const rightBottom = textBlock(doc, "Bill To", receiverLines, 322, 158, 225);
  let y = Math.max(leftBottom, rightBottom) + 26;

  doc.roundedRect(MARGIN, y, PAGE_WIDTH - MARGIN * 2, 54, 6).strokeColor(BORDER).lineWidth(1).stroke();
  const metaY = y + 14;
  [
    ["Invoice Date", formatDateSafe(invoice.issueDate)],
    ["Payment Due", formatDateSafe(invoice.paymentDueDate)],
    ["Currency", "USD"]
  ].forEach(([label, value], index) => {
    const x = MARGIN + 22 + index * 165;
    doc.font("Helvetica-Bold").fontSize(8).fillColor(BLUE).text(label.toUpperCase(), x, metaY, { width: 128 });
    doc.font("Helvetica").fontSize(10).fillColor(INK).text(value, x, metaY + 17, { width: 128 });
  });
  y += 84;

  const tableX = MARGIN;
  const tableWidth = PAGE_WIDTH - MARGIN * 2;
  doc.rect(tableX, y, tableWidth, 32).fill(BLUE);
  doc.font("Helvetica-Bold").fontSize(8).fillColor("#ffffff");
  doc.text("ITEM", tableX + 12, y + 11, { width: 245 });
  doc.text("PRICE", tableX + 288, y + 11, { width: 70, align: "right" });
  doc.text("QTY", tableX + 370, y + 11, { width: 45, align: "right" });
  doc.text("SUBTOTAL", tableX + 425, y + 11, { width: 78, align: "right" });
  y += 32;

  invoice.items.forEach((item, index) => {
    const rowHeight = Math.max(38, doc.heightOfString(item.description, { width: 245 }) + 22);
    if (y + rowHeight > 695) {
      doc.addPage();
      y = MARGIN;
    }
    if (index % 2 === 0) {
      doc.rect(tableX, y, tableWidth, rowHeight).fill("#fbfdff");
    }
    doc.strokeColor(BORDER).moveTo(tableX, y + rowHeight).lineTo(tableX + tableWidth, y + rowHeight).stroke();
    doc.font("Helvetica").fontSize(9).fillColor(INK).text(item.description, tableX + 12, y + 12, { width: 245 });
    doc.text(formatCurrency(item.unitPrice), tableX + 288, y + 12, { width: 70, align: "right" });
    doc.text(String(item.quantity), tableX + 370, y + 12, { width: 45, align: "right" });
    doc.font("Helvetica-Bold").text(formatCurrency(item.lineTotal), tableX + 425, y + 12, { width: 78, align: "right" });
    y += rowHeight;
  });

  y += 18;
  drawTotalRow(doc, "Subtotal", `$${formatCurrency(invoice.totals.subtotal)}`, y);
  y += 20;
  if (invoice.totals.tax !== undefined) {
    drawTotalRow(doc, "Tax", `$${formatCurrency(invoice.totals.tax)}`, y);
    y += 20;
  }
  if (invoice.totals.discount !== undefined) {
    drawTotalRow(doc, "Discount", `-$${formatCurrency(invoice.totals.discount)}`, y);
    y += 20;
  }
  doc.strokeColor(BORDER).moveTo(PAGE_WIDTH - MARGIN - 190, y).lineTo(PAGE_WIDTH - MARGIN, y).stroke();
  y += 12;
  drawTotalRow(doc, "Total", `$${formatCurrency(invoice.totals.grandTotal)}`, y, true);
  y += 48;

  if (y > 610) {
    doc.addPage();
    y = MARGIN;
  }

  doc.font("Helvetica-Bold").fontSize(9).fillColor(BLUE).text("PAYMENT DETAILS", MARGIN, y);
  y += 18;
  [
    ["Bank", invoice.paymentInfo.bankName],
    ["Account Name", invoice.paymentInfo.accountName],
    ["Account Number", invoice.paymentInfo.accountNumber],
    ["SWIFT/BIC", invoice.paymentInfo.swiftBic],
    ["Instructions", invoice.paymentInfo.instructions]
  ].forEach(([label, value]) => {
    doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(`${label}:`, MARGIN, y, { continued: true });
    doc.font("Helvetica").fillColor(MUTED).text(` ${value}`, { width: PAGE_WIDTH - MARGIN * 2 - 80 });
    y = doc.y + 4;
  });

  y += 18;
  doc.strokeColor(BORDER).moveTo(MARGIN, y).lineTo(PAGE_WIDTH - MARGIN, y).stroke();
  doc.font("Helvetica").fontSize(8).fillColor(MUTED).text(invoice.note || "Thank you for your business.", MARGIN, y + 14, {
    width: PAGE_WIDTH - MARGIN * 2
  });

  doc.end();
  return pdfBuffer;
}
