import Image from "next/image";
import Link from "next/link";
import { Clock3, Headphones, MapPin, Mountain, Plane, ShieldCheck, Users } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Marquee } from "@/components/ui/Marquee";
import { BRAND_ZH, COMPANY, buildLanguageAlternates, SITE_URL } from "@/lib/constants";
import { ZH_UI } from "@/lib/i18n/zh";
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";

const base = SITE_URL.replace(/\/$/, "");

export const metadata = {
  title: "尼泊尔直升机观光与包机预订 | 尼泊尔共享直升机",
  description:
    "尼泊尔直升机观光与包机预订：珠峰、安纳普尔纳大本营、木克蒂纳特朝圣线路。博卡拉本地团队，中文书面报价，付款前写明执飞航空公司。",
  keywords: ["尼泊尔直升机", "尼泊尔直升机旅游", "珠峰直升机", "安纳普尔纳直升机", "木克蒂纳特直升机", "尼泊尔包机", "博卡拉直升机"],
  alternates: {
    canonical: `${base}/zh`,
    languages: buildLanguageAlternates("/", true)
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_NP"],
    title: "尼泊尔直升机观光与包机预订 | 尼泊尔共享直升机",
    description: "珠峰、安纳普尔纳、木克蒂纳特直升机线路，博卡拉本地团队中文服务。",
    siteName: BRAND_ZH.brandName,
    url: `${base}/zh`,
    images: [{ url: "/images/campaign/sharing-heli-hero.jpg", width: 1200, height: 630, alt: "尼泊尔直升机观光" }]
  },
  other: { "content-language": "zh-Hans" }
};

export const revalidate = 86400;

const routes = [
  {
    title: "珠峰地区直升机观光",
    href: "/zh/everest-base-camp-helicopter-tour-nepal",
    image: "/images/campaign/everest-helicopter.jpg",
    from: "加德满都出发",
    duration: "约 4 至 5 小时",
    summary: "飞越昆布山谷，近距离观看珠穆朗玛峰、洛子峰与阿玛达布拉姆峰，在观景点短暂降落。"
  },
  {
    title: "安纳普尔纳大本营",
    href: "/zh/annapurna-base-camp-helicopter-tour-nepal",
    image: "/images/campaign/annapurna-helicopter.jpg",
    from: "博卡拉出发",
    duration: "约 1 至 2 小时",
    summary: "二十分钟飞入圣殿谷地，鱼尾峰与安纳普尔纳南峰近在咫尺，性价比最高的山区航班。"
  },
  {
    title: "木克蒂纳特朝圣线路",
    href: "/zh/muktinath-helicopter-tour-nepal",
    image: "/images/campaign/muktinath-helicopter.jpg",
    from: "博卡拉出发",
    duration: "单程 45 至 55 分钟",
    summary: "沿卡利甘达基峡谷北上进入木斯塘，为无法承受长途山路的朝圣者省下两天颠簸。"
  }
];

const advantages = [
  { icon: MapPin, title: "博卡拉本地团队", body: "办公室就在费瓦湖畔，了解当地天气规律与飞机实际所在位置。" },
  { icon: ShieldCheck, title: "条款书面化", body: "执飞航空公司、含与不含项目、天气改期与取消条款，付款前写清楚。" },
  { icon: Headphones, title: "中文书面沟通", body: "可用中文通过邮件或 WhatsApp 咨询，我们以中文书面回复，不额外收费。" }
];

const faqs = [
  {
    question: "在尼泊尔坐直升机怎么预订？",
    answer:
      "请提供线路、出行日期或日期范围、乘客人数、每位乘客的大致体重与出发城市。我们会回复可行性、适合的航班形式、当前价格，并写明执飞的航空公司。"
  },
  {
    question: "拼机和包机有什么区别？",
    answer:
      "拼机按人计价，把整机费用分摊到座位，但需要凑齐条件相符的乘客才能成行；包机按整机与飞行小时计价，不依赖其他旅客，可自主决定起飞时间与航线。"
  },
  {
    question: "高海拔降落能保证吗？",
    answer: "不能。能否降落取决于天气、能见度、飞机在该高度的性能、乘客总重量与机长当日判断。任何“保证降落”的承诺都超出了销售方的能力范围。"
  },
  {
    question: "什么季节来最合适？",
    answer: "十月至十一月与三月至四月能见度最稳定，也是旺季。山区航班一律安排在清晨，建议预留一个备用日。"
  },
  {
    question: "为什么要提供体重？",
    answer: "直升机在高海拔的可用载重由总重量决定而非座位数。准确体重用于载重与平衡计算，直接影响能否完成计划中的降落。"
  }
];

