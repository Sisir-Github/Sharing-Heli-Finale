"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { optionalLocalImageSourceSchema } from "@/lib/safe-url";
import { normalizeSingleLine } from "@/lib/utils";

const memberSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  title: z.string().trim().min(2, "Role title is required").max(80),
  role: z.string().trim().min(2, "Responsibility is required").max(160),
  photo: optionalLocalImageSourceSchema,
  order: z.coerce.number().int().min(0).max(999),
  visible: z.string().optional()
});

function toData(formData: FormData) {
  const parsed = memberSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid team member");
  const data = parsed.data;
  return {
    name: normalizeSingleLine(data.name, 80),
    title: normalizeSingleLine(data.title, 80),
    role: normalizeSingleLine(data.role, 160),
    photo: data.photo?.trim() || null,
    order: data.order,
    visible: data.visible === "on"
  };
}

function revalidate() {
  revalidatePath("/admin/team");
  revalidatePath("/");
  revalidatePath("/about-us");
}

export async function createTeamMember(formData: FormData) {
  await requireAdminSession();
  await prisma.teamMember.create({ data: toData(formData) });
  revalidate();
}

export async function updateTeamMember(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing team member id");
  await prisma.teamMember.update({ where: { id }, data: toData(formData) });
  revalidate();
}

export async function deleteTeamMember(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing team member id");
  await prisma.teamMember.delete({ where: { id } });
  revalidate();
}
