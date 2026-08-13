"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-auth";
import { optionalLocalImageSourceSchema, safePublicHrefSchema } from "@/lib/safe-url";

const settingsSchema = z.object({
  companyName: z.string().min(1),
  brandName: z.string().min(1),
  logoImage: optionalLocalImageSourceSchema,
  tagline: z.string().min(1),
  operatingUnder: z.string().min(1),
  primaryPhone: z.string().min(1),
  whatsappNumber: z.string().min(1),
  email: z.string().email(),
  addressLine1: z.string().min(1),
  addressLine2: z.string().min(1),
  addressLine3: z.string().min(1),
  addressLine4: z.string().optional().or(z.literal("")),
  businessHours: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  ogImage: optionalLocalImageSourceSchema,
  heroHeadline: z.string().min(1),
  heroSubheadline: z.string().min(1),
  heroBackgroundMode: z.string().min(1),
  heroBackgroundImage: optionalLocalImageSourceSchema,
  heroBackgroundVideo: optionalLocalImageSourceSchema,
  heroCtaPrimaryLabel: z.string().min(1),
  heroCtaPrimaryHref: safePublicHrefSchema,
  heroCtaSecondaryLabel: z.string().min(1),
  heroCtaSecondaryHref: safePublicHrefSchema
});

export async function saveSettings(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = settingsSchema.safeParse(data);
  if (!parsed.success) {
    return;
  }

  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        ...parsed.data,
        logoImage: parsed.data.logoImage || null,
        addressLine4: parsed.data.addressLine4 || null,
        ogImage: parsed.data.ogImage || null,
        heroBackgroundImage: parsed.data.heroBackgroundImage || null,
        heroBackgroundVideo: parsed.data.heroBackgroundVideo || null
      }
    });
  } else {
    await prisma.siteSettings.create({
      data: {
        ...parsed.data,
        heroCtaTertiaryLabel: "Call",
        heroCtaTertiaryHref: "/contact",
        ctaStripText: "Reserve a helicopter flight with our operations desk.",
        ctaStripButtonLabel: "Reserve a flight",
        ctaStripButtonHref: "/check-availability",
        logoImage: parsed.data.logoImage || null,
        addressLine4: parsed.data.addressLine4 || null,
        ogImage: parsed.data.ogImage || null,
        heroBackgroundImage: parsed.data.heroBackgroundImage || null,
        heroBackgroundVideo: parsed.data.heroBackgroundVideo || null
      }
    });
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");

  return;
}

const badgeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
  order: z.string().optional(),
  visible: z.string().optional(),
  settingsId: z.string().min(1)
});

export async function upsertTrustBadge(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = badgeSchema.safeParse(data);
  if (!parsed.success) return;

  if (parsed.data.id) {
    await prisma.trustBadge.update({
      where: { id: parsed.data.id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        icon: parsed.data.icon || null,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  } else {
    await prisma.trustBadge.create({
      data: {
        settingsId: parsed.data.settingsId,
        title: parsed.data.title,
        description: parsed.data.description,
        icon: parsed.data.icon || null,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

export async function deleteTrustBadge(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.trustBadge.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

const whySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
  order: z.string().optional(),
  visible: z.string().optional(),
  settingsId: z.string().min(1)
});

export async function upsertWhyChoose(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = whySchema.safeParse(data);
  if (!parsed.success) return;

  if (parsed.data.id) {
    await prisma.whyChooseItem.update({
      where: { id: parsed.data.id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        icon: parsed.data.icon || null,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  } else {
    await prisma.whyChooseItem.create({
      data: {
        settingsId: parsed.data.settingsId,
        title: parsed.data.title,
        description: parsed.data.description,
        icon: parsed.data.icon || null,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

export async function deleteWhyChoose(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.whyChooseItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

const destinationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  image: optionalLocalImageSourceSchema,
  order: z.string().optional(),
  visible: z.string().optional()
});

export async function upsertDestination(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = destinationSchema.safeParse(data);
  if (!parsed.success) return;

  if (parsed.data.id) {
    await prisma.destination.update({
      where: { id: parsed.data.id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        image: parsed.data.image || null,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  } else {
    await prisma.destination.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        image: parsed.data.image || null,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

export async function deleteDestination(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.destination.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

const socialSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1),
  href: safePublicHrefSchema,
  order: z.string().optional(),
  visible: z.string().optional(),
  settingsId: z.string().min(1)
});

export async function upsertSocialLink(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = socialSchema.safeParse(data);
  if (!parsed.success) return;

  if (parsed.data.id) {
    await prisma.socialLink.update({
      where: { id: parsed.data.id },
      data: {
        label: parsed.data.label,
        href: parsed.data.href,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  } else {
    await prisma.socialLink.create({
      data: {
        settingsId: parsed.data.settingsId,
        label: parsed.data.label,
        href: parsed.data.href,
        order: Number(parsed.data.order || 0),
        visible: parsed.data.visible === "on"
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}

export async function deleteSocialLink(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}
