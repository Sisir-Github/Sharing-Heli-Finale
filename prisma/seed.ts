import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@sharingheli.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Sharing Heli Admin",
      passwordHash: hashed,
      role: "ADMIN"
    }
  });

  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    const settings = await prisma.siteSettings.create({
      data: {
        companyName: "Sharing Heli Nepal Pvt. Ltd.",
        brandName: "Sharing Heli",
        tagline: "Elevate Your Journey Above the Himalayas",
        operatingUnder: "Operating under Pokhara Flight Centre Tours & Travel Pvt. Ltd.",
        primaryPhone: "+977-9802855690",
        whatsappNumber: "+977-9856028155",
        email: "rishi8848@gmail.com",
        addressLine1: "Lakeside-6, 15 Street No.",
        addressLine2: "Pokhara 33700",
        addressLine3: "Kaski, Gandaki Province",
        addressLine4: "Nepal",
        businessHours: "24/7 Availability",
        seoTitle: "Luxury Helicopter Tours & Charter in Nepal | Sharing Heli",
        seoDescription:
          "Experience luxury helicopter tours, private charter, pilgrimage flights, rescue support, and aerial services in Nepal with experienced mountain pilots at Sharing Heli.",
        ogImage: "/images/og-sharing-heli.jpg",
        heroHeadline: "Elevate Your Journey Above the Himalayas",
        heroSubheadline:
          "Premium helicopter tours, private charter, and emergency services across Nepal with safety-first crews and cinematic Himalayan views.",
        heroBackgroundMode: "3d",
        heroBackgroundImage: "/images/hero-fallback.jpg",
        heroBackgroundVideo: "",
        heroCtaPrimaryLabel: "Inquiry Now",
        heroCtaPrimaryHref: "/contact",
        heroCtaSecondaryLabel: "WhatsApp",
        heroCtaSecondaryHref: "https://wa.me/9779856028155",
        heroCtaTertiaryLabel: "Call Now",
        heroCtaTertiaryHref: "tel:+977-9802855690",
        ctaStripText: "Plan your Himalayan flight in minutes with our operations desk.",
        ctaStripButtonLabel: "Start Inquiry",
        ctaStripButtonHref: "/contact"
      }
    });

    await prisma.socialLink.createMany({
      data: [
        { settingsId: settings.id, label: "Facebook", href: "https://facebook.com", order: 1, visible: false },
        { settingsId: settings.id, label: "Instagram", href: "https://instagram.com", order: 2, visible: false }
      ]
    });

    await prisma.trustBadge.createMany({
      data: [
        {
          settingsId: settings.id,
          title: "Government-Regulated Operations",
          description: "Compliance-led flight operations aligned with Nepal aviation regulations.",
          order: 1,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "Experienced Mountain Pilots",
          description: "High-altitude crews with deep local terrain knowledge and safety training.",
          order: 2,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "24/7 Emergency Response",
          description: "Rapid coordination for rescue and mission-critical charter requirements.",
          order: 3,
          visible: true
        }
      ]
    });

    await prisma.whyChooseItem.createMany({
      data: [
        {
          settingsId: settings.id,
          title: "Safety-First Flight Planning",
          description: "Structured pre-flight checks, weather intelligence, and certified crew readiness.",
          order: 1,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "Luxury Cabin Experience",
          description: "Comfortable, premium interiors for discerning international travelers.",
          order: 2,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "Local Expertise",
          description: "Pokhara-based operations for fast coordination and on-ground support.",
          order: 3,
          visible: true
        }
      ]
    });
  }

  const navCount = await prisma.navItem.count();
  if (navCount === 0) {
    await prisma.navItem.createMany({
      data: [
        { label: "Home", href: "/", order: 1, visible: true },
        { label: "Services", href: "/services", order: 2, visible: true },
        { label: "Tours", href: "/tours", order: 3, visible: true },
        { label: "Contact", href: "/contact", order: 4, visible: true }
      ]
    });
  }

  const footerCount = await prisma.footerGroup.count();
  if (footerCount === 0) {
    const servicesGroup = await prisma.footerGroup.create({ data: { title: "Services", order: 1, visible: true } });
    const toursGroup = await prisma.footerGroup.create({ data: { title: "Popular Tours", order: 2, visible: true } });
    const quickGroup = await prisma.footerGroup.create({ data: { title: "Quick Links", order: 3, visible: true } });

    await prisma.footerLink.createMany({
      data: [
        { groupId: servicesGroup.id, label: "Charter", href: "/helicopter-charter-nepal", order: 1, visible: true },
        { groupId: servicesGroup.id, label: "Rescue", href: "/emergency-helicopter-rescue-nepal", order: 2, visible: true },
        { groupId: toursGroup.id, label: "Everest Base Camp", href: "/everest-base-camp-helicopter-tour-nepal", order: 1, visible: true },
        { groupId: toursGroup.id, label: "Annapurna Base Camp", href: "/annapurna-base-camp-helicopter-tour-nepal", order: 2, visible: true },
        { groupId: quickGroup.id, label: "Contact", href: "/contact", order: 1, visible: true }
      ]
    });
  }

  const destinationCount = await prisma.destination.count();
  if (destinationCount === 0) {
    await prisma.destination.createMany({
      data: [
        {
          title: "Everest Region",
          description: "High-altitude Himalayan panoramas and iconic Everest heli routes.",
          order: 1,
          visible: true
        },
        {
          title: "Annapurna Region",
          description: "Scenic alpine valleys, glaciers, and base camp viewpoints.",
          order: 2,
          visible: true
        },
        {
          title: "Pilgrimage Sites",
          description: "Sacred mountain temples with comfortable helicopter access.",
          order: 3,
          visible: true
        }
      ]
    });
  }

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: "Charter",
          slug: "helicopter-charter-nepal",
          shortDescription: "Private charter missions tailored to schedule, route, and passenger needs.",
          longDescription: "Premium helicopter charter services for business, leisure, and custom routing across Nepal. Our operations desk coordinates aircraft availability, routing, and ground support for efficient mission execution."
        },
        {
          title: "Emergency Rescue",
          slug: "emergency-helicopter-rescue-nepal",
          shortDescription: "Rapid-response helicopter rescue coordination for urgent missions.",
          longDescription: "Emergency rescue coordination with high-altitude expertise. We align dispatch, flight planning, and medical transfer support with safety-first execution."
        },
        {
          title: "Pokhara Helicopter Service",
          slug: "pokhara-helicopter-service",
          shortDescription: "Local helicopter operations hub serving Pokhara and the Annapurna region.",
          longDescription: "Pokhara-based helicopter services for tours, charter, and emergency missions. Local coordination ensures fast turnaround and reliable support."
        },
        {
          title: "Luxury Helicopter Tours",
          slug: "luxury-helicopter-tour-nepal",
          shortDescription: "High-comfort helicopter tours curated for premium travelers.",
          longDescription: "Luxury helicopter tours designed for discerning international guests, with refined routing, premium cabin comfort, and concierge-style coordination."
        }
      ]
    });
  }

  const tourCount = await prisma.tour.count();
  if (tourCount === 0) {
    await prisma.tour.createMany({
      data: [
        {
          title: "Everest Base Camp Helicopter Tour",
          slug: "everest-base-camp-helicopter-tour-nepal",
          duration: "4.5 Hours",
          priceFrom: 1250,
          currency: "USD",
          highlights: "Everest region aerial access with iconic Himalayan views and expert mountain pilots.",
          itinerary: "Morning departure, Everest region flyover, scenic viewing stops, and return to base.",
          inclusions: "Flight coordination, mountain briefing, route planning, and operational support.",
          exclusions: "Personal expenses, travel insurance, and optional upgrades.",
          images: ["/images/everest-tour.svg"],
          published: true,
          featured: true
        },
        {
          title: "Annapurna Base Camp Tour",
          slug: "annapurna-base-camp-helicopter-tour-nepal",
          duration: "4 Hours",
          priceFrom: 1150,
          currency: "USD",
          highlights: "Annapurna amphitheater aerial circuit with glacier, ridge, and basin panoramas.",
          itinerary: "Depart Pokhara, Annapurna flyover, base camp view stop, return.",
          inclusions: "Flight coordination, weather checks, and premium routing support.",
          exclusions: "Personal expenses and insurance.",
          images: ["/images/annapurna-tour.svg"],
          published: true,
          featured: true
        },
        {
          title: "Muktinath Pilgrimage Tour",
          slug: "muktinath-helicopter-tour-nepal",
          duration: "3.5 Hours",
          priceFrom: 980,
          currency: "USD",
          highlights: "Sacred pilgrimage access with smooth scheduling and experienced crew.",
          itinerary: "Departure, Muktinath landing, pilgrimage time, return.",
          inclusions: "Operations support, flight planning, and route coordination.",
          exclusions: "Personal expenses and insurance.",
          images: ["/images/muktinath-tour.svg"],
          published: true,
          featured: true
        }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
