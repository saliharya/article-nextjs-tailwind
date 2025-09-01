import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://test-fe.mysellerpintar.com/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.sellerpintar.com",
        pathname: "/articles/**",
      },
    ],
  },
};

export default nextConfig;