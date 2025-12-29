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
import { useGetService } from '../lib/getService';
import Loader from '../components/Loader';
import { extractPlainText, joinParagraphChildren } from '../lib/sanitizeText';

export default function Home() {
  const mainRef = useRef(null);
  useSnapScroll(mainRef);

  const { data: pageData, loading } = useGetService(
    "/pages/4?depth=2&draft=false&locale=undefined&trash=false"
  );

  // ✅ Default values (only used when API data is missing)
  const DEFAULTS = {
    heroHeading: "Default Hero Heading",
    heroDescription: "Default hero description goes here.",
    heroImage: { url: "/images/placeholder.jpg", alt: "Hero image" },
    heroCTALabel: "Learn More",
    heroCTAUrl: "/",

    whatWeDoTitle: "What We Do",
    whatWeDoDescription: "Default description for what we do.",
    whatWeDoFeatures: [
      { title: "Default Feature 1", description: "Default feature description." },
      { title: "Default Feature 2", description: "Default feature description." },
    ],

    oneStopHeading: {
      title: "One Stop",
      highlightedTitle: "Solution",
      subtitle: "Default subtitle here.",
    },
    oneStopDescription: "Default one stop description goes here.",
    oneStopCTA: { url: "/get-started", label: "Get Started" },

    brands: {
      title: "For Brands",
      points: ["Default point 1", "Default point 2"],
      cta: { url: "/ExploreDirectory", label: "Explore Directory" },
    },
    chemists: {
      title: "For Chemists",
      points: ["Default point 1", "Default point 2"],
      cta: { url: "/JoinOurNetwork", label: "Join Our Network" },
    },
  };

  const extractTextFromRichText = (richText) => {
    if (!richText?.root?.children) return "";
    return extractPlainText(richText, ["paragraph"]);
  };

  const hero = pageData?.hero;

  const heroHeading =
    hero?.richText?.root?.children
      ?.find((node) => node.type === "heading")
      ?.children?.[0]?.text || DEFAULTS.heroHeading;

  const heroDescription =
    extractPlainText(hero?.richText, ["paragraph"]) || DEFAULTS.heroDescription;

  const heroImage = {
    url: hero?.media?.url || DEFAULTS.heroImage.url,
    alt: hero?.media?.alt || DEFAULTS.heroImage.alt,
  };

  const heroCTA =
    hero?.links?.[0]?.link?.label || DEFAULTS.heroCTALabel;

  // (optional but helpful if you use it somewhere)
  const heroCTAUrl =
    hero?.links?.[0]?.link?.url || DEFAULTS.heroCTAUrl;

  const layoutBlocks = pageData?.layout ?? [];

  const whatWeDoBlock = layoutBlocks.find(
    (block) => block.blockType === "content" && block.columns?.length === 1
  );

  const whatWeDoRichText = whatWeDoBlock?.columns?.[0]?.richText;

  const whatWeDoTitle =
    whatWeDoRichText?.root?.children
      ?.find((c) => c.type === "heading")
      ?.children?.find((c) => c.type === "text")?.text || DEFAULTS.whatWeDoTitle;

  const whatWeDoDescription =
    joinParagraphChildren(
      whatWeDoRichText?.root?.children?.find((c) => c.type === "paragraph")
        ?.children
    ) || DEFAULTS.whatWeDoDescription;

  const whatWeDoFeatures =
    (whatWeDoRichText?.root?.children ?? []).reduce((acc, node, index, arr) => {
      if (
        node.type === "heading" &&
        (node.tag === "h4" || node.tag === "h3")
      ) {
        const descriptionNode = arr[index + 1];
        const title = node.children?.[0]?.text || "";
        const description = joinParagraphChildren(descriptionNode?.children) || "";

        // keep logic same, just ensure fallback happens at the end
        acc.push({
          title: title || "Default Feature",
          description: description || "Default feature description.",
        });
      }
      return acc;
    }, []) || [];

  const finalWhatWeDoFeatures =
    whatWeDoFeatures.length ? whatWeDoFeatures : DEFAULTS.whatWeDoFeatures;

  const oneStopBlock = layoutBlocks.find(
    (block) => block.columns?.[0]?.size === "oneThird"
  );

  const extractOneStopHeading = (richText) => {
    const headingNode = richText?.children?.find((node) => node.type === "heading");

    if (!headingNode?.children) {
      return DEFAULTS.oneStopHeading; // ✅ default instead of empty strings
    }

    const normalTexts = [];
    let highlightedTitle = "";

    headingNode.children.forEach((child) => {
      if (child.type !== "text") return;

      // format === 3 → highlighted (bold/emphasis)
      if (child.format === 3) {
        highlightedTitle += child.text;
      } else {
        normalTexts.push(child.text);
      }
    });

    const title = normalTexts[0]?.trim() ?? "";
    const subtitle = normalTexts.slice(1).join("").trim();

    return {
      title: title || DEFAULTS.oneStopHeading.title,
      highlightedTitle: highlightedTitle.trim() || DEFAULTS.oneStopHeading.highlightedTitle,
      subtitle: subtitle || DEFAULTS.oneStopHeading.subtitle,
    };
  };

  const oneStopText = oneStopBlock?.columns?.[0]?.richText;
  const oneStopDescription =
    extractTextFromRichText(oneStopText) || DEFAULTS.oneStopDescription;

  const oneStopCTA = oneStopBlock?.link || DEFAULTS.oneStopCTA;

  const brandsChemistsBlock = layoutBlocks.find((block) => block?.columns?.length === 2);
  const [brandsCol, chemistsCol] = brandsChemistsBlock?.columns || [];

  // ✅ safer arrays + true fallbacks (no logic removed)
  const brandsChildren = brandsCol?.richText?.root?.children ?? [];
  const chemistsChildren = chemistsCol?.richText?.root?.children ?? [];

  const brandPoints = brandsChildren
    .filter((child) => child.type === "paragraph")
    .map((child) => child.children?.[0]?.text)
    .filter(Boolean);

  const chemistPoints = chemistsChildren
    .filter((child) => child.type === "paragraph")
    .map((child) => child.children?.[0]?.text)
    .filter(Boolean);

  const brandsData =
    brandsCol && {
      title:
        brandsChildren.find((child) => child.tag === "h2")?.children?.[0]?.text ||
        DEFAULTS.brands.title,
      points: brandPoints.length ? brandPoints : DEFAULTS.brands.points,
      cta: brandsCol.link || DEFAULTS.brands.cta,
    };

  const chemistsData =
    chemistsCol && {
      title:
        chemistsChildren.find((child) => child.tag === "h2")?.children?.[0]?.text ||
        DEFAULTS.chemists.title,
      points: chemistPoints.length ? chemistPoints : DEFAULTS.chemists.points,
      cta: chemistsCol.link || DEFAULTS.chemists.cta,
    };

  if (loading) {
    return <Loader />;
  }


  return (
    <ScrollerContext.Provider value={mainRef}>
      <main ref={mainRef} className="w-full bg-black overflow-x-hidden h-screen overflow-scroll no-scrollbar">
        <HeroSection
          title={heroHeading}
          description={heroDescription}
          ctaLabel={heroCTA}
        />

        <SectionTwo
          title={whatWeDoTitle}
          description={whatWeDoDescription}
          features={whatWeDoFeatures}
        />
        <SectionThree
          {...extractOneStopHeading(oneStopText?.root)}
          description={oneStopDescription} />
        <ProductsSection />



        <TwoColumnSection
          leftColumnData={brandsData}
          rightColumnData={chemistsData}
        />
        {/* <BrandsChemistsSection /> */}
        <ContactSection />
        <FinalSection />
        <Footer />
      </main>
    </ScrollerContext.Provider>
  );
}
