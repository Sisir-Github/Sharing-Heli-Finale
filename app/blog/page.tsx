import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedBlogPosts } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { safeLocalImageSource } from "@/lib/safe-url";

export const metadata = buildPageMetadata("/blog");
export const revalidate = 900;

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const breadcrumbs = [{ name: "Home", path: "/" }, { name: "Articles", path: "/blog" }];
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="section-space bg-canvas">
        <div className="shell">
          <p className="eyebrow">Flight planning articles</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">
            Practical Nepal Helicopter Travel Information
          </h1>
          <p className="copy mt-5 max-w-2xl">Practical notes on routes, pricing, weather, and shared-flight planning. Operational details should still be checked for the requested date.</p>
          {posts.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="surface-card surface-card-hover overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] bg-steel">
                    <Image
                      src={safeLocalImageSource(post.featuredImage, "/images/campaign/sharing-heli-hero.jpg")}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">{post.category || "Flight planning"}</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-normal text-ink">{post.title}</h2>
                    <p className="copy mt-3 text-sm">{post.excerpt || post.seoDescription || `${post.content.slice(0, 135)}...`}</p>
                    <time className="mt-4 block text-xs text-slate-500" dateTime={(post.publishAt || post.createdAt).toISOString()}>
                      {(post.publishAt || post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                    <Link href={`/blog/${post.slug}`} className="editorial-link mt-5">Read article <ArrowUpRight size={15} /></Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-card mt-10 p-7">
              <h2 className="font-display text-2xl font-semibold tracking-normal text-ink">No articles published yet</h2>
              <p className="copy mt-3">Use the current helicopter guides while the editorial library is prepared.</p>
              <Link href="/guides" className="editorial-link mt-5">Browse flight guides <ArrowUpRight size={15} /></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
