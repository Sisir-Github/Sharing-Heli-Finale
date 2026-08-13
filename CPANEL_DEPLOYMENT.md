# cPanel Deployment Guide

This application is designed for cPanel Application Manager/Setup Node.js App with Passenger. It is not a static export and must run as a Node.js application.

## 1. Hosting Requirements

- cPanel access with Application Manager or Setup Node.js App
- Node.js 20.9 or newer; Node.js 22 LTS is recommended
- SSH or cPanel Terminal access
- npm and enough memory to run `next build`
- SSL for `sharingheli.com`
- A writable application directory

Confirm these requirements with the host before uploading. Shared hosting plans that expose only PHP cannot run this project.

## 2. Application Location

Use an application directory outside `public_html`, for example:

```text
/home/USERNAME/apps/sharingheli
```

Passenger connects the domain to this directory. Do not copy the full source tree into `public_html`.

The deployment package must exclude `.git`, `.next`, `node_modules`, local `.env` files, `.DS_Store`, editor settings, development logs, test artifacts, local uploads, and generated invoice data. Build `.next` on the server after upload.

## 3. SQLite Database

The CMS, reservations, pricing, inquiries, and invoices use one SQLite database stored at `prisma/sharing-heli.db`. This is appropriate for a single-instance cPanel deployment and avoids a separate database service.

Use this connection value:

```env
DATABASE_URL="file:./sharing-heli.db"
```

The application directory and `prisma/` must be writable by the Node.js process. Keep Passenger on one application instance. Preserve the database across releases and copy it to secure off-server storage before every migration. Stop or restart the application around a raw file copy so the backup is consistent.

## 4. Environment Variables

Configure variables in cPanel Application Manager rather than committing a production `.env` file. Use `.env.example` as the inventory.

Required runtime variables:

- `NODE_ENV=production`
- `DATABASE_URL=file:./sharing-heli.db`: persistent SQLite file
- `NEXTAUTH_URL=https://sharingheli.com`
- `NEXTAUTH_SECRET`: long cryptographically random value
- `NEXT_PUBLIC_SITE_URL=https://sharingheli.com`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: SMTP delivery
- `INQUIRY_EMAIL`: destination for website inquiries

Required for first seed or intentional administrator password rotation:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`: unique and at least 14 characters

Runtime variables normally supplied by cPanel:

- `PORT`
- `HOSTNAME=127.0.0.1`

Optional integrations:

- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `INDEXNOW_KEY`
- `INDEXNOW_KEY_LOCATION`

Changing a `NEXT_PUBLIC_*` variable requires a rebuild because it is compiled into the browser bundle.

Generate `NEXTAUTH_SECRET` locally with a secure password manager or:

```bash
openssl rand -base64 48
```

## 5. Upload And Install

Upload and extract the source package into the application directory, then run:

```bash
cd ~/apps/sharingheli
npm ci
npm run check:env:seed
npx prisma generate
npm run db:migrate
```

Run the seed only for the initial setup or an intentional admin password rotation:

```bash
npm run db:setup
```

The seed refuses missing credentials and passwords shorter than 14 characters. It updates the configured administrator's password hash when intentionally rerun.

## 6. Production Build

Build only after the environment and database are ready:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

After a successful build, development dependencies can be removed to reduce disk usage:

```bash
npm prune --omit=dev
```

Do not run Prisma CLI commands after pruning because Prisma CLI is a development dependency. Run migrations first.

## 7. cPanel Application Manager

Create or edit the Node.js application with these settings:

- Node.js version: 22 LTS where available, otherwise any supported version at least 20.9
- Application mode: Production
- Application root: `/home/USERNAME/apps/sharingheli`
- Application URL: `https://sharingheli.com`
- Startup file: `app.js`
- Environment: variables listed above

The startup file binds to `127.0.0.1` and the `PORT` supplied by Passenger. Do not hardcode a public port or bind to `0.0.0.0` unless the host specifically requires it.

## 8. Restart Passenger

Use cPanel's Restart button, or from the application root:

```bash
mkdir -p tmp
touch tmp/restart.txt
```

After every code, environment, migration, or build change, rebuild when required and restart Passenger.

## 9. SSL And Canonical Host

Enable AutoSSL for `sharingheli.com` and `www.sharingheli.com`. The application redirects `www` to the non-`www` HTTPS canonical host.

Confirm that the proxy forwards `Host` and `X-Forwarded-Proto`. Incorrect proxy headers can prevent canonical HTTPS redirects from working properly.

## 10. Persistent Files

`prisma/sharing-heli.db`, `public/uploads`, and `data/invoices` use the local filesystem. On one persistent cPanel server this can work, but these paths must be writable and included in backups. They must not be replaced during deployment.

For multiple instances or ephemeral hosting, move uploads and generated invoice documents to private object storage before launch.

## 11. Deployment Updates

For a normal update:

```bash
cd ~/apps/sharingheli
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
npm prune --omit=dev
touch tmp/restart.txt
```

Keep the previous source release and a database backup until smoke tests pass. Database rollback must be planned per migration; do not use `prisma migrate reset` in production.

## 12. Production Smoke Tests

Check these URLs and workflows after restart:

- `/`, `/tours`, `/services`, `/destinations`, `/blog`, `/about-us`, `/contact`
- Main Annapurna, Everest, Muktinath, shared-flight, and charter pages
- `/sitemap.xml` and `/robots.txt`
- `/api/health` returns HTTP 200 and reports the database check as `ok`
- One legacy redirect from `SEO_MIGRATION_MAP.md` returns 301
- Unknown URL returns the custom 404 with HTTP 404
- `/admin` redirects to `/login` while signed out
- Admin login and CMS update
- Submit a reservation request and confirm that a reference appears in `/admin/reservations`
- Update the reservation quote, status, payment state, and confirmed date in admin
- Change one tour fare in `/admin/pricing` and confirm the public tour card/detail updates
- Edit the logo or hero content in `/admin/settings` and confirm the public header/homepage updates
- Inquiry submission saves a lead and sends email
- Valid and invalid media upload tests
- Invoice creation, random-token public view, PDF download, and email delivery
- HTTPS, non-`www` canonical URL, metadata, and OG image

Review Passenger logs and application logs for startup, database, SMTP, or file-permission errors.

With the server running, the repeatable deployment checks are:

```bash
BASE_URL=https://sharingheli.com npm run test:smoke
BASE_URL=https://sharingheli.com npm run test:crawl
BASE_URL=https://sharingheli.com npm run test:responsive
```
