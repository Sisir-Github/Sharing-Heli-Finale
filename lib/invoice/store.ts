import { promises as fs } from "fs";
import path from "path";

import type { InvoiceRecord } from "@/lib/invoice/types";

const DATA_DIR = path.join(process.cwd(), "data", "invoices");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export function safeInvoiceId(value: string) {
  return value.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40);
}

export async function saveInvoice(record: InvoiceRecord) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${record.invoiceNumber}.json`);
  await fs.writeFile(filePath, JSON.stringify(record, null, 2), "utf-8");
}

export async function loadInvoice(invoiceNumber: string) {
  const safeId = safeInvoiceId(invoiceNumber);
  if (!safeId) return null;
  const filePath = path.join(DATA_DIR, `${safeId}.json`);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as InvoiceRecord;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function saveInvoicePdf(invoiceNumber: string, pdfBuffer: Buffer) {
  await ensureDataDir();
  const safeId = safeInvoiceId(invoiceNumber);
  const filePath = path.join(DATA_DIR, `invoice-${safeId}.pdf`);
  await fs.writeFile(filePath, pdfBuffer);
  return filePath;
}

export async function loadInvoicePdf(invoiceNumber: string) {
  const safeId = safeInvoiceId(invoiceNumber);
  if (!safeId) return null;
  const filePath = path.join(DATA_DIR, `invoice-${safeId}.pdf`);

  try {
    return await fs.readFile(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
