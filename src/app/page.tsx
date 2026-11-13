import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Process from "@/components/Process";
import DumpsterRental from "@/components/DumpsterRental";
import ServiceAreas from "@/components/ServiceAreas";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <About />
      <Process />
      <DumpsterRental />
      <ServiceAreas />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
