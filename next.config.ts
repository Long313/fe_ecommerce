import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.example.com', // đúng hostname trong URL ảnh
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
