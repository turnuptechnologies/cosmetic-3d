'use client';

import SpiderDetail from "../../components/service/SpiderDetail";
import { ProductDetailSection } from "../../components/ProductDetailSection";
import WhyProduct from "../../components/service/WhyProduct";
import {ProductsSection} from "../../components/ProductsSection";
import { FinalSection } from "../../components/FinalSection";

export default function ServicePage() {
  return (
    <main className="w-full bg-black overflow-x-hidden pt-20" style={{ scrollBehavior: "smooth" }}>
      <ProductDetailSection />
      <SpiderDetail />
      {/* <WhyProduct /> */}
      <ProductsSection />
      <FinalSection />
    </main>
  );
}
