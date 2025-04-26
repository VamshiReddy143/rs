import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
      },{
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**"
      }
    ]
  },

  theme: {
    extend: {
      filter:['grayscale'],
     
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  plugins: [],

};

export default nextConfig;
