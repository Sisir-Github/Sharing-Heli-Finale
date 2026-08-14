import { createFooterGroup, createFooterLink, createNavItem, deleteFooterGroup, deleteFooterLink, deleteNavItem, updateNavItem } from "@/app/admin/navigation/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminNavigationPage() {
  type NavItem = {
    id: string;
    label: string;
    href: string;
    groupLabel: string | null;
    order: number;
    visible: boolean;
  };
  type FooterLink = { id: string; label: string; href: string; order: number; visible: boolean };
  type FooterGroup = { id: string; title: string; order: number; links: FooterLink[] };

  const [navItems, footerGroups] = (await Promise.all([
    prisma.navItem.findMany({ orderBy: { order: "asc" } }),
    prisma.footerGroup.findMany({
      orderBy: { order: "asc" },
      include: { links: { orderBy: { order: "asc" } } }
    })
  ])) as [NavItem[], FooterGroup[]];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Navigation & Footer</h1>
        <p className="mt-2 text-sm text-haze">Edit menu items and footer link groups.</p>
      </div>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Menu Items</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <form action={createNavItem} className="grid gap-3 rounded-xl border border-white/10 p-4">
            <p className="text-sm text-haze">Add new item</p>
            <input name="label" placeholder="Label" className="input" required />
            <input name="href" placeholder="/services" className="input" required />
            <input name="groupLabel" placeholder="Dropdown group (optional)" className="input" />
            <input name="order" type="number" placeholder="Order" className="input" />
            <label className="flex items-center gap-2 text-sm text-haze">
              <input type="checkbox" name="visible" defaultChecked />
              Visible
            </label>
            <button className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Add</button>
          </form>

          <div className="grid gap-3">
            {navItems.map((item) => (
              <form key={item.id} action={updateNavItem} className="grid gap-3 rounded-xl border border-white/10 p-4">
                <input type="hidden" name="id" value={item.id} />
                <input name="label" defaultValue={item.label} className="input" required />
                <input name="href" defaultValue={item.href} className="input" required />
                <input name="groupLabel" defaultValue={item.groupLabel || ""} placeholder="Dropdown group (optional)" className="input" />
                <input name="order" type="number" defaultValue={item.order} className="input" />
                <label className="flex items-center gap-2 text-sm text-haze">
                  <input type="checkbox" name="visible" defaultChecked={item.visible} />
                  Visible
                </label>
                <div className="flex gap-2">
                  <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
                  <button formAction={deleteNavItem} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Footer Groups</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <form action={createFooterGroup} className="grid gap-3 rounded-xl border border-white/10 p-4">
            <p className="text-sm text-haze">Add group</p>
            <input name="title" placeholder="Group title" className="input" required />
            <input name="order" type="number" placeholder="Order" className="input" />
            <label className="flex items-center gap-2 text-sm text-haze">
              <input type="checkbox" name="visible" defaultChecked />
              Visible
            </label>
            <button className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Add</button>
          </form>

          <div className="grid gap-3">
            {footerGroups.map((group) => (
              <div key={group.id} className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{group.title}</p>
                    <p className="text-xs text-haze">Order: {group.order}</p>
                  </div>
                  <form action={deleteFooterGroup}>
                    <input type="hidden" name="id" value={group.id} />
                    <button className="rounded-lg border border-rose-400/50 px-3 py-1 text-xs text-rose-200">Delete</button>
                  </form>
                </div>

                <div className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <form key={link.id} action={deleteFooterLink} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm">
                      <div>
                        <p className="text-white">{link.label}</p>
                        <p className="text-xs text-haze">{link.href}</p>
                      </div>
                      <input type="hidden" name="id" value={link.id} />
                      <button className="text-xs text-rose-200">Remove</button>
                    </form>
                  ))}
                </div>

                <form action={createFooterLink} className="mt-4 grid gap-2">
                  <input type="hidden" name="groupId" value={group.id} />
                  <input name="label" placeholder="Link label" className="input" required />
                  <input name="href" placeholder="/contact" className="input" required />
                  <input name="order" type="number" placeholder="Order" className="input" />
                  <label className="flex items-center gap-2 text-sm text-haze">
                    <input type="checkbox" name="visible" defaultChecked />
                    Visible
                  </label>
                  <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Add link</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
