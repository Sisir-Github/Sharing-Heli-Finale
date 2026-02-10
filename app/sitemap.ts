import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { INDEXABLE_PATHS } from "@/lib/seo/page-seo";
import { prisma } from "@/lib/prisma";

function getPriority(path: string) {
  if (path === "/") {
    return 1;
  }
  if (path === "/contact") {
    return 0.95;
  }
  if (path.startsWith("/guides")) {
    return 0.78;
  }
  if (path.startsWith("/everest") || path.startsWith("/annapurna") || path.startsWith("/muktinath")) {
    return 0.9;
  }
  return 0.85;
}

function getFrequency(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.startsWith("/guides")) {
    return "monthly";
  }
  return "weekly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  if (!process.env.DATABASE_URL) {
    return INDEXABLE_PATHS.map((path) => ({
      url: `${SITE_URL.replace(/\/$/, "")}${path}`,
      lastModified: now,
      changeFrequency: getFrequency(path),
      priority: getPriority(path)
    }));
  }
  let dynamicPaths: string[] = [];
  try {
    type SlugItem = { slug: string };
    const [services, tours] = (await Promise.all([
      prisma.service.findMany({ where: { published: true }, select: { slug: true } }),
      prisma.tour.findMany({ where: { published: true }, select: { slug: true } })
    ])) as [SlugItem[], SlugItem[]];

    dynamicPaths = [
      ...services.map((service) => `/services/${service.slug}`),
      ...tours.map((tour) => `/tours/${tour.slug}`)
    ];
  } catch {
    dynamicPaths = [];
  }

  const paths = [...new Set([...INDEXABLE_PATHS, ...dynamicPaths])];

  return paths.map((path) => ({
    url: `${SITE_URL.replace(/\/$/, "")}${path}`,
    lastModified: now,
    changeFrequency: getFrequency(path),
    priority: getPriority(path)
  }));
}
