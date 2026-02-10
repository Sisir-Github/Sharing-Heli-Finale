import nodemailer from "nodemailer";

import { escapeHtml } from "@/lib/utils";

type SanitizedInquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required SMTP environment variable: ${name}`);
  }
  return value;
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
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: toEmail,
    replyTo: data.email,
    subject: `New Inquiry – ${data.service} – ${data.name}`,
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
