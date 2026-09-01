-- Structured-data fields for passenger reviews.
-- All nullable so existing rows stay valid and no rating is ever invented.
ALTER TABLE "Testimonial" ADD COLUMN "rating" INTEGER;
ALTER TABLE "Testimonial" ADD COLUMN "source" TEXT;
ALTER TABLE "Testimonial" ADD COLUMN "sourceUrl" TEXT;
ALTER TABLE "Testimonial" ADD COLUMN "reviewedOn" DATETIME;
ALTER TABLE "Testimonial" ADD COLUMN "tourSlug" TEXT;
