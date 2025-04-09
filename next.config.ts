import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        port: "",
        pathname: "/63f902d79a33f71d496cde07/**"
      },
      {
        protocol: "https",
        hostname: "cdn.website-files.com",
        port: "",
        pathname: "/63f902d79a33f71d496cde07/**"
      }
    ]
  },
  theme: {
    extend: {
      filter:['grayscale']
    },
  },
  plugins: [],

};

export default nextConfig;
