import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { rowsToCsv } from "@/lib/csv";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return new NextResponse(`${rowsToCsv([["name", "email", "phone", "service", "message", "pageSource", "status", "createdAt"]])}\n`, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=\"inquiries.csv\"",
        "Cache-Control": "private, no-store"
      }
    });
  }
  type InquiryItem = {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    pageSource: string | null;
    status: string;
    createdAt: Date;
  };

  let inquiries: InquiryItem[];
  try {
    inquiries = (await prisma.inquiryLead.findMany({ orderBy: { createdAt: "desc" } })) as InquiryItem[];
  } catch (error) {
    console.error("inquiry_export_error", error);
    return NextResponse.json({ ok: false, error: "Inquiry export is temporarily unavailable" }, { status: 503 });
  }
  const header = ["name", "email", "phone", "service", "message", "pageSource", "status", "createdAt"];
  const rows = inquiries.map((item) => [
    item.name,
    item.email,
    item.phone,
    item.service,
    item.message.replace(/\n/g, " "),
    item.pageSource || "",
    item.status,
    item.createdAt.toISOString()
  ]);

  const csv = rowsToCsv([header, ...rows]);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=\"inquiries.csv\"",
      "Cache-Control": "private, no-store"
    }
  });
}
