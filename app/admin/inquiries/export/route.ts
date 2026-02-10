import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return new NextResponse("name,email,phone,service,message,pageSource,status,createdAt\n", {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=\"inquiries.csv\""
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

  const inquiries = (await prisma.inquiryLead.findMany({ orderBy: { createdAt: "desc" } })) as InquiryItem[];
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

  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=\"inquiries.csv\""
    }
  });
}
