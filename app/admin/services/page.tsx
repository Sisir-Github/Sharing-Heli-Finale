import { createService, deleteService, updateService } from "@/app/admin/services/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  type ServiceItem = {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    icon: string | null;
    featuredImage: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    ogImage: string | null;
    noindex: boolean;
    published: boolean;
  };

  const services = (await prisma.service.findMany({ orderBy: { updatedAt: "desc" } })) as ServiceItem[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Services</h1>
        <p className="mt-2 text-sm text-haze">Create, edit, and publish service offerings.</p>
      </div>

      <form action={createService} className="glass rounded-2xl p-6 grid gap-4">
        <h2 className="text-lg font-semibold text-white">Add Service</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Title" className="input" required />
          <input name="slug" placeholder="slug" className="input" required />
          <input name="shortDescription" placeholder="Short description" className="input md:col-span-2" required />
          <textarea name="longDescription" placeholder="Long description" className="textarea md:col-span-2" required />
          <input name="icon" placeholder="Icon key (optional)" className="input" />
          <input name="featuredImage" placeholder="Featured image URL" className="input" />
          <input name="seoTitle" placeholder="SEO title" className="input" />
          <input name="seoDescription" placeholder="SEO description" className="input" />
          <input name="ogImage" placeholder="Social sharing image URL" className="input" />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="published" defaultChecked />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="noindex" /> Exclude from search engines
          </label>
        </div>
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Create</button>
      </form>

      <div className="grid gap-4">
        {services.map((service) => (
          <form key={service.id} action={updateService} className="glass rounded-2xl p-6 grid gap-4">
            <input type="hidden" name="id" value={service.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <input name="title" defaultValue={service.title} className="input" required />
              <input name="slug" defaultValue={service.slug} className="input" required />
              <input name="shortDescription" defaultValue={service.shortDescription} className="input md:col-span-2" required />
              <textarea name="longDescription" defaultValue={service.longDescription} className="textarea md:col-span-2" required />
              <input name="icon" defaultValue={service.icon || ""} className="input" />
              <input name="featuredImage" defaultValue={service.featuredImage || ""} className="input" />
              <input name="seoTitle" defaultValue={service.seoTitle || ""} className="input" />
              <input name="seoDescription" defaultValue={service.seoDescription || ""} className="input" />
              <input name="ogImage" defaultValue={service.ogImage || ""} className="input" />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="published" defaultChecked={service.published} />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="noindex" defaultChecked={service.noindex} /> Exclude from search engines
              </label>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
              <button formAction={deleteService} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
