# PRODUCTION READINESS REPORT

Audit date: 14 August 2026
Repository: `/Users/sisir/Projects/Sharing-Heli`
Audited runtime: Node.js `v24.13.0`, npm `11.6.2`

## Overall Status

**🟡 PRODUCTION READY AFTER MANUAL CONFIGURATION**

The source, production build, public navigation, responsive UI, security headers, guest workflows, admin route protection, SEO surface, and automated checks pass. The application is **not deployable as a working booking operation yet** because this workspace has no production PostgreSQL connection, NextAuth secret, administrator account, SMTP credentials, durable-file backup configuration, or live-host verification. No credentials were invented.

## 1 Project Understanding

- Next.js 16.3 App Router application with React 19, strict TypeScript, Tailwind CSS, Prisma 5, PostgreSQL, NextAuth credentials authentication, bcrypt, Nodemailer, Zod, and PDFKit.
- Public users browse without authentication. Public areas include home, tours, services, destinations, blog/guides, FAQ, contact, legal pages, safety information, and the reservation request form.
- Administrators authenticate separately at `/login`. `/admin` and all admin pages are protected by the proxy and write operations also require a server-side ADMIN session.
- Public reservation requests are persisted to `Reservation`, then notification and acknowledgement emails are attempted. Admins manage request, quote, payment, aircraft, and flight statuses.
- General inquiries are persisted to `InquiryLead` when PostgreSQL is available and delivered through SMTP.
- Prices, route content, navigation, branding, services, blog posts, inquiries, reservations, media, and invoices are managed in the admin CMS.
- Invoices are admin-created. Public invoice/PDF access uses random UUID tokens rather than invoice numbers. No payment gateway or card processing exists.
- cPanel/Passenger deployment uses `app.js`; public uploads and generated invoice files currently use local disk.

## 2 Tests Executed

| Command or check | Result | Pass/Fail | Important output |
|---|---|---:|---|
| `node --version` / `npm --version` | Completed | PASS | Node `24.13.0`, npm `11.6.2` |
| Baseline `npm ci` | Completed | PASS | 535 packages installed; initially one low development advisory |
| Baseline `npm test` | No script existed | FAIL | `Missing script: "test"`; fixed by adding focused tests |
| Baseline `npm run lint` | Completed | PASS | ESLint returned no errors |
| Baseline `npx tsc --noEmit` | Completed | PASS | Strict TypeScript returned no errors |
| Baseline `npx prisma validate` | Completed with a non-secret format-only URL | PASS | Prisma schema valid |
| Baseline `npm run build` | Completed | PASS | 43 static pages generated; all application routes compiled |
| Baseline `npm audit --omit=dev` | Completed | PASS | Zero production vulnerabilities |
| Baseline `npm audit` | Found `tsx`/`esbuild` advisory | FAIL | One low Windows development-server file-read advisory; fixed by updating `tsx` |
| Final `npm ci` | Completed from lockfile | PASS | 536 packages installed; zero vulnerabilities |
| Final `npm run check` | Completed | PASS | Lint, typecheck, 13 tests, and production build all passed |
| Final `npm test` | Completed | PASS | 13/13 validation, security, invoice, pricing, rate-limit, and date tests passed |
| Final `npx prisma validate` | Completed | PASS | Prisma schema valid |
| Final `npm audit` | Completed | PASS | Zero known vulnerabilities across runtime and development dependencies |
| Final `npm audit --omit=dev` | Completed | PASS | Zero known production vulnerabilities |
| `npm run test:smoke` | Completed against `next start` | PASS | 140 checks across 23 public pages and protected workflows |
| `npm run test:crawl` | Completed against `next start` | PASS | 160 checks across 38 sitemap pages and 44 unique internal links |
| `npm run test:responsive` | Completed in headless Chrome | PASS | 93 checks at 390x844, 768x1024, and 1440x900 |
| Browser guest journey | Completed | PASS | Public navigation, theme toggle, contact form, reservation form, and fallback states verified |
| Invalid/oversized API payload checks | Completed | PASS | Stable 400, 413, 415, and 405 responses verified |
| Unauthenticated admin/API checks | Completed | PASS | Admin redirects to login; invoice, upload, and IndexNow writes return 401 |
| Security-header inspection | Completed | PASS | CSP, HSTS, frame denial, nosniff, referrer, permissions, and COOP headers present |
| Environment validator without configuration | Rejected as designed | PASS | Listed ten missing runtime variables without exposing values |
| Environment validator with synthetic audit-only values | Completed | PASS | Runtime and seed validation passed |
| Seed without administrator credentials | Rejected as designed | PASS | Refused to seed without a unique password of at least 14 characters |
| Lighthouse homepage | Completed under mobile throttling | PASS WITH NOTE | Performance 83, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse contact page | Completed | PASS | Accessibility 100, Best Practices 100, SEO 100 |
| Deployment ZIP integrity | Completed | PASS | 2.3 MB; archive test clean; excludes secrets, dependencies, build output, data, and uploads |
| Live PostgreSQL migration/persistence | No database supplied | NOT RUN | Manual production action required |
| Live SMTP delivery | No SMTP account supplied | NOT RUN | Manual production action required |
| Real admin login/CMS mutation | No DB/admin credentials supplied | NOT RUN | Manual production action required |

