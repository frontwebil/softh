import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "./reset.css";
import { ToasterClient } from "@/Providers/ToasterClient";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "SOFTH СТО - Стоматологія",
    template: "%s | SOFTH СТО",
  },

  description:
    "Стоматологія SOFTH СТО. Точна діагностика, зрозумілий план лікування та сучасна стоматологічна допомога.",

  keywords: [
    "стоматологія",
    "стоматолог",
    "лікування зубів",
    "стоматологічна клініка",
    "SOFTH СТО",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "SOFTH СТО — Стоматологія",
    description:
      "Точна діагностика, зрозумілий план лікування та сучасна стоматологічна допомога.",
    type: "website",
    locale: "uk_UA",
    siteName: "SOFTH СТО",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
