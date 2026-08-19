-- Curate the Everest region down to the seven published routes.
-- The point-to-point sector flights seeded by 20260818173000_tour_regions_and_catalog
-- are no longer sold as standalone products, so they are removed here.
-- Reservations reference tours with ON DELETE SET NULL and keep their own
-- routeName, so historic bookings survive this cleanup intact.

DELETE FROM "Tour"
WHERE "region" = 'EVEREST'
  AND "slug" NOT IN (
    'everest-base-camp-helicopter-tour-nepal',
    'everest-helicopter-tour-kala-patthar-landing',
    'helicopter-to-everest-view-hotel',
    'everest-base-camp-gokyo-lake-helicopter-tour',
    'gokyo-lake-helicopter-tour',
    'kathmandu-to-lukla-helicopter',
    'lukla-to-kathmandu-helicopter-flight'
  );

-- Name the flagship route the way it is marketed.
UPDATE "Tour"
SET "title" = 'Everest Base Camp Helicopter Tour'
WHERE "slug" = 'everest-base-camp-helicopter-tour-nepal';

-- Fix the display order of the remaining Everest routes.
UPDATE "Tour" SET "sortOrder" = 1 WHERE "slug" = 'everest-base-camp-helicopter-tour-nepal';
UPDATE "Tour" SET "sortOrder" = 2 WHERE "slug" = 'everest-helicopter-tour-kala-patthar-landing';
UPDATE "Tour" SET "sortOrder" = 3 WHERE "slug" = 'helicopter-to-everest-view-hotel';
UPDATE "Tour" SET "sortOrder" = 4 WHERE "slug" = 'everest-base-camp-gokyo-lake-helicopter-tour';
UPDATE "Tour" SET "sortOrder" = 5 WHERE "slug" = 'gokyo-lake-helicopter-tour';
UPDATE "Tour" SET "sortOrder" = 6 WHERE "slug" = 'kathmandu-to-lukla-helicopter';
UPDATE "Tour" SET "sortOrder" = 7 WHERE "slug" = 'lukla-to-kathmandu-helicopter-flight';
