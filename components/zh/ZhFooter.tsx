import Link from "next/link";
import { Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { COMPANY } from "@/lib/constants";
import { ZH_FOOTER_LINKS, ZH_UI } from "@/lib/i18n/zh";

/** Full Chinese page list, so each /zh page carries links to the whole section. */
const zhAllPages = [
  { label: "首页", href: "/zh" },
  { label: "全部直升机线路", href: "/zh/tours" },
  { label: "服务项目", href: "/zh/services" },
  { label: "关于我们", href: "/zh/about-us" },
  { label: "常见问题", href: "/zh/faq" },
  { label: "联系我们", href: "/zh/contact" },
  { label: "珠峰地区直升机观光", href: "/zh/everest-base-camp-helicopter-tour-nepal" },
  { label: "安纳普尔纳大本营", href: "/zh/annapurna-base-camp-helicopter-tour-nepal" },
  { label: "木克蒂纳特朝圣线路", href: "/zh/muktinath-helicopter-tour-nepal" }
];

export function ZhFooter() {
  const whatsappHref = `https://wa.me/${COMPANY.whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <footer className="bg-footer pb-24 pt-16 text-white md:pb-0">
      <div className="shell">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <Link href="/zh" className="inline-flex">
              <BrandLogo imageClassName="brand-logo-inverse h-14" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-[1.9] text-white/55">
              {ZH_UI.brand}（{ZH_UI.brandSub}）为前往尼泊尔的旅客安排直升机拼机与包机航班，办公室位于博卡拉费瓦湖畔。
            </p>
            <p className="mt-5 max-w-sm text-[11px] leading-6 text-white/45">{ZH_UI.wechatNote}</p>
          </div>

          <div>
            <p className="footer-heading">{ZH_UI.footerTours}</p>
            <ul className="mt-6 space-y-3.5 text-sm text-white/55">
              {ZH_FOOTER_LINKS.tours.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-[28px] items-center transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading">{ZH_UI.footerPlan}</p>
            <ul className="mt-6 space-y-3.5 text-sm text-white/55">
              {ZH_FOOTER_LINKS.plan.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-[28px] items-center transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading">{ZH_UI.footerContact}</p>
            <address className="mt-6 space-y-4 text-sm not-italic leading-6 text-white/55">
              <span className="flex gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-accent" />
                {ZH_UI.addressValue}
              </span>
              <a href={`tel:${COMPANY.primaryPhone}`} className="flex min-h-[28px] items-center gap-3 transition-colors hover:text-white">
                <Phone size={16} className="text-accent" />
                {COMPANY.primaryPhone}
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-[28px] items-center gap-3 transition-colors hover:text-white">
                <MessageCircleMore size={16} className="text-accent" />
                {COMPANY.whatsappNumber}
              </a>
              <a href={`mailto:${COMPANY.inquiryEmail}`} className="flex min-h-[28px] items-center gap-3 break-all transition-colors hover:text-white">
                <Mail size={16} className="text-accent" />
                {COMPANY.inquiryEmail}
              </a>
            </address>
          </div>
        </div>

        {/* Every Chinese page links to the whole section: Baidu ignores
            hreflang, so internal links are how it maps the site. */}
        <nav aria-label="中文页面导航" className="border-b border-white/10 py-8">
          <p className="footer-heading">全部页面</p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm text-white/55 sm:grid-cols-2 lg:grid-cols-3">
            {zhAllPages.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-[28px] items-center transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 py-7 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {ZH_UI.brand}（{ZH_UI.brandSub}）. {ZH_UI.footerRights}
          </p>
          <Link href="/" className="inline-flex min-h-[26px] items-center transition-colors hover:text-white" hrefLang="en">
            English site
          </Link>
        </div>
      </div>
    </footer>
  );
}
