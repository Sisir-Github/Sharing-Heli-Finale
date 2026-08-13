import type { MetadataRoute } from "next";

import { IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_SITE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }]
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/images/", "/uploads/"],
        disallow: ["/api/", "/admin", "/login", "/invoice/"]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