## 3 Final Test Summary

| Area | Status | Evidence |
|---|---:|---|
| Build | PASS | `npm run build`; optimized Next.js build completed |
| Tests | PASS | 13/13 unit tests |
| Lint | PASS | ESLint clean |
| Typecheck | PASS | Strict TypeScript clean |
| Integration | PARTIAL | API validation/auth/failure paths pass; real PostgreSQL and SMTP unavailable |
| E2E | PASS WITH LIMITATION | 140 smoke, 160 crawl, 93 responsive checks; no live persistence/email |
| Production Build | PASS | `next start` serves the built application on `127.0.0.1:3000` |
| Security Audit | PASS WITH RESIDUAL RISKS | Zero dependency advisories; remaining operational risks listed below |
| SEO Audit | PASS | Lighthouse 100; 38 canonical sitemap pages; redirects/robots/noindex verified |
| Performance Audit | PASS WITH NOTE | Lighthouse 83; FCP 1.4s, LCP 4.1s, TBT 200ms, CLS 0, 425 KiB |

## 4 Bugs Found

### Bug 1: No automated test command
- **Problem:** The repository had no `npm test`, integration smoke test, crawl, or responsive audit.
- **Severity:** High
- **File:** `package.json`
- **Cause:** Production behavior depended on manual testing only.
- **Fix:** Added unit, smoke, crawl, responsive, environment, security, and aggregate check scripts.
- **Verification:** 13 unit tests, 140 smoke checks, 160 crawl checks, and 93 responsive checks pass.

### Bug 2: CSV formula injection
- **Problem:** Inquiry/reservation values beginning with `=`, `+`, `-`, or `@` could execute as formulas when opened in spreadsheet software.
- **Severity:** Medium
- **File:** `app/admin/inquiries/export/route.ts`, `app/admin/reservations/export/route.ts`
- **Cause:** CSV quoting escaped double quotes but did not neutralize formula prefixes.
- **Fix:** Added shared `escapeCsvCell`/`rowsToCsv` handling and stable export failure responses.
- **Verification:** Security test confirms formula neutralization and quote escaping.

### Bug 3: Unsafe CMS links and image sources
- **Problem:** CMS-managed links accepted executable/protocol-relative schemes and image fields accepted arbitrary strings.
- **Severity:** Medium
- **File:** Admin settings/navigation/service/blog/tour actions and public render components
- **Cause:** Schemas validated only non-empty strings.
- **Fix:** Restricted links to internal paths, HTTPS, email, or telephone links; restricted images to normalized local paths; added render-time fallbacks.
- **Verification:** Security tests reject `javascript:`, protocol-relative links, external images, and path traversal.

### Bug 4: Invalid calendar dates and date ordering
- **Problem:** Dates such as `2026-02-31`, past Nepal-local dates, an alternate date before the preferred date, or reversed price/invoice validity ranges could be accepted.
- **Severity:** Medium
- **File:** `lib/validation.ts`, admin pricing/reservation/tour/invoice actions, invoice validation
- **Cause:** JavaScript date normalization was treated as calendar validation and UTC was used for the customer minimum date.
- **Fix:** Added strict calendar validation, Nepal-local date calculation, and cross-field ordering checks.
- **Verification:** Unit tests cover leap years, impossible dates, past/order constraints, and invoice dates.

