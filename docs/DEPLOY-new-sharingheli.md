# Deploying to new.sharingheli.com (cPanel + Passenger)

Target: `https://new.sharingheli.com` as the **live, indexable** site.

---

## 0. Read this first — the one thing that can go wrong

You now have two hostnames that can serve this brand. Search engines must be
told which one counts, or they will treat them as competing duplicates and
split the ranking signals between them.

Pick one of these before you finish:

**Option A — new.sharingheli.com is permanently the live site**
`sharingheli.com` must 301-redirect to `new.sharingheli.com`. Not a frame, not a
DNS alias, not a landing page. A permanent redirect at the HTTP level. Set it in
cPanel → Domains → Redirects, or in the apex domain's `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?sharingheli\.com$ [NC]
RewriteRule ^(.*)$ https://new.sharingheli.com/$1 [R=301,L]
```

**Option B — this is a staging step and the apex takes over later** (better for
SEO if `sharingheli.com` has any existing history, because a subdomain does not
inherit the apex's authority automatically). Deploy with the staging values in
§2, then flip two variables and rebuild when you cut over.

If you are unsure, Option B is the safer order: verify on the subdomain with
`noindex`, then move to the apex.

Everything below assumes Option A, because that is what you chose.

---

## 1. Upload

Package: `sharing-heli-release-*.tar.gz` (regenerate any time with
`npm run release`). It contains no `.env`, no database, no uploads and no
`node_modules` — nothing in it can overwrite live data.

```bash
# on your machine
scp sharing-heli-release-*.tar.gz USER@server:~/

# on the server
mkdir -p ~/apps/sharingheli-new
tar -xzf ~/sharing-heli-release-*.tar.gz -C ~/apps/sharingheli-new
cd ~/apps/sharingheli-new
```

If you already have a database from an earlier deployment, copy it in now and
back it up before migrating:

```bash
cp ~/backups/sharing-heli.db prisma/sharing-heli.db      # existing data
cp prisma/sharing-heli.db ~/backups/sharing-heli-$(date +%F-%H%M).db
```

---

## 2. Environment variables

Set these in **cPanel → Setup Node.js App → Environment variables**, not in a
committed file. The `NEXT_PUBLIC_*` values are compiled into the browser bundle,
so they must be set **before** the build in §4.

```env
NODE_ENV=production
DATABASE_URL=file:./sharing-heli.db

NEXT_PUBLIC_SITE_URL=https://new.sharingheli.com
NEXT_PUBLIC_CANONICAL_HOST=new.sharingheli.com
NEXTAUTH_URL=https://new.sharingheli.com
NEXTAUTH_SECRET=<paste a fresh secret>

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
INQUIRY_EMAIL=info@pokharaflightcentre.com

HOSTNAME=127.0.0.1
```

Generate the secret on the server and paste it into cPanel — do not reuse one
from a chat log or a previous environment:

```bash
openssl rand -base64 48
```

`NEXT_PUBLIC_CANONICAL_HOST` is what makes the site indexable. Any host that
does not match it serves `robots.txt: Disallow: /` and a `noindex` meta on every
page. That is the safety net; here you are deliberately switching it off for
this hostname.

For the first run only, to create the admin user:

```env
ADMIN_EMAIL=<your admin email>
ADMIN_PASSWORD=<at least 14 characters>
```

Remove both after the seed succeeds.

---

## 3. Install and migrate

```bash
cd ~/apps/sharingheli-new
npm ci
npm run check:env
npx prisma generate
npm run db:migrate
```

`db:migrate` applies 11 migrations, including `20260819140000_add_review_seo_fields`,
which adds the rating, source, sourceUrl, reviewedOn and tourSlug columns to
`Testimonial`. Star ratings in Google results depend on it.

First deployment only:

```bash
npm run db:setup     # seeds content and the admin user
```

---

## 4. Build

Only after §2 is saved, because the public site URL is baked into the bundle.

```bash
npm run lint
npm run typecheck
npm run build
```

`npm test` needs dev dependencies and a matching platform; run it if it works on
your host, and do not block the deploy on it if esbuild complains about the
architecture.

Then, optionally, shrink the install:

```bash
npm prune --omit=dev
```

Do not run any Prisma CLI command after pruning — Prisma CLI is a dev
dependency. Migrations must be done first.

---

## 5. cPanel application settings

- Node.js version: 22 LTS (20.9 minimum)
- Application mode: Production
- Application root: `/home/USER/apps/sharingheli-new`
- Application URL: `https://new.sharingheli.com`
- Startup file: `app.js`

