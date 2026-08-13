# Sharing Heli Nepal

Next.js App Router website, reservation desk, and CMS for Sharing Heli Nepal. The public experience focuses on clear route browsing, one reservation workflow, admin-managed fares, and Pokhara-based operations.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
- Prisma 6 with a persistent SQLite database
- NextAuth credentials sessions with bcrypt
- Nodemailer SMTP reservation, inquiry, and invoice delivery
- PDFKit invoice PDF rendering

## Local Setup

Use Node.js 20.9 or newer. Node.js 22 LTS is recommended for local development and cPanel.

1. Install the locked dependencies.

```bash
npm ci
```

2. Create `.env` and `.env.local` from `.env.example`. Prisma reads `.env`; Next.js reads both.

```bash
cp .env.example .env
cp .env.example .env.local
```

3. Set a unique `ADMIN_EMAIL`, an `ADMIN_PASSWORD` of at least 14 characters, and a cryptographically random `NEXTAUTH_SECRET`. There are no default admin credentials.

   Keep `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` at `http://127.0.0.1:3000` locally. Set both to `https://sharingheli.com` in cPanel.

4. Apply the database and create the first administrator.

```bash
npx prisma generate
npm run db:setup
```

5. Run the site.

```bash
npm run dev
```

## Production Deployment

Do not deploy before exporting the live site's indexed URLs and completing the one-to-one migration map in `SEO_MIGRATION_MAP.md`.

```bash
npm ci
npm run check:env:seed
npx prisma generate
npm run db:migrate
npm run build
npm start
```

For cPanel, use `app.js` as the Node entry point and `npm run cpanel:start` as the production startup command. See `CPANEL_DEPLOYMENT.md`.

Run `npm run db:seed` only when intentionally creating the first admin/default records. Updating `prisma/seed.ts` does not update existing production data.

## Required Environment

- `DATABASE_URL` (use `file:./sharing-heli.db`; Prisma resolves it inside `prisma/`)
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- `INQUIRY_EMAIL` (fallback operations inbox; site settings can provide the active destination)
- `NEXT_PUBLIC_SITE_URL` (production: `https://sharingheli.com`)

Optional integrations:

- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `INDEXNOW_KEY`, `INDEXNOW_KEY_LOCATION`

## Operational Notes

- `/admin/reservations` manages reservation status, payment state, confirmed date, quoted amount, deposit, aircraft, pickup point, and internal notes. It also supports manually entered phone or walk-in requests and CSV export.
- `/admin/pricing` is the fast price desk. Fixed public prices require an amount and validity dates; saving records the verification date. Full route content remains in `/admin/tours`.
- `/admin/settings`, `/admin/navigation`, `/admin/services`, `/admin/tours`, `/admin/blog`, and `/admin/media` control the corresponding customer-facing content and assets. The logo URL is managed in Site Content.
- `/api/health` returns HTTP 200 only when the application can reach the SQLite database; use it for deployment and uptime checks.
- `prisma/sharing-heli.db` is persistent business data. Keep the app on one server process, preserve the file between deployments, and include it in off-server backups.
- A public reservation is saved before SMTP is attempted. Email delivery failure does not discard the reservation record.
- Unverified or expired tour prices stay hidden. A public fare requires price mode, matching amount, validity dates, and `lastVerifiedAt`.
- Invoice creation requires an admin session. Customer invoice and PDF links use a stored random public token, not the invoice number.
- Inquiry leads remain saved when SMTP notification fails after a successful database write.
- Uploads accept only signature-validated JPEG, PNG, WebP, and AVIF files up to 8 MB.
- Local `/public/uploads` and `data/invoices` storage are development fallbacks. Use durable object storage for multi-instance production hosting.
- In-memory rate limiting is not sufficient for serverless production. Add a distributed limiter or edge firewall before launch.
- The hero is photography-ready and intentionally has no Three.js dependency. Upload licensed Nepal helicopter photography through the CMS before launch.

## Automated Verification

Run the production server before the route and browser checks. `BASE_URL` defaults to `http://127.0.0.1:3000`.

```bash
npm run check
npm run security:audit
npm run test:smoke
npm run test:crawl
npm run test:responsive
```

## Verification Before Launch

The business must verify current fares, operating carriers, exact legal relationship, route and landing permissions, cancellation/refund/weather policy, taxes and fees, passenger weight and baggage rules, payment methods, licences, and review profiles. Do not replace unknowns with marketing claims.
