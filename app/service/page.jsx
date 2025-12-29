'use client';

import SpiderDetail from "../../components/service/SpiderDetail";
import { ProductDetailSection, ProductDetailSectiontwo } from "../../components/ProductDetailSection";
import WhyProduct from "../../components/service/WhyProduct";
import { ProductsSection } from "../../components/ProductsSection";
import { FinalSection } from "../../components/FinalSection";
import Footer from "../../components/Footer";
import { useGetService } from "../../lib/getService";
import Loader from "../../components/Loader";

export default function ServicePage() {
  const { data: pageData, loading } = useGetService(
    "/pages/10?depth=2&draft=false&locale=undefined&trash=false"
  );

  // ✅ Defaults (using your commented objects)
  const DEFAULTS = {
    sectionOne: {
      title: "Skincare, Personal Care, Hair Care",
      description:
        "At CosmeticChemist.com, we’re not your average lab coat brigade. We're the rogue cosmetic chemists rewriting the rules of beauty science—pushing boundaries with formulations that disrupt, innovate, and dominate. As premier cosmetic chemists and a full-spectrum cosmetic formulator, we blend artistry with hardcore R&D to birth products that don’t just sell; they ignite obsessions.",
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
        "and more",
      ],
      statement:
        "The global skincare market is expected to add another $70+ Billion in size within the next 5 years.",
    },
    sectionTwo: {
      title: "Color Cosmetics, Oral Care, OTC, Other Products",
      description:
        "Our edge? Unyielding expertise in custom personal care and skincare manufacturing, from zero to shelf-ready. We craft everything: luxurious serums that defy gravity, balms that heal with a bite, masks that detox like a revolution. Got a wild idea for clean, cruelty- free disruptors? Our in-house lab turns concepts into scalable realities—stable, compliant, and crave-worthy. We source premium actives, raw material perfection, and scale production without compromising the mothership.",
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
        "and more",
      ],
      statement:
        "Why settle for vanilla when you can go volkanic? Partner with us for agile prototyping, regulatory wizardry, and manufacturing muscle that outpaces the pack. Whether indie brands or global giants, we amplify your vision into an innovative reality.",
    },
    processSteps: [
      {
        stepNumber: "One",
        stepTitle: "Step One",
        stepDescription: "Default step description.",
      },
      {
        stepNumber: "Two",
        stepTitle: "Step Two",
        stepDescription: "Default step description.",
      },
      {
        stepNumber: "Three",
        stepTitle: "Step Three",
        stepDescription: "Default step description.",
      },
    ],
  };

  const layoutData = pageData?.layout || [];

  // Function to extract the heading and paragraph content from the layout
  const extractSectionData = (section, fallback) => {
    const richTextData = section?.columns?.[0]?.richText?.root?.children || [];

    const title =
      richTextData?.find((child) => child.tag === "h2")?.children?.[0]?.text ||
      fallback?.title ||
      "";

    const description =
      richTextData?.find((child) => child.type === "paragraph")?.children?.[0]
        ?.text ||
      fallback?.description ||
      "";

    // Extracting tags (assuming they're in paragraphs with format 8)
    const tags =
      richTextData?.flatMap((child) =>
        (child?.children || [])
          .filter((c) => c.format === 8)
          .map((c) => c.text)
      ) || [];

    const finalTags = tags.length ? tags : fallback?.tags || [];

    const statement =
      richTextData?.find(
        (child) => child.type === "paragraph" && child.textFormat === 2
      )?.children?.[0]?.text ||
      fallback?.statement ||
      "";

    return { title, description, tags: finalTags, statement };
  };

  // Extract the data dynamically for section 1 and section 2
  const sectionOneData = layoutData[0] || {};
  const sectionTwoData = layoutData[1] || {};
  const processSection = layoutData[2]?.columns || [];
  const whyChooseUsSection = layoutData[3] || {};

  // Extracted data (✅ fallback to defaults)
  const sectionOne = extractSectionData(sectionOneData, DEFAULTS.sectionOne);
  const sectionTwo = extractSectionData(sectionTwoData, DEFAULTS.sectionTwo);

  const processData = processSection.map((col) => col?.richText?.root?.children || []);

  // Mapping through the process steps
  const processStepsFromApi = processData?.flatMap((children) => {
    const steps = [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tag === "h3") {
        const stepNumber = child.children?.[1]?.text || "";
        const stepTitle = child.children?.[0]?.text || "";
        const stepDescription = children[i + 1]?.children?.[0]?.text || "";

        steps.push({
          stepNumber,
          stepTitle,
          stepDescription,
        });
      }
    }
    return steps;
  });

  const processSteps =
    processStepsFromApi?.length ? processStepsFromApi : DEFAULTS.processSteps;

  // Log data to check structure
  console.log("Section One Data:", whyChooseUsSection);

  if (loading) {
    return <Loader />;
  }

  // ...rest of your component render (use sectionOne, sectionTwo, processSteps)

  return (
    <main className="w-full bg-black overflow-x-hidden h-screen overflow-scroll no-scrollbar pt-20" style={{ scrollBehavior: "smooth" }}>
      <ProductDetailSection side="right" content={sectionOne} />
      <ProductDetailSectiontwo side="left" content={sectionTwo} />
      <SpiderDetail processSteps={processSteps} />
      <WhyProduct whyChooseUsSection={whyChooseUsSection} />
      <ProductsSection />
      <FinalSection />
      <Footer />
    </main>
  );
}
