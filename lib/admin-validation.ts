import { z } from "zod";

import { isValidDateInput } from "@/lib/date";

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens");

export const dateInputSchema = z.string().trim().refine(isValidDateInput, "Use a valid date in YYYY-MM-DD format");

export const optionalDateTimeInputSchema = z.string().trim().max(40).optional().refine(
  (value) => !value || !Number.isNaN(new Date(value).getTime()),
  "Use a valid publish date"
);
