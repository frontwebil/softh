/**
 * Єдине джерело правди для SEO / структурованих даних.
 * Домен задається через NEXT_PUBLIC_SITE_URL (Vercel → Environment Variables).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://softh-cto.com"
).replace(/\/$/, "");

export const SITE = {
  name: "SOFTH СТО",
  legalName: "Стоматологія SOFTH СТО",
  phone: "+380982005055",
  phoneDisplay: "+38 (098) 200-50-55",
  street: "вулиця Авіаторів, 2Д",
  locality: "Петропавлівська Борщагівка",
  region: "Київська область",
  postalCode: "08129",
  country: "UA",
  mapUrl: "https://maps.app.goo.gl/fi7QUYzG3bm5BjSYA",
  instagram: "https://www.instagram.com/softh_cto/",
  telegram: "https://t.me/+380982005055",
  whatsapp: "https://wa.me/380982005055",
} as const;

export const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
  { days: ["Saturday"], opens: "10:00", closes: "18:00" },
] as const;

/** Послуги для структурованих даних (збігаються з секцією «Послуги») */
export const SEO_SERVICES = [
  "Консультація та діагностика",
  "Терапевтична та ендодонтична стоматологія",
  "Хірургічна стоматологія та імплантація",
  "Ортодонтичне лікування",
  "Дитяча стоматологія",
  "Ортопедична стоматологія",
] as const;
