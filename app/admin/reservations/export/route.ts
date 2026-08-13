import type { Reservation } from "@prisma/client";
import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { rowsToCsv } from "@/lib/csv";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!await getAdminSession()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, error: "Reservation export is temporarily unavailable" }, { status: 503 });
  }

  let reservations: Reservation[];
  try {
    reservations = await prisma.reservation.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("reservation_export_error", error);
    return NextResponse.json({ ok: false, error: "Reservation export is temporarily unavailable" }, { status: 503 });
  }
  const header = ["reference", "status", "paymentStatus", "customer", "email", "phone", "route", "flightType", "preferredDate", "confirmedDate", "passengers", "quotedAmount", "currency", "aircraft", "createdAt"];
  const rows = reservations.map((item) => [
    item.bookingReference,
    item.status,
    item.paymentStatus,
    item.customerName,
    item.customerEmail,
    item.customerPhone,
    item.routeName,
    item.flightType,
    item.preferredDate.toISOString(),
    item.confirmedDate?.toISOString() || "",
    item.passengers,
    item.quotedAmount ?? "",
    item.currency,
    item.assignedAircraft || "",
    item.createdAt.toISOString()
  ]);
  const csv = rowsToCsv([header, ...rows]);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=sharing-heli-reservations.csv",
      "Cache-Control": "private, no-store"
    }
  });
}
