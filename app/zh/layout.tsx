import { BaiduAutoPush } from "@/components/zh/BaiduAutoPush";
import { ZhFooter } from "@/components/zh/ZhFooter";
import { ZhHeader } from "@/components/zh/ZhHeader";

/**
 * The Chinese section declares its own language on a wrapping element. The
 * document element stays en-NP because a single root layout serves both
 * locales; element-level `lang` is valid HTML and is what tells crawlers and
 * screen readers that this subtree is Simplified Chinese. Locale pairing for
 * search engines is carried by the hreflang annotations in each page's
 * metadata.
 */
export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="zh-Hans" className="zh-root">
      <BaiduAutoPush />
      <ZhHeader />
      {children}
      <ZhFooter />
    </div>
  );
}
