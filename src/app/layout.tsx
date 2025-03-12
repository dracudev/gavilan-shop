import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { bodyFont } from "@/config/fonts";

export const metadata: Metadata = {
  title: "El Gavilán",
  description: "Hat shop in Orihuela, Alicante since 1880",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${bodyFont.className}`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
