import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "./reset.css";
import { ToasterClient } from "@/Providers/ToasterClient";
import { StructuredData } from "@/Components/Seo/StructuredData";
import { SITE, SITE_URL } from "@/lib/siteConfig";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Стоматологія на Петропавлівській Борщагівці — SOFTH СТО | Стоматологічна клініка",
    template: "%s | SOFTH СТО — стоматологія Петропавлівська Борщагівка",
  },

  description:
    "Стоматологія SOFTH СТО — Петропавлівська Борщагівка, вулиця Авіаторів, 2Д. Лікування зубів, імплантація, ортодонтія, дитяча стоматологія. Точна діагностика та узгоджена вартість до початку лікування. Запис: +38 (098) 200-50-55.",

  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,

  keywords: [
    "стоматологія Петропавлівська Борщагівка",
    "стоматологія Борщагівка",
    "стоматолог Борщагівка",
    "стоматолог Петропавлівська Борщагівка",
    "стоматологічна клініка Борщагівка",
    "лікування зубів Борщагівка",
    "імплантація зубів Борщагівка",
    "ортодонт Борщагівка",
    "дитяча стоматологія Борщагівка",
    "протезування зубів Борщагівка",
    "стоматологія Софіївська Борщагівка",
    "SOFTH СТО",
  ],

  category: "Стоматологія",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Стоматологія на Петропавлівській Борщагівці — SOFTH СТО",
    description:
      "Лікування зубів, імплантація, ортодонтія та дитяча стоматологія. Петропавлівська Борщагівка, вулиця Авіаторів, 2Д. Запис: +38 (098) 200-50-55.",
    url: SITE_URL,
    type: "website",
    locale: "uk_UA",
    siteName: SITE.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Стоматологія SOFTH СТО — Петропавлівська Борщагівка",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Стоматологія на Петропавлівській Борщагівці — SOFTH СТО",
    description:
      "Точна діагностика, зрозумілий план лікування та узгоджена вартість. Запис: +38 (098) 200-50-55.",
    images: ["/og-image.png"],
  },

  other: {
    "geo.region": "UA-32",
    "geo.placename": "Петропавлівська Борщагівка",
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
        <StructuredData />
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
