ALTER TABLE "Tour" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'SCENIC';

UPDATE "Tour"
SET "category" = 'PILGRIMAGE'
WHERE "slug" IN (
  'muktinath-helicopter-tour-nepal',
  'gosaikunda-helicopter-tour',
  'damodar-kunda-darshan'
);

CREATE INDEX "Tour_published_category_idx" ON "Tour"("published", "category");

DELETE FROM "NavItem" WHERE "groupLabel" = 'Pilgrimage Tours';
