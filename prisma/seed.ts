import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { COMPANY } from "../lib/constants";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword || adminPassword.length < 14) {
    throw new Error("Set ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 14 characters before seeding.");
  }
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashed,
      role: "ADMIN"
    },
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
        companyName: COMPANY.companyName,
        brandName: COMPANY.brandName,
        logoImage: "/images/sharing-heli-logo.png",
        tagline: COMPANY.tagline,
        operatingUnder: COMPANY.operatingLine,
        primaryPhone: COMPANY.primaryPhone,
        whatsappNumber: COMPANY.whatsappNumber,
        email: COMPANY.inquiryEmail,
        addressLine1: COMPANY.address.line1,
        addressLine2: COMPANY.address.line2,
        addressLine3: COMPANY.address.line3,
        addressLine4: COMPANY.address.country,
        businessHours: "Daily flight coordination by request",
        seoTitle: "Helicopter Tours & Charter in Nepal | Sharing Heli",
        seoDescription:
          "Plan shared helicopter flights and private charters in Nepal with Pokhara-based support, clear operational guidance, and current fare confirmation.",
        ogImage: "/images/campaign/sharing-heli-hero.jpg",
        heroHeadline: "Helicopter tours and charters in Nepal.",
        heroSubheadline:
          "Shared helicopter flights and private charters coordinated from Pokhara, with clear planning around weather, routing, and passenger needs.",
        heroBackgroundMode: "image",
        heroBackgroundImage: null,
        heroBackgroundVideo: "",
        heroCtaPrimaryLabel: "Reserve a flight",
        heroCtaPrimaryHref: "/check-availability",
        heroCtaSecondaryLabel: "View routes",
        heroCtaSecondaryHref: "/tours",
        heroCtaTertiaryLabel: "Call Now",
        heroCtaTertiaryHref: `tel:${COMPANY.primaryPhone.replace(/\s/g, "")}`,
        ctaStripText: "Plan your Himalayan flight in minutes with our operations desk.",
        ctaStripButtonLabel: "Reserve a flight",
        ctaStripButtonHref: "/check-availability"
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
          title: "Pokhara-Based Coordination",
          description: "Direct support from our Lakeside team before and after your flight.",
          order: 1,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "Weather-Led Planning",
          description: "Schedules and routes are confirmed against current operating conditions.",
          order: 2,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "Direct Desk Support",
          description: "Contact the operations desk by phone or WhatsApp for current information.",
          order: 3,
          visible: true
        }
      ]
    });

    await prisma.whyChooseItem.createMany({
      data: [
        {
          settingsId: settings.id,
          title: "Operational Clarity",
          description: "We explain routing, passenger requirements, timing, and known limitations before confirmation.",
          order: 1,
          visible: true
        },
        {
          settingsId: settings.id,
          title: "Shared And Private Options",
          description: "Compare per-seat shared departures with a private aircraft arranged around your group.",
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
        { label: "Tours", href: "/tours", order: 2, visible: true },
        { label: "Charter", href: "/helicopter-charter-nepal", order: 3, visible: true },
        { label: "Destinations", href: "/destinations", order: 4, visible: true },
        { label: "Blog", href: "/blog", order: 5, visible: true },
        { label: "About", href: "/about-us", order: 6, visible: true },
        { label: "Contact", href: "/contact", order: 7, visible: true }
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
          longDescription: "Private helicopter charter for business, travel, pilgrimage, and custom routing across Nepal. Our operations desk coordinates aircraft availability, routing, and ground support for efficient mission execution."
        },
        {
          title: "Emergency Flight Coordination",
          slug: "emergency-helicopter-rescue-nepal",
          shortDescription: "Time-sensitive helicopter coordination for urgent transport requests.",
          longDescription: "We help relay urgent flight requirements to available operators. Dispatch depends on weather, aircraft availability, permissions, and the operating crew's assessment; no flight is guaranteed until confirmed."
        },
        {
          title: "Pokhara Helicopter Service",
          slug: "pokhara-helicopter-service",
          shortDescription: "Local helicopter operations hub serving Pokhara and the Annapurna region.",
          longDescription: "Pokhara-based helicopter services for tours, charter, and emergency missions. Local coordination ensures fast turnaround and reliable support."
        },
        {
          title: "Custom Helicopter Experiences",
          slug: "luxury-helicopter-tour-nepal",
          shortDescription: "Private helicopter routes for travelers who need a tailored schedule or special-purpose flight.",
          longDescription: "Custom helicopter experiences for private travel, filming, photography, corporate movement, proposals, and special occasions, planned around route feasibility and current operating conditions."
        }
      ]
    });
  }

  const tourCount = await prisma.tour.count();
  if (tourCount === 0) {
    await prisma.tour.createMany({
      data: [
        {
          title: "Everest Region Helicopter Tour",
          slug: "everest-base-camp-helicopter-tour-nepal",
          duration: "4.5 Hours",
          priceFrom: null,
          currency: "USD",
          priceMode: "LIVE_QUOTE",
          departureCity: "Kathmandu",
          excerpt: "A weather-led Everest region flight request with the final route and any landing option confirmed for the operating day.",
          overview: "Everest region helicopter flights require careful review of weather, aircraft performance, fuel planning, permissions, and passenger loading. The operations desk confirms the practical route before payment.",
          route: "Departure and return points are confirmed with the quote. The operating crew selects the practical Everest-region routing and any permitted stop for current conditions.",
          altitude: "High-altitude route; landing and ground-time decisions remain operational.",
          bestTime: "Autumn and spring are commonly requested, with every date subject to current mountain weather.",
          weatherNotes: "Cloud, wind, visibility, and rapidly changing conditions can delay, reroute, or cancel the flight.",
          cancellationPolicy: "Weather and operator decisions may require rescheduling or cancellation. Written terms are supplied with the current quote.",
          passengerRequirements: "Provide names, individual weights, baggage estimates, and any medical or mobility considerations before confirmation.",
          weightSeating: "Seating and loading are assigned after the operator reviews the complete passenger manifest.",
          whatToBring: "Bring identification and follow the clothing, baggage, and equipment guidance supplied with the confirmed flight plan.",
          photographyInfo: "Specific views are weather-dependent. Follow crew instructions for safe camera and phone use.",
          safetyNotes: "The operating pilot has final authority over departure, routing, landing, payload, and cancellation decisions.",
          faqs: [
            { question: "Is an Everest Base Camp or Kala Patthar landing guaranteed?", answer: "No. Any landing option depends on current weather, permissions, passenger loading, aircraft performance, and the operating pilot's decision." },
            { question: "Can the flight be confirmed without passenger weights?", answer: "No. Individual passenger weights and baggage estimates are required for operational review." }
          ],
          operationalNotice: "Landing points and routing vary with weather, weight, permissions, and the operating pilot's decision.",
          highlights: "Everest region aerial views with routing confirmed for the day's operating conditions.",
          itinerary: "Morning departure, Everest region flight, operationally permitted viewing or landing points, and return.",
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
          priceFrom: null,
          currency: "USD",
          priceMode: "LIVE_QUOTE",
          departureCity: "Pokhara",
          excerpt: "An Annapurna region helicopter request from Pokhara with route, landing conditions, and current commercial details checked before booking.",
          overview: "Annapurna flights from Pokhara move quickly from valley terrain toward high mountains. Visibility, wind, passenger loading, and landing conditions are reviewed before the route is confirmed.",
          route: "Pokhara departure with the final Annapurna-region circuit and any ground stop selected for current conditions and operator approval.",
          altitude: "High-altitude route; passenger comfort and landing feasibility require review.",
          bestTime: "Autumn and spring are popular planning periods, while every departure depends on current weather.",
          weatherNotes: "Valley cloud, mountain visibility, wind, and conditions near the intended stop can change the flight plan.",
          cancellationPolicy: "Weather-led changes are handled under the written rescheduling and cancellation terms supplied with the quote.",
          passengerRequirements: "Provide names, individual weights, baggage estimates, travel date, and medical or mobility considerations.",
          weightSeating: "The aircraft operator confirms seating and allowable baggage after reviewing the full manifest.",
          whatToBring: "Bring identification and use the clothing and baggage guidance supplied for the confirmed route and season.",
          photographyInfo: "Annapurna views depend on visibility. Camera use must follow the operating crew's safety instructions.",
          safetyNotes: "Departure, routing, landing, payload, and cancellation remain subject to the operating pilot's final decision.",
          faqs: [
            { question: "Are shared seats always available for Annapurna?", answer: "No. Shared seats require compatible passengers, timing, aircraft availability, and a confirmed operating departure." },
            { question: "What details are needed for a current quote?", answer: "Send the travel date, passenger count and weights, baggage estimate, and whether the group can accept a flexible time window." }
          ],
          operationalNotice: "Route, landing, and departure time remain subject to weather, passenger weight, and operator approval.",
          highlights: "Annapurna amphitheater aerial circuit with glacier, ridge, and basin panoramas.",
          itinerary: "Depart Pokhara, Annapurna flyover, base camp view stop, return.",
          inclusions: "Flight coordination, weather checks, and route planning support.",
          exclusions: "Personal expenses and insurance.",
          images: ["/images/annapurna-tour.svg"],
          published: true,
          featured: true
        },
        {
          title: "Muktinath Pilgrimage Tour",
          slug: "muktinath-helicopter-tour-nepal",
          duration: "3.5 Hours",
          priceFrom: null,
          currency: "USD",
          priceMode: "LIVE_QUOTE",
          departureCity: "Pokhara",
          excerpt: "A Muktinath pilgrimage flight request planned around weather, landing access, passenger needs, and current availability.",
          overview: "Muktinath flights are coordinated around pilgrimage timing, high-altitude access, weather in western Nepal, and the support needs of the traveling group.",
          route: "Pokhara departure toward the Muktinath area, with landing access, ground time, and return timing confirmed in the operating plan.",
          altitude: "High-altitude pilgrimage route; disclose acclimatization, medical, and mobility concerns before booking.",
          bestTime: "Spring and autumn are commonly requested, with the practical window determined by current route weather.",
          weatherNotes: "Wind and visibility in the Kali Gandaki corridor can affect departure, landing access, and return timing.",
          cancellationPolicy: "Weather or landing conditions may require delay, rescheduling, or cancellation under the written quote terms.",
          passengerRequirements: "Provide names, weights, baggage estimates, mobility needs, and the amount of pilgrimage ground time requested.",
          weightSeating: "Passenger seating and baggage limits are confirmed after the operator reviews the group manifest.",
          whatToBring: "Carry identification and follow the confirmed clothing and baggage guidance for high-altitude pilgrimage travel.",
          photographyInfo: "Photography opportunities vary with visibility and ground access. Follow temple-area and crew instructions.",
          safetyNotes: "The operating pilot has final authority over departure, route, payload, landing, and return timing.",
          faqs: [
            { question: "Is temple ground time included automatically?", answer: "No. Requested ground time and local access arrangements must be agreed before confirmation." },
            { question: "Can elderly travelers request assistance?", answer: "Yes. Share mobility and medical needs early so the desk can assess practical support and route suitability." }
          ],
          operationalNotice: "Flights operate only when weather, aircraft availability, and landing conditions permit.",
          highlights: "Muktinath pilgrimage access with timing and landing conditions reviewed before confirmation.",
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
