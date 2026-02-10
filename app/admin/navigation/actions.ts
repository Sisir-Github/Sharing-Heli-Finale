"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const navSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.string().optional(),
  visible: z.string().optional()
});

const footerGroupSchema = z.object({
  title: z.string().min(1),
  order: z.string().optional(),
  visible: z.string().optional()
});

const footerLinkSchema = z.object({
  groupId: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.string().optional(),
  visible: z.string().optional()
});

export async function createNavItem(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = navSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.navItem.create({
    data: {
      label: parsed.data.label,
      href: parsed.data.href,
      order: Number(parsed.data.order || 0),
      visible: parsed.data.visible === "on"
    }
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}

export async function updateNavItem(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = Object.fromEntries(formData.entries());
  const parsed = navSchema.safeParse(data);
  if (!parsed.success || !id) return;

  await prisma.navItem.update({
    where: { id },
    data: {
      label: parsed.data.label,
      href: parsed.data.href,
      order: Number(parsed.data.order || 0),
      visible: parsed.data.visible === "on"
    }
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}

export async function deleteNavItem(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.navItem.delete({ where: { id } });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}

export async function createFooterGroup(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = footerGroupSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.footerGroup.create({
    data: {
      title: parsed.data.title,
      order: Number(parsed.data.order || 0),
      visible: parsed.data.visible === "on"
    }
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}

export async function deleteFooterGroup(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.footerGroup.delete({ where: { id } });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}

export async function createFooterLink(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = footerLinkSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.footerLink.create({
    data: {
      groupId: parsed.data.groupId,
      label: parsed.data.label,
      href: parsed.data.href,
      order: Number(parsed.data.order || 0),
      visible: parsed.data.visible === "on"
    }
  });

  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}

export async function deleteFooterLink(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.footerLink.delete({ where: { id } });
  revalidatePath("/admin/navigation");
  revalidatePath("/");
  return;
}
