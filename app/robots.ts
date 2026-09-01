import type { MetadataRoute } from "next";

import { IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import {
  AI_ASSISTANT_BOTS,
  ALLOWED_ASSET_PATHS,
  CHINESE_SEARCH_BOTS,
  DISALLOWED_PATHS,
  SEARCH_ENGINE_BOTS,
  SOCIAL_PREVIEW_BOTS
} from "@/lib/seo/crawlers";

const base = SITE_URL.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_SITE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const allow = ["/", ...ALLOWED_ASSET_PATHS];
  const disallow = DISALLOWED_PATHS;

  return {
    rules: [
      // Default policy.
      { userAgent: "*", allow, disallow },

      // Classic search engines, named explicitly so a future wildcard change
      // never silently de-indexes the site.
      ...SEARCH_ENGINE_BOTS.map((userAgent) => ({ userAgent, allow, disallow })),

      // Chinese search engines. Baidu in particular honours these literally.
      ...CHINESE_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow, disallow })),

      // AI assistants and answer engines: explicitly welcome.
      ...AI_ASSISTANT_BOTS.map((userAgent) => ({ userAgent, allow, disallow })),

      // Link preview agents need the page plus its OG image.
      ...SOCIAL_PREVIEW_BOTS.map((userAgent) => ({ userAgent, allow, disallow }))
    ],
    sitemap: [`${base}/sitemap.xml`, `${base}/sitemap-baidu.xml`],
    host: base
  };
}
