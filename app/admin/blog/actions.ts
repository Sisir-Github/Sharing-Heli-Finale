"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-auth";
import { optionalLocalImageSourceSchema } from "@/lib/safe-url";
import { optionalDateTimeInputSchema, slugSchema } from "@/lib/admin-validation";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  content: z.string().min(1),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  relatedTourSlugs: z.string().optional(),
  featuredImage: optionalLocalImageSourceSchema,
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: optionalLocalImageSourceSchema,
  noindex: z.string().optional(),
  published: z.string().optional(),
  publishAt: optionalDateTimeInputSchema
});

export async function createBlogPost(formData: FormData) {
  await requireAdminSession();
  const data = Object.fromEntries(formData.entries());
  const parsed = blogSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.blogPost.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      author: parsed.data.author || null,
      category: parsed.data.category || null,
      tags: parsed.data.tags ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      relatedTourSlugs: parsed.data.relatedTourSlugs ? parsed.data.relatedTourSlugs.split(",").map((slug) => slug.trim()).filter(Boolean) : [],
      featuredImage: parsed.data.featuredImage || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      ogImage: parsed.data.ogImage || null,
      noindex: parsed.data.noindex === "on",
      published: parsed.data.published === "on",
      publishAt: parsed.data.publishAt ? new Date(parsed.data.publishAt) : null
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  return;
}

export async function updateBlogPost(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const data = Object.fromEntries(formData.entries());
  const parsed = blogSchema.safeParse(data);
  if (!parsed.success || !id) return;

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      author: parsed.data.author || null,
      category: parsed.data.category || null,
      tags: parsed.data.tags ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      relatedTourSlugs: parsed.data.relatedTourSlugs ? parsed.data.relatedTourSlugs.split(",").map((slug) => slug.trim()).filter(Boolean) : [],
      featuredImage: parsed.data.featuredImage || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      ogImage: parsed.data.ogImage || null,
      noindex: parsed.data.noindex === "on",
      published: parsed.data.published === "on",
      publishAt: parsed.data.publishAt ? new Date(parsed.data.publishAt) : null
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  return;
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return;
}
