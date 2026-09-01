import type { ZhPageContent } from "@/lib/i18n/zh";
import { zhAbout, zhFaq, zhServices, zhTours } from "@/lib/i18n/zh-pages";
import { zhAnnapurna, zhEverest, zhMuktinath } from "@/lib/i18n/zh-tours";

export const ZH_PAGES: ZhPageContent[] = [zhTours, zhServices, zhAbout, zhFaq, zhEverest, zhAnnapurna, zhMuktinath];

/** All Chinese URLs, including the ones rendered by bespoke components. */
export const ZH_PATHS = ["/zh", "/zh/contact", ...ZH_PAGES.map((page) => page.path)];

export { zhAbout, zhAnnapurna, zhEverest, zhFaq, zhMuktinath, zhServices, zhTours };
