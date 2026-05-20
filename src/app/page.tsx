import Hero from '@/components/Hero';
import StatsBanner from '@/components/StatsBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import HaloEffectSection from '@/components/HaloEffectSection';
import ComparisonTool from '@/components/ComparisonTool';
import WhySection from '@/components/WhySection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <FeaturedProducts />
      <HaloEffectSection />
      <ComparisonTool />
      <WhySection />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}

