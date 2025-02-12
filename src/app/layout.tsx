import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "El Gavilán",
  description: "Hat shop in Orihuela, Alicante since 1970",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
