"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  icon: z.string().optional(),
  featuredImage: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  published: z.string().optional()
});

export async function createService(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.service.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      shortDescription: parsed.data.shortDescription,
      longDescription: parsed.data.longDescription,
      icon: parsed.data.icon || null,
      featuredImage: parsed.data.featuredImage || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      published: parsed.data.published === "on"
    }
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return;
}

export async function updateService(formData: FormData) {
  const id = String(formData.get("id") || "");
  const data = Object.fromEntries(formData.entries());
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success || !id) return;

  await prisma.service.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      shortDescription: parsed.data.shortDescription,
      longDescription: parsed.data.longDescription,
      icon: parsed.data.icon || null,
      featuredImage: parsed.data.featuredImage || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      published: parsed.data.published === "on"
    }
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return;
}

export async function deleteService(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return;
}
