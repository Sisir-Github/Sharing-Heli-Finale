# Sharing Heli Nepal — SEO, Baidu and AI-search handbook

Last updated: 19 August 2026

This is the working reference for how search visibility is built into this
codebase, what still has to be done by a human, and what must never be done.

---

## 0. The honest framing

No agency, tool or code change can guarantee a #1 ranking. What this codebase
now does is remove every technical reason a search engine or AI assistant would
have for not ranking or citing the site, and give it more genuinely useful,
sourced content than most competitors publish. The remaining levers — reviews,
listings, backlinks, Baidu account verification — are off-site and need you.

---

## 1. What is implemented

### 1.1 Crawling and indexing

| File | What it does |
| --- | --- |
| `app/robots.ts` | Named allow rules for Google, Bing, Yandex, Naver; the Chinese engines (Baidu family, Sogou, 360, Shenma, Bytespider); ~30 AI crawlers; and social unfurl agents. Blocks `/api/`, `/admin`, `/login`, `/invoice/`, `/_next/data/`. Declares both sitemaps. Auto-blocks everything when `NEXT_PUBLIC_SITE_URL` is not the canonical host, so staging never gets indexed. |
| `app/sitemap.ts` | 56 URLs with `lastmod`, `changefreq`, per-section `priority`, an image per URL, and reciprocal hreflang for every page that exists in both languages. |
| `app/sitemap-baidu.xml/route.ts` | Baidu's XML dialect with `<mobile:mobile type="pc,mobile"/>`. Next.js cannot emit this, hence a hand-rolled route. Chinese URLs are listed first. |
| `lib/seo/crawlers.ts` | The single source of truth for crawler user-agents, with notes on why each group matters. |

**Why AI crawlers are explicitly allowed:** being quotable inside ChatGPT,
Claude, Perplexity, Gemini and Copilot requires those agents to be able to fetch
the page. Many sites block them by accident. DeepSeek has no public first-party
crawler — it reaches the web through search partners and open crawl corpora, so
allowing `CCBot` and the mainstream search crawlers is what actually makes a
site reachable there.

### 1.2 Structured data (`lib/seo/schema.ts`)

A connected entity graph rather than loose snippets. `Organization`,
`LocalBusiness`/`TravelAgency` and `WebSite` carry stable `@id` values that
every other node references.

Implemented types: `Organization`, `TravelAgency`+`LocalBusiness`+
`TouristInformationCenter`, `WebSite`, `WebPage` (with `speakable`, `author`,
`lastReviewed`), `BreadcrumbList`, `FAQPage`, `HowTo`, `ItemList`,
`TouristTrip`, `TouristDestination`, `Service`, `Product`/`Offer`, `Article`,
`Review` + `AggregateRating`.

Verify after deploy at <https://search.google.com/test/rich-results>.

### 1.3 Answer-first page structure

Every landing page and Chinese page opens with a `data-speakable` direct answer,
followed by a facts table, then long-form sections, then a comparison table,
then FAQs. Princeton's GEO research found that content carrying statistics and
verifiable citations is cited 2–3× more often than opinion-only content, and
that structured GEO techniques lift AI visibility 30–40%. Lists and tables are
the formats most frequently extracted.

### 1.4 The market-rate reference (`lib/seo/market-rates.ts`)

Publicly advertised rates from named competitors, with links, dates and a
"these are not our prices" statement. This is the single strongest content asset
on the site: it is the sourced-numbers format that both readers and answer
engines prefer, and no competitor publishes a cross-operator comparison.

**Rules:** every figure needs a public source URL; nothing here is ever emitted
as `Offer`/`PriceSpecification` schema (marking up someone else's price as your
own is a policy violation); re-check the sources each season and update
`surveyedOn`.

### 1.5 New landing pages (9)

`/nepal-helicopter-tour-packages`, `/everest-helicopter-tour-cost`,
`/annapurna-helicopter-tour-cost`, `/private-helicopter-charter-cost-nepal`,
`/kathmandu-helicopter-tours`, `/pokhara-to-muktinath-helicopter`,
`/langtang-gosaikunda-helicopter-tour`, `/how-to-book-a-helicopter-in-nepal`,
`/helicopter-weight-baggage-limits-nepal`.

Content lives in `lib/seo/landing/*.ts`; the template is
`components/seo/LandingPage.tsx`. To add a page: write the content object,
register it in `lib/seo/landing/index.ts` with its `LANDING_META`, and create a
four-line `app/<slug>/page.tsx`. Metadata, sitemap and hreflang follow
automatically.

### 1.6 Chinese section (`/zh`)

