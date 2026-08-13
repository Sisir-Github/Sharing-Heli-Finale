import type { MetadataRoute } from "next";

import { FALLBACK_BLOG_POSTS } from "@/lib/blog-fallbacks";
import { SITE_URL } from "@/lib/constants";
import { DESTINATION_GUIDES } from "@/lib/destinations";
import { prisma } from "@/lib/prisma";
import { getCanonicalServicePath, getCanonicalTourPath } from "@/lib/seo/canonical";
import { INDEXABLE_PATHS } from "@/lib/seo/page-seo";

const baseUrl = SITE_URL.replace(/\/$/, "");
const staticContentUpdatedAt = new Date("2026-08-09T00:00:00.000Z");

function addPage(pages: Map<string, Date | undefined>, path: string, updatedAt?: Date) {
  const existing = pages.get(path);
  if (!existing || (updatedAt && updatedAt > existing)) {
    pages.set(path, updatedAt);
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = new Map<string, Date | undefined>();

  INDEXABLE_PATHS.forEach((path) => addPage(pages, path));
  DESTINATION_GUIDES.forEach((destination) => {
    addPage(pages, `/destinations/${destination.slug}`, staticContentUpdatedAt);
  });
  FALLBACK_BLOG_POSTS.filter((post) => !post.noindex).forEach((post) => {
    addPage(pages, `/blog/${post.slug}`, post.updatedAt);
  });

  if (process.env.DATABASE_URL) {
    try {
      type SlugItem = { slug: string; updatedAt: Date; noindex?: boolean };
      const [services, tours, posts] = (await Promise.all([
        prisma.service.findMany({ where: { published: true }, select: { slug: true, updatedAt: true, noindex: true } }),
        prisma.tour.findMany({ where: { published: true }, select: { slug: true, updatedAt: true, noindex: true } }),
        prisma.blogPost.findMany({
          where: { published: true, OR: [{ publishAt: null }, { publishAt: { lte: new Date() } }] },
          select: { slug: true, updatedAt: true, noindex: true }
        })
      ])) as [SlugItem[], SlugItem[], SlugItem[]];

      services.forEach((service) => {
        const path = getCanonicalServicePath(service.slug);
        if (service.noindex) pages.delete(path);
        else addPage(pages, path, service.updatedAt);
      });
      tours.forEach((tour) => {
        const path = getCanonicalTourPath(tour.slug);
        if (tour.noindex) pages.delete(path);
        else addPage(pages, path, tour.updatedAt);
      });
      posts.forEach((post) => {
        const path = `/blog/${post.slug}`;
        if (post.noindex) pages.delete(path);
        else addPage(pages, path, post.updatedAt);
      });
    } catch {
      // Keep the stable static sitemap when the database is temporarily unavailable.
    }
  }

  return Array.from(pages.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, lastModified]) => ({
      url: `${baseUrl}${path}`,
      ...(lastModified ? { lastModified } : {})
    }));
}
