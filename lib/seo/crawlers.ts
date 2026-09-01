/**
 * Crawler policy.
 *
 * Three groups matter for this site:
 *  1. Classic search engines (Google, Bing, Yandex, Naver).
 *  2. Chinese search engines — the Baidu family plus Sogou, 360 and Shenma.
 *     These are the gateway to the Chinese travel market and they are far more
 *     literal about robots.txt than Google is.
 *  3. AI assistants and their retrieval crawlers. Being cited by ChatGPT,
 *     Claude, Perplexity, Grok, Gemini, Copilot and DeepSeek requires the page
 *     to be crawlable by those agents in the first place — several of them are
 *     blocked by default on many sites, which is a silent loss of visibility.
 *
 * Note on DeepSeek: it has no public first-party web crawler. It reaches web
 * content through search partners and open crawl corpora (Common Crawl), so
 * allowing CCBot and the search crawlers is what actually makes a site
 * reachable there.
 */

export const SEARCH_ENGINE_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Storebot-Google",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "YandexBot",
  "Naver",
  "Yeti"
] as const;

export const CHINESE_SEARCH_BOTS = [
  "Baiduspider",
  "Baiduspider-render",
  "Baiduspider-image",
  "Baiduspider-news",
  "Baiduspider-mobile",
  "Sogou web spider",
  "Sogou inst spider",
  "Sogou spider2",
  "360Spider",
  "HaosouSpider",
  "YisouSpider",
  "Bytespider",
  "Sosospider"
] as const;

/**
 * AI answer engines and model-training crawlers.
 * Allowing these is what makes the site quotable inside chat assistants.
 */
export const AI_ASSISTANT_BOTS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Claude-Web",
  // Google Gemini / AI Overviews
  "Google-Extended",
  "GoogleOther",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // xAI / Grok
  "xAI-Crawler",
  "Grokbot",
  // Microsoft Copilot
  "BingPreview",
  "MicrosoftPreview",
  // Meta AI
  "meta-externalagent",
  "meta-externalfetcher",
  "FacebookBot",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Amazon
  "Amazonbot",
  // Mistral
  "MistralAI-User",
  // Open corpora that feed many models, DeepSeek included
  "CCBot",
  // Others
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "DuckAssistBot",
  "Diffbot",
  "Timpibot",
  "omgili",
  "omgilibot",
  "PetalBot",
  "AI2Bot",
  "Kangaroo Bot",
  "ImagesiftBot"
] as const;

/** Social and messaging unfurl agents — these generate link previews. */
export const SOCIAL_PREVIEW_BOTS = [
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "TelegramBot",
  "Discordbot",
  "Slackbot",
  "MicroMessenger", // WeChat in-app browser / preview fetcher
  "Weibospider"
] as const;

/** Paths no crawler should index. */
export const DISALLOWED_PATHS = ["/api/", "/admin", "/login", "/invoice/", "/_next/data/"];

/** Paths every crawler must be able to fetch for correct rendering. */
export const ALLOWED_ASSET_PATHS = ["/_next/static/", "/images/", "/uploads/"];
