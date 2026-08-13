# Deployment Checklist

## Before Build

- Confirm the legal identity and operating relationship text with the business.
- Confirm phone, WhatsApp, address, and inquiry email.
- Confirm current tour/service copy, route basis, inclusions, exclusions, and cancellation/weather policy.
- Review the live-sitemap inventory dated 12 August 2026 in `SEO_MIGRATION_MAP.md`, then export Google Search Console landing pages and server logs to find URLs a sitemap may omit.
- Set all required environment variables from `.env.example`.
- Confirm `ADMIN_PASSWORD` is unique and at least 14 characters.
- Run `npm run check:env:seed` before the first database seed and `npm run check:env` on later deployments.

## Build And Database

```bash
npm ci
npm run check:env:seed
npx prisma generate
npx prisma migrate deploy
npm run build
```

Seed only when creating initial records:

```bash
npm run db:seed
```

## After Deploy

- Verify `/sitemap.xml` contains only canonical public URLs.
- Verify `/api/health` returns HTTP 200 with `{"status":"ok","checks":{"database":"ok"}}`.
- Verify `/robots.txt` blocks `/api/`, `/admin`, `/login`, and `/invoice/`.
- Test redirects in `SEO_MIGRATION_MAP.md`.
- Submit sitemap in Google Search Console and Bing Webmaster Tools.
- Test contact inquiry email delivery.
- Submit one public reservation and confirm its booking reference appears in `/admin/reservations`.
- Update that reservation's quote, status, payment state, confirmed date, and aircraft assignment.
- Update a fare in `/admin/pricing` and confirm the public price changes only while its validity window is active.
- Edit the hero or logo in `/admin/settings` and confirm the public frontend updates.
- Test admin login, invoice creation, public invoice token URL, and PDF download.
- Test media upload with valid and invalid file types.
- Run a crawl to confirm no internal links point to duplicate `/tours/[canonical-slug]` or `/services/[canonical-slug]` URLs.
- Verify the public contact details show `info@pokharaflightcentre.com` and `+977-9856028155` for both phone and WhatsApp.
- Confirm staging uses a non-production `NEXT_PUBLIC_SITE_URL` so its pages emit `noindex` and robots disallows crawling.
- Run `npm run test:smoke`, `npm run test:crawl`, and `npm run test:responsive` against the deployed `BASE_URL`.