`app.js` binds `127.0.0.1` and the `PORT` Passenger supplies. Do not hardcode a
port or bind `0.0.0.0`.

Enable AutoSSL for `new.sharingheli.com`. Confirm the proxy forwards `Host` and
`X-Forwarded-Proto`, or the canonical HTTPS redirect in `proxy.ts` cannot work.

Restart:

```bash
mkdir -p tmp && touch tmp/restart.txt
```

---

## 6. Verify

```bash
curl -sI https://new.sharingheli.com | head -3
curl -s  https://new.sharingheli.com/api/health
curl -s  https://new.sharingheli.com/robots.txt | head -8
curl -s  https://new.sharingheli.com/sitemap.xml | grep -c "<loc>"
```

Expected:

- `/api/health` returns 200 with the database check `ok`
- `robots.txt` shows `Allow: /` and **not** `Disallow: /`. If it shows
  `Disallow: /`, `NEXT_PUBLIC_CANONICAL_HOST` was wrong or was set after the
  build — fix it and rebuild.
- sitemap contains 56 URLs
- `https://sharingheli.com` 301s to `https://new.sharingheli.com`

Then the full sweep:

```bash
BASE_URL=https://new.sharingheli.com npm run test:smoke
node scripts/seo-score.mjs https://new.sharingheli.com
```

The SEO score should come back at 100%. Anything lower means something did not
survive the deploy.

Manual checks worth doing once: `/admin` redirects to `/login` while signed out,
admin login works, a reservation submits and appears in `/admin/reservations`,
`/zh` renders Chinese with the language switch in the header, and an unknown URL
returns a real 404.

---

## 7. Immediately after launch

1. Google Search Console: add `new.sharingheli.com` as a property, submit
   `https://new.sharingheli.com/sitemap.xml`.
2. If `sharingheli.com` was previously indexed, use Search Console's **Change of
   Address** tool on the old property once the 301 is live. This is what
   transfers ranking history; the redirect alone is slower and less complete.
3. Bing Webmaster Tools: same property and sitemap.
4. Baidu Ziyuan: submit `https://new.sharingheli.com/sitemap-baidu.xml`.
5. Update the domain everywhere it is hardcoded off-site: Google Business
   Profile, social bios, email signatures, printed material.

---

## 8. Updating later

```bash
cd ~/apps/sharingheli-new
cp prisma/sharing-heli.db ~/backups/sharing-heli-$(date +%F-%H%M).db
tar -xzf ~/sharing-heli-release-NEW.tar.gz
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
npm prune --omit=dev
touch tmp/restart.txt
```

Keep the previous release directory and the database backup until the smoke
tests pass.

---

## 9. Moving to the apex later

If you decide to serve the site from `sharingheli.com` instead:

1. Point the apex at this application root in cPanel.
2. Change two variables: `NEXT_PUBLIC_SITE_URL=https://sharingheli.com` and
   remove `NEXT_PUBLIC_CANONICAL_HOST` (it defaults to `sharingheli.com`).
3. Rebuild — `NEXT_PUBLIC_*` values are compiled in — and restart.
4. Reverse the 301 so `new.sharingheli.com` redirects to the apex.
5. Run Change of Address in Search Console in the new direction.
