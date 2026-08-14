import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

const includeSeed = process.argv.includes("--include-seed");
const errors = [];
const requiredRuntime = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "NEXT_PUBLIC_SITE_URL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "INQUIRY_EMAIL",
  "WHATSAPP_GRAPH_API_VERSION",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_TEMPLATE_NAME",
  "WHATSAPP_TEMPLATE_LANGUAGE"
];

if (includeSeed) requiredRuntime.push("ADMIN_EMAIL", "ADMIN_PASSWORD");

for (const name of requiredRuntime) {
  if (!process.env[name]?.trim()) errors.push(`${name}: missing`);
}

function checkUrl(name, { database = false } = {}) {
  const value = process.env[name];
  if (!value) return;
  try {
    const url = new URL(value);
    if (database && url.protocol !== "file:") {
      errors.push(`${name}: must use a SQLite file URL`);
    }
    if (!database && url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      errors.push(`${name}: must use HTTPS outside local development`);
    }
  } catch {
    errors.push(`${name}: invalid URL`);
  }
}

checkUrl("DATABASE_URL", { database: true });
checkUrl("NEXTAUTH_URL");
checkUrl("NEXT_PUBLIC_SITE_URL");

const nextAuthSecret = process.env.NEXTAUTH_SECRET || "";
if (nextAuthSecret && nextAuthSecret.length < 32) {
  errors.push("NEXTAUTH_SECRET: must be at least 32 characters");
}

const smtpPort = Number(process.env.SMTP_PORT);
if (process.env.SMTP_PORT && (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535)) {
  errors.push("SMTP_PORT: must be a valid TCP port");
}

if (process.env.WHATSAPP_GRAPH_API_VERSION && !/^v\d+\.\d+$/.test(process.env.WHATSAPP_GRAPH_API_VERSION)) {
  errors.push("WHATSAPP_GRAPH_API_VERSION: must look like v23.0");
}

for (const name of ["SMTP_PASS", "NEXTAUTH_SECRET", ...(includeSeed ? ["ADMIN_PASSWORD"] : [])]) {
  const value = process.env[name] || "";
  if (/^(password|changeme|change-me|secret|admin123)/i.test(value) || /example\.com/i.test(value)) {
    errors.push(`${name}: placeholder or weak value detected`);
  }
}

if (includeSeed && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length < 14) {
  errors.push("ADMIN_PASSWORD: must be at least 14 characters");
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const authUrl = process.env.NEXTAUTH_URL;
if (siteUrl && authUrl) {
  try {
    if (new URL(siteUrl).origin !== new URL(authUrl).origin) {
      errors.push("NEXTAUTH_URL: origin must match NEXT_PUBLIC_SITE_URL");
    }
  } catch {
    // Individual URL errors are reported above.
  }
}

if (errors.length) {
  console.error("Environment validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Environment validation passed (${includeSeed ? "runtime and seed" : "runtime"}).`);
