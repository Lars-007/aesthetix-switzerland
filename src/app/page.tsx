import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import StatsBanner from '@/components/StatsBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import HaloEffectSection from '@/components/HaloEffectSection';
import BeforeAfterCompare from '@/components/BeforeAfterCompare';
import WhySection from '@/components/WhySection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatsBanner />
      <FeaturedProducts />
      <HaloEffectSection />
      <BeforeAfterCompare />
      <WhySection />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}