### Bug 5: Reservation database failures leaked as unstructured server errors
- **Problem:** Tour lookup or reservation creation failure could return a framework 500 response instead of stable customer-facing JSON.
- **Severity:** High
- **File:** `app/api/reservations/route.ts`
- **Cause:** Prisma calls were not contained in error handling.
- **Fix:** Added stable 503 JSON responses and server-side logging; validation now runs before reporting missing infrastructure.
- **Verification:** Public form and smoke tests show a clear unavailable state without a crash.

### Bug 6: Invoice integrity and delivery behavior
- **Problem:** Client-supplied line totals could override calculated totals; zero quantities, impossible dates, and reversed due dates were accepted; SMTP failure made a saved invoice appear completely failed.
- **Severity:** High
- **File:** Invoice validation, utilities, create API, and admin actions
- **Cause:** Totals and dates were trusted too broadly and email was inside the critical save path.
- **Fix:** Server-calculated line totals, positive quantities, strict dates, bounded item count/body size, validated admin lines, and non-fatal email warnings.
- **Verification:** Invoice/pricing tests pass and unauthenticated invoice creation remains 401.

### Bug 7: Media upload could leave orphaned files
- **Problem:** A failed database metadata write after disk storage could leave an untracked file.
- **Severity:** Medium
- **File:** `app/api/media/upload/route.ts`
- **Cause:** Disk and database operations had no compensating cleanup.
- **Fix:** Added database availability check, exclusive writes, cleanup on failure, and stable error output.
- **Verification:** Typecheck/build pass; unauthenticated route remains protected. Live upload awaits production DB/filesystem.

### Bug 8: Private pages could inherit public indexing metadata
- **Problem:** `/login` could emit index/follow metadata and callback destinations were not explicitly limited to admin-local paths.
- **Severity:** Medium
- **File:** `app/login/page.tsx`, `app/admin/layout.tsx`
- **Cause:** Root metadata inheritance and unnormalized query input.
- **Fix:** Added noindex/nofollow metadata and an admin-only callback guard.
- **Verification:** Smoke test confirms login noindex and admin redirect behavior; security tests reject external callbacks.

### Bug 9: Missing production health and environment gates
- **Problem:** Deployments had no database-aware health endpoint and could start with incomplete configuration.
- **Severity:** High
- **File:** `app/api/health/route.ts`, `scripts/validate-env.mjs`
- **Cause:** Configuration was documented but not executable as a deployment check.
- **Fix:** Added non-sensitive health status and strict runtime/seed environment validation.
- **Verification:** Missing configuration fails explicitly; synthetic complete configuration passes; local health returns 503/degraded without DB.

### Bug 10: Accessibility and logo performance defects
- **Problem:** White text on sky blue failed contrast, homepage definition-list markup was invalid, muted dark-mode text failed contrast, and the 2172px logo was requested for a roughly 170px display.
- **Severity:** Medium
- **File:** `app/globals.css`, `components/sections/HomeOperator.tsx`, `components/layout/BrandLogo.tsx`, logo assets
- **Cause:** Visual color choices, icon placement, fixed intrinsic image sizing, and priority loading.
- **Fix:** High-contrast ink text on sky blue, valid semantics, stronger muted text, responsive logo sizing, and optimized 600px PNG/900px JPEG files.
- **Verification:** Lighthouse accessibility rose from 93 to 100; no binary failures; homepage payload reduced and performance rose from 33 baseline run to 83 final.

## 5 Files Changed

