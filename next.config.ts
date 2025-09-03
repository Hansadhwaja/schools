import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "djcvopxfv.cloudinary.com"],
  },
};

export default nextConfig;
