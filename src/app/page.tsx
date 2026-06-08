import Hero from '@/components/Hero';
import BrandValues from '@/components/BrandValues';
import FeaturedProducts from '@/components/FeaturedProducts';
import HaloEffectSection from '@/components/HaloEffectSection';
import ComparisonTool from '@/components/ComparisonTool';
import WhySection from '@/components/WhySection';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <BrandValues />
      <FeaturedProducts />
      <HaloEffectSection />
      <ComparisonTool />
      <WhySection />
      <HowItWorks />
      <FAQ />
      <CtaBanner />
    </>
  );
}

