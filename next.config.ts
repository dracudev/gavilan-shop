import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["qcrmgggovhvywkzurmga.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qcrmgggovhvywkzurmga.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
