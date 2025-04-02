import { metadata } from "@/config/metadata"; // Import the metadata
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { bodyFont } from "@/config/fonts";

export { metadata };

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
