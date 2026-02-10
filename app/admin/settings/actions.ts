"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  companyName: z.string().min(1),
  brandName: z.string().min(1),
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
  ogImage: z.string().optional().or(z.literal("")),
  heroHeadline: z.string().min(1),
  heroSubheadline: z.string().min(1),
  heroBackgroundMode: z.string().min(1),
  heroBackgroundImage: z.string().optional().or(z.literal("")),
  heroBackgroundVideo: z.string().optional().or(z.literal("")),
  heroCtaPrimaryLabel: z.string().min(1),
  heroCtaPrimaryHref: z.string().min(1),
  heroCtaSecondaryLabel: z.string().min(1),
  heroCtaSecondaryHref: z.string().min(1),
  heroCtaTertiaryLabel: z.string().min(1),
  heroCtaTertiaryHref: z.string().min(1),
  ctaStripText: z.string().min(1),
  ctaStripButtonLabel: z.string().min(1),
  ctaStripButtonHref: z.string().min(1)
});

export async function saveSettings(formData: FormData) {
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
        addressLine4: parsed.data.addressLine4 || null,
        ogImage: parsed.data.ogImage || null,
        heroBackgroundImage: parsed.data.heroBackgroundImage || null,
        heroBackgroundVideo: parsed.data.heroBackgroundVideo || null
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/tours");
  revalidatePath("/contact");
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
  image: z.string().optional(),
  order: z.string().optional(),
  visible: z.string().optional()
});

export async function upsertDestination(formData: FormData) {
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
  href: z.string().min(1),
  order: z.string().optional(),
  visible: z.string().optional(),
  settingsId: z.string().min(1)
});

export async function upsertSocialLink(formData: FormData) {
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
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return;
}
