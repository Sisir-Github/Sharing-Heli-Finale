import { COMPANY } from "@/lib/constants";

/**
 * Simplified-Chinese content for the /zh section.
 *
 * Written for Baidu and for Chinese travellers researching on WeChat, Ctrip and
 * Xiaohongshu, not machine-translated from the English pages. Terminology
 * follows what Chinese travellers actually search: 直升机 (helicopter),
 * 包机 (charter), 拼机 (shared seat), 珠峰 (Everest), 安纳普尔纳 (Annapurna),
 * 木克蒂纳特 (Muktinath), 博卡拉 (Pokhara), 加德满都 (Kathmandu).
 */

export const ZH_NAV = [
  { label: "首页", href: "/zh" },
  { label: "直升机线路", href: "/zh/tours" },
  { label: "服务项目", href: "/zh/services" },
  { label: "关于我们", href: "/zh/about-us" },
  { label: "常见问题", href: "/zh/faq" },
  { label: "联系我们", href: "/zh/contact" }
];

export const ZH_UI = {
  brand: "尼泊尔共享直升机",
  brandSub: "Sharing Heli Nepal",
  tagline: "尼泊尔直升机观光与包机预订",
  reserve: "预订航班",
  contact: "联系我们",
  learnMore: "了解详情",
  viewRoutes: "查看线路",
  allRoutes: "全部线路",
  quickAnswer: "快速解答",
  commonQuestions: "常见问题",
  keyFacts: "关键信息",
  relatedPages: "相关页面",
  switchToEnglish: "English",
  ctaHeading: "获取您出行日期的书面报价",
  ctaBody:
    "请提供线路、出行日期、乘客人数与大致体重。博卡拉本地团队会以书面形式回复可行性、当前价格以及实际执飞的航空公司。",
  footerTours: "直升机线路",
  footerPlan: "行程规划",
  footerContact: "博卡拉办公室",
  footerRights: "版权所有",
  phone: "电话",
  whatsapp: "WhatsApp",
  email: "邮箱",
  address: "地址",
  hours: "营业时间",
  hoursValue: "每天 08:00 - 23:00（尼泊尔时间）",
  addressValue: `${COMPANY.address.line1}，博卡拉 33700，甘达基省，尼泊尔`,
  mapNote:
    "在中国大陆无法加载谷歌地图，可在高德或百度地图中搜索“Pokhara Lakeside”定位我们的办公室，或点击下方按钮查看坐标。",
  coordinates: `坐标：${COMPANY.geo.latitude}, ${COMPANY.geo.longitude}`,
  wechatNote: "可通过 WhatsApp 或邮件用中文咨询，我们会以中文书面回复。"
};

export const ZH_FOOTER_LINKS = {
  tours: [
    { label: "珠峰地区直升机观光", href: "/zh/everest-base-camp-helicopter-tour-nepal" },
    { label: "安纳普尔纳大本营", href: "/zh/annapurna-base-camp-helicopter-tour-nepal" },
    { label: "木克蒂纳特朝圣线路", href: "/zh/muktinath-helicopter-tour-nepal" },
    { label: "全部直升机线路", href: "/zh/tours" }
  ],
  plan: [
    { label: "服务项目", href: "/zh/services" },
    { label: "常见问题", href: "/zh/faq" },
    { label: "关于我们", href: "/zh/about-us" },
    { label: "联系我们", href: "/zh/contact" },
    { label: "English site", href: "/" }
  ]
};

export type ZhSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ZhPageContent = {
  path: string;
  englishPath: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  answer: string;
  heroImage: string;
  heroImageAlt: string;
  quickFacts: Array<{ label: string; value: string }>;
  sections: ZhSection[];
  table?: { caption: string; note?: string; columns: string[]; rows: string[][] };
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ title: string; description: string; href: string }>;
};
