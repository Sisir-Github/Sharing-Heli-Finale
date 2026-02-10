import { deleteDestination, deleteSocialLink, deleteTrustBadge, deleteWhyChoose, saveSettings, upsertDestination, upsertSocialLink, upsertTrustBadge, upsertWhyChoose } from "@/app/admin/settings/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  type TrustBadgeItem = { id: string; title: string; description: string; icon: string | null; order: number; visible: boolean };
  type WhyChooseItem = { id: string; title: string; description: string; icon: string | null; order: number; visible: boolean };
  type SocialLinkItem = { id: string; label: string; href: string; order: number; visible: boolean };
  type SettingsData = {
    id: string;
    companyName: string;
    brandName: string;
    tagline: string;
    operatingUnder: string;
    primaryPhone: string;
    whatsappNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string | null;
    businessHours: string;
    seoTitle: string;
    seoDescription: string;
    ogImage: string | null;
    heroHeadline: string;
    heroSubheadline: string;
    heroBackgroundMode: string;
    heroBackgroundImage: string | null;
    heroBackgroundVideo: string | null;
    heroCtaPrimaryLabel: string;
    heroCtaPrimaryHref: string;
    heroCtaSecondaryLabel: string;
    heroCtaSecondaryHref: string;
    heroCtaTertiaryLabel: string;
    heroCtaTertiaryHref: string;
    ctaStripText: string;
    ctaStripButtonLabel: string;
    ctaStripButtonHref: string;
    trustBadges: TrustBadgeItem[];
    whyChooseItems: WhyChooseItem[];
    socialLinks: SocialLinkItem[];
  };
  type DestinationItem = { id: string; title: string; description: string; image: string | null; order: number; visible: boolean };

  const settings = (await prisma.siteSettings.findFirst({
    include: {
      trustBadges: { orderBy: { order: "asc" } },
      whyChooseItems: { orderBy: { order: "asc" } },
      socialLinks: { orderBy: { order: "asc" } }
    }
  })) as SettingsData | null;
  const destinations = (await prisma.destination.findMany({ orderBy: { order: "asc" } })) as DestinationItem[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Global Site Settings</h1>
        <p className="mt-2 text-sm text-haze">Update core company details, hero content, and SEO defaults.</p>
      </div>

      <form action={saveSettings} className="grid gap-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Brand Identity</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-haze">
              Company Name
              <input name="companyName" defaultValue={settings?.companyName || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Brand Name
              <input name="brandName" defaultValue={settings?.brandName || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Tagline
              <input name="tagline" defaultValue={settings?.tagline || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Operating Under
              <input name="operatingUnder" defaultValue={settings?.operatingUnder || ""} className="input" required />
            </label>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Contact Details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-haze">
              Primary Phone
              <input name="primaryPhone" defaultValue={settings?.primaryPhone || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              WhatsApp Number
              <input name="whatsappNumber" defaultValue={settings?.whatsappNumber || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Email
              <input name="email" type="email" defaultValue={settings?.email || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Address Line 1
              <input name="addressLine1" defaultValue={settings?.addressLine1 || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Address Line 2
              <input name="addressLine2" defaultValue={settings?.addressLine2 || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Address Line 3
              <input name="addressLine3" defaultValue={settings?.addressLine3 || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Address Line 4
              <input name="addressLine4" defaultValue={settings?.addressLine4 || ""} className="input" />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Business Hours
              <input name="businessHours" defaultValue={settings?.businessHours || ""} className="input" required />
            </label>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">SEO Defaults</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Site Title
              <input name="seoTitle" defaultValue={settings?.seoTitle || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Site Description
              <textarea name="seoDescription" defaultValue={settings?.seoDescription || ""} className="textarea" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              OG Image URL
              <input name="ogImage" defaultValue={settings?.ogImage || ""} className="input" />
            </label>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Hero Section</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Hero Headline
              <input name="heroHeadline" defaultValue={settings?.heroHeadline || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Hero Subheadline
              <textarea name="heroSubheadline" defaultValue={settings?.heroSubheadline || ""} className="textarea" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Background Mode (3d/image/video)
              <input name="heroBackgroundMode" defaultValue={settings?.heroBackgroundMode || "3d"} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Background Image URL
              <input name="heroBackgroundImage" defaultValue={settings?.heroBackgroundImage || ""} className="input" />
            </label>
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              Background Video URL
              <input name="heroBackgroundVideo" defaultValue={settings?.heroBackgroundVideo || ""} className="input" />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Primary CTA Label
              <input name="heroCtaPrimaryLabel" defaultValue={settings?.heroCtaPrimaryLabel || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Primary CTA Link
              <input name="heroCtaPrimaryHref" defaultValue={settings?.heroCtaPrimaryHref || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Secondary CTA Label
              <input name="heroCtaSecondaryLabel" defaultValue={settings?.heroCtaSecondaryLabel || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Secondary CTA Link
              <input name="heroCtaSecondaryHref" defaultValue={settings?.heroCtaSecondaryHref || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Tertiary CTA Label
              <input name="heroCtaTertiaryLabel" defaultValue={settings?.heroCtaTertiaryLabel || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Tertiary CTA Link
              <input name="heroCtaTertiaryHref" defaultValue={settings?.heroCtaTertiaryHref || ""} className="input" required />
            </label>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">CTA Strip</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-haze md:col-span-2">
              CTA Text
              <textarea name="ctaStripText" defaultValue={settings?.ctaStripText || ""} className="textarea" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Button Label
              <input name="ctaStripButtonLabel" defaultValue={settings?.ctaStripButtonLabel || ""} className="input" required />
            </label>
            <label className="grid gap-2 text-sm text-haze">
              Button Link
              <input name="ctaStripButtonHref" defaultValue={settings?.ctaStripButtonHref || ""} className="input" required />
            </label>
          </div>
        </div>

        <button type="submit" className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black">
          Save Settings
        </button>
      </form>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Trust Badges</h2>
        <form action={upsertTrustBadge} className="grid gap-3 md:grid-cols-2">
          <input type="hidden" name="settingsId" value={settings?.id || ""} />
          <input name="title" placeholder="Title" className="input" required />
          <input name="icon" placeholder="Icon key (shield/star/globe)" className="input" />
          <input name="order" type="number" placeholder="Order" className="input" />
          <textarea name="description" placeholder="Description" className="textarea md:col-span-2" required />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="visible" defaultChecked />
            Visible
          </label>
          <button className="w-fit rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Add Badge</button>
        </form>
        <div className="grid gap-3">
          {settings?.trustBadges.map((badge) => (
            <form key={badge.id} action={upsertTrustBadge} className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
              <input type="hidden" name="id" value={badge.id} />
              <input type="hidden" name="settingsId" value={settings.id} />
              <input name="title" defaultValue={badge.title} className="input" required />
              <input name="icon" defaultValue={badge.icon || ""} className="input" />
              <input name="order" type="number" defaultValue={badge.order} className="input" />
              <textarea name="description" defaultValue={badge.description} className="textarea md:col-span-2" required />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="visible" defaultChecked={badge.visible} />
                Visible
              </label>
              <div className="flex gap-2">
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
                <button formAction={deleteTrustBadge} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Social Links</h2>
        <form action={upsertSocialLink} className="grid gap-3 md:grid-cols-2">
          <input type="hidden" name="settingsId" value={settings?.id || ""} />
          <input name="label" placeholder="Label" className="input" required />
          <input name="href" placeholder="https://instagram.com/..." className="input" required />
          <input name="order" type="number" placeholder="Order" className="input" />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="visible" defaultChecked />
            Visible
          </label>
          <button className="w-fit rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Add Link</button>
        </form>
        <div className="grid gap-3">
          {settings?.socialLinks.map((link) => (
            <form key={link.id} action={upsertSocialLink} className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
              <input type="hidden" name="id" value={link.id} />
              <input type="hidden" name="settingsId" value={settings.id} />
              <input name="label" defaultValue={link.label} className="input" required />
              <input name="href" defaultValue={link.href} className="input" required />
              <input name="order" type="number" defaultValue={link.order} className="input" />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="visible" defaultChecked={link.visible} />
                Visible
              </label>
              <div className="flex gap-2">
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
                <button formAction={deleteSocialLink} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Why Choose Us</h2>
        <form action={upsertWhyChoose} className="grid gap-3 md:grid-cols-2">
          <input type="hidden" name="settingsId" value={settings?.id || ""} />
          <input name="title" placeholder="Title" className="input" required />
          <input name="icon" placeholder="Icon key (optional)" className="input" />
          <input name="order" type="number" placeholder="Order" className="input" />
          <textarea name="description" placeholder="Description" className="textarea md:col-span-2" required />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="visible" defaultChecked />
            Visible
          </label>
          <button className="w-fit rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Add Item</button>
        </form>
        <div className="grid gap-3">
          {settings?.whyChooseItems.map((item) => (
            <form key={item.id} action={upsertWhyChoose} className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="settingsId" value={settings.id} />
              <input name="title" defaultValue={item.title} className="input" required />
              <input name="icon" defaultValue={item.icon || ""} className="input" />
              <input name="order" type="number" defaultValue={item.order} className="input" />
              <textarea name="description" defaultValue={item.description} className="textarea md:col-span-2" required />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="visible" defaultChecked={item.visible} />
                Visible
              </label>
              <div className="flex gap-2">
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
                <button formAction={deleteWhyChoose} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Destinations</h2>
        <form action={upsertDestination} className="grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Title" className="input" required />
          <input name="image" placeholder="Image URL" className="input" />
          <input name="order" type="number" placeholder="Order" className="input" />
          <textarea name="description" placeholder="Description" className="textarea md:col-span-2" required />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="visible" defaultChecked />
            Visible
          </label>
          <button className="w-fit rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Add Destination</button>
        </form>
        <div className="grid gap-3">
          {destinations.map((item) => (
            <form key={item.id} action={upsertDestination} className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <input name="title" defaultValue={item.title} className="input" required />
              <input name="image" defaultValue={item.image || ""} className="input" />
              <input name="order" type="number" defaultValue={item.order} className="input" />
              <textarea name="description" defaultValue={item.description} className="textarea md:col-span-2" required />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="visible" defaultChecked={item.visible} />
                Visible
              </label>
              <div className="flex gap-2">
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
                <button formAction={deleteDestination} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
