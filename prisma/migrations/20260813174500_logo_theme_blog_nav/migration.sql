UPDATE "SiteSettings"
SET "logoImage" = '/images/sharing-heli-logo.png'
WHERE "logoImage" IS NULL
   OR "logoImage" IN (
     '/images/sharing-heli-logo.jpg',
     '/images/sharing-heli-logo.svg'
   );

UPDATE "NavItem"
SET
  "label" = 'Blog',
  "order" = 5,
  "visible" = true
WHERE "href" = '/blog';

INSERT INTO "NavItem" ("id", "label", "href", "order", "visible")
SELECT 'nav-blog-20260813', 'Blog', '/blog', 5, true
WHERE NOT EXISTS (
  SELECT 1 FROM "NavItem" WHERE "href" = '/blog'
);

UPDATE "NavItem" SET "order" = 6 WHERE "href" = '/about-us';
UPDATE "NavItem" SET "order" = 7 WHERE "href" = '/contact';
