ALTER TABLE "Invoice" ADD COLUMN "publicToken" TEXT;

UPDATE "Invoice"
SET "publicToken" = gen_random_uuid()::text
WHERE "publicToken" IS NULL;

ALTER TABLE "Invoice" ALTER COLUMN "publicToken" SET NOT NULL;

CREATE UNIQUE INDEX "Invoice_publicToken_key" ON "Invoice"("publicToken");
CREATE INDEX "Destination_visible_order_idx" ON "Destination"("visible", "order");
CREATE INDEX "Service_published_idx" ON "Service"("published");
CREATE INDEX "Tour_published_featured_idx" ON "Tour"("published", "featured");
CREATE INDEX "BlogPost_published_publishAt_idx" ON "BlogPost"("published", "publishAt");
CREATE INDEX "InquiryLead_createdAt_idx" ON "InquiryLead"("createdAt");
CREATE INDEX "Invoice_createdAt_idx" ON "Invoice"("createdAt");
CREATE INDEX "MediaAsset_createdAt_idx" ON "MediaAsset"("createdAt");
