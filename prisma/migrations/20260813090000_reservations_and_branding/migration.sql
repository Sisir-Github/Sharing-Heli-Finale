ALTER TABLE "SiteSettings" ADD COLUMN "logoImage" TEXT;

UPDATE "SiteSettings"
SET
  "logoImage" = COALESCE("logoImage", '/images/sharing-heli-logo.svg'),
  "heroCtaPrimaryLabel" = CASE WHEN "heroCtaPrimaryLabel" IN ('Inquiry Now', 'Send Inquiry', 'Check Availability') THEN 'Reserve a flight' ELSE "heroCtaPrimaryLabel" END,
  "heroCtaPrimaryHref" = CASE WHEN "heroCtaPrimaryHref" LIKE '/contact%' THEN '/check-availability' ELSE "heroCtaPrimaryHref" END,
  "heroCtaSecondaryLabel" = CASE WHEN "heroCtaSecondaryLabel" = 'WhatsApp' THEN 'View routes' ELSE "heroCtaSecondaryLabel" END,
  "heroCtaSecondaryHref" = CASE WHEN "heroCtaSecondaryHref" LIKE 'https://wa.me/%' THEN '/tours' ELSE "heroCtaSecondaryHref" END,
  "ctaStripButtonLabel" = CASE WHEN "ctaStripButtonLabel" IN ('Start Inquiry', 'Check Availability') THEN 'Reserve a flight' ELSE "ctaStripButtonLabel" END,
  "ctaStripButtonHref" = CASE WHEN "ctaStripButtonHref" LIKE '/contact%' THEN '/check-availability' ELSE "ctaStripButtonHref" END;

CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "bookingReference" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentStatus" TEXT NOT NULL DEFAULT 'UNPAID',
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "tourId" TEXT,
    "routeName" TEXT NOT NULL,
    "flightType" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "alternateDate" TIMESTAMP(3),
    "confirmedDate" TIMESTAMP(3),
    "passengers" INTEGER NOT NULL,
    "quotedAmount" DOUBLE PRECISION,
    "depositAmount" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "assignedAircraft" TEXT,
    "pickupPoint" TEXT,
    "customerNotes" TEXT,
    "adminNotes" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Reservation_bookingReference_key" ON "Reservation"("bookingReference");
CREATE INDEX "Reservation_status_preferredDate_idx" ON "Reservation"("status", "preferredDate");
CREATE INDEX "Reservation_customerEmail_idx" ON "Reservation"("customerEmail");
CREATE INDEX "Reservation_createdAt_idx" ON "Reservation"("createdAt");

ALTER TABLE "Reservation"
ADD CONSTRAINT "Reservation_tourId_fkey"
FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;
