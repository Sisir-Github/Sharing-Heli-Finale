UPDATE "Tour"
SET "images" = '["/images/campaign/everest-helicopter.jpg"]'
WHERE "slug" = 'everest-base-camp-helicopter-tour-nepal'
  AND "images" LIKE '%everest-tour.svg%';

UPDATE "Tour"
SET "images" = '["/images/campaign/annapurna-helicopter.jpg"]'
WHERE "slug" = 'annapurna-base-camp-helicopter-tour-nepal'
  AND "images" LIKE '%annapurna-tour.svg%';

UPDATE "Tour"
SET "images" = '["/images/campaign/muktinath-helicopter.jpg"]'
WHERE "slug" = 'muktinath-helicopter-tour-nepal'
  AND "images" LIKE '%muktinath-tour.svg%';
