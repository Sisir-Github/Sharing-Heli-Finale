ALTER TABLE "Tour" ADD COLUMN "region" TEXT NOT NULL DEFAULT 'EVEREST';
ALTER TABLE "Tour" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "Tour_published_region_sortOrder_idx" ON "Tour"("published", "region", "sortOrder");

UPDATE "Tour" SET "region" = 'EVEREST', "sortOrder" = 10
WHERE "slug" = 'everest-base-camp-helicopter-tour-nepal';

UPDATE "Tour" SET "region" = 'ANNAPURNA', "sortOrder" = 10
WHERE "slug" = 'annapurna-base-camp-helicopter-tour-nepal';

UPDATE "Tour" SET "region" = 'ANNAPURNA', "sortOrder" = 20
WHERE "slug" = 'muktinath-helicopter-tour-nepal';

CREATE TEMP TABLE "_TourCatalog" (
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL,
  "departureCity" TEXT NOT NULL,
  "route" TEXT NOT NULL,
  "sharedPrice" REAL,
  "privatePrice" REAL,
  "image" TEXT NOT NULL
);

INSERT INTO "_TourCatalog" VALUES
  ('Helicopter to Everest View Hotel', 'helicopter-to-everest-view-hotel', '5 Hours', 'EVEREST', 20, 'Kathmandu', 'Kathmandu - Lukla - Everest View Hotel - Kathmandu', 1400, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Kathmandu to Lukla Helicopter', 'kathmandu-to-lukla-helicopter', '55 Minutes', 'EVEREST', 30, 'Kathmandu', 'Kathmandu - Lukla', 500, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Kathmandu to Lukla Flight', 'kathmandu-to-lukla-flight', '55 Minutes', 'EVEREST', 40, 'Kathmandu', 'Kathmandu or Ramechhap - Lukla', NULL, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Pheriche to Kathmandu by Helicopter', 'pheriche-to-kathmandu-by-helicopter', '1 Hour', 'EVEREST', 50, 'Pheriche', 'Pheriche - Lukla when operationally required - Kathmandu', 1100, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Namche to Lukla Helicopter Flight', 'namche-to-lukla-helicopter-flight', '15 Minutes', 'EVEREST', 60, 'Namche', 'Namche - Lukla', NULL, 835, '/images/campaign/everest-helicopter.jpg'),
  ('Chhukung to Lukla Helicopter Flight', 'chhukung-to-lukla-helicopter-flight', '15 Minutes', 'EVEREST', 70, 'Chhukung', 'Chhukung - Lukla', NULL, 2375, '/images/campaign/everest-helicopter.jpg'),
  ('Lukla to Kathmandu Helicopter Flight', 'lukla-to-kathmandu-helicopter-flight', '50 Minutes', 'EVEREST', 80, 'Lukla', 'Lukla - Kathmandu', 600, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Syangboche to Lukla Helicopter Flight', 'syangboche-to-lukla-helicopter-flight', '15 Minutes', 'EVEREST', 90, 'Syangboche', 'Syangboche - Lukla', NULL, 900, '/images/campaign/everest-helicopter.jpg'),
  ('Dingboche to Kathmandu Helicopter Flight', 'dingboche-to-kathmandu-helicopter-flight', '1 Hour 20 Minutes', 'EVEREST', 100, 'Dingboche', 'Dingboche - Lukla when operationally required - Kathmandu', 900, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Tengboche to Kathmandu Helicopter Flight', 'tengboche-to-kathmandu-helicopter-flight', '55 Minutes', 'EVEREST', 110, 'Tengboche', 'Tengboche - Lukla when operationally required - Kathmandu', 1100, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Gorakshep to Kathmandu Helicopter Flight', 'gorakshep-to-kathmandu-helicopter-flight', '1 Hour', 'EVEREST', 120, 'Gorakshep', 'Gorakshep - Lukla when operationally required - Kathmandu', 1300, NULL, '/images/campaign/everest-helicopter.jpg'),
  ('Kala Patthar to Kathmandu Helicopter Flight', 'kala-patthar-to-kathmandu-helicopter-flight', '1 Hour', 'EVEREST', 130, 'Kala Patthar area', 'Kala Patthar area - Lukla when operationally required - Kathmandu', NULL, 5500, '/images/campaign/everest-helicopter.jpg'),
  ('Gokyo Lake Helicopter Tour', 'gokyo-lake-helicopter-tour', '4 Hours', 'EVEREST', 140, 'Kathmandu', 'Kathmandu - Lukla - Gokyo - Kathmandu', NULL, 4200, '/images/campaign/everest-helicopter.jpg'),
  ('Everest Helicopter Tour with Kala Patthar Landing', 'everest-helicopter-tour-kala-patthar-landing', '4 Hours', 'EVEREST', 150, 'Kathmandu', 'Kathmandu - Lukla - Everest region - approved Kala Patthar area landing - Kathmandu', 1700, 5200, '/images/campaign/everest-helicopter.jpg'),
  ('Everest Base Camp and Gokyo Lake Helicopter Tour', 'everest-base-camp-gokyo-lake-helicopter-tour', '6 Hours', 'EVEREST', 160, 'Kathmandu', 'Kathmandu - Lukla - Everest Base Camp region - Gokyo - Kathmandu', NULL, 5500, '/images/campaign/everest-helicopter.jpg'),
  ('Annapurna Base Camp Helicopter Flight', 'annapurna-base-camp-helicopter-flight', '2 Hours', 'ANNAPURNA', 30, 'Pokhara', 'Pokhara - Annapurna Base Camp region - Pokhara', NULL, 2200, '/images/campaign/annapurna-helicopter.jpg'),
  ('Mardi Himal Helicopter Tour', 'mardi-himal-helicopter-tour', '1 Hour', 'ANNAPURNA', 40, 'Pokhara', 'Pokhara - Mardi Himal area - Pokhara', 345, NULL, '/images/campaign/annapurna-helicopter.jpg'),
  ('Tilicho Lake Helicopter Tour', 'tilicho-lake-helicopter-tour', '3 Hours', 'ANNAPURNA', 50, 'Pokhara', 'Pokhara - Manang - Tilicho Lake area - Pokhara', NULL, 3800, '/images/campaign/annapurna-helicopter.jpg'),
  ('Damodar Kunda Darshan', 'damodar-kunda-darshan', '2 Hours', 'ANNAPURNA', 60, 'Pokhara', 'Pokhara - Mustang - Damodar Kunda area - Pokhara', NULL, 6500, '/images/campaign/muktinath-helicopter.jpg'),
  ('Langtang Helicopter Tour', 'langtang-helicopter-tour', '2 Hours', 'LANGTANG', 10, 'Kathmandu', 'Kathmandu - Langtang Valley - Kyanjin Gompa area - Kathmandu', NULL, 2200, '/images/campaign/sharing-heli-hero.jpg'),
  ('Gosaikunda Helicopter Tour', 'gosaikunda-helicopter-tour', '4 Hours', 'LANGTANG', 20, 'Kathmandu', 'Kathmandu - Gosaikunda lakes area - Kathmandu', NULL, 1800, '/images/campaign/sharing-heli-hero.jpg');

INSERT INTO "Tour" (
  "id", "title", "slug", "region", "sortOrder", "duration", "priceFrom", "currency", "priceMode",
  "sharedPriceFrom", "privateCharterPrice", "sharedAvailable", "privateAvailable", "departureCity",
  "excerpt", "overview", "route", "operationalNotice", "pricingNote", "priceValidFrom", "priceValidUntil",
  "lastVerifiedAt", "highlights", "itinerary", "inclusions", "exclusions", "images", "seoTitle",
  "seoDescription", "published", "featured", "createdAt", "updatedAt"
)
SELECT
  'catalog-' || catalog."slug",
  catalog."title",
  catalog."slug",
  catalog."region",
  catalog."sortOrder",
  catalog."duration",
  NULL,
  'USD',
  CASE
    WHEN catalog."sharedPrice" IS NOT NULL THEN 'SHARED_PER_PERSON'
    WHEN catalog."privatePrice" IS NOT NULL THEN 'PRIVATE_PER_AIRCRAFT'
    ELSE 'LIVE_QUOTE'
  END,
  catalog."sharedPrice",
  catalog."privatePrice",
  CASE WHEN catalog."sharedPrice" IS NOT NULL THEN 1 ELSE 0 END,
  1,
  catalog."departureCity",
  catalog."title" || ' with route, timing, passenger loading, and operating conditions reviewed before confirmation.',
  'This package covers ' || catalog."route" || '. Weather, aircraft performance, payload, permissions, and landing access are reviewed for the requested date.',
  catalog."route",
  'Departure time, routing, technical stops, payload, and any landing remain subject to weather and the operating pilot.',
  CASE WHEN catalog."sharedPrice" IS NOT NULL OR catalog."privatePrice" IS NOT NULL
    THEN 'Starting comparison fare checked on 18 August 2026. Final fare depends on date, payload, routing, permits, taxes, and aircraft availability.'
    ELSE NULL
  END,
  CASE WHEN catalog."sharedPrice" IS NOT NULL OR catalog."privatePrice" IS NOT NULL THEN 1787011200000 ELSE NULL END,
  CASE WHEN catalog."sharedPrice" IS NOT NULL OR catalog."privatePrice" IS NOT NULL THEN 1798761599999 ELSE NULL END,
  CASE WHEN catalog."sharedPrice" IS NOT NULL OR catalog."privatePrice" IS NOT NULL THEN 1787011200000 ELSE NULL END,
  catalog."route" || ' with direct flight coordination and clear passenger requirements.',
  'Pre-flight briefing, ' || catalog."route" || ', and arrival or return as approved by the operating crew.',
  'Flight coordination, operator briefing, and the confirmed helicopter sector.',
  'Items not stated in the written booking, personal expenses, travel insurance, and costs caused by itinerary changes.',
  '["' || catalog."image" || '"]',
  catalog."title" || ' | Sharing Heli Nepal',
  'Compare duration, departure point, shared-seat pricing, and private-charter rates for ' || catalog."title" || ' in Nepal.',
  1,
  0,
  1787011200000,
  1787011200000
FROM "_TourCatalog" AS catalog
WHERE NOT EXISTS (SELECT 1 FROM "Tour" WHERE "Tour"."slug" = catalog."slug");

DROP TABLE "_TourCatalog";
