import { NextRequest, NextResponse } from "next/server";

import { buildInquiryMail, getTransporter } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { inquirySchema, sanitizeInquiry } from "@/lib/validation";
import { COMPANY } from "@/lib/constants";

export const runtime = "nodejs";

type RequestBody = Record<string, unknown>;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

export async function POST(request: NextRequest) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request payload"
      },
      { status: 400 }
    );
  }

  const honeypotValue = typeof body.companyWebsite === "string" ? body.companyWebsite.trim() : "";

  if (honeypotValue.length > 0) {
    return NextResponse.json({
      success: true,
      message: "Inquiry received"
    });
  }

  const rateLimit = checkRateLimit(getClientIp(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please try again in a few minutes."
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
        }
      }
    );
  }

  const parsed = inquirySchema.safeParse({
    name: body.name,
    email: body.email,
    phone: body.phone,
    service: body.service,
    message: body.message,
    companyWebsite: ""
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Please check the form fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  try {
    const sanitized = sanitizeInquiry(parsed.data);
    const transporter = getTransporter();
    let inquiryEmail = process.env.INQUIRY_EMAIL || COMPANY.inquiryEmail;
    if (process.env.DATABASE_URL) {
      const settings = await prisma.siteSettings.findFirst();
      if (settings?.email) {
        inquiryEmail = settings.email;
      }
    }

    const pageSource =
      typeof body.pageSource === "string" && body.pageSource.trim().length > 0
        ? body.pageSource.trim().slice(0, 200)
        : request.headers.get("referer")?.slice(0, 200);

    if (process.env.DATABASE_URL) {
      await prisma.inquiryLead.create({
        data: {
          name: sanitized.name,
          email: sanitized.email,
          phone: sanitized.phone,
          service: sanitized.service,
          message: sanitized.message,
          pageSource: pageSource || null,
          status: "new"
        }
      });
    }

    await transporter.sendMail(buildInquiryMail(sanitized, inquiryEmail));

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully. Our team will contact you shortly."
    });
  } catch (error) {
    console.error("inquiry_email_error", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to send inquiry right now. Please use WhatsApp +977-9856028155 for immediate support."
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed"
    },
    { status: 405 }
  );
}
