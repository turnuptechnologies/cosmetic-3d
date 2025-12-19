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

export default function Home() {
  const mainRef = useRef(null);
  useSnapScroll(mainRef);

  const { data: pageData, loading } = useGetService(
    "/pages/4?depth=2&draft=false&locale=undefined&trash=false"
  );

  const extractTextFromRichText = (richText) => {
    if (!richText?.root?.children) return "";

    return richText.root.children
      .flatMap(node => node.children || [])
      .map(child => child.text)
      .filter(Boolean)
      .join(" ");
  };
  const hero = pageData?.hero;

  const heroHeading =
    hero?.richText?.root?.children
      ?.find(node => node.type === "heading")
      ?.children?.[0]?.text || "";

  const heroDescription =
    hero?.richText?.root?.children
      ?.find(node => node.type === "paragraph" && node.children.length > 0)
      ?.children?.[0]?.text || "";

  const heroImage = {
    url: hero?.media?.url,
    alt: hero?.media?.alt,
  };

  const heroCTA = hero?.links?.[0]?.link?.label;
  const layoutBlocks = pageData?.layout ?? [];
  const whatWeDoBlock = layoutBlocks.find(
    block => block.blockType === "content" && block.columns?.length === 1
  );

  const whatWeDoRichText = whatWeDoBlock?.columns?.[0]?.richText;

  const whatWeDoTitle =
    whatWeDoRichText?.root?.children?.find(c => c.type === "heading")
      ?.children?.find(c => c.type === "text")?.text || "";

  const whatWeDoDescription =
    whatWeDoRichText?.root?.children?.find(c => c.type === "paragraph")
      ?.children?.[0]?.text || "";

  const whatWeDoFeatures =
    whatWeDoRichText?.root?.children
      ?.reduce((acc, node, index, arr) => {
        if (node.type === "heading" && node.tag === "h4") {
          const descriptionNode = arr[index + 1];
          acc.push({
            title: node.children?.[0]?.text,
            description: descriptionNode?.children?.[0]?.text,
          });
        }
        return acc;
      }, []) || [];
  const oneStopBlock = layoutBlocks.find(
    block => block.columns?.[0]?.size === "oneThird"
  );
  const extractOneStopHeading = (richText) => {
    const headingNode = richText?.children?.find(
      node => node.type === "heading"
    );

    if (!headingNode?.children) {
      return {
        title: "",
        highlightedTitle: "",
        subtitle: "",
      };
    }

    const normalTexts = [];
    let highlightedTitle = "";

    headingNode.children.forEach(child => {
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
      title,
      highlightedTitle: highlightedTitle.trim(),
      subtitle,
    };
  };

  const oneStopText = oneStopBlock?.columns?.[0]?.richText;
  const oneStopDescription = extractTextFromRichText(oneStopText);


  const oneStopCTA = oneStopBlock?.link;
  const brandsChemistsBlock = layoutBlocks.find(
    block => block?.columns?.length === 2
  );

  const [brandsCol, chemistsCol] = brandsChemistsBlock?.columns || [];


  const brandsData = brandsCol && {
    title: brandsCol.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "Default Title", // Extracting title from <h2>
    // description: brandsCol.richText?.root?.children?.find(child => child.tag === "p")?.children[0]?.text || "Default Description", // Extracting description
    points: brandsCol.richText?.root?.children
      .filter(child => child.type === "paragraph")
      .map(child => child.children[0]?.text) || ["Default point 1", "Default point 2"], // Extracting points
    cta: brandsCol.link || { url: "/ExploreDirectory", label: "Explore Directory" }, // Extracting CTA
  };

  // Extracting chemists data
  const chemistsData = chemistsCol && {
    title: chemistsCol.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "Default Title", // Extracting title from <h2>
    // description: chemistsCol.richText?.root?.children?.find(child => child.tag === "p")?.children[0]?.text || "Default Description", // Extracting description
    points: chemistsCol.richText?.root?.children
      .filter(child => child.type === "paragraph")
      .map(child => child.children[0]?.text) || ["Default point 1", "Default point 2"], // Extracting points
    cta: chemistsCol.link || { url: "/JoinOurNetwork", label: "Join Our Network" }, // Extracting CTA
  };

  if (loading) {
    return <Loader />
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
