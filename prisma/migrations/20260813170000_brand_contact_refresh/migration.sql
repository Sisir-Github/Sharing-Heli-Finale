UPDATE "SiteSettings"
SET
  "logoImage" = '/images/sharing-heli-logo.jpg',
  "primaryPhone" = '+977-9856028155',
  "whatsappNumber" = '+977-9856028155',
  "heroCtaTertiaryHref" = CASE
    WHEN "heroCtaTertiaryHref" LIKE 'tel:%' THEN 'tel:+9779856028155'
    ELSE "heroCtaTertiaryHref"
  END;