| File or group | What changed | Why |
|---|---|---|
| `package.json`, `package-lock.json` | Added check/test scripts; updated `tsx`; added `playwright-core` | Repeatable verification and removal of the development advisory |
| `lib/date.ts` | Strict dates and Nepal-local current date | Prevent impossible and timezone-shifted dates |
| `lib/csv.ts` | Safe spreadsheet export encoding | Prevent CSV formula injection |
| `lib/safe-url.ts` | Link, image, and admin callback guards | Prevent unsafe CMS output and redirects |
| `lib/admin-validation.ts` | Shared slug/date schemas | Consistent CMS validation |
| `lib/validation.ts` | Reservation calendar and ordering checks | Protect public reservation data |
| `lib/invoice/validation.ts`, `lib/invoice/utils.ts` | Strict dates/quantities and server totals | Invoice integrity |
| `lib/tours/pricing.ts` | End-date validity through end of day | Avoid prematurely hiding a valid fare |
| `app/api/inquiry/route.ts` | Content type, rate-limit namespace, Allow header | Stable, isolated public API behavior |
| `app/api/reservations/route.ts` | Validation order, Nepal date, DB error handling | Reliable customer failures and cleaner API contracts |
| `app/api/invoice/create/route.ts` | Body limits and non-fatal mail warning | Bound requests and preserve saved invoices |
| `app/api/media/upload/route.ts` | DB gate, exclusive write, orphan cleanup | Consistent media records |
| `app/api/health/route.ts` | Added database-aware health check | Deployment and uptime monitoring |
| Inquiry/reservation export routes | Shared safe CSV and 503 behavior | Spreadsheet safety and stable failures |
| Admin settings/navigation/service/blog/tour actions | Safe links/images/slugs/dates | Prevent malformed or unsafe public content |
| Admin pricing/reservation/invoice actions | Cross-field and monetary checks | Protect operational and financial data |
| `app/login/page.tsx`, `app/admin/layout.tsx` | Private metadata and safe callback | Keep admin surfaces out of search |
| Reservation/contact form components | Nepal minimum date, native validation, alert semantics | Better public form behavior and accessibility |
| Header/footer/logo/hero/operator/tour/service components | Safe sources, semantics, contrast, priority, responsive image sizing | Security, dark mode, accessibility, and performance |
| `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` | Safe image fallback | Prevent invalid CMS image output |
| `app/globals.css` | Accessible sky-blue controls and dark-mode contrast | WCAG contrast compliance |
| `public/images/sharing-heli-logo.png`, `.jpg` | Resampled to practical delivery sizes | Reduce waste while retaining required PNG/JPEG variants |
| `scripts/validate-env.mjs` | Required-variable and placeholder validation | Fail deployment before runtime |
| `scripts/smoke-test.mjs` | Public/API/auth/SEO/header checks | Repeatable production smoke coverage |
| `scripts/crawl-audit.mjs` | Sitemap, canonical, and internal-link crawl | Detect broken and duplicate routes |
| `scripts/responsive-audit.mjs` | Mobile/tablet/desktop Chrome checks | Detect overflow, media, theme, menu, and target defects |
| `tests/*.test.ts` | 13 focused tests | Regression coverage for risky domain logic |
| `.env.example` | Blank required secrets and clear optional section | Safe, complete environment inventory |
| README/security/deployment documents | Updated commands, health check, and current findings | Operational accuracy |

## 6 Security Findings

### Critical
- None found.

### High
- None remaining in the reviewed code.

### Medium
- **In-memory rate limiting:** suitable only for one Node process. Multiple workers/instances need Redis, a managed limiter, or an upstream WAF rule.
- **Local file persistence:** uploads and invoice copies need durable backup and careful permissions; ephemeral/multi-instance hosting requires object storage.
- **CSP uses `'unsafe-inline'`:** required by the current Next.js inline/bootstrap approach, but nonce/hash hardening would further reduce script-injection impact.
- **No live secret/service verification:** PostgreSQL, SMTP, NextAuth, and admin auth have not been exercised with real credentials.

### Low
- Reservation and invoice monetary fields use database `Float`; migrate to fixed-precision `Decimal` before introducing automatic payment reconciliation or accounting exports.
- Admin server actions reject invalid input silently in several forms; add explicit field-level admin feedback to improve operational visibility.
- The fallback in-memory limiter is process-local and resets on restart.

### Verified Controls
- No committed `.env` or detected hard-coded secret value.
- No default or invented administrator credentials.
- Bcrypt hashes administrator passwords with cost 12.
- Admin APIs and server actions require an authenticated ADMIN session.
- Public invoices use random tokens, are noindex, and PDFs are `private, no-store`.
- Uploads require admin auth, enforce 8 MB, validate MIME and file signatures, and use UUID names.
- Security headers are present; production dependency audit is clean.

