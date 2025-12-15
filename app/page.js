'use client'; // This page needs to be a client component to use hooks

import { useRef } from 'react';
import { HeroSection } from '../components/HeroSection';
import { SectionTwo } from '../components/SectionTwo';
import { SectionThree } from '../components/SectionThree';
import { ProductsSection } from '../components/ProductsSection';
import { TwoColumnSection } from '../components/TwoColumnSection';
import { FinalSection } from '../components/FinalSection';
import { useSnapScroll } from '../lib/useSnapScroll';
import { ScrollerContext } from '../lib/ScrollerContext';
import { BrandsChemistsSection } from '../components/BrandsChemistsSection';
import { ContactSection } from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  const mainRef = useRef(null);
  useSnapScroll(mainRef);

  
  return (
    <ScrollerContext.Provider value={mainRef}>
      <main ref={mainRef} className="w-full bg-black overflow-x-hidden h-screen overflow-scroll no-scrollbar">
        <HeroSection />
        <SectionTwo />
        <SectionThree />
        <ProductsSection />
        <TwoColumnSection />
        {/* <BrandsChemistsSection /> */}
        <ContactSection />
        <FinalSection />
        <Footer />
      </main>
    </ScrollerContext.Provider>
  );
}
