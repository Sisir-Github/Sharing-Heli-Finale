import { createInvoice, deleteInvoice } from "@/app/admin/invoices/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInvoicesPage() {
  type InvoiceItem = {
    id: string;
    invoiceNumber: string;
    publicToken: string;
    invoiceNumberDisplay: string;
    issueDate: string;
    paymentDueDate: string;
  };

  const invoices = (await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true }
  })) as InvoiceItem[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Invoices</h1>
        <p className="mt-2 text-sm text-haze">Create, view, and manage invoices with PDF generation.</p>
      </div>

      <form action={createInvoice} className="glass rounded-2xl p-6 grid gap-4">
        <h2 className="text-lg font-semibold text-white">Create Invoice</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="invoiceNumber" placeholder="Invoice # (e.g., INV-1001)" className="input" required />
          <input name="issueDate" placeholder="Issue Date (YYYY-MM-DD)" className="input" required />
          <input name="paymentDueDate" placeholder="Payment Due Date (YYYY-MM-DD)" className="input" required />
          <input name="customerEmail" placeholder="Customer email (optional)" className="input" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <textarea name="senderName" placeholder="Sender name" className="textarea" required />
          <textarea name="receiverName" placeholder="Receiver name" className="textarea" required />
          <textarea name="senderAddress" placeholder="Sender address (one per line)" className="textarea" required />
          <textarea name="receiverAddress" placeholder="Receiver address (one per line)" className="textarea" required />
          <input name="senderPhone" placeholder="Sender phone" className="input" />
          <input name="senderEmail" placeholder="Sender email" className="input" />
          <input name="receiverCompany" placeholder="Receiver company" className="input" />
          <input name="receiverCountry" placeholder="Receiver country" className="input" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <textarea
            name="itemsText"
            placeholder="Items (one per line: Description | UnitPrice | Quantity)"
            className="textarea md:col-span-2"
            required
          />
          <input name="tax" placeholder="Tax amount" className="input" />
          <input name="discount" placeholder="Discount amount" className="input" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input name="bankName" placeholder="Bank name" className="input" required />
          <input name="accountName" placeholder="Account name" className="input" required />
          <input name="accountNumber" placeholder="Account number" className="input" required />
          <input name="swiftBic" placeholder="SWIFT/BIC" className="input" required />
          <textarea name="instructions" placeholder="Payment instructions" className="textarea md:col-span-2" required />
          <textarea name="note" placeholder="Note/footer line" className="textarea md:col-span-2" />
        </div>

        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Create Invoice</button>
      </form>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="glass rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{invoice.invoiceNumberDisplay}</p>
                <p className="text-sm text-haze">
                  Issue: {invoice.issueDate} · Due: {invoice.paymentDueDate}
                </p>
              </div>
              <div className="flex gap-2">
                <a href={`/invoice/${invoice.publicToken}`} className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white">
                  View
                </a>
                <a href={`/api/invoice/${invoice.publicToken}/pdf`} className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white">
                  PDF
                </a>
                <form action={deleteInvoice}>
                  <input type="hidden" name="id" value={invoice.id} />
                  <button className="rounded-xl border border-rose-400/50 px-4 py-2 text-xs text-rose-200">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
