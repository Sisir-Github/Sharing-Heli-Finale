import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { BRAND_ZH, buildLanguageAlternates, COMPANY, SITE_URL } from "@/lib/constants";
import { ZH_UI } from "@/lib/i18n/zh";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

const base = SITE_URL.replace(/\/$/, "");
const whatsappHref = `https://wa.me/${COMPANY.whatsappNumber.replace(/[^\d]/g, "")}`;

export const metadata = {
  title: "联系我们 | 尼泊尔共享直升机 | 博卡拉办公室",
  description:
    "联系尼泊尔共享直升机博卡拉办公室获取直升机线路报价：电话、WhatsApp、邮箱与地址。可用中文书面咨询，营业时间每天 08:00 至 23:00。",
  keywords: ["尼泊尔直升机联系", "博卡拉直升机公司", "尼泊尔直升机报价", "尼泊尔直升机中文"],
  alternates: {
    canonical: `${base}/zh/contact`,
    languages: buildLanguageAlternates("/contact", true)
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_NP"],
    title: "联系我们 | 尼泊尔共享直升机",
    description: "博卡拉办公室联系方式与中文书面咨询。",
    siteName: BRAND_ZH.brandName,
    url: `${base}/zh/contact`,
    images: [{ url: "/images/campaign/muktinath-helicopter.jpg", width: 1200, height: 630, alt: "尼泊尔共享直升机博卡拉办公室" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "联系我们 | 尼泊尔共享直升机",
    description: "博卡拉办公室联系方式与中文书面咨询。",
    images: ["/images/campaign/muktinath-helicopter.jpg"]
  },
  other: { "content-language": "zh-Hans" }
};

export const revalidate = 86400;

const channels = [
  { icon: Phone, label: ZH_UI.phone, value: COMPANY.primaryPhone, href: `tel:${COMPANY.primaryPhone}` },
  { icon: MessageCircleMore, label: ZH_UI.whatsapp, value: COMPANY.whatsappNumber, href: whatsappHref },
  { icon: Mail, label: ZH_UI.email, value: COMPANY.inquiryEmail, href: `mailto:${COMPANY.inquiryEmail}` }
];

const required = [
  "希望飞的线路或目的地",
  "出行日期，以及可以接受的日期弹性",
  "乘客人数与每位乘客的大致体重",
  "出发城市（加德满都或博卡拉）与住宿位置",
  "是否有年长者、儿童或行动、健康方面需要说明的情况",
  "希望拼机还是整机包机"
];

export default function ZhContactPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "首页", path: "/zh" },
            { name: "联系我们", path: "/zh/contact" }
          ]),
          buildWebPageSchema({
            name: "联系尼泊尔共享直升机",
            description: "博卡拉办公室联系方式、中文咨询与书面报价流程。",
            path: "/zh/contact",
            inLanguage: "zh-Hans",
            dateModified: new Date()
          })
        ]}
      />

      <Breadcrumbs items={[{ name: "首页", path: "/zh" }, { name: "联系我们", path: "/zh/contact" }]} />

      <PageHero
        eyebrow="联系我们"
        title="与博卡拉团队直接沟通"
        image="/images/campaign/muktinath-helicopter.jpg"
        imageAlt="尼泊尔博卡拉直升机服务"
        size="sm"
        width="wide"
        priority
      />

      <section className="band band-cream">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              {ZH_UI.quickAnswer}
            </p>
            <p data-speakable className="mt-5 font-display text-[1.25rem] font-medium leading-[1.9] text-navy sm:text-[1.45rem]">
              请通过邮件或 WhatsApp 用中文发送您的线路、日期、人数与大致体重，我们会以中文书面回复可行性、当前价格、含与不含项目，以及实际执飞的航空公司。营业时间为每天 08:00 至 23:00（尼泊尔时间，比北京时间晚 2 小时 15 分）。
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="surface-card p-5 transition-transform hover:-translate-y-0.5">
                  <Icon size={18} className="text-accent" />
                  <p className="mt-4 text-[11px] tracking-[0.12em] text-[var(--muted)]">{label}</p>
                  <p className="mt-1.5 break-all font-display text-sm font-semibold text-navy">{value}</p>
                </a>
              ))}
            </div>

            <div className="mt-9 border-t border-sand pt-8">
              <h2 className="font-display text-[1.3rem] font-semibold leading-8 text-navy">咨询时请提供以下信息</h2>
              <ul className="mt-5 space-y-2.5">
                {required.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.9] text-[var(--muted)]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-[2] text-[var(--muted)]">
                体重信息并非形式要求。直升机在高海拔的可用载重由总重量决定，准确的体重直接影响座位安排、燃油与能否完成计划中的降落。
              </p>
            </div>
          </div>

          {/* China-safe location block: Google Maps does not load in mainland China */}
          <aside className="self-start">
            <div className="surface-card overflow-hidden">
              <div className="border-b border-sand bg-cream px-6 py-5">
                <h2 className="font-display text-[1.15rem] font-semibold leading-7 text-navy">{ZH_UI.footerContact}</h2>
              </div>
              <div className="space-y-5 p-6">
                <div className="flex gap-3">
                  <MapPin size={17} className="mt-1 shrink-0 text-accent" />
                  <div>
                    <p className="text-[11px] tracking-[0.12em] text-[var(--muted)]">{ZH_UI.address}</p>
                    <p className="mt-1.5 text-[15px] leading-[1.9] text-navy">{ZH_UI.addressValue}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock3 size={17} className="mt-1 shrink-0 text-accent" />
                  <div>
                    <p className="text-[11px] tracking-[0.12em] text-[var(--muted)]">{ZH_UI.hours}</p>
                    <p className="mt-1.5 text-[15px] leading-[1.9] text-navy">{ZH_UI.hoursValue}</p>
                  </div>
                </div>
                <div className="border-t border-sand pt-5">
                  <p className="text-sm leading-[2] text-[var(--muted)]">{ZH_UI.mapNote}</p>
                  <p className="mt-3 font-display text-sm font-semibold text-navy">{ZH_UI.coordinates}</p>
                  <a href={COMPANY.googleMapsUrl} target="_blank" rel="noreferrer" className="editorial-link mt-5 w-fit">
                    在谷歌地图中查看
                  </a>
                </div>
              </div>
            </div>

            <div className="surface-card mt-5 p-6">
              <h2 className="font-display text-[1.05rem] font-semibold leading-7 text-navy">中文沟通说明</h2>
              <p className="mt-3 text-sm leading-[2] text-[var(--muted)]">{ZH_UI.wechatNote}</p>
              <p className="mt-3 text-sm leading-[2] text-[var(--muted)]">
                现场机组与地面人员以英语沟通为主。如同行人员不便使用英语，请在咨询时说明，我们会把关键信息以中文书面形式提前发给您。
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="band band-navy">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-3xl font-display text-[1.7rem] font-semibold leading-[1.6] text-white sm:text-[2.1rem]">
            {ZH_UI.ctaHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[2] text-white/65">{ZH_UI.ctaBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="accent-button">
              WhatsApp 咨询
            </a>
            <a href={`mailto:${COMPANY.inquiryEmail}`} className="outline-button">
              发送邮件
            </a>
            <Link href="/zh/tours" className="outline-button">
              {ZH_UI.allRoutes}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