## 7 MANUAL ACTION REQUIRED

| File / area | Variable or setting | Current state | Required change | Source | Why |
|---|---|---|---|---|---|
| cPanel environment | `DATABASE_URL` | Missing | Set a TLS-capable PostgreSQL URL for a dedicated least-privilege user | Hosting/managed PostgreSQL provider | Reservations, inquiries, CMS, admin, invoices, and media require it |
| cPanel environment | `NEXTAUTH_SECRET` | Missing | Generate at least 32 random characters, preferably `openssl rand -base64 48` | Secret manager/local secure generation | Signs admin sessions |
| cPanel environment | `NEXTAUTH_URL` | Example production origin | Confirm `https://sharingheli.com` | Final domain | NextAuth callback correctness |
| Build environment | `NEXT_PUBLIC_SITE_URL` | Example production origin | Confirm canonical production origin before build | Final domain | Canonicals, sitemap, robots, structured data |
| cPanel environment | SMTP variables | Missing | Add host, port, user, password, and verified From identity | Email provider | Inquiry/reservation/invoice delivery |
| cPanel environment | `INQUIRY_EMAIL` | Fallback present | Confirm mailbox ownership and monitoring | Business owner | Operational lead delivery |
| First seed only | `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Missing | Set unique values; password at least 14 characters; run seed once | Business password manager | Create the real administrator |
| PostgreSQL | Migrations | Not applied to a live DB | Back up, run `prisma migrate deploy`, inspect migration status | Production database | Create required schema and indexes |
| Filesystem/storage | `public/uploads`, `data/invoices` | Local paths | Ensure writable persistent storage and backups, or move to object storage | Host/storage provider | Prevent lost media/invoice copies |
| Hosting | SSL/DNS/proxy headers | Not verified | Enable SSL, canonical host redirects, Host and X-Forwarded-Proto forwarding | cPanel/DNS provider | Secure cookies, HTTPS, SEO canonicalization |
| Business content | Legal/operator/fare/policy claims | Code fallback only | Verify names, relationship, fares, taxes, carriers, permissions, refunds, baggage/weight, and emergency wording | Business/legal/operations | Avoid inaccurate commercial claims |
| Media | Photo rights | Not evidenced | Confirm rights/licenses for all campaign images and logo assets | Asset owner | Legal launch requirement |
| Monitoring | Health/log/uptime | Not configured | Monitor `/api/health`, Passenger logs, 5xx, SMTP failures, and disk usage | Monitoring/hosting provider | Detect production failures |

## 8 THINGS I MUST REPLACE

- Replace every blank required value from `.env.example` in cPanel; do not commit the resulting `.env`.
- Replace the synthetic audit-only values used during environment validation; they were process-local and were never written to the repository.
- Create real admin credentials in a password manager and run `npm run db:seed`; there are no supplied admin credentials.
- Replace local-only database/SMTP fallback behavior with real production services.
- Replace local upload/invoice storage with backed-up persistent disk or object storage if the cPanel filesystem is not durable.
- Replace or approve all unverified prices, policies, payment instructions, operating-carrier language, and image licences before launch.
- Add real verification/analytics/IndexNow values only if those services will be used.

## 9 ENVIRONMENT VARIABLES

Final `.env.example` inventory:

```env
NODE_ENV="production"
DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL="https://sharingheli.com"
NEXT_PUBLIC_SITE_URL="https://sharingheli.com"

PORT="3000"
HOSTNAME="127.0.0.1"

ADMIN_EMAIL=""
ADMIN_PASSWORD=""

SMTP_HOST=""
SMTP_PORT="465"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Sharing Heli <noreply@sharingheli.com>"
INQUIRY_EMAIL="info@pokharaflightcentre.com"

