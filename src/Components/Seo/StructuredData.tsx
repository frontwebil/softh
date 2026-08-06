import {
  OPENING_HOURS,
  SEO_SERVICES,
  SITE,
  SITE_URL,
} from "@/lib/siteConfig";

/**
 * JSON-LD для локального SEO: Dentist (LocalBusiness) + WebSite.
 * Допомагає Google звʼязати клініку з локацією (Київ / Борщагівка).
 */
export function StructuredData() {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#clinic`,
    name: SITE.name,
    legalName: SITE.legalName,
    description:
      "Стоматологія SOFTH СТО у Петропавлівській Борщагівці (Київ). Точна діагностика, зрозумілий план лікування та узгоджена вартість до початку процедур.",
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
      { "@type": "City", name: "Київ" },
      { "@type": "Place", name: "Петропавлівська Борщагівка" },
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
        __html: JSON.stringify([dentist, website]),
      }}
    />
  );
}
