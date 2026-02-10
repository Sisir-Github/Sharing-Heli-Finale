export type InvoiceParty = {
  name: string;
  addressLines: string[];
  phone?: string;
  email?: string;
  company?: string;
  country?: string;
};

export type InvoiceItem = {
  description: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type InvoiceTotals = {
  subtotal: number;
  tax?: number;
  discount?: number;
  grandTotal: number;
};

export type InvoicePaymentInfo = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftBic: string;
  instructions: string;
};

export type InvoiceRecord = {
  invoiceNumber: string;
  invoiceNumberDisplay: string;
  issueDate: string;
  paymentDueDate: string;
  sender: InvoiceParty;
  receiver: InvoiceParty;
  items: InvoiceItem[];
  totals: InvoiceTotals;
  paymentInfo: InvoicePaymentInfo;
  note: string;
  customerEmail?: string;
  createdAt: string;
};