# Optional production integrations
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=""
NEXT_PUBLIC_BING_SITE_VERIFICATION=""
NEXT_PUBLIC_GA4_ID=""
INDEXNOW_KEY=""
INDEXNOW_KEY_LOCATION=""
```

- Runtime required: database, NextAuth, public/auth URLs, all SMTP values, and inquiry email.
- First seed required: admin email and password.
- Host supplied: port and hostname may be overridden by Passenger.
- Optional: search verification, GA4, and IndexNow.
- `NEXT_PUBLIC_*` changes require a rebuild.
- Validate with `npm run check:env`; use `npm run check:env:seed` before the first seed.

## 10 EXTERNAL SERVICES

| Service | Purpose | Current state | Launch action |
|---|---|---|---|
| PostgreSQL | CMS, admin, reservations, inquiries, invoices, media metadata | Not configured | Provision, restrict network/user, back up, migrate, seed |
| SMTP | Inquiry, reservation, acknowledgement, invoice delivery | Not configured | Verify sender/domain, configure credentials, test delivery and spam placement |
| Google Analytics 4 | Optional event analytics | Disabled | Add ID only with an approved privacy/consent basis |
| Google Search Console | Verification and sitemap | Disabled | Add token and submit sitemap after canonical launch |
| Bing Webmaster Tools | Verification and sitemap | Disabled | Add token and submit sitemap |
| IndexNow | Optional URL submission | Disabled | Add key/location, verify key endpoint, test authenticated submission |
| Google Maps embed | Contact-page location | Present without API key | Verify the exact business location and embed behavior |
| Pokhara Flight Centre site | Operator attribution | Linked | Confirm official URL and relationship approval |
| Object storage/CDN | Durable uploads/invoice files | Not implemented | Required for ephemeral or multi-instance hosting |
| Payment provider | Online payment | Not implemented | Not required for current manual quote/payment flow; required before accepting cards online |

## 11 DATABASE

- Provider: PostgreSQL through Prisma 5.
- Primary models: `AdminUser`, `SiteSettings`, navigation/footer/content entities, `Service`, `Tour`, `Reservation`, `BlogPost`, `InquiryLead`, `Invoice`, `InvoiceItem`, and `MediaAsset`.
- Schema validation passes. Seven ordered migrations are present, including commercial tour fields, public invoice tokens/indexes, CMS fields, reservations, contact refresh, and logo/navigation refresh.
- Important indexes exist for published content, blog scheduling, inquiry creation, invoice creation, reservation status/date, customer email, and reservation creation.
- Referential actions are explicit: tour deletion sets reservation tour to null; invoice items and settings-linked content cascade where expected.
- Live migration deployment, rollback rehearsal, persistence, unique constraints, concurrent booking-reference creation, backup, and restore were not tested because no PostgreSQL service was supplied.
- Before migration: take a database backup and verify PostgreSQL 13+.
- After migration: run `npx prisma migrate status`, seed once, submit a reservation/inquiry, create an invoice/media record, restart the app, and confirm records remain.
- Future financial improvement: migrate monetary `Float` columns to Prisma `Decimal` before automated payments/accounting.

## 12 SEO

- Lighthouse SEO score: 100 on home and contact.
- Crawl: 38 sitemap pages, 44 unique internal links, no broken links, unique canonical URL for every sitemap page.
- Public page titles and H1s are present; responsive audit confirms exactly one H1 on tested primary pages.
- `robots.txt` allows public content and blocks API, admin, login, and invoices.
- Login, admin, invoice, inquiry-specialization, and reservation pages are appropriately noindex where configured.
- Legacy URLs return 301 to topical canonical pages; unknown URLs return the custom HTTP 404.
- Open Graph, Twitter, Organization, LocalBusiness, WebSite, Article, Breadcrumb, FAQ, and conditional Product/Offer data are implemented.
- Dynamic prices appear in Offer markup only when a current verified fare exists.
- Before launch: export Search Console landing pages and server logs, reconcile them with `SEO_MIGRATION_MAP.md`, verify production OG cards, submit sitemap, and monitor 404/redirect traffic.

## 13 PERFORMANCE

- Final throttled mobile Lighthouse: Performance 83, FCP 1.4s, LCP 4.1s, TBT 200ms, CLS 0, Speed Index 2.9s, root response 390ms, total transfer 425 KiB.
- Logo PNG reduced from 652 KiB at 2172x724 to 84 KiB at 600x200; JPEG reduced to 56 KiB at 900x300; responsive `sizes` and priority behavior were corrected.
- Hero quality was tuned while preserving the full-bleed first-viewport image.
- Static/ISR content uses 15-minute revalidation on primary commercial/editorial pages and one-day revalidation on legal pages.
- No failed images or horizontal overflow were found at mobile, tablet, or desktop widths.
- Residual: mobile LCP at 4.1s is above the 2.5s Core Web Vitals target. Re-test on the actual production host/CDN and consider an image CDN/pre-generated AVIF variants if field LCP remains high.
- Update the Browserslist database during normal dependency maintenance; the build warning does not block production output.

## 14 DEPLOYMENT

Exact checklist:

1. Provision PostgreSQL 13+ and a dedicated least-privilege database/user.
2. Back up any existing production database and retain a rollback copy.
3. Upload `sharing-heli-production-2026-08-14.zip` outside `public_html` and extract it.
4. Configure all required cPanel variables from `.env.example`; never upload a populated `.env`.
5. Run `npm ci`.
6. Run `npm run check:env:seed` for first setup, or `npm run check:env` for normal updates.
7. Run `npx prisma generate`.
8. Run `npx prisma migrate deploy`, then `npx prisma migrate status`.
9. On first setup only, run `npm run db:seed`; remove seed credentials from routine runtime configuration if operational policy requires it.
10. Run `npm run check` and `npm run security:audit`.
11. Run `npm run build`, then `npm prune --omit=dev` only after all Prisma/build commands.
12. Configure cPanel Node 22 LTS, production mode, startup file `app.js`, host `127.0.0.1`, and Passenger-provided port.
13. Ensure `public/uploads` and `data/invoices` are writable, persistent, backed up, and not overwritten by releases.
14. Restart Passenger and confirm `/api/health` returns HTTP 200 with database `ok`.
15. From a Chrome-equipped test machine, run smoke, crawl, and responsive checks against `BASE_URL=https://sharingheli.com`.
16. Test real admin login, CMS edit, fare update, reservation persistence/status update, inquiry persistence, SMTP delivery, invoice token/PDF/email, and valid/invalid upload.
17. Verify SSL, non-www canonicalization, proxy headers, secure cookies, robots, sitemap, metadata, redirects, 404, phone, WhatsApp, and operator link.
18. Submit the sitemap and monitor Passenger/app logs, uptime, 5xx, email failures, disk usage, and backups.

