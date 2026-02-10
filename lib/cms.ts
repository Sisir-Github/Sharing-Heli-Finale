import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export async function getSiteSettings() {
  if (!hasDatabase) return null;
  return prisma.siteSettings.findFirst({
    include: {
      socialLinks: { orderBy: { order: "asc" } },
      trustBadges: { orderBy: { order: "asc" } },
      whyChooseItems: { orderBy: { order: "asc" } }
    }
  });
}

export async function getNavItems() {
  if (!hasDatabase) return [];
  return prisma.navItem.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
}

export async function getFooterGroups() {
  if (!hasDatabase) return [];
  return prisma.footerGroup.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
    include: { links: { where: { visible: true }, orderBy: { order: "asc" } } }
  });
}

export async function getPublishedServices() {
  if (!hasDatabase) return [];
  return prisma.service.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
}

export async function getServiceBySlug(slug: string) {
  if (!hasDatabase) return null;
  return prisma.service.findUnique({ where: { slug } });
}

export async function getPublishedTours() {
  if (!hasDatabase) return [];
  return prisma.tour.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
}

export async function getTourBySlug(slug: string) {
  if (!hasDatabase) return null;
  return prisma.tour.findUnique({ where: { slug } });
}

export async function getFeaturedTours() {
  if (!hasDatabase) return [];
  return prisma.tour.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getDestinations() {
  if (!hasDatabase) return [];
  return prisma.destination.findMany({
    where: { visible: true },
    orderBy: { order: "asc" }
  });
}

export async function getInquiries() {
  if (!hasDatabase) return [];
  return prisma.inquiryLead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getServicesAdmin() {
  if (!hasDatabase) return [];
  return prisma.service.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getToursAdmin() {
  if (!hasDatabase) return [];
  return prisma.tour.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getBlogAdmin() {
  if (!hasDatabase) return [];
  return prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getInvoicesAdmin() {
  if (!hasDatabase) return [];
  return prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, include: { items: true } });
}

export async function getMediaAssets() {
  if (!hasDatabase) return [];
  return prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
}
