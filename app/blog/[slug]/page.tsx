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
      <article className="section-space pt-10">
        <header className="shell max-w-4xl">
          <p className="eyebrow">{post.category || "Flight planning"}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
            <span>By {post.author || COMPANY.brandName}</span>
            <time dateTime={publishedAt.toISOString()}>Published {publishedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
            <time dateTime={post.updatedAt.toISOString()}>Updated {post.updatedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
          </div>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-ink/10 bg-white">
            <Image src={image} alt={post.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          </div>
        </header>
        {headings.length >= 3 ? (
          <nav aria-label="Article contents" className="shell mt-10 max-w-3xl border-y border-ink/10 py-6">
            <p className="text-sm font-semibold uppercase text-ink">In this article</p>
            <ol className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a className="transition hover:text-sky-700" href={`#${heading.id}`}>
                    {heading.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="article-body copy shell mt-8 max-w-3xl text-base leading-8">
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
