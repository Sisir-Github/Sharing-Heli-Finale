import { getServerSession } from "next-auth";
import { LogOut } from "lucide-react";

import { AdminNav } from "@/components/admin/AdminNav";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { authOptions } from "@/lib/auth";

export async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="flex min-h-screen">
        <aside className="admin-surface hidden w-64 shrink-0 flex-col border-r border-white/10 p-5 lg:flex xl:w-72 xl:p-6">
          <BrandLogo className="w-fit" imageClassName="brand-logo-inverse h-11" />
          <p className="mt-4 text-xs text-haze">Operations and content</p>
          <AdminNav />
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="admin-surface-alpha flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
            <div>
              <p className="text-sm text-haze">Signed in as</p>
              <p className="text-sm font-semibold text-white">{session?.user?.email}</p>
            </div>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs text-white transition hover:border-aurora/50 hover:bg-white/10"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </form>
          </header>
          <AdminNav mobile />
          <main className="flex-1 px-4 py-7 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
