/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        port: "",
        pathname: "/63f902d79a33f71d496cde07/**",
      },
      {
        protocol: "https",
        hostname: "cdn.website-files.com",
        port: "",
        pathname: "/63f902d79a33f71d496cde07/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  dynamic: "auto", // Ensure static routes are not forced to dynamic
};

export default nextConfig;