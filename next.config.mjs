/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async redirects() {
    return [
      {
        source: "/everest-helicopter-tour-nepal",
        destination: "/everest-base-camp-helicopter-tour-nepal",
        permanent: true
      },
      {
        source: "/annapurna-helicopter-tour-nepal",
        destination: "/annapurna-base-camp-helicopter-tour-nepal",
        permanent: true
      },
      {
        source: "/muktinath-pilgrimage-helicopter-tour",
        destination: "/muktinath-helicopter-tour-nepal",
        permanent: true
      },
      {
        source: "/pokhara-heli-service",
        destination: "/pokhara-helicopter-service",
        permanent: true
      },
      {
        source: "/luxury-helicopter-nepal",
        destination: "/luxury-helicopter-tour-nepal",
        permanent: true
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true
      },
      {
        source: "/inquiry",
        destination: "/contact",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
