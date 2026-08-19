-- Replace the Services and Heli Tours dropdown records with direct links.
DELETE FROM "NavItem"
WHERE "groupLabel" = 'Services' AND "href" <> '/services';

UPDATE "NavItem"
SET "label" = 'Services', "groupLabel" = NULL, "order" = 30, "visible" = 1
WHERE "href" = '/services';

INSERT INTO "NavItem" ("id", "label", "href", "groupLabel", "order", "visible")
SELECT 'nav-services-direct', 'Services', '/services', NULL, 30, 1
WHERE NOT EXISTS (SELECT 1 FROM "NavItem" WHERE "href" = '/services');

DELETE FROM "NavItem"
WHERE "groupLabel" = 'Heli Tours' AND "href" <> '/tours';

UPDATE "NavItem"
SET "label" = 'Heli Tours', "groupLabel" = NULL, "order" = 40, "visible" = 1
WHERE "href" = '/tours';

INSERT INTO "NavItem" ("id", "label", "href", "groupLabel", "order", "visible")
SELECT 'nav-heli-tours-direct', 'Heli Tours', '/tours', NULL, 40, 1
WHERE NOT EXISTS (SELECT 1 FROM "NavItem" WHERE "href" = '/tours');
