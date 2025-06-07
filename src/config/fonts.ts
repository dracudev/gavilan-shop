import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import { Lato } from "next/font/google";

export const titleFont = localFont({
  src: "../assets/fonts/glorius-regular.woff2", 
  variable: "--font-title",
  display: "swap",
});

export const bodyFont = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const serifFont = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});