export default function ZhHomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "首页", path: "/zh" },
            { name: "尼泊尔直升机观光与包机", path: "/zh/tours" }
          ]),
          buildWebPageSchema({
            name: "尼泊尔直升机观光与包机预订",
            description: "珠峰、安纳普尔纳、木克蒂纳特直升机线路，博卡拉本地团队中文服务。",
            path: "/zh",
            inLanguage: "zh-Hans",
            primaryImage: "/images/campaign/sharing-heli-hero.jpg",
            about: ["尼泊尔", "直升机旅游", "珠穆朗玛峰", "安纳普尔纳", "木克蒂纳特"],
            dateModified: new Date()
          }),
          buildItemListSchema({
            name: "尼泊尔直升机线路",
            path: "/zh/tours",
            items: routes.map((route) => ({ name: route.title, path: route.href, image: route.image }))
          }),
          buildFaqSchema(faqs)
        ]}
      />

      {/* Hero */}
      <section className="relative isolate min-h-[600px] overflow-hidden bg-navy sm:min-h-[700px]">
        <Image
          src="/images/campaign/sharing-heli-hero.jpg"
          alt="直升机飞越尼泊尔喜马拉雅山脉"
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="shell relative z-10 flex min-h-[600px] flex-col items-center justify-end pb-14 pt-24 sm:min-h-[700px] sm:pb-20">
          <p className="mb-6 inline-flex items-center gap-3 border border-white/30 bg-white/10 px-4 py-2 text-[11px] tracking-[0.16em] text-white backdrop-blur-sm">
            <MapPin size={12} className="text-accent" />
            尼泊尔 · 博卡拉
          </p>
          <div className="frame-panel w-full max-w-[660px] p-7 text-center sm:p-10">
            <p className="eyebrow justify-center">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              {ZH_UI.brand}
            </p>
            <h1 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.45] text-navy sm:text-[2.6rem]">
              尼泊尔直升机观光与包机预订
            </h1>
            <p data-speakable className="mx-auto mt-5 max-w-lg text-[15px] leading-[2] text-[var(--muted)]">
              珠峰、安纳普尔纳大本营与木克蒂纳特朝圣线路，可拼机也可包机。由博卡拉本地团队协调，中文书面回复航线、价格与条款。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/zh/contact" className="inquiry-button">
                {ZH_UI.reserve}
              </Link>
              <Link href="/zh/tours" className="outline-button">
                {ZH_UI.viewRoutes}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About band */}
      <section className="band band-navy">
        <div className="shell text-center">
          <p className="eyebrow justify-center text-white/60">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            关于我们
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[1.6rem] font-semibold leading-[1.8] text-white sm:text-[2.1rem]">
            {ZH_UI.brand}位于博卡拉费瓦湖畔，为前往尼泊尔的旅客协调直升机拼机与包机航班，覆盖珠峰、安纳普尔纳、木斯塘与朗塘地区。
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[2] text-white/60">
            我们负责行程协调，航班由持照的尼泊尔航空运营商执飞，执飞方名称会在付款前写进书面报价。本站由 {COMPANY.operator} 运营。
          </p>

          <div className="mt-14 grid gap-px border-y border-white/12 text-left md:grid-cols-3 md:divide-x md:divide-white/12">
            {advantages.map(({ icon: Icon, title, body }) => (
              <article key={title} className="border-b border-white/12 px-1 py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <Icon size={22} className="text-accent" />
                <h3 className="mt-5 font-display text-lg font-semibold leading-8 text-white">{title}</h3>
                <p className="mt-3 text-sm leading-[2] text-white/60">{body}</p>
              </article>
            ))}
          </div>

          <Link href="/zh/about-us" className="light-button mt-12">
            {ZH_UI.learnMore}
          </Link>
        </div>
      </section>

      {/* Routes */}
      <section className="band band-cream">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              热门线路
            </p>
            <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-[1.5] text-navy sm:text-[2.3rem]">
              三条最常被预订的线路
            </h2>
            <p className="mt-5 text-[15px] leading-[2] text-[var(--muted)]">
              每一条都会根据当日天气、飞机可用性与乘客资料重新评估后才确认。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {routes.map((route) => (
              <article key={route.href} className="surface-card surface-card-hover group flex flex-col overflow-hidden">
                <Link href={route.href} className="relative block aspect-[16/10] overflow-hidden bg-creamdeep">
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] tracking-[0.08em] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Plane size={13} className="text-accent" />
                      {route.from}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} className="text-accent" />
                      {route.duration}
                    </span>
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-8 text-navy">{route.title}</h3>
                  <p className="mt-3 text-sm leading-[2] text-[var(--muted)]">{route.summary}</p>
                  <Link href={route.href} className="editorial-link mt-auto w-fit pt-6">
                    {ZH_UI.learnMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-11 text-center">
            <Link href="/zh/tours" className="outline-button">
              {ZH_UI.allRoutes}
            </Link>
          </div>
        </div>
      </section>

      <Marquee words={["尼泊尔直升机观光与包机", "博卡拉 · 加德满都出发"]} />

      {/* Practical */}
      <section className="band band-white">
        <div className="shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              出行前须知
            </p>
            <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-[1.6] text-navy sm:text-[2.1rem]">
              山区飞行是有条件的
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-[2] text-[var(--muted)]">
              <p>
                出发地天空晴朗并不代表整条航线适航。云、风与能见度都可能导致延误、改航、缩短行程或改期，这在喜马拉雅地区属于常态而非意外。
              </p>
              <p>
                因此山区航班一律安排在清晨，并强烈建议在行程中预留一个备用日。这是提高成行概率最有效、几乎零成本的做法。
              </p>
            </div>
            <Link href="/zh/faq" className="inquiry-button mt-8">
              {ZH_UI.commonQuestions}
            </Link>
          </div>

          <dl className="grid gap-px self-start border-y border-sand sm:grid-cols-2">
            {[
              { icon: Mountain, label: "最佳季节", value: "10 至 11 月、3 至 4 月" },
              { icon: Clock3, label: "起飞时间", value: "清晨，通常 06:00 起" },
              { icon: Users, label: "单机人数", value: "最多 5 人，按总重量" },
              { icon: ShieldCheck, label: "高海拔降落", value: "计划降落，不作保证" }
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="border-b border-sand py-6 last:border-b-0 sm:border-b-0 sm:odd:pr-6 sm:even:border-l sm:even:border-sand sm:even:pl-6"
              >
                <dt className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-[var(--muted)]">
                  <Icon size={14} className="text-accent" />
                  {label}
                </dt>
                <dd className="mt-2 font-display text-base font-semibold leading-7 text-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="band band-cream" id="faq">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              {ZH_UI.commonQuestions}
            </p>
            <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-[1.5] text-navy sm:text-[2.1rem]">
              旅客最常问的问题
            </h2>
          </div>
          <div className="mx-auto mt-11 max-w-3xl divide-y divide-sand border-y border-sand">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base font-semibold leading-7 text-navy sm:text-lg">
                  {faq.question}
                  <span
                    className="mt-1 shrink-0 font-display text-xl leading-none text-accent transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-[2] text-[var(--muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/zh/faq" className="outline-button">
              查看全部问题
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band band-navy">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-3xl font-display text-[1.7rem] font-semibold leading-[1.6] text-white sm:text-[2.2rem]">
            {ZH_UI.ctaHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[2] text-white/65">{ZH_UI.ctaBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/zh/contact" className="accent-button">
              {ZH_UI.contact}
            </Link>
            <a href={`https://wa.me/${COMPANY.whatsappNumber.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="outline-button">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
