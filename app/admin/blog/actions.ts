"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  category: z.string().optional(),
  tags: z.string().optional(),
  featuredImage: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  published: z.string().optional(),
  publishAt: z.string().optional()
});

export async function createBlogPost(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = blogSchema.safeParse(data);
  if (!parsed.success) return;

  await prisma.blogPost.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
      category: parsed.data.category || null,
      tags: parsed.data.tags ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      featuredImage: parsed.data.featuredImage || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      ogImage: parsed.data.ogImage || null,
      published: parsed.data.published === "on",
      publishAt: parsed.data.publishAt ? new Date(parsed.data.publishAt) : null
    }
  });

  revalidatePath("/admin/blog");
  return;
}

export async function updateBlogPost(formData: FormData) {
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
      category: parsed.data.category || null,
      tags: parsed.data.tags ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
      featuredImage: parsed.data.featuredImage || null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      ogImage: parsed.data.ogImage || null,
      published: parsed.data.published === "on",
      publishAt: parsed.data.publishAt ? new Date(parsed.data.publishAt) : null
    }
  });

  revalidatePath("/admin/blog");
  return;
}

export async function deleteBlogPost(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  return;
}
