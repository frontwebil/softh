import { Advantages } from "@/Components/Advantages/Advantages";
import { ComfortBanner } from "@/Components/Banners/ComfortBanner";
import { Header } from "@/Components/Header/Header";
import { Hero } from "@/Components/Hero/Hero";
import { Request } from "@/Components/Request/Request";
import { Services } from "@/Components/Services/Services";
import { Testimonials } from "@/Components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Advantages />
      <Request />
      <Services />
      <ComfortBanner />
      <Testimonials />
    </>
  );
}
