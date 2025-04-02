import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sombrerería El Gavilán | Orihuela, Alicante",
  description:
    "Sombrerería El Gavilán: Tienda de sombreros en Orihuela, Alicante desde 1880. Encuentra sombreros de alta calidad y estilo tradicional.",
  keywords: [
    "sombreros",
    "tienda de sombreros",
    "Orihuela",
    "Alicante",
    "sombrerería",
    "sombreros tradicionales",
    "El Gavilán",
    "sombreros de calidad",
    "sombreros artesanales",
    "tienda histórica",
  ],
  authors: [
    {
      name: "dracudev",
      url: "https://www.dracu.dev",
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  applicationName: "Sombrerería El Gavilán",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "google-site-verification=your-verification-code", // TODO
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sombrerería El Gavilán - Orihuela, Alicante",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1668-2388.png",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1536-2048.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1125-2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  creator: "dracudev",
  publisher: "dracudev",
  alternates: {
    canonical: "https://gavilan-shop.vercel.app",
    languages: {
      "es-ES": "https://gavilan-shop.vercel.app/es",
      "en-US": "https://gavilan-shop.vercel.app",
    },
  },
  openGraph: {
    title: "Sombrerería El Gavilán - Orihuela, Alicante",
    description:
      "Sombrerería El Gavilán: Tienda de sombreros en Orihuela, Alicante desde 1880. Encuentra sombreros de alta calidad y estilo tradicional.",
    url: "https://gavilan-shop.vercel.app/",
    siteName: "Sombrerería El Gavilán",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sombrerería El Gavilán - Orihuela, Alicante",
      },
    ],
    locale: "es-ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sombrerería El Gavilán - Orihuela, Alicante",
    description: "Tienda de sombreros en Orihuela, Alicante desde 1880",
    creator: "@dracudev",
    images: ["/twitter-image.jpg"],
  },
  category: "Shopping",
};
