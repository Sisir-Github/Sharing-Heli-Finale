import { ZhPageTemplate } from "@/components/zh/ZhPageTemplate";
import { zhMuktinath } from "@/lib/i18n/zh-index";
import { buildZhMetadata } from "@/lib/i18n/zh-metadata";

export const metadata = buildZhMetadata(zhMuktinath);
export const revalidate = 86400;

export default function Page() {
  return <ZhPageTemplate content={zhMuktinath} />;
}