## 15 REMAINING RISKS

- Real database migration, persistence, concurrent writes, backup, and restore are unverified.
- Real SMTP delivery, sender authentication, bounce handling, and spam placement are unverified.
- Real administrator login and all authenticated CMS mutations are unverified.
- Current rate limiting is process-local and not sufficient for multiple instances or deliberate distributed abuse.
- Local upload/invoice files can be lost without persistent storage and backups.
- No online payment gateway exists; payment status is manually managed and must not be represented as automatic payment verification.
- Monetary database fields use floating point.
- Admin form validation often fails silently instead of showing field errors.
- CSP still permits inline scripts/styles; nonce-based CSP is a future hardening task.
- Throttled mobile LCP is 4.1s; production field performance may differ.
- Business claims, policies, prices, payment instructions, operator permissions, legal relationship, and asset rights require owner/legal confirmation.
- cPanel Node 22 and Passenger behavior were documented but not executed in this Node 24 local environment.

## 16 FINAL DECISION

**NO — the site should not be publicly launched today in its current local configuration.**

The code and production artifact are ready for a controlled deployment, but the working business system is blocked by missing external configuration. Minimum exact actions before changing this decision to YES:

1. Configure and validate all required production environment variables.
2. Provision/back up PostgreSQL, deploy migrations, seed a real administrator, and verify persistence after restart.
3. Configure SMTP and prove inquiry, reservation, acknowledgement, and invoice delivery.
4. Verify admin login and all CMS/reservation/invoice/media workflows on the deployed host.
5. Configure durable upload/invoice storage and backups.
6. Confirm business/legal content, current prices/policies, payment instructions, contact ownership, and asset rights.
7. Pass `/api/health`, production smoke, crawl, responsive, SSL/canonical, and post-deployment monitoring checks.

When those seven actions pass, no source-level blocker found in this audit remains.
