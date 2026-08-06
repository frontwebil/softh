import { Advantages } from "@/Components/Advantages/Advantages";
import { AboutBanner } from "@/Components/Banners/AboutBanner";
import { ComfortBanner } from "@/Components/Banners/ComfortBanner";
import { Contacts } from "@/Components/Contacts/Contacts";
import { Footer } from "@/Components/Footer/Footer";
import { Faq } from "@/Components/Faq/Faq";
import { Header } from "@/Components/Header/Header";
import { Hero } from "@/Components/Hero/Hero";
import { Price } from "@/Components/Price/Price";
import { Request } from "@/Components/Request/Request";
import { Services } from "@/Components/Services/Services";
import { Steps } from "@/Components/Steps/Steps";
import { Testimonials } from "@/Components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Advantages />
      <Request />
      <Services />
      <AboutBanner />
      <Price />
      <ComfortBanner />
      <Steps />
      <Testimonials />
      <Contacts />
      <Faq />
      <Footer />
    </>
  );
}
