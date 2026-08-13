ALTER TABLE "Tour"
  ADD COLUMN "excerpt" TEXT,
  ADD COLUMN "overview" TEXT,
  ADD COLUMN "route" TEXT,
  ADD COLUMN "altitude" TEXT,
  ADD COLUMN "bestTime" TEXT,
  ADD COLUMN "weatherNotes" TEXT,
  ADD COLUMN "cancellationPolicy" TEXT,
  ADD COLUMN "passengerRequirements" TEXT,
  ADD COLUMN "weightSeating" TEXT,
  ADD COLUMN "whatToBring" TEXT,
  ADD COLUMN "photographyInfo" TEXT,
  ADD COLUMN "safetyNotes" TEXT,
  ADD COLUMN "faqs" JSONB,
  ADD COLUMN "ogImage" TEXT,
  ADD COLUMN "noindex" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Service"
  ADD COLUMN "ogImage" TEXT,
  ADD COLUMN "noindex" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "BlogPost"
  ADD COLUMN "excerpt" TEXT,
  ADD COLUMN "author" TEXT,
  ADD COLUMN "relatedTourSlugs" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "noindex" BOOLEAN NOT NULL DEFAULT false;

UPDATE "SiteSettings"
SET
  "companyName" = 'Sharing Heli Nepal',
  "brandName" = 'Sharing Heli Nepal',
  "operatingUnder" = 'Operated by Pokhara Flight Centre Tours & Travel Pvt. Ltd.',
  "email" = CASE
    WHEN "email" = 'rishi8848@gmail.com' THEN 'info@pokharaflightcentre.com'
    ELSE "email"
  END
WHERE
  "companyName" = 'Sharing Heli Nepal Pvt. Ltd.'
  OR "operatingUnder" = 'Operating under Pokhara Flight Centre Tours & Travel Pvt. Ltd.'
  OR "email" = 'rishi8848@gmail.com';
