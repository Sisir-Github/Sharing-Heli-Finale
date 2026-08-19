import { prisma } from "@/lib/prisma";
import { FALLBACK_BLOG_POSTS } from "@/lib/blog-fallbacks";
import { FALLBACK_DESTINATIONS, FALLBACK_SERVICES, FALLBACK_TOURS } from "@/lib/home-fallbacks";
import { asStringArray } from "@/lib/json-array";

const hasDatabase = Boolean(process.env.DATABASE_URL);

function normalizeTour<T extends { images: unknown }>(tour: T) {
  return { ...tour, images: asStringArray(tour.images) };
}

function normalizeBlogPost<T extends { tags: unknown; relatedTourSlugs: unknown }>(post: T) {
  return {
    ...post,
    tags: asStringArray(post.tags),
    relatedTourSlugs: asStringArray(post.relatedTourSlugs)
  };
}

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
    const tours = await prisma.tour.findMany({
      where: { published: true },
      orderBy: [{ region: "asc" }, { sortOrder: "asc" }, { title: "asc" }]
    });
    return tours.map(normalizeTour);
  } catch {
    return FALLBACK_TOURS;
  }
}

export async function getTourBySlug(slug: string) {
  if (!hasDatabase) return FALLBACK_TOURS.find((tour) => tour.slug === slug) || null;
  try {
    const tour = await prisma.tour.findUnique({ where: { slug } });
    return tour ? normalizeTour(tour) : FALLBACK_TOURS.find((item) => item.slug === slug) || null;
  } catch {
    return FALLBACK_TOURS.find((tour) => tour.slug === slug) || null;
  }
}

export async function getFeaturedTours() {
  if (!hasDatabase) return FALLBACK_TOURS;
  try {
    const tours = await prisma.tour.findMany({
      where: { published: true, featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });
    return tours.map(normalizeTour);
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
    return posts.length ? posts.map(normalizeBlogPost) : FALLBACK_BLOG_POSTS;
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string) {
  const fallback = FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) || null;
  if (!hasDatabase) return fallback;
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug,
        published: true,
        OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }]
      }
    });
    return post ? normalizeBlogPost(post) : fallback;
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
  const tours = await prisma.tour.findMany({ orderBy: [{ region: "asc" }, { sortOrder: "asc" }, { updatedAt: "desc" }] });
  return tours.map(normalizeTour);
}

export async function getBlogAdmin() {
  if (!hasDatabase) return [];
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return posts.map(normalizeBlogPost);
}

export async function getInvoicesAdmin() {
  if (!hasDatabase) return [];
  return prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, include: { items: true } });
}

export async function getMediaAssets() {
  if (!hasDatabase) return [];
  return prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
}

/**
 * Published departures from today onwards, soonest first. Past dates are
 * excluded so an unmaintained list never advertises a flight that has gone.
 */
export async function getUpcomingFixedDepartures(limit = 4) {
  if (!hasDatabase) return [];

  // Departure dates are stored as UTC midnight, so the cutoff is UTC midnight
  // too — otherwise a host behind UTC drops today's departure early.
  const now = new Date();
  const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  return prisma.fixedDeparture.findMany({
    where: { published: true, departureDate: { gte: startOfToday } },
    orderBy: { departureDate: "asc" },
    take: limit,
    include: { tour: { select: { slug: true, title: true } } }
  });
}

export async function getTeamMembers() {
  if (!hasDatabase) return [];
  return prisma.teamMember.findMany({
    where: { visible: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }]
  });
}

export async function getTestimonials() {
  if (!hasDatabase) return [];
  return prisma.testimonial.findMany({
    where: { visible: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }]
  });
}
