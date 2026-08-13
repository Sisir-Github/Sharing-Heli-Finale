import { NextRequest, NextResponse } from "next/server";

import { buildInquiryMail, getTransporter } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { inquirySchema, sanitizeInquiry } from "@/lib/validation";
import { COMPANY } from "@/lib/constants";

export const runtime = "nodejs";

type RequestBody = Record<string, unknown>;
const MAX_BODY_BYTES = 16 * 1024;

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
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ success: false, error: "Content-Type must be application/json" }, { status: 415 });
  }

  let body: RequestBody;

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "Request payload is too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody) as RequestBody;
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

  const rateLimit = checkRateLimit(`inquiry:${getClientIp(request)}`);

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

  const sanitized = sanitizeInquiry(parsed.data);
  let inquiryEmail = process.env.INQUIRY_EMAIL || COMPANY.inquiryEmail;
  let leadSaved = false;

  if (process.env.DATABASE_URL) {
    try {
      const settings = await prisma.siteSettings.findFirst();
      if (settings?.email) inquiryEmail = settings.email;
    } catch (error) {
      console.error("inquiry_settings_error", error);
    }
  }

  const pageSource =
    typeof body.pageSource === "string" && body.pageSource.trim().length > 0
      ? body.pageSource.trim().slice(0, 200)
      : request.headers.get("referer")?.slice(0, 200);

  if (process.env.DATABASE_URL) {
    try {
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
      leadSaved = true;
    } catch (error) {
      console.error("inquiry_storage_error", error);
    }
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail(buildInquiryMail(sanitized, inquiryEmail));

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully. Our team will contact you shortly."
    });
  } catch (error) {
    console.error("inquiry_email_error", error);

    if (leadSaved) {
      return NextResponse.json({
        success: true,
        message: "Your inquiry was received. Our operations desk will contact you shortly."
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: `Unable to send inquiry right now. Please use WhatsApp ${COMPANY.whatsappNumber} for immediate support.`
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
    { status: 405, headers: { Allow: "POST" } }
  );
}
