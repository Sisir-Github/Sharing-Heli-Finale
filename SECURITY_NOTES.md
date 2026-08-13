# Security Notes

## Admin

- Admin routes are protected by middleware and server-side session checks.
- Seeding refuses to create an admin unless `ADMIN_EMAIL` and an `ADMIN_PASSWORD` of at least 14 characters are set.
- There are no default admin credentials.

## Invoices

- Invoice creation requires an authenticated admin session.
- Public invoice and PDF URLs use `Invoice.publicToken`, a random UUID stored in the database.
- Invoice numbers are still usable by authenticated admins, but public users cannot fetch invoices by invoice number alone.
- Invoice pages are `noindex`, PDF responses are `private, no-store`, and `/invoice/` is blocked in robots.
- PDF generation uses `pdfkit`; no headless browser is required in production.

## Uploads

- Uploads require an admin session.
- Accepted MIME types are JPEG, PNG, WebP, and AVIF.
- The upload route checks file signatures, enforces an 8 MB limit, uses UUID filenames, and stores only sanitized metadata.

## Headers And Runtime

- Global headers include `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, HSTS, and CSP.
- The in-memory inquiry rate limit is acceptable for a single Node process. Use a distributed limiter or edge firewall if the app is deployed across multiple instances.
- Local filesystem storage is not durable across multiple instances; replace `public/uploads` and `data/invoices` with object storage when scaling.

## Dependency Audit

- The runtime was upgraded to Next.js 16.3.0, React 19.2.8, and Nodemailer 9.0.5.
- `npm audit --omit=dev` reports zero production vulnerabilities.
- NextAuth 4.24.15 supports Next.js 16 and React 19. Its credentials-only setup does not use the optional email provider; `.npmrc` allows the separately used Nodemailer 9 security release.
- Current mail usage is hardened with sanitized headers plus `disableFileAccess` and `disableUrlAccess`.
- `npm audit` and `npm audit --omit=dev` both report zero known vulnerabilities after updating the test runner dependency.
- CMS-managed links are restricted to safe internal, HTTPS, email, and telephone destinations; CMS image fields accept local paths only.
- CSV exports neutralize formula prefixes before customer-entered data reaches spreadsheet software.
