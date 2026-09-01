import type { MetadataRoute } from "next";

import { FALLBACK_BLOG_POSTS } from "@/lib/blog-fallbacks";
import { buildLanguageAlternates, SITE_URL } from "@/lib/constants";
import { DESTINATION_GUIDES } from "@/lib/destinations";
import { ZH_PATHS } from "@/lib/i18n/zh-index";
import { prisma } from "@/lib/prisma";
import { getCanonicalServicePath, getCanonicalTourPath } from "@/lib/seo/canonical";
import { CHINESE_PAGE_PATHS, INDEXABLE_PATHS } from "@/lib/seo/page-seo";

const baseUrl = SITE_URL.replace(/\/$/, "");
const staticContentUpdatedAt = new Date("2026-08-09T00:00:00.000Z");

/** Hero images per section, so the sitemap doubles as an image sitemap. */
const SECTION_IMAGES: Array<[RegExp, string]> = [
  [/everest/i, "/images/campaign/everest-helicopter.jpg"],
  [/annapurna|pokhara/i, "/images/campaign/annapurna-helicopter.jpg"],
  [/muktinath|pilgrim/i, "/images/campaign/muktinath-helicopter.jpg"]
];

function imageFor(path: string) {
  const match = SECTION_IMAGES.find(([pattern]) => pattern.test(path));
  return `${baseUrl}${match ? match[1] : "/images/campaign/sharing-heli-hero.jpg"}`;
}

/** Home and the main hubs deserve a higher weight than deep leaf pages. */
function priorityFor(path: string) {
  if (path === "/" || path === "/zh") return 1;
  if (["/tours", "/services", "/contact", "/check-availability", "/nepal-helicopter-tour-packages"].includes(path)) return 0.9;
  if (path.startsWith("/zh/")) return 0.7;
  if (path.startsWith("/blog/") || path.startsWith("/guides/")) return 0.6;
  if (["/privacy-policy", "/terms-and-conditions"].includes(path)) return 0.3;
  return 0.8;
}

function changeFrequencyFor(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/" || path === "/zh" || path === "/tours") return "weekly";
  if (["/privacy-policy", "/terms-and-conditions"].includes(path)) return "yearly";
  return "monthly";
}

function addPage(pages: Map<string, Date | undefined>, path: string, updatedAt?: Date) {
  const existing = pages.get(path);
  if (!existing || (updatedAt && updatedAt > existing)) {
    pages.set(path, updatedAt);
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = new Map<string, Date | undefined>();

  INDEXABLE_PATHS.forEach((path) => addPage(pages, path));
  ZH_PATHS.forEach((path) => addPage(pages, path, staticContentUpdatedAt));
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
    .map(([path, lastModified]) => {
      // hreflang pairs are only emitted for URLs that genuinely exist in both
      // languages; a one-sided annotation is ignored by search engines.
      const englishPath = path.startsWith("/zh") ? path.replace(/^\/zh/, "") || "/" : path;
      const hasChinese = CHINESE_PAGE_PATHS.has(englishPath);

      return {
        url: `${baseUrl}${path}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: changeFrequencyFor(path),
        priority: priorityFor(path),
        images: [imageFor(path)],
        ...(hasChinese ? { alternates: { languages: buildLanguageAlternates(englishPath, true) } } : {})
      };
    });
}
