import { metadata } from "@/config/metadata";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { titleFont, bodyFont, serifFont } from "@/config/fonts";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${titleFont.variable} ${bodyFont.variable} ${serifFont.variable}`}
    >
      <ThemeProvider>
        <body className={`${bodyFont.className} font-body antialiased`}>
          <ScrollToTop />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
