/** @type {import('next').NextConfig} */
const isHttpsSite = process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") ?? false;

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com"
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  isHttpsSite ? "upgrade-insecure-requests" : ""
].filter(Boolean).join("; ");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  images: {
    qualities: [70, 75]
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/activities/annapurna-base-camp-helicopter-tour",
        destination: "/annapurna-base-camp-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/activities/everest-base-camp-helicopter-tour",
        destination: "/everest-base-camp-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/activities/muktinath-helicopter-tour",
        destination: "/muktinath-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/activities/emergency-evacuation-support",
        destination: "/emergency-helicopter-rescue-nepal",
        statusCode: 301
      },
      {
        source: "/activities/private-helicopter-charter-in-nepal",
        destination: "/helicopter-charter-nepal",
        statusCode: 301
      },
      {
        source: "/activities/pokhara-scenic-helicopter-ride",
        destination: "/pokhara-helicopter-service",
        statusCode: 301
      },
      {
        source: "/activities/custom-pilgrimage-helicopter-tours",
        destination: "/muktinath-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/activities/vip-mountain-breakfast-flights",
        destination: "/luxury-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/activities/aerial-photography-filming-flights",
        destination: "/helicopter-charter-nepal",
        statusCode: 301
      },
      {
        source: "/activities/corporate-charter-flights",
        destination: "/helicopter-charter-nepal",
        statusCode: 301
      },
      {
        source: "/activities/group-sharing-heli-tours",
        destination: "/helicopter-tours/shared-helicopter-flights",
        statusCode: 301
      },
      {
        source: "/charter-services",
        destination: "/helicopter-charter-nepal",
        statusCode: 301
      },
      {
        source: "/rescue-emergency-support",
        destination: "/emergency-helicopter-rescue-nepal",
        statusCode: 301
      },
      {
        source: "/custom-heli-packages",
        destination: "/helicopter-charter-nepal",
        statusCode: 301
      },
      {
        source: "/pilgrimage-heli-tours",
        destination: "/muktinath-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/scenic-flights-in-pokhara",
        destination: "/pokhara-helicopter-service",
        statusCode: 301
      },
      {
        source: "/everest-helicopter-tour-nepal",
        destination: "/everest-base-camp-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/annapurna-helicopter-tour-nepal",
        destination: "/annapurna-base-camp-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/muktinath-pilgrimage-helicopter-tour",
        destination: "/muktinath-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/pokhara-heli-service",
        destination: "/pokhara-helicopter-service",
        statusCode: 301
      },
      {
        source: "/luxury-helicopter-nepal",
        destination: "/luxury-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/contact-us",
        destination: "/contact",
        statusCode: 301
      },
      {
        source: "/inquiry",
        destination: "/contact",
        statusCode: 301
      },
      {
        source: "/shared-helicopter-flights",
        destination: "/helicopter-tours/shared-helicopter-flights",
        statusCode: 301
      },
      {
        source: "/helicopter-sharing-nepal",
        destination: "/helicopter-tours/shared-helicopter-flights",
        statusCode: 301
      },
      {
        source: "/helicopter-tours",
        destination: "/tours",
        statusCode: 301
      },
      {
        source: "/team",
        destination: "/about-us",
        statusCode: 301
      },
      {
        source: "/about",
        destination: "/about-us",
        statusCode: 301
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        statusCode: 301
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        statusCode: 301
      },
      {
        source: "/terms-and-condition",
        destination: "/terms-and-conditions",
        statusCode: 301
      },
      {
        source: "/destinations/annapurna",
        destination: "/destinations/annapurna-region",
        statusCode: 301
      },
      {
        source: "/destinations/annapurna-base-camp",
        destination: "/destinations/annapurna-region",
        statusCode: 301
      },
      {
        source: "/destinations/everest",
        destination: "/destinations/everest-region",
        statusCode: 301
      },
      {
        source: "/destinations/everest-base-camp",
        destination: "/destinations/everest-region",
        statusCode: 301
      },
      {
        source: "/destinations/muktinath-temple",
        destination: "/destinations/muktinath",
        statusCode: 301
      },
      {
        source: "/destinations/nepal",
        destination: "/destinations",
        statusCode: 301
      },
      {
        source: "/tours/everest-base-camp-helicopter-tour-nepal",
        destination: "/everest-base-camp-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/tours/annapurna-base-camp-helicopter-tour-nepal",
        destination: "/annapurna-base-camp-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/tours/muktinath-helicopter-tour-nepal",
        destination: "/muktinath-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/services/helicopter-charter-nepal",
        destination: "/helicopter-charter-nepal",
        statusCode: 301
      },
      {
        source: "/services/emergency-helicopter-rescue-nepal",
        destination: "/emergency-helicopter-rescue-nepal",
        statusCode: 301
      },
      {
        source: "/services/pokhara-helicopter-service",
        destination: "/pokhara-helicopter-service",
        statusCode: 301
      },
      {
        source: "/services/luxury-helicopter-tour-nepal",
        destination: "/luxury-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/services/muktinath-helicopter-tour-nepal",
        destination: "/muktinath-helicopter-tour-nepal",
        statusCode: 301
      },
      {
        source: "/services/shared-helicopter-flights",
        destination: "/helicopter-tours/shared-helicopter-flights",
        statusCode: 301
      }
    ];
  }
};

export default nextConfig;
