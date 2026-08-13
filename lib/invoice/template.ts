import { escapeHtml } from "@/lib/utils";
import type { InvoiceRecord } from "@/lib/invoice/types";
import { formatCurrency, formatDateSafe } from "@/lib/invoice/utils";

const invoiceStyles = `
:root {
  --ink: #111827;
  --muted: #6b7280;
  --border: #e5e7eb;
  --panel: #ffffff;
  --shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: var(--ink);
  background: #f3f4f6;
}
body > header,
body > footer,
body > .floating-whatsapp {
  display: none !important;
}
body > main {
  padding: 0 !important;
}
.invoice-wrap {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 32px 16px;
}
.invoice-page {
  width: 210mm;
  min-height: 297mm;
  background: var(--panel);
  padding: 48px 56px;
  box-shadow: var(--shadow);
}
.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}
.invoice-title {
  font-size: 32px;
  letter-spacing: 2px;
  margin: 0;
}
.sender-block {
  text-align: right;
  font-size: 14px;
  color: var(--muted);
}
.sender-block strong { color: var(--ink); }
.invoice-meta {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 28px;
}
.meta-left, .meta-right {
  font-size: 14px;
  line-height: 1.6;
}
.meta-left h3 {
  margin: 0 0 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.meta-right h3 {
  margin: 0 0 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.meta-grid {
  display: grid;
  grid-template-columns: auto auto;
  gap: 6px 24px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
.table thead th {
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 12px 10px;
  border-bottom: 2px solid var(--border);
  color: var(--muted);
}
.table tbody td {
  padding: 12px 10px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.table .num {
  text-align: right;
}
.totals {
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.totals table {
  width: 320px;
  border-collapse: collapse;
}
.totals td {
  padding: 8px 0;
  font-size: 14px;
}
.totals td:last-child {
  text-align: right;
  font-weight: 600;
}
.totals .grand {
  border-top: 2px solid var(--border);
  font-size: 16px;
  padding-top: 10px;
}
.payment {
  margin-top: 28px;
  font-size: 14px;
  line-height: 1.6;
}
.payment h4 {
  margin: 0 0 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.note {
  margin-top: 40px;
  font-size: 13px;
  color: var(--muted);
  border-top: 1px solid var(--border);
  padding-top: 16px;
}
@media print {
  body { background: #ffffff; }
  .invoice-wrap { padding: 0; }
  .invoice-page { box-shadow: none; min-height: auto; padding: 32mm 24mm; }
}
`;

function renderAddress(lines: string[]) {
  return lines.map((line) => `<div>${escapeHtml(line)}</div>`).join("");
}

export function renderInvoiceBody(invoice: InvoiceRecord) {
  const sender = invoice.sender;
  const receiver = invoice.receiver;
  const totals = invoice.totals;

  const itemRows = invoice.items
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.description)}</td>
        <td class="num">${formatCurrency(item.unitPrice)}</td>
        <td class="num">${item.quantity}</td>
        <td class="num">${formatCurrency(item.lineTotal)}</td>
      </tr>
    `
    )
    .join("");

  return `
    <div class="invoice-wrap">
      <section class="invoice-page">
        <header class="invoice-header">
          <h1 class="invoice-title">INVOICE</h1>
          <div class="sender-block">
            <div>Sender: <strong>${escapeHtml(sender.name)}</strong></div>
            ${sender.company ? `<div>${escapeHtml(sender.company)}</div>` : ""}
            ${renderAddress(sender.addressLines)}
            ${sender.phone ? `<div>${escapeHtml(sender.phone)}</div>` : ""}
            ${sender.email ? `<div>${escapeHtml(sender.email)}</div>` : ""}
          </div>
        </header>

        <section class="invoice-meta">
          <div class="meta-left">
            <h3>Invoice Details</h3>
            <div class="meta-grid">
              <div>Invoice #</div>
              <div>${escapeHtml(invoice.invoiceNumberDisplay)}</div>
              <div>Invoice Date</div>
              <div>${escapeHtml(formatDateSafe(invoice.issueDate))}</div>
              <div>Payment Due</div>
              <div>${escapeHtml(formatDateSafe(invoice.paymentDueDate))}</div>
            </div>
          </div>
          <div class="meta-right">
            <h3>Bill To</h3>
            <div><strong>${escapeHtml(receiver.name)}</strong></div>
            ${receiver.company ? `<div>${escapeHtml(receiver.company)}</div>` : ""}
            ${renderAddress(receiver.addressLines)}
            ${receiver.country ? `<div>${escapeHtml(receiver.country)}</div>` : ""}
          </div>
        </section>

        <table class="table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th class="num">Price ($)</th>
              <th class="num">Quantity</th>
              <th class="num">Subtotal ($)</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <div class="totals">
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>${formatCurrency(totals.subtotal)}</td>
              </tr>
              ${totals.tax !== undefined ? `<tr><td>Tax</td><td>${formatCurrency(totals.tax)}</td></tr>` : ""}
              ${totals.discount !== undefined ? `<tr><td>Discount</td><td>-${formatCurrency(totals.discount)}</td></tr>` : ""}
              <tr class="grand">
                <td>Total ($)</td>
                <td>${formatCurrency(totals.grandTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section class="payment">
          <h4>Payment Details</h4>
          <div><strong>Bank:</strong> ${escapeHtml(invoice.paymentInfo.bankName)}</div>
          <div><strong>Account Name:</strong> ${escapeHtml(invoice.paymentInfo.accountName)}</div>
          <div><strong>Account Number:</strong> ${escapeHtml(invoice.paymentInfo.accountNumber)}</div>
          <div><strong>SWIFT/BIC:</strong> ${escapeHtml(invoice.paymentInfo.swiftBic)}</div>
          <div><strong>Instructions:</strong> ${escapeHtml(invoice.paymentInfo.instructions).replace(/\n/g, "<br />")}</div>
        </section>

        <div class="note">${escapeHtml(invoice.note || "Thank you for your business.")}</div>
      </section>
    </div>
  `;
}

export function renderInvoiceMarkup(invoice: InvoiceRecord) {
  return `<style>${invoiceStyles}</style>${renderInvoiceBody(invoice)}`;
}
