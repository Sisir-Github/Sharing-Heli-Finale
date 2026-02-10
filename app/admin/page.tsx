import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [services, tours, posts, inquiries, invoices, media] = await Promise.all([
    prisma.service.count(),
    prisma.tour.count(),
    prisma.blogPost.count(),
    prisma.inquiryLead.count(),
    prisma.invoice.count(),
    prisma.mediaAsset.count()
  ]);

  const cards = [
    { label: "Services", value: services },
    { label: "Tours", value: tours },
    { label: "Blog Posts", value: posts },
    { label: "Inquiries", value: inquiries },
    { label: "Invoices", value: invoices },
    { label: "Media Assets", value: media }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-haze">Manage content, tours, and operations content from one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-haze">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
