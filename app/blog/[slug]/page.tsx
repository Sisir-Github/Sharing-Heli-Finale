import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getBlogPostBySlug } from "@/lib/cms";
import { COMPANY, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { safeLocalImageSource } from "@/lib/safe-url";

export const revalidate = 900;

type BlogPostPageProps = { params: Promise<{ slug: string }> };

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const canonical = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`;
  const description = post.seoDescription || post.excerpt || post.content.slice(0, 155);
  const image = safeLocalImageSource(post.ogImage || post.featuredImage, "/images/campaign/sharing-heli-hero.jpg");
  return {
    title: post.seoTitle || post.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.seoTitle || post.title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: [{ url: image, alt: post.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description,
      images: [image]
    },
    robots: post.noindex || !IS_PRODUCTION_SITE ? { index: false, follow: true } : { index: true, follow: true }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const description = post.seoDescription || post.excerpt || post.content.slice(0, 155);
  const image = safeLocalImageSource(post.featuredImage || post.ogImage, "/images/campaign/sharing-heli-hero.jpg");
  const publishedAt = post.publishAt || post.createdAt;
  const headings = Array.from(post.content.matchAll(/^##\s+(.+)$/gm), (match) => ({
    label: match[1].trim(),
    id: headingId(match[1])
  }));
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/blog" },
    { name: post.title, path }
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildArticleSchema({
            title: post.title,
            description,
            path,
            image,
            author: post.author,
            publishedAt,
            updatedAt: post.updatedAt
          })
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />
      <article className="band band-cream">
        <header className="shell max-w-4xl">
          <p className="eyebrow">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            {post.category || "Flight planning"}
          </p>
          <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-navy sm:text-[2.9rem]">{post.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>By {post.author || COMPANY.brandName}</span>
            <time dateTime={publishedAt.toISOString()}>Published {publishedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
            <time dateTime={post.updatedAt.toISOString()}>Updated {post.updatedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
          </div>
          <div className="media-frame relative mt-9 aspect-[16/9]">
            <Image src={image} alt={post.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>
        </header>
        {headings.length >= 3 ? (
          <nav aria-label="Article contents" className="shell mt-11 max-w-3xl border-y border-sand py-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">In this article</p>
            <ol className="mt-5 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a className="transition-colors hover:text-navy" href={`#${heading.id}`}>
                    {heading.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="article-body shell mt-10 max-w-3xl text-base">
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <RelatedLinks
        heading="Plan The Next Step"
        items={[
          { title: "Compare helicopter tours", description: "Review the main Everest, Annapurna, and Muktinath route requests.", href: "/tours" },
          { title: "Shared flight requests", description: "Understand how join-in seat coordination works in Nepal.", href: "/helicopter-tours/shared-helicopter-flights" },
          { title: "Safety and flight information", description: "Review weather, baggage, weight, and confirmation questions.", href: "/safety-flight-information" }
        ]}
      />
    </>
  );
}
