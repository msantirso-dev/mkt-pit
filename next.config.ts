import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.batev.com.ar",
        pathname: "/web/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
