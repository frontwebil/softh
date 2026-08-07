import { faqItems } from "@/lib/faqData";
import {
  OPENING_HOURS,
  SEO_SERVICES,
  SITE,
  SITE_URL,
} from "@/lib/siteConfig";

/**
 * JSON-LD для локального SEO: Dentist (LocalBusiness) + FAQPage + WebSite.
 * Допомагає Google звʼязати клініку з локацією (Петропавлівська Борщагівка).
 */
export function StructuredData() {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#clinic`,
    name: SITE.name,
    legalName: SITE.legalName,
    description:
      "Стоматологія SOFTH СТО у Петропавлівській Борщагівці. Точна діагностика, зрозумілий план лікування та узгоджена вартість до початку процедур.",
    url: SITE_URL,
    telephone: SITE.phone,
    image: `${SITE_URL}/og-image.png`,
    priceRange: "₴₴",
    currenciesAccepted: "UAH",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    hasMap: SITE.mapUrl,
    areaServed: [
      { "@type": "Place", name: "Петропавлівська Борщагівка" },
      { "@type": "Place", name: "Новосілки" },
      { "@type": "Place", name: "Софіївська Борщагівка" },
      { "@type": "Place", name: "Борщагівка" },
    ],
    openingHoursSpecification: OPENING_HOURS.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [SITE.instagram, SITE.telegram, SITE.whatsapp],
    medicalSpecialty: "Dentistry",
    availableService: SEO_SERVICES.map((name) => ({
      "@type": "MedicalProcedure",
      name,
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content.replace(/\s+/g, " ").trim(),
      },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: "uk-UA",
    publisher: { "@id": `${SITE_URL}/#clinic` },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([dentist, faq, website]),
      }}
    />
  );
}
