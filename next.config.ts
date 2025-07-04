import type { NextConfig } from "next";
// @ts-expect-error Theres no updated types for next-pwa
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qcrmgggovhvywkzurmga.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
        search: "",
      },
    ],
  },
};

export default process.env.NODE_ENV === "development"
  ? nextConfig
  : withPWA({
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: false,
      buildExcludes: [/app-build-manifest\.json$/],
    })(nextConfig);
