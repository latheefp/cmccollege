import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Disable built-in optimization so external images from any domain work without explicit domains
    unoptimized: true,
    // Also allow any https hostname via a wildcard remotePattern
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};


export default nextConfig;
