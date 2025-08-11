import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";

export const titleFont = localFont({
  src: "../assets/fonts/glorius-regular.woff2",
  variable: "--font-title",
  display: "swap",
  fallback: ["Playfair Display", "serif"],
});

export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Font combination utility
export const fontClasses = {
  title: `${titleFont.variable} font-title`,
  body: `${bodyFont.variable} font-body`,
  serif: `${serifFont.variable} font-serif`,
  heading: `${titleFont.variable} font-title`,
  subheading: `${serifFont.variable} font-serif`,
  text: `${bodyFont.variable} font-body`,
} as const;
