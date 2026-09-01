import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

type Crumb = { name: string; path: string };

/**
 * One-line WebPage + BreadcrumbList emitter for pages that do not build their
 * own schema. Title and description are read from the SEO registry so the
 * markup can never drift from the <head> metadata, which is the usual cause of
 * structured-data mismatches.
 */
export function PageSchema({
  path,
  name,
  description,
  breadcrumbs,
  about,
  image,
  inLanguage,
  dateModified,
  visibleTrail = true
}: {
  path: string;
  name?: string;
  description?: string;
  breadcrumbs?: Crumb[];
  about?: string[];
  image?: string;
  inLanguage?: string;
  dateModified?: Date | string;
  /** Set false when the page already renders its own breadcrumb trail. */
  visibleTrail?: boolean;
}) {
  const registered = SEO_PAGES[path];
  const resolvedName = name || registered?.title?.split("|")[0].trim() || path;
  const resolvedDescription = description || registered?.description || "";

  const trail: Crumb[] =
    breadcrumbs || (path === "/" ? [] : [{ name: "Home", path: "/" }, { name: resolvedName, path }]);

  return (
    <>
      {visibleTrail && trail.length > 1 ? <Breadcrumbs items={trail} /> : null}
      <JsonLd
        data={[
          ...(trail.length > 1 ? [buildBreadcrumbSchema(trail)] : []),
          buildWebPageSchema({
            name: resolvedName,
            description: resolvedDescription,
            path,
            about,
            primaryImage: image,
            inLanguage,
            dateModified: dateModified || new Date()
          })
        ]}
      />
    </>
  );
}
