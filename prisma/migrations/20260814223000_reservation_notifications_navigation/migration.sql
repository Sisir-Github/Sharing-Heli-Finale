ALTER TABLE "NavItem" ADD COLUMN "groupLabel" TEXT;

ALTER TABLE "Reservation" ADD COLUMN "adminEmailSentAt" DATETIME;
ALTER TABLE "Reservation" ADD COLUMN "customerEmailSentAt" DATETIME;
ALTER TABLE "Reservation" ADD COLUMN "customerWhatsAppSentAt" DATETIME;
ALTER TABLE "Reservation" ADD COLUMN "notificationError" TEXT;

DELETE FROM "NavItem";

INSERT INTO "NavItem" ("id", "label", "href", "groupLabel", "order", "visible") VALUES
  ('nav-home', 'Home', '/', NULL, 10, 1),
  ('nav-about', 'About Us', '/about-us', NULL, 20, 1),
  ('nav-services-all', 'All Services', '/services', 'Services', 30, 1),
  ('nav-services-charter', 'Private Helicopter Charter', '/helicopter-charter-nepal', 'Services', 31, 1),
  ('nav-services-pokhara', 'Pokhara Helicopter Service', '/pokhara-helicopter-service', 'Services', 32, 1),
  ('nav-services-emergency', 'Emergency Flight Coordination', '/emergency-helicopter-rescue-nepal', 'Services', 33, 1),
  ('nav-tours-all', 'All Heli Tours', '/tours', 'Heli Tours', 40, 1),
  ('nav-tours-everest', 'Everest Region Tour', '/everest-base-camp-helicopter-tour-nepal', 'Heli Tours', 41, 1),
  ('nav-tours-annapurna', 'Annapurna Base Camp Tour', '/annapurna-base-camp-helicopter-tour-nepal', 'Heli Tours', 42, 1),
  ('nav-tours-shared', 'Shared Helicopter Flights', '/helicopter-tours/shared-helicopter-flights', 'Heli Tours', 43, 1),
  ('nav-pilgrimage-muktinath', 'Muktinath Helicopter Tour', '/muktinath-helicopter-tour-nepal', 'Pilgrimage Tours', 50, 1),
  ('nav-pilgrimage-guide', 'Muktinath Travel Guide', '/blog/muktinath-helicopter-tour-from-pokhara', 'Pilgrimage Tours', 51, 1),
  ('nav-contact', 'Contact', '/contact', NULL, 60, 1),
  ('nav-blog', 'Blog', '/blog', NULL, 70, 1);

UPDATE "SocialLink"
SET "href" = 'https://www.facebook.com/Pokharaflightcentre', "visible" = 1, "order" = 1
WHERE lower("label") = 'facebook';

UPDATE "SocialLink"
SET "href" = 'https://www.instagram.com/pokharaflightcentre/', "visible" = 1, "order" = 2
WHERE lower("label") = 'instagram';

UPDATE "SocialLink"
SET "href" = 'https://www.youtube.com/@pokharaflightcentre', "visible" = 1, "order" = 3
WHERE lower("label") = 'youtube';

INSERT INTO "SocialLink" ("id", "label", "href", "order", "visible", "settingsId")
SELECT 'social-facebook-official', 'Facebook', 'https://www.facebook.com/Pokharaflightcentre', 1, 1, "id"
FROM "SiteSettings"
WHERE NOT EXISTS (SELECT 1 FROM "SocialLink" WHERE lower("label") = 'facebook')
LIMIT 1;

INSERT INTO "SocialLink" ("id", "label", "href", "order", "visible", "settingsId")
SELECT 'social-instagram-official', 'Instagram', 'https://www.instagram.com/pokharaflightcentre/', 2, 1, "id"
FROM "SiteSettings"
WHERE NOT EXISTS (SELECT 1 FROM "SocialLink" WHERE lower("label") = 'instagram')
LIMIT 1;

INSERT INTO "SocialLink" ("id", "label", "href", "order", "visible", "settingsId")
SELECT 'social-youtube-official', 'YouTube', 'https://www.youtube.com/@pokharaflightcentre', 3, 1, "id"
FROM "SiteSettings"
WHERE NOT EXISTS (SELECT 1 FROM "SocialLink" WHERE lower("label") = 'youtube')
LIMIT 1;
