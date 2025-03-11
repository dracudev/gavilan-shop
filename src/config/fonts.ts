import { Roboto_Slab, Playfair_Display } from "next/font/google";

export const titleFont = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const bodyFont = Roboto_Slab({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
