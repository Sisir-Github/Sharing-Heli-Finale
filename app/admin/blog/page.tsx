import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/app/admin/blog/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  type BlogPostItem = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    author: string | null;
    category: string | null;
    tags: string[];
    relatedTourSlugs: string[];
    featuredImage: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    ogImage: string | null;
    noindex: boolean;
    published: boolean;
    publishAt: Date | null;
  };

  const posts = (await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } })) as BlogPostItem[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Blog</h1>
        <p className="mt-2 text-sm text-haze">Create and manage long-form editorial content.</p>
      </div>

      <form action={createBlogPost} className="glass rounded-2xl p-6 grid gap-4">
        <h2 className="text-lg font-semibold text-white">Add Blog Post</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Title" className="input" required />
          <input name="slug" placeholder="slug" className="input" required />
          <textarea name="excerpt" placeholder="Short excerpt" className="textarea md:col-span-2" />
          <input name="author" placeholder="Author or organization" className="input" />
          <input name="relatedTourSlugs" placeholder="Related tour slugs, comma separated" className="input" />
          <textarea name="content" placeholder="Content (Markdown supported)" className="textarea md:col-span-2" required />
          <input name="category" placeholder="Category" className="input" />
          <input name="tags" placeholder="Tags (comma separated)" className="input" />
          <input name="featuredImage" placeholder="Featured image URL" className="input" />
          <input name="seoTitle" placeholder="SEO title" className="input" />
          <input name="seoDescription" placeholder="SEO description" className="input" />
          <input name="ogImage" placeholder="OG image URL" className="input" />
          <input name="publishAt" type="datetime-local" className="input" />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="published" />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="noindex" /> Exclude from search engines
          </label>
        </div>
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Create</button>
      </form>

      <div className="grid gap-4">
        {posts.map((post) => (
          <form key={post.id} action={updateBlogPost} className="glass rounded-2xl p-6 grid gap-4">
            <input type="hidden" name="id" value={post.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <input name="title" defaultValue={post.title} className="input" required />
              <input name="slug" defaultValue={post.slug} className="input" required />
              <textarea name="excerpt" defaultValue={post.excerpt || ""} className="textarea md:col-span-2" />
              <input name="author" defaultValue={post.author || ""} className="input" />
              <input name="relatedTourSlugs" defaultValue={post.relatedTourSlugs.join(", ")} className="input" />
              <textarea name="content" defaultValue={post.content} className="textarea md:col-span-2" required />
              <input name="category" defaultValue={post.category || ""} className="input" />
              <input name="tags" defaultValue={post.tags.join(", ")} className="input" />
              <input name="featuredImage" defaultValue={post.featuredImage || ""} className="input" />
              <input name="seoTitle" defaultValue={post.seoTitle || ""} className="input" />
              <input name="seoDescription" defaultValue={post.seoDescription || ""} className="input" />
              <input name="ogImage" defaultValue={post.ogImage || ""} className="input" />
              <input name="publishAt" type="datetime-local" defaultValue={post.publishAt ? post.publishAt.toISOString().slice(0, 16) : ""} className="input" />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="published" defaultChecked={post.published} />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="noindex" defaultChecked={post.noindex} /> Exclude from search engines
              </label>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
              <button formAction={deleteBlogPost} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
