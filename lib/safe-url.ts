import { z } from "zod";

const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

export function isSafePublicHref(value: string) {
  const href = value.trim();
  if (!href || href.length > 500 || CONTROL_CHARACTERS.test(href) || href.includes("\\")) {
    return false;
  }

  if (href.startsWith("/")) return !href.startsWith("//");
  if (href.startsWith("#")) return true;

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "mailto:" || url.protocol === "tel:";
  } catch {
    return false;
  }
}

export function safePublicHref(value: string | null | undefined, fallback: string) {
  return value && isSafePublicHref(value) ? value.trim() : fallback;
}

export function safeAdminCallback(value: string | null | undefined) {
  if (!value) return "/admin";
  const callback = value.trim();
  if (callback === "/admin" || callback.startsWith("/admin/") || callback.startsWith("/admin?")) {
    return isSafePublicHref(callback) ? callback : "/admin";
  }
  return "/admin";
}

export function isSafeLocalImageSource(value: string) {
  const source = value.trim();
  return source.startsWith("/")
    && !source.startsWith("//")
    && !source.includes("\\")
    && !source.split(/[?#]/, 1)[0].split("/").includes("..")
    && !CONTROL_CHARACTERS.test(source)
    && source.length <= 500;
}

export function safeLocalImageSource(value: string | null | undefined, fallback: string) {
  return value && isSafeLocalImageSource(value) ? value.trim() : fallback;
}

export const safePublicHrefSchema = z.string().trim().min(1).max(500).refine(isSafePublicHref, "Use a safe internal path, HTTPS URL, email, or phone link");

export const optionalSafePublicHrefSchema = z.string().trim().max(500).refine(
  (value) => !value || isSafePublicHref(value),
  "Use a safe internal path, HTTPS URL, email, or phone link"
).optional();

export const optionalLocalImageSourceSchema = z.string().trim().max(500).refine(
  (value) => !value || isSafeLocalImageSource(value),
  "Use a local image path beginning with /"
).optional();
