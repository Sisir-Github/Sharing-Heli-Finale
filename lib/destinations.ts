export type DestinationGuide = {
  slug: string;
  title: string;
  region: string;
  description: string;
  image: string;
  routes: string[];
  bestFor: string[];
  operatingNotes: string[];
  flightExperience: string;
  altitudeNote: string;
  bestSeason: string;
  weather: string;
  photography: string;
  nearbyAttractions: string[];
  relatedHref: string;
};

export const DESTINATION_GUIDES: DestinationGuide[] = [
  {
    slug: "annapurna-region",
    title: "Annapurna Region",
    region: "Pokhara departure routes",
    description:
      "Annapurna flights are usually planned from Pokhara, with routing adjusted around visibility, valley wind, passenger load, and current landing conditions.",
    image: "/images/campaign/annapurna-helicopter.jpg",
    routes: ["Pokhara to Annapurna Base Camp area", "Pokhara scenic circuit", "Custom Annapurna valley routing"],
    bestFor: ["Short Pokhara stays", "Mountain photography", "Travelers comparing shared and private flight options"],
    operatingNotes: [
      "Morning windows are usually reviewed first because visibility can change quickly.",
      "Any landing or ground time is confirmed only after operator and weather review.",
      "Passenger weight and baggage details are required before final quote confirmation."
    ],
    flightExperience: "A Pokhara departure normally gives broad views into the Annapurna valleys before the route reaches higher alpine terrain. The exact circuit and any ground stop are confirmed for the operating day.",
    altitudeNote: "The route enters high-altitude terrain. Passenger comfort, ground time, and landing feasibility must be reviewed before departure.",
    bestSeason: "Autumn and spring are commonly requested for mountain visibility, but workable conditions are assessed for the specific travel date.",
    weather: "Valley cloud, wind, visibility, and conditions near the intended landing area can change the route or departure time.",
    photography: "Clear mornings can offer wide Annapurna, glacier, ridge, and valley views. Seating and safe camera use should be discussed before boarding.",
    nearbyAttractions: ["Pokhara and Phewa Lake", "Annapurna trekking gateways", "Mountain museums and viewpoints in Pokhara"],
    relatedHref: "/annapurna-base-camp-helicopter-tour-nepal"
  },
  {
    slug: "everest-region",
    title: "Everest Region",
    region: "Kathmandu departure routes",
    description:
      "Everest region requests are altitude-sensitive flights where the day route, viewing points, and stop decisions are confirmed against current conditions.",
    image: "/images/campaign/everest-helicopter.jpg",
    routes: ["Kathmandu to Everest region", "Lukla and Khumbu routing", "Custom Everest scenic charter"],
    bestFor: ["Time-limited Nepal visits", "High mountain views", "Private charter planning"],
    operatingNotes: [
      "No Everest Base Camp or Kala Patthar landing is promised before operational confirmation.",
      "Weather, aircraft performance, permissions, and passenger loading determine the final plan.",
      "Buffer time improves the chance of a workable flight window."
    ],
    flightExperience: "The flight moves from the Kathmandu region toward the Khumbu, with the day route selected around visibility, aircraft performance, fuel planning, and current permissions.",
    altitudeNote: "This is a high-altitude route. Any landing or ground-time decision belongs to the operating crew after reviewing conditions and passenger loading.",
    bestSeason: "Autumn and spring are popular planning periods. Winter and monsoon requests need especially careful weather review.",
    weather: "Cloud, wind, visibility, and rapidly changing mountain conditions can delay, reroute, or cancel a departure.",
    photography: "Views can include Himalayan valleys and Everest-region peaks when visibility permits. No specific viewing point is guaranteed in advance.",
    nearbyAttractions: ["Kathmandu Valley", "Lukla and the Khumbu region", "Everest-region trekking routes"],
    relatedHref: "/everest-base-camp-helicopter-tour-nepal"
  },
  {
    slug: "muktinath",
    title: "Muktinath",
    region: "Pilgrimage routes from Pokhara",
    description:
      "Muktinath helicopter requests are planned around pilgrimage timing, landing access, weather in the Kali Gandaki corridor, and group needs.",
    image: "/images/campaign/muktinath-helicopter.jpg",
    routes: ["Pokhara to Muktinath", "Pilgrimage charter", "Custom family or group pilgrimage route"],
    bestFor: ["Pilgrimage travel", "Elderly travelers needing shorter access", "Family and private group requests"],
    operatingNotes: [
      "Ground time and return timing are agreed before departure.",
      "Flights operate only when weather and landing conditions permit.",
      "Temple access, walking needs, and passenger support requirements should be shared early."
    ],
    flightExperience: "The route follows western Nepal mountain corridors toward the Muktinath area, with timing and landing access reviewed around pilgrimage needs and current conditions.",
    altitudeNote: "Muktinath is a high-altitude pilgrimage destination. Travelers should disclose medical, mobility, or acclimatization concerns before booking.",
    bestSeason: "Spring and autumn are commonly requested. The practical window still depends on route weather and local access on the chosen date.",
    weather: "Wind and visibility in the Kali Gandaki corridor can affect departure, landing access, and return timing.",
    photography: "The journey may provide views of dry mountain valleys, the Kali Gandaki corridor, and surrounding Himalayan terrain when conditions are clear.",
    nearbyAttractions: ["Muktinath Temple area", "Jomsom and the Kali Gandaki corridor", "Lower Mustang villages"],
    relatedHref: "/muktinath-helicopter-tour-nepal"
  },
  {
    slug: "pokhara",
    title: "Pokhara",
    region: "Lakeside operations base",
    description:
      "Pokhara is the practical base for Annapurna region flights, Muktinath requests, scenic flights, and many custom charter movements in western Nepal.",
    image: "/images/campaign/sharing-heli-hero.jpg",
    routes: ["Pokhara scenic flight", "Pokhara to Annapurna region", "Pokhara to Muktinath"],
    bestFor: ["Fast local coordination", "Western Nepal charters", "Annapurna and pilgrimage route planning"],
    operatingNotes: [
      "Flight timing depends on weather, aircraft position, and permission status.",
      "The Lakeside desk can coordinate route feasibility, passenger details, and current quote checks.",
      "Shared seats are confirmed only when compatible passengers and an operating departure exist."
    ],
    flightExperience: "Pokhara is the main coordination point for short scenic requests and many western Nepal charter routes. Flight length and routing vary by destination and aircraft position.",
    altitudeNote: "Pokhara is the lower-elevation departure base; mountain routes from the city may enter high-altitude terrain quickly.",
    bestSeason: "Clear autumn and spring mornings are popular, while flights in every season remain subject to local visibility and route weather.",
    weather: "Low cloud around the valley and mountain approaches can affect even short scenic departures.",
    photography: "When visibility is good, Pokhara routes can provide lake, valley, and Annapurna-range perspectives.",
    nearbyAttractions: ["Phewa Lake and Lakeside", "World Peace Pagoda", "Sarangkot and Pokhara viewpoints"],
    relatedHref: "/pokhara-helicopter-service"
  },
  {
    slug: "mustang",
    title: "Mustang",
    region: "Western Nepal charter requests",
    description:
      "Mustang flight requests are planned around remote mountain weather, landing access, passenger needs, permissions, and the purpose of travel.",
    image: "/images/campaign/muktinath-helicopter.jpg",
    routes: ["Pokhara to Lower Mustang area", "Muktinath and Kali Gandaki corridor requests", "Custom private Mustang charter"],
    bestFor: ["Private groups", "Pilgrimage and remote-area access requests", "Travelers with limited time"],
    operatingNotes: [
      "The requested landing area must be checked before a quote is confirmed.",
      "Wind, visibility, aircraft position, and permissions can change the practical plan.",
      "Share luggage, mobility needs, and the exact destination early."
    ],
    flightExperience: "Flights toward Mustang move through changing valley and high-mountain terrain. The final route depends on the requested destination and conditions on the day.",
    altitudeNote: "Many Mustang destinations are at altitude and remote from medical support. Passenger suitability and ground arrangements require advance discussion.",
    bestSeason: "Spring and autumn are common travel periods, but local wind and visibility remain decisive for helicopter operations.",
    weather: "Strong valley winds, cloud, and local visibility can affect the route, especially later in the day.",
    photography: "Clear flights may reveal the Kali Gandaki corridor, dry mountain landscapes, villages, and surrounding Himalayan ranges.",
    nearbyAttractions: ["Jomsom", "Marpha and Lower Mustang villages", "Muktinath pilgrimage area"],
    relatedHref: "/helicopter-charter-nepal"
  },
  {
    slug: "langtang",
    title: "Langtang",
    region: "Kathmandu region charter requests",
    description:
      "Langtang helicopter requests are reviewed as weather-dependent mountain flights, with the route and any landing option confirmed against current conditions.",
    image: "/images/campaign/annapurna-helicopter.jpg",
    routes: ["Kathmandu to Langtang region", "Langtang scenic charter request", "Custom access or return flight request"],
    bestFor: ["Short Kathmandu itineraries", "Private scenic requests", "Time-sensitive access planning"],
    operatingNotes: [
      "No landing point is promised before operator confirmation.",
      "Passenger weight, baggage, weather, and aircraft availability shape the final plan.",
      "A flexible date or time window can improve planning options."
    ],
    flightExperience: "The route typically leaves the Kathmandu region for narrow mountain valleys and higher terrain, with visibility and wind determining the practical circuit.",
    altitudeNote: "Langtang routes enter high-altitude terrain. Ground time and passenger suitability should be reviewed before confirmation.",
    bestSeason: "Autumn and spring are commonly requested for mountain travel. Every departure still needs a current weather assessment.",
    weather: "Mountain cloud and valley wind can develop quickly and may require delay, rerouting, or cancellation.",
    photography: "When conditions permit, the route can offer valley, forest, ridge, and high-mountain views without promising a specific viewpoint.",
    nearbyAttractions: ["Langtang National Park region", "Langtang trekking routes", "Kathmandu Valley"],
    relatedHref: "/helicopter-charter-nepal"
  }
];

export function getDestinationBySlug(slug: string) {
  return DESTINATION_GUIDES.find((destination) => destination.slug === slug) || null;
}
