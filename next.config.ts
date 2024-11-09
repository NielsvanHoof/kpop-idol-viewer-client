import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "i.scdn.co",
      },
      {
        hostname: "localhost",
      },
      {
        protocol: 'https',
        hostname: 'kit-media-uploads.s3.amazonaws.com',
      }
    ],
  },
};

export default nextConfig;