Nine Simplified-Chinese pages written for Baidu and Chinese travellers, not
machine-translated. Own header, footer and navigation
(`components/zh/`), reciprocal hreflang, `lang="zh-Hans"` on the section
wrapper, `content-language` meta, and a China-safe contact page — Google Maps is
blocked in mainland China, so `/zh/contact` shows the address, coordinates and
an Amap/Baidu search instruction instead of an iframe.

Titles are kept under 30 Chinese characters and descriptions under 110, which
are Baidu's display limits (Google's are longer).

### 1.7 Baidu-specific plumbing

- `app/sitemap-baidu.xml/route.ts` — mobile-tagged sitemap.
- `components/zh/BaiduAutoPush.tsx` — Baidu auto-push, production only, `/zh` only.
- `app/api/baidu-push/route.ts` — real-time push API. Needs `BAIDU_PUSH_TOKEN`
  and `SEO_PUSH_SECRET`. Run it after publishing new Chinese pages; do not run
  it on a tight schedule, because repeatedly pushing unchanged URLs cuts your
  daily quota.

**Baidu facts worth knowing:** an ICP licence is *not* required to rank, only to
host inside mainland China. Baidu does not execute JavaScript, so server-rendered
HTML is mandatory — all `/zh` pages are statically rendered and their content is
in the HTML source. Baidu ignores hreflang, which is why the Chinese section has
its own navigation. Baidu favours pages loading under 2 seconds as seen from
inside China.

### 1.8 Reviews

`Testimonial` in `prisma/schema.prisma` gained `rating`, `source`, `sourceUrl`,
`reviewedOn` and `tourSlug`, all optional. Managed at `/admin/testimonials`.
Only rows with a real 1–5 rating and a named reviewer reach `Review` and
`AggregateRating` markup; unrated quotes still display but stay out of schema.

**Run the migration before this works:** `npm run db:migrate`.

Never invent a rating. Fabricated review markup is a documented cause of Google
manual actions, and the traffic lost to a penalty dwarfs the gain from stars.

### 1.9 E-E-A-T signals

Every landing page shows "Written and fact-checked by the Sharing Heli Pokhara
flight desk" plus a visible last-reviewed date, mirrored in `WebPage.lastReviewed`
and `reviewedBy`. Visible breadcrumbs on all landing, tour, service and listing
pages, matching the `BreadcrumbList` markup.

### 1.10 llms.txt

`/llms.txt` and `/llms-full.txt` are generated from live CMS content.

Be realistic about these: Google has said publicly it does not use llms.txt, and
two large studies (SE Ranking across ~300k domains, Trakkr across ~38k) found no
citation advantage. OpenAI and Anthropic have not committed either way. They
cost nothing to maintain here because they are generated, so they stay — but the
things that actually drive AI citation are the answer-first structure, the
sourced numbers, the FAQ schema and being crawlable.

### 1.11 Internal linking

Sitemap-only discovery is weak: a page with no internal links gets crawled but
carries almost no weight, and no reader ever reaches it. Three mechanisms fix
that here.

- **Footer "Costs & planning" band** — all nine landing pages, on every page.
- **Contextual links** (`lib/seo/internal-links.ts`) — each tour and service page
  links to the three planning pages that genuinely help someone reading it,
  matched by slug. Everest pages point at the Everest cost page, charter pages
  at charter cost, and so on.
- **Language links** — the English header topbar and footer link to `/zh` with
  `hrefLang` and `lang` attributes. This matters more than it looks: Baidu ignores
  hreflang entirely, so a crawlable link is the only way it finds the Chinese
  section.

Verified: every tour and service page now carries 12 links into the planning
cluster and a visible breadcrumb trail.

### 1.12 Performance baseline

Measured on a 390×844 mobile viewport against the production build:

| Page | TTFB | FCP | LCP | CLS | DOM nodes | Transfer |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 20 ms | 360 ms | 388 ms | 0.030 | 730 | 263 KB / 30 req |
| `/zh` | 18 ms | 248 ms | 248 ms | 0.001 | 359 | 63 KB / 25 req |
| `/everest-helicopter-tour-cost` | 17 ms | 204 ms | 204 ms | 0.005 | 553 | 106 KB / 27 req |
| `/tours` | 10 ms | 192 ms | 192 ms | 0.003 | 477 | 124 KB / 26 req |

These are local numbers, so treat them as a floor rather than a forecast — but
the structure is healthy: LCP well under the 2.5 s threshold, CLS well under
0.1, and no page over 750 DOM nodes. Re-measure with PageSpeed Insights after
deploy, and from inside China (chinaz.com/speedtest) for the `/zh` pages.

Content depth on the Chinese pages: 1,369–2,057 CJK characters each, roughly
equivalent to 850–1,300 English words.

