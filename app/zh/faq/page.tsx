import { ZhPageTemplate } from "@/components/zh/ZhPageTemplate";
import { zhFaq } from "@/lib/i18n/zh-index";
import { buildZhMetadata } from "@/lib/i18n/zh-metadata";

export const metadata = buildZhMetadata(zhFaq);
export const revalidate = 86400;

export default function Page() {
  return <ZhPageTemplate content={zhFaq} />;
}
