import { HeroSection } from '../components/HeroSection';
import { SectionTwo } from '../components/SectionTwo';
import { SectionThree } from '../components/SectionThree';
import { ProductsSection } from '../components/ProductsSection';
import { TwoColumnSection } from '../components/TwoColumnSection';
import { FinalSection } from '../components/FinalSection';

export default function Home() {
  return (
    <main className="w-full bg-black overflow-x-hidden">
      <HeroSection />
      <SectionTwo />
      <SectionThree />
      <ProductsSection />
      <TwoColumnSection />
      <FinalSection />
    </main>
  );
}
