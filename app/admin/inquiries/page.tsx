import { updateInquiryStatus } from "@/app/admin/inquiries/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  type InquiryItem = {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    pageSource: string | null;
    status: string;
  };

  const inquiries = (await prisma.inquiryLead.findMany({ orderBy: { createdAt: "desc" } })) as InquiryItem[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white">Inquiries</h1>
          <p className="mt-2 text-sm text-haze">Track and update inbound inquiry requests.</p>
        </div>
        <a href="/admin/inquiries/export" className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white">
          Export CSV
        </a>
      </div>

      <div className="grid gap-4">
        {inquiries.map((lead) => (
          <div key={lead.id} className="glass rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{lead.name}</p>
                <p className="text-sm text-haze">{lead.email} · {lead.phone}</p>
                <p className="text-xs text-haze">Service: {lead.service}</p>
                <p className="text-xs text-haze">Source: {lead.pageSource || "N/A"}</p>
              </div>
              <form action={updateInquiryStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} className="input">
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
              </form>
            </div>
            <p className="mt-4 text-sm text-slate-100">{lead.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
