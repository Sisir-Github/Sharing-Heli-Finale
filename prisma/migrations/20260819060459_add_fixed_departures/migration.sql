-- CreateTable
CREATE TABLE "FixedDeparture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT,
    "routeName" TEXT NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "departureTime" TEXT,
    "seatsTotal" INTEGER NOT NULL DEFAULT 5,
    "seatsBooked" INTEGER NOT NULL DEFAULT 0,
    "pricePerSeat" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "note" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FixedDeparture_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "FixedDeparture_published_departureDate_idx" ON "FixedDeparture"("published", "departureDate");
