ALTER TABLE "Tour"
  ALTER COLUMN "priceFrom" DROP NOT NULL,
  ADD COLUMN "priceMode" TEXT NOT NULL DEFAULT 'LIVE_QUOTE',
  ADD COLUMN "sharedPriceFrom" DOUBLE PRECISION,
  ADD COLUMN "privateCharterPrice" DOUBLE PRECISION,
  ADD COLUMN "sharedAvailable" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "privateAvailable" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "departureCity" TEXT,
  ADD COLUMN "operationalNotice" TEXT,
  ADD COLUMN "pricingNote" TEXT,
  ADD COLUMN "priceValidFrom" TIMESTAMP(3),
  ADD COLUMN "priceValidUntil" TIMESTAMP(3),
  ADD COLUMN "lastVerifiedAt" TIMESTAMP(3);
