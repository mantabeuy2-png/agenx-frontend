import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Coolify handles SSL termination via Traefik
  // Use relative URLs for API calls
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
