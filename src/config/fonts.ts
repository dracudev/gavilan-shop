import { Inter, Montserrat_Alternates } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
