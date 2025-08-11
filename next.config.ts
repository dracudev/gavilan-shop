import type { NextConfig } from "next";
// @ts-expect-error Theres no updated types for next-pwa
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@supabase/supabase-js", "@supabase/ssr"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

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

  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.resolve.symlinks = false;

      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: ".next/cache/webpack",
      };

      config.devtool = false;

      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -5,
            chunks: "all",
            maxSize: 200000,
          },
          supabase: {
            test: /[\\/]node_modules[\\/]@supabase[\\/]/,
            name: "supabase",
            chunks: "all",
            priority: 10,
            enforce: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
            priority: 20,
            enforce: true,
          },
        },
      };
    }

    // Suppress webpack warnings
    config.ignoreWarnings = [
      {
        module: /node_modules\/@supabase\/realtime-js/,
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
      /Critical dependency: the request of a dependency is an expression/,
    ];

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    if (!isServer) {
      config.externals = [
        ...(config.externals || []),
        {
          "utf-8-validate": "commonjs utf-8-validate",
          bufferutil: "commonjs bufferutil",
        },
      ];
    }

    config.resolve.modules = ["node_modules"];
    config.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];

    return config;
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
