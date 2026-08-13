import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headers = { "Cache-Control": "no-store" };

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { status: "degraded", checks: { database: "not_configured" } },
      { status: 503, headers }
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", checks: { database: "ok" } }, { headers });
  } catch (error) {
    console.error("health_database_error", error);
    return NextResponse.json(
      { status: "degraded", checks: { database: "unavailable" } },
      { status: 503, headers }
    );
  }
}
