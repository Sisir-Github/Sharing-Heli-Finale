import { prisma } from "@/lib/prisma";
import { FALLBACK_BLOG_POSTS } from "@/lib/blog-fallbacks";
import { FALLBACK_DESTINATIONS, FALLBACK_SERVICES, FALLBACK_TOURS } from "@/lib/home-fallbacks";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export async function getSiteSettings() {
  if (!hasDatabase) return null;
  try {
    return await prisma.siteSettings.findFirst({
      include: {
        socialLinks: { orderBy: { order: "asc" } },
        trustBadges: { orderBy: { order: "asc" } },
        whyChooseItems: { orderBy: { order: "asc" } }
      }
    });
  } catch {
    return null;
  }
}

export async function getNavItems() {
  if (!hasDatabase) return [];
  try {
    return await prisma.navItem.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export async function getFooterGroups() {
  if (!hasDatabase) return [];
  try {
    return await prisma.footerGroup.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
      include: { links: { where: { visible: true }, orderBy: { order: "asc" } } }
    });
  } catch {
    return [];
  }
}

export async function getPublishedServices() {
  if (!hasDatabase) return FALLBACK_SERVICES;
  try {
    return await prisma.service.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string) {
  if (!hasDatabase) return FALLBACK_SERVICES.find((service) => service.slug === slug) || null;
  try {
    return (await prisma.service.findUnique({ where: { slug } })) || FALLBACK_SERVICES.find((service) => service.slug === slug) || null;
  } catch {
    return FALLBACK_SERVICES.find((service) => service.slug === slug) || null;
  }
}

export async function getPublishedTours() {
  if (!hasDatabase) return FALLBACK_TOURS;
  try {
    return await prisma.tour.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  } catch {
    return FALLBACK_TOURS;
  }
}

export async function getTourBySlug(slug: string) {
  if (!hasDatabase) return FALLBACK_TOURS.find((tour) => tour.slug === slug) || null;
  try {
    return (await prisma.tour.findUnique({ where: { slug } })) || FALLBACK_TOURS.find((tour) => tour.slug === slug) || null;
  } catch {
    return FALLBACK_TOURS.find((tour) => tour.slug === slug) || null;
  }
}

export async function getFeaturedTours() {
  if (!hasDatabase) return FALLBACK_TOURS;
  try {
    return await prisma.tour.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return FALLBACK_TOURS;
  }
}

export async function getDestinations() {
  if (!hasDatabase) return FALLBACK_DESTINATIONS;
  try {
    return await prisma.destination.findMany({
      where: { visible: true },
      orderBy: { order: "asc" }
    });
  } catch {
    return FALLBACK_DESTINATIONS;
  }
}

export async function getPublishedBlogPosts() {
  if (!hasDatabase) return FALLBACK_BLOG_POSTS;
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true, OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] },
      orderBy: { publishAt: "desc" }
    });
    return posts.length ? posts : FALLBACK_BLOG_POSTS;
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string) {
  const fallback = FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) || null;
  if (!hasDatabase) return fallback;
  try {
    return (await prisma.blogPost.findFirst({
      where: {
        slug,
        published: true,
        OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }]
      }
    })) || fallback;
  } catch {
    return fallback;
  }
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
