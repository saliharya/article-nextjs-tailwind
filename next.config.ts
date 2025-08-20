import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://test-fe.mysellerpintar.com/api/:path*", // proxy ke backend
      },
    ];
  },
};

export default nextConfig;
