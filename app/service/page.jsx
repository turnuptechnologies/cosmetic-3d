'use client';

import SpiderDetail from "../../components/service/SpiderDetail";
import { ProductDetailSection } from "../../components/ProductDetailSection";
import WhyProduct from "../../components/service/WhyProduct";
import { ProductsSection } from "../../components/ProductsSection";
import { FinalSection } from "../../components/FinalSection";

export default function ServicePage() {
  const sectionOne = {
    title: "Skincare, Personal Care, Hair Care",
    description: "At CosmeticChemist.com, we’re not your average lab coat brigade. We're the rogue cosmetic chemists rewriting the rules of beauty science—pushing boundaries with formulations that disrupt, innovate, and dominate. As premier cosmetic chemists and a full-spectrum cosmetic formulator, we blend artistry with hardcore R&D to birth products that don’t just sell; they ignite obsessions.",
    tags: [
      "Creams",
      "Lotions",
      "Anti-Aging",
      "Balms",
      "Face Masks",
      "Cleansers",
      "Scrubs",
      "Gels",
      "Serums",
      "Body Wash",
      "Deodorant",
      "Shampoo",
      "Conditioner",
      "Hair Mask",
      "Hair Serum",
      "Hair Oils",
      "Lip balms",
      "and more"
    ],
    statement: "The global skincare market is expected to add another $70+ Billion in size within the next 5 years."
  }

  const sectionTwo = {
    title: "Color Cosmetics, Oral Care, OTC, Other Products",
    description: "Our edge? Unyielding expertise in custom personal care and skincare manufacturing, from zero to shelf-ready. We craft everything: luxurious serums that defy gravity, balms that heal with a bite, masks that detox like a revolution. Got a wild idea for clean, cruelty- free disruptors? Our in-house lab turns concepts into scalable realities—stable, compliant, and crave-worthy. We source premium actives, raw material perfection, and scale production without compromising the mothership.",
    tags: [
      "Toothpaste",
      "Mouth Rinse",
      "Oral Gels",
      "Liquid Lipstick",
      "Face Masks",
      "Cleansers",
      "Scrubs",
      "Gels",
      "Serums",
      "Body Wash",
      "Deodorant",
      "Shampoo",
      "Conditioner",
      "Hair Mask",
      "Hair Serum",
      "Hair Oils",
      "Lip balms",
      "and more"
    ],
    statement: "Why settle for vanilla when you can go volkanic? Partner with us for agile prototyping, regulatory wizardry, and manufacturing muscle that outpaces the pack. Whether indie brands or global giants, we amplify your vision into an innovative reality."
  }

  return (
    <main className="w-full bg-black overflow-x-hidden pt-20" style={{ scrollBehavior: "smooth" }}>
      <ProductDetailSection side="right" model="1" content={sectionOne}/>
      <ProductDetailSection side="left" model="4" content={sectionTwo}/>
      <SpiderDetail />
      <WhyProduct />
      <ProductsSection />
      <FinalSection />
    </main>
  );
}
