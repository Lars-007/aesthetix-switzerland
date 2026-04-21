import Hero from '@/components/Hero';
import StatsBanner from '@/components/StatsBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import HowItWorks from '@/components/HowItWorks';
import HaloEffectSection from '@/components/HaloEffectSection';
import WhySection from '@/components/WhySection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <FeaturedProducts />
      <HowItWorks />
      <HaloEffectSection />
      <WhySection />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}
