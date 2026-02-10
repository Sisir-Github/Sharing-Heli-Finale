# Sharing Heli Nepal Pvt. Ltd. Website

Luxury, responsive helicopter service website built with Next.js App Router, TypeScript, Tailwind CSS, and Three.js.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Three.js via `@react-three/fiber`
- Nodemailer SMTP API route for inquiries
- Prisma + PostgreSQL
- NextAuth (Credentials)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Add environment variables in `.env.local` **and** `.env` (Prisma CLI reads `.env`):

```bash
SMTP_HOST=your.smtp.host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM="Sharing Heli <no-reply@sharingheli.com>"
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-token
NEXT_PUBLIC_BING_SITE_VERIFICATION=your-bing-token
INDEXNOW_KEY=your-indexnow-key
INDEXNOW_KEY_LOCATION=https://sharingheli.com/your-indexnow-key.txt
DATABASE_URL=postgresql://user:password@localhost:5432/sharingheli
NEXTAUTH_SECRET=change-me
ADMIN_EMAIL=admin@sharingheli.com
ADMIN_PASSWORD=ChangeMe123!
INQUIRY_EMAIL=rishi8848@gmail.com
```

Quick setup:

```bash
cp .env.example .env
cp .env.example .env.local
```

3. Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

4. Start development server:

```bash
npm run dev
```

## Inquiry Endpoint

`POST /api/inquiry`

- Validates fields (name, email, phone, service, message)
- Sanitizes content before sending
- Uses honeypot field (`companyWebsite`) for bot trapping
- Applies in-memory rate limit per client IP
- Sends all inquiries to `rishi8848@gmail.com`

## Admin CMS

- Login at `/login`
- Admin routes under `/admin/*`
- Manage site settings, navigation, services, tours, blog, inquiries, invoices, and media.

Email subject format:

`New Inquiry – [Service] – [Name]`

## SEO and Schema

- Canonical metadata and hreflang-ready alternates for all indexable pages
- JSON-LD support for Organization, LocalBusiness, WebSite, BreadcrumbList, FAQPage, and Product (tour pages)
- Auto sitemap and robots with `/api/` disallowed
- Canonical host middleware (`www` -> apex)

## Realistic Helicopter Hero Model

To enable the realistic 3D helicopter hero scene, place your production model at:

`/public/models/helicopter.glb`

Key implementation files:

- `/components/HelicopterScene.tsx`
- `/lib/three/helicopterModel.ts`
- `/lib/hooks/useScrollVelocity.ts`

If `prefers-reduced-motion` is enabled, the hero automatically falls back to a static background.

If you see `Could not load /models/helicopter.glb` in the browser console, add a real GLB file at:

`/public/models/helicopter.glb`

The scene now fails safely and uses a static hero fallback when the model is missing or invalid.
