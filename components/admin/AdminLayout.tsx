import Link from "next/link";
import { getServerSession } from "next-auth";
import { LogOut } from "lucide-react";

import { authOptions } from "@/lib/auth";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Navigation", href: "/admin/navigation" },
  { label: "Services", href: "/admin/services" },
  { label: "Tours", href: "/admin/tours" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Invoices", href: "/admin/invoices" },
  { label: "Media", href: "/admin/media" }
];

export async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="flex min-h-screen">
        <aside className="admin-surface hidden w-64 flex-col border-r border-white/10 p-6 lg:flex">
          <p className="font-display text-xl text-white">Sharing Heli CMS</p>
          <p className="mt-1 text-xs text-haze">Premium Content Manager</p>

          <nav className="mt-8 grid gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-haze transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="admin-surface-alpha flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <p className="text-sm text-haze">Signed in as</p>
              <p className="text-sm font-semibold text-white">{session?.user?.email}</p>
            </div>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white transition hover:border-aurora/50 hover:bg-white/10"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </form>
          </header>
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
