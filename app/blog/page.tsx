import Image from "next/image";
import { PageSchema } from "@/components/seo/PageSchema";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedBlogPosts } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { safeLocalImageSource } from "@/lib/safe-url";

export const metadata = buildPageMetadata("/blog");
export const revalidate = 900;

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/blog" }
  ];

  return (
    <>
      <PageSchema path="/blog" />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageHero
        eyebrow="Flight planning articles"
        title="Practical Nepal helicopter travel information"
        description="Notes on routes, pricing, weather and shared-flight planning. Operational details should still be checked for your requested date."
        image="/images/campaign/everest-helicopter.jpg"
        imageAlt="Helicopter above the Everest region"
        size="sm"
        priority
      />

      <section className="band band-cream">
        <div className="shell">
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="surface-card surface-card-hover group flex flex-col overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-creamdeep">
                    <Image
                      src={safeLocalImageSource(post.featuredImage, "/images/campaign/sharing-heli-hero.jpg")}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                      {post.category || "Flight planning"}
                    </p>
                    <h2 className="mt-4 font-display text-xl font-semibold leading-[1.25] text-navy">{post.title}</h2>
                    <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">
                      {post.excerpt || post.seoDescription || `${post.content.slice(0, 135)}...`}
                    </p>
                    <time
                      className="mt-5 block font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                      dateTime={(post.publishAt || post.createdAt).toISOString()}
                    >
                      {(post.publishAt || post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </time>
                    <Link href={`/blog/${post.slug}`} className="editorial-link mt-auto w-fit pt-6">
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-card mx-auto max-w-2xl p-9 text-center">
              <h2 className="font-display text-2xl font-semibold text-navy">No articles published yet</h2>
              <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">
                Use the current helicopter guides while the editorial library is prepared.
              </p>
              <Link href="/guides" className="inquiry-button mt-7">
                Browse flight guides
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
