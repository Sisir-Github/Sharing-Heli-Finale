import nodemailer from "nodemailer";

import { escapeHtml } from "@/lib/utils";

type SanitizedInquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type ReservationMailData = {
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  routeName: string;
  flightType: string;
  preferredDate: Date;
  alternateDate?: Date | null;
  passengers: number;
  pickupPoint?: string | null;
  customerNotes?: string | null;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required SMTP environment variable: ${name}`);
  }
  return value;
}

export function cleanMailHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 180);
}

export function getTransporter() {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    name: "sharingheli.com",
    disableFileAccess: true,
    disableUrlAccess: true,
    auth: {
      user,
      pass
    }
  });
}

export function buildInquiryMail(data: SanitizedInquiry, toEmail: string) {
  const escapedName = escapeHtml(data.name);
  const escapedEmail = escapeHtml(data.email);
  const escapedPhone = escapeHtml(data.phone);
  const escapedService = escapeHtml(data.service);
  const escapedMessage = escapeHtml(data.message).replace(/\n/g, "<br />");

  return {
    from: cleanMailHeader(process.env.SMTP_FROM || process.env.SMTP_USER || ""),
    to: cleanMailHeader(toEmail),
    replyTo: cleanMailHeader(data.email),
    subject: cleanMailHeader(`New Inquiry - ${data.service} - ${data.name}`),
    disableFileAccess: true,
    disableUrlAccess: true,
    text: [
      "A new inquiry has been submitted.",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      "",
      "Message:",
      data.message
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827;">
        <h2 style="margin-bottom: 16px;">New Sharing Heli Inquiry</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Phone:</strong> ${escapedPhone}</p>
        <p><strong>Service:</strong> ${escapedService}</p>
        <p><strong>Message:</strong><br />${escapedMessage}</p>
        <hr />
        <p style="font-size: 12px; color: #6b7280;">Sent to ${escapeHtml(toEmail)}</p>
      </div>
    `
  };
}

function formatMailDate(date?: Date | null) {
  return date
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Asia/Kathmandu" }).format(date)
    : "Not provided";
}

export function buildReservationNotification(data: ReservationMailData, toEmail: string) {
  const fields = [
    ["Reference", data.bookingReference],
    ["Customer", data.customerName],
    ["Email", data.customerEmail],
    ["WhatsApp", data.customerPhone],
    ["Route", data.routeName],
    ["Flight type", data.flightType],
    ["Preferred date", formatMailDate(data.preferredDate)],
    ["Alternate date", formatMailDate(data.alternateDate)],
    ["Passengers", String(data.passengers)],
    ["Pickup point", data.pickupPoint || "Not provided"]
  ];

  return {
    from: cleanMailHeader(process.env.SMTP_FROM || process.env.SMTP_USER || ""),
    to: cleanMailHeader(toEmail),
    replyTo: cleanMailHeader(data.customerEmail),
    subject: cleanMailHeader(`Reservation request ${data.bookingReference} - ${data.routeName}`),
    disableFileAccess: true,
    disableUrlAccess: true,
    text: [
      "A new reservation request has been saved.",
      "",
      ...fields.map(([label, value]) => `${label}: ${value}`),
      "",
      `Notes: ${data.customerNotes || "None"}`
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #0b1f2a; max-width: 640px;">
        <p style="color:#159bd0;font-size:12px;font-weight:700;letter-spacing:1px;">SHARING HELI RESERVATIONS</p>
        <h2 style="margin:8px 0 20px;">New reservation request</h2>
        ${fields.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("")}
        <p><strong>Notes:</strong><br />${escapeHtml(data.customerNotes || "None").replace(/\n/g, "<br />")}</p>
      </div>
    `
  };
}

export function buildReservationAcknowledgement(data: ReservationMailData) {
  return {
    from: cleanMailHeader(process.env.SMTP_FROM || process.env.SMTP_USER || ""),
    to: cleanMailHeader(data.customerEmail),
    subject: cleanMailHeader(`Sharing Heli request received - ${data.bookingReference}`),
    disableFileAccess: true,
    disableUrlAccess: true,
    text: [
      `Hello ${data.customerName},`,
      "",
      `We received your reservation request for ${data.routeName}.`,
      `Reference: ${data.bookingReference}`,
      `Preferred date: ${formatMailDate(data.preferredDate)}`,
      `Passengers: ${data.passengers}`,
      `WhatsApp: ${data.customerPhone}`,
      "",
      "This is a request, not a confirmed flight. Our flight desk will review availability and send the current fare and operating details before payment."
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #0b1f2a; max-width: 640px;">
        <p style="color:#159bd0;font-size:12px;font-weight:700;letter-spacing:1px;">SHARING HELI</p>
        <h2 style="margin:8px 0 20px;">Request received</h2>
        <p>Hello ${escapeHtml(data.customerName)},</p>
        <p>We received your reservation request for <strong>${escapeHtml(data.routeName)}</strong>.</p>
        <div style="margin:24px 0;padding:18px;border:1px solid #dff5fc;background:#f7fbff;">
          <p style="margin:0 0 8px;"><strong>Reference:</strong> ${escapeHtml(data.bookingReference)}</p>
          <p style="margin:0 0 8px;"><strong>Preferred date:</strong> ${escapeHtml(formatMailDate(data.preferredDate))}</p>
          <p style="margin:0 0 8px;"><strong>Passengers:</strong> ${data.passengers}</p>
          <p style="margin:0;"><strong>WhatsApp:</strong> ${escapeHtml(data.customerPhone)}</p>
        </div>
        <p>This is a request, not a confirmed flight. Our flight desk will review availability and send the current fare and operating details before payment.</p>
      </div>
    `
  };
}
