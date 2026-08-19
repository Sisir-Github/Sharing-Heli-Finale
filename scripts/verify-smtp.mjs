import nextEnv from "@next/env";
import nodemailer from "nodemailer";

nextEnv.loadEnvConfig(process.cwd());

const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const missing = required.filter((name) => !process.env[name]?.trim());

if (missing.length) {
  console.error(`SMTP configuration is incomplete: ${missing.join(", ")}`);
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("SMTP_PORT must be a valid network port.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  connectionTimeout: 15_000,
  greetingTimeout: 10_000,
  socketTimeout: 30_000,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

try {
  await transporter.verify();
  console.log("SMTP connection and authentication verified.");
} catch (error) {
  const code = error && typeof error === "object" && "code" in error ? ` (${error.code})` : "";
  const message = error instanceof Error ? error.message.replace(process.env.SMTP_PASS, "[redacted]") : "Unknown SMTP error";
  console.error(`SMTP verification failed${code}: ${message}`);
  process.exitCode = 1;
} finally {
  transporter.close();
}
