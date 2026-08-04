import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import WhyEastIndiaSection from '@/components/home/WhyEastIndiaSection';
import ProductsSection from '@/components/home/ProductsSection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhyEastIndiaSection />
      <ProductsSection />
      <ContactSection />
    </>
  );
}
