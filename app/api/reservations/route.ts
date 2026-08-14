import { randomBytes } from "node:crypto";

import type { Tour } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { COMPANY } from "@/lib/constants";
import { getNepalDateInput } from "@/lib/date";
import { buildReservationAcknowledgement, buildReservationNotification, getTransporter } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatFlightType } from "@/lib/reservations";
import { reservationSchema, sanitizeReservation } from "@/lib/validation";
import { sendReservationWhatsApp } from "@/lib/whatsapp";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
}

function makeBookingReference() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `SH-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ success: false, error: "Content-Type must be application/json" }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "Request payload is too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }

  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
    return NextResponse.json({ success: true, message: "Reservation request received" });
  }

  const rateLimit = checkRateLimit(`reservation:${getClientIp(request)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) } }
    );
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the reservation details.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const today = getNepalDateInput();
  if (parsed.data.preferredDate < today || (parsed.data.alternateDate && parsed.data.alternateDate < today)) {
    return NextResponse.json({ success: false, error: "Travel dates cannot be in the past." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Reservations are temporarily unavailable." }, { status: 503 });
  }

  const sanitized = sanitizeReservation(parsed.data);
  let tour: Tour | null;
  try {
    tour = sanitized.tourId
      ? await prisma.tour.findFirst({ where: { id: sanitized.tourId, published: true } })
      : null;
  } catch (error) {
    console.error("reservation_tour_lookup_error", error);
    return NextResponse.json({ success: false, error: "Reservations are temporarily unavailable." }, { status: 503 });
  }

  if (sanitized.tourId && !tour) {
    return NextResponse.json({ success: false, error: "The selected route is no longer available." }, { status: 400 });
  }

  let reservation;
  try {
    reservation = await prisma.reservation.create({
      data: {
        bookingReference: makeBookingReference(),
        customerName: sanitized.customerName,
        customerEmail: sanitized.customerEmail,
        customerPhone: sanitized.customerPhone,
        tourId: tour?.id || null,
        routeName: tour?.title || sanitized.routeName,
        flightType: sanitized.flightType,
        preferredDate: sanitized.preferredDate,
        alternateDate: sanitized.alternateDate,
        passengers: sanitized.passengers,
        currency: tour?.currency || "USD",
        pickupPoint: sanitized.pickupPoint,
        customerNotes: sanitized.customerNotes,
        source: sanitized.source || request.headers.get("referer")?.slice(0, 200) || null
      }
    });
  } catch (error) {
    console.error("reservation_storage_error", error);
    return NextResponse.json({ success: false, error: "Reservations are temporarily unavailable." }, { status: 503 });
  }

  const mailData = {
    bookingReference: reservation.bookingReference,
    customerName: reservation.customerName,
    customerEmail: reservation.customerEmail,
    customerPhone: reservation.customerPhone,
    routeName: reservation.routeName,
    flightType: formatFlightType(reservation.flightType),
    preferredDate: reservation.preferredDate,
    alternateDate: reservation.alternateDate,
    passengers: reservation.passengers,
    pickupPoint: reservation.pickupPoint,
    customerNotes: reservation.customerNotes
  };

  const settings = await prisma.siteSettings.findFirst({ select: { email: true } }).catch(() => null);
  const notificationEmail = process.env.RESERVATION_NOTIFICATION_EMAIL
    || settings?.email
    || process.env.INQUIRY_EMAIL
    || COMPANY.inquiryEmail;
  let transporter: ReturnType<typeof getTransporter> | null = null;
  const sendEmail = (message: ReturnType<typeof buildReservationNotification> | ReturnType<typeof buildReservationAcknowledgement>) => {
    transporter ||= getTransporter();
    return transporter.sendMail(message);
  };
  const deliveries = await Promise.allSettled([
    Promise.resolve().then(() => sendEmail(buildReservationNotification(mailData, notificationEmail))),
    Promise.resolve().then(() => sendEmail(buildReservationAcknowledgement(mailData))),
    sendReservationWhatsApp(mailData)
  ]);
  const deliveredAt = new Date();
  const deliveryErrors = deliveries
    .map((result, index) => result.status === "rejected"
      ? `${["business email", "customer email", "WhatsApp"][index]}: ${result.reason instanceof Error ? result.reason.message : "delivery failed"}`
      : null)
    .filter(Boolean)
    .join("; ")
    .slice(0, 1000);

  try {
    await prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        adminEmailSentAt: deliveries[0].status === "fulfilled" ? deliveredAt : null,
        customerEmailSentAt: deliveries[1].status === "fulfilled" ? deliveredAt : null,
        customerWhatsAppSentAt: deliveries[2].status === "fulfilled" ? deliveredAt : null,
        notificationError: deliveryErrors || null
      }
    });
  } catch (error) {
    console.error("reservation_notification_status_error", error);
  }

  if (deliveryErrors) {
    console.error("reservation_notification_error", reservation.bookingReference, deliveryErrors);
  }

  const customerEmailSent = deliveries[1].status === "fulfilled";
  const customerWhatsAppSent = deliveries[2].status === "fulfilled";
  const confirmationMessage = customerEmailSent && customerWhatsAppSent
    ? "Your reservation request was received. Confirmation was sent by email and WhatsApp."
    : customerEmailSent
      ? "Your reservation request was received. A confirmation email was sent, and our team will follow up on WhatsApp."
      : "Your reservation request was received. Please save your booking reference while our team follows up.";

  return NextResponse.json({
    success: true,
    bookingReference: reservation.bookingReference,
    message: confirmationMessage,
    notifications: {
      customerEmail: customerEmailSent,
      customerWhatsApp: customerWhatsAppSent
    }
  });
}

export function GET() {
  return NextResponse.json({ success: false, error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