---

## 2. What only you can do

### 2.1 Do these first (highest impact, this week)

1. **Google Search Console** — verify `sharingheli.com`, submit
   `https://sharingheli.com/sitemap.xml`, then request indexing on the nine new
   landing pages.
2. **Bing Webmaster Tools** — verify and submit the sitemap. This is not
   optional if you care about ChatGPT: ChatGPT's web results lean on Bing's
   index. A site missing from Bing is effectively invisible there.
3. **Google Business Profile** — claim the Lakeside office, add the real
   address, hours, photos and services. This is what makes you appear for
   "helicopter tour near me" and in Maps, and it is the single biggest local
   lever you are not using.
4. **Collect real reviews.** Ask every passenger the same day they fly, with a
   direct link to your Google profile. Ten genuine reviews change more than any
   code change in this repo. Add them at `/admin/testimonials` with the rating
   and source filled in so the star markup goes live.

### 2.2 China (next)

5. **Baidu Ziyuan** (`ziyuan.baidu.com`) — register with a Chinese mobile number
   or via a partner, verify the site, submit `sitemap-baidu.xml`, then copy the
   push token into `BAIDU_PUSH_TOKEN`.
6. **Test load speed from inside China** at `chinaz.com/speedtest` or
   `webkaka.com`. If `/zh` takes more than ~3 seconds, that is your ranking
   ceiling on Baidu regardless of content. The fix is a CDN with China presence.
7. **Chinese social proof.** Baidu weighs Chinese-platform presence heavily.
   A WeChat official account, Xiaohongshu posts and a Ctrip/Trip.com listing do
   more for Chinese visibility than on-page work does.
8. Optionally add verification tokens to `.env`:
   `NEXT_PUBLIC_BAIDU_SITE_VERIFICATION`, `NEXT_PUBLIC_SOGOU_SITE_VERIFICATION`,
   `NEXT_PUBLIC_360_SITE_VERIFICATION`, `NEXT_PUBLIC_SHENMA_SITE_VERIFICATION`.

### 2.3 AI assistants

9. **Brave Search Webmaster Tools** — Claude uses Brave's index for search.
   Verify the domain there.
10. **Be patient and check.** Indexation lag differs by platform: Perplexity
    1–2 weeks, ChatGPT 4–8 weeks, Claude 4–12 weeks, Gemini follows Google.
    Test monthly by asking each assistant "what does an Everest helicopter tour
    cost" and noting whether you are cited.
11. **Get mentioned off-site.** AI answers lean on consensus across sources.
    A single well-placed mention on a travel publication or a Reddit/Quora
    answer that cites your page moves the needle more than another on-page tweak.

### 2.4 Ongoing

12. Refresh `lib/seo/market-rates.ts` each season; stale price context is worse
    than none.
13. Publish something on `/blog` monthly. Freshness is a real ranking input, and
    Perplexity in particular weights recency heavily.
14. Add real photos. Every image on the site is currently one of four campaign
    shots; unique photography per route is both a ranking and a conversion win.

---

## 3. Never do these

- Never publish a rating or review you cannot evidence.
- Never mark competitor prices as your own `Offer` schema.
- Never state that a high-altitude landing is guaranteed — it is untrue,
  unenforceable, and the kind of claim that generates complaints.
- Never buy links or use PBNs. Nepali travel is a heavily spammed niche and this
  is exactly where manual actions land.
- Never let the Chinese pages drift out of sync with the English ones on facts.
  Contradiction across a site is a strong negative signal for AI extraction.

---

## 4. Verifying a deploy

```bash
npm run typecheck && npm run lint && npm run build
curl -s https://sharingheli.com/robots.txt | head -20
curl -s https://sharingheli.com/sitemap.xml | grep -c "<url>"
curl -s https://sharingheli.com/llms.txt | head -20
```

Then: Rich Results Test, PageSpeed Insights on `/` and `/zh`, and a mobile
check of the nine landing pages.

---

## 5. Sources for the claims in this document

- Baidu ICP and hosting requirements — Chinafy, <https://www.chinafy.com/blog/do-you-need-an-icp-license-to-rank-on-baidu>
- Baidu technical requirements (JavaScript, sitemap mobile tags, title/description limits, no hreflang) — Dragon Metrics, <https://www.dragonmetrics.com/technical-on-page-seo-guide-baidu/>
- GEO techniques and citation-rate research — <https://heeya.fr/en/blog/generative-engine-optimization-geo-2026>
- llms.txt effectiveness evidence — <https://blog.tobira.ai/does-llms-txt-actually-work/>
- Market rates — sources are cited inline in `lib/seo/market-rates.ts`
