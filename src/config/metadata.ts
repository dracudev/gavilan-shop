import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://gavilan-shop.vercel.app'),

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
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
  creator: "dracudev",
  publisher: "dracudev",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    languages: {
      "es-ES": `${process.env.NEXT_PUBLIC_BASE_URL}/es`,
      "en-US": `${process.env.NEXT_PUBLIC_BASE_URL}`, // TODO: Make spanish the default language
    },
  },
  openGraph: {
    title: "Sombrerería El Gavilán - Orihuela, Alicante",
    description:
      "Sombrerería El Gavilán: Tienda de sombreros en Orihuela, Alicante desde 1880. Encuentra sombreros de alta calidad y estilo tradicional.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Sombrerería El Gavilán",
    images: [
      {
        url: "/og-image.png", // TODO: Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "Sombrerería El Gavilán - Orihuela, Alicante",
      },
    ],
    locale: "en-US", 
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sombrerería El Gavilán - Orihuela, Alicante",
    description: "Tienda de sombreros en Orihuela, Alicante desde 1880",
    creator: "@dracudev",
    images: [], // TODO: Add Twitter card image
  },
  category: "Shopping",
};