import { metadata } from "@/config/metadata";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
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
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
