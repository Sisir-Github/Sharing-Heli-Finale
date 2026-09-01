import { SITE_URL } from "@/lib/constants";
import { ZH_PATHS } from "@/lib/i18n/zh-index";
import { INDEXABLE_PATHS } from "@/lib/seo/page-seo";

export const revalidate = 3600;

const base = SITE_URL.replace(/\/$/, "");

/**
 * Baidu-flavoured sitemap.
 *
 * Baidu's XML dialect adds a mobile namespace that Google's does not use, and
 * Next.js's MetadataRoute.Sitemap cannot emit it — hence a hand-rolled route.
 * `type="pc,mobile"` declares the site as responsive, which is what stops Baidu
 * from transcoding pages into its own stripped-down mobile rendering.
 *
 * Submit this URL in Baidu Ziyuan (search.baidu.com/search/index) under
 * 资源提交 → sitemap.
 */
function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

export async function GET() {
  // Chinese pages first: they are what Baidu should prioritise.
  const paths = Array.from(new Set([...ZH_PATHS, ...INDEXABLE_PATHS]));
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = paths
    .map((path) => {
      const priority = path === "/zh" ? "1.0" : path.startsWith("/zh") ? "0.9" : "0.6";
      return `  <url>
    <loc>${escapeXml(`${base}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <mobile:mobile type="pc,mobile"/>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.baidu.com/schemas/sitemap-mobile/1/">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
