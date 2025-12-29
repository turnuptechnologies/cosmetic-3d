"use client"
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import AnimatedSection from "../../components/about/AnimatedSection";
import CallToAction from "../../components/about/CallToAction";
import ProductShowcase from "../../components/about/ProductShowcase";
import ByTheNumbers from "../../components/about/ByTheNumbers";
import { ContactSection } from "../../components/ContactSection";
import { FinalSection } from "../../components/FinalSection";
import Footer from "../../components/Footer";
import { useGetService } from "../../lib/getService";
import Loader from "../../components/Loader";
import { extractPlainText } from "../../lib/sanitizeText";

export default function AboutPage() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const { data: pageData, loading } = useGetService(
    "/pages/8?depth=2&draft=false&locale=undefined&trash=false"
  );

  const extractTextFromRichText = (richText) => {
    if (!richText?.root?.children) return "";
    return extractPlainText(richText, ['paragraph'])
    // .flatMap(node => node.children || [])
    // .map(child => child.text)
    // .filter(Boolean)
    // .join(" ");
  };
  const pageTitle = pageData?.title || "Default Title";

  // Extract hero section
  const heroSection = pageData?.hero?.richText?.root?.children || [];
  const heroTitle = heroSection.find(child => child.tag === "h1")?.children[0]?.text || "Default Hero Title";
  const heroDescription = heroSection.find(child => child.type === "paragraph")?.children[0]?.text || "Default Hero Description";

  // Extract layout blocks
  const layoutBlocks = pageData?.layout?.[0]?.columns || [];

  // Helper function to extract block data (title, subtitle, description, and image)
  const extractBlockData = (col) => {
    // const columns = block?.columns || [];
    // return columns.map(col => {
    const columnTitle = col.richText?.root?.children.find(child => child.tag === "h2")?.children[0]?.text || "Default Column Title";
    const columnSubtitle = extractPlainText(col.richText, ['heading']).replace(columnTitle, '')
    //  col.richText?.root?.children.find(child => child.tag === "h4")?.children[0]?.text || "Default Column Subtitle";
    const columnDescription = extractTextFromRichText(col.richText)
      //  col.richText?.root?.children.find(child => child.type === "paragraph")?.children[0]?.text
      || "Default Column Description";
    const image = "/images/default-image.png"; // Set default or dynamically extract from data if available
    return { columnTitle, columnSubtitle, columnDescription, image };
    // });
  };
  const sections = layoutBlocks?.map((block, index) => {

    const blockTitle = block.blockName || `Section ${index + 1}`;
    const blockData = extractBlockData(block);

    return {
      number: (`0${index + 1}`).slice(-2), // Dynamically create section number (e.g., "01", "02", etc.)
      title: blockData?.columnTitle || blockTitle,
      subtitle: blockData?.columnSubtitle || "Default Subtitle",
      description: blockData?.columnDescription || "Default Description",
      icon: "✨", // You can dynamically assign icons based on the section (or leave it static)
      image: blockData?.image || "/images/default-image.png", // Use extracted image or fallback to default
      color: "#FF4D8A" // Default color, you can add logic to dynamically assign colors
    };
  });
  const layoutBlocksCTASection = pageData?.layout?.[1]?.columns || [];

  // Extract the required data for CallToAction
  const heading = extractPlainText(layoutBlocksCTASection[0]?.richText, ['heading'])
    //  layoutBlocksCTASection[0]?.richText?.root?.children?.find(child => child.tag === "h4")?.children[0]?.text 
    || "Join the elite casre shaping the future."; // Default value if not found
  const brandLink = layoutBlocksCTASection[0]?.richText?.root?.children?.find(child => child.type === "link")?.fields?.url || "https://CosmeticChemist.com"; // Default URL if not found
  const brandName = layoutBlocksCTASection[0]?.richText?.root?.children?.find(child => child.type === "link")?.children[0]?.text || "CosmeticChemist.com"; // Default brand name if not found
  const tagline = extractPlainText(layoutBlocksCTASection[0]?.richText, ['paragraph'])
    //  layoutBlocksCTASection[0]?.richText?.root?.children?.find(child => child.type === "paragraph" && child.children[0]?.text === "Where chemistry meets destiny.")?.children[0]?.text 
    || "Where chemistry meets destiny."; // Default tagline if not found

  const layoutBlocksExcellenceSection = pageData?.layout?.[2]?.columns || [];
  const excellenceHeading = extractPlainText(layoutBlocksExcellenceSection[0]?.richText, ['heading'])
    //  layoutBlocksExcellenceSection[0]?.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text 
    || "Cosmetic Chemistry Excellence";
  const excellenceParagraph = extractPlainText(layoutBlocksExcellenceSection[0]?.richText, ['paragraph'])
    // layoutBlocksExcellenceSection[0]?.richText?.root?.children?.find(child => child.type === "paragraph")?.children[0]?.text 
    || "Elevate your beauty brand with our cutting-edge cosmetic chemistry lab, mastering formulations across skincare, hair care, oral care, cosmetics, personal care, and beyond. We craft innovative, safe, sustainable solutions from concept sketches to market-ready masterpieces.";


  const imageSides = ["left", "right", "left", "right"];
  const layoutBlocksProductSection = pageData?.layout?.[3]?.columns || [];

  const productShowcaseData = [
    {
      label: layoutBlocksProductSection[0]?.richText?.root?.children?.find(child => child.tag === "h4")?.children[0]?.text || "Default Label",
      title: layoutBlocksProductSection[0]?.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "Default Title",
      description: layoutBlocksProductSection[0]?.richText?.root?.children?.find(child => child.type === "paragraph")?.children[0]?.text || "Default Description",
      modalPath: '/images/Pink_Rose_Facial_Cream.glb',
      modalScale: layoutBlocksProductSection[0]?.modalScale || 2.8,
      modalPosition: layoutBlocksProductSection[0]?.modalPosition || [0, 0, 0],
      imageSide: imageSides[0]
    },
    {
      label: layoutBlocksProductSection[1]?.richText?.root?.children?.find(child => child.tag === "h4")?.children[0]?.text || "Default Label",
      title: layoutBlocksProductSection[1]?.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "Default Title",
      description: layoutBlocksProductSection[1]?.richText?.root?.children?.find(child => child.type === "paragraph")?.children[0]?.text || "Default Description",
      modalPath: '/images/Pink_Conditioner.glb',
      modalScale: layoutBlocksProductSection[1]?.modalScale || 2.4,
      // modalPosition: layoutBlocksProductSection[1]?.modalPosition || [0, 1, 0],
      imageSide: imageSides[1]
    },
    {
      label: layoutBlocksProductSection[2]?.richText?.root?.children?.find(child => child.tag === "h4")?.children[0]?.text || "Default Label",
      title: layoutBlocksProductSection[2]?.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "Default Title",
      description: layoutBlocksProductSection[2]?.richText?.root?.children?.find(child => child.type === "paragraph")?.children[0]?.text || "Default Description",
      modalPath: '/images/ras.glb',
      modalScale: layoutBlocksProductSection[2]?.modalScale || 2.4,
      // modalPosition: layoutBlocksProductSection[2]?.modalPosition || [0, 1, 0],
      imageSide: imageSides[2]
    },
    {
      label: layoutBlocksProductSection[3]?.richText?.root?.children?.find(child => child.tag === "h4")?.children[0]?.text || "Default Label",
      title: layoutBlocksProductSection[3]?.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "Default Title",
      description: layoutBlocksProductSection[3]?.richText?.root?.children?.find(child => child.type === "paragraph")?.children[0]?.text || "Default Description",
      modalPath: '/images/VerticalWhiteTube.glb',
      modalScale: layoutBlocksProductSection[3]?.modalScale || 4.2,
      modalPosition: layoutBlocksProductSection[3]?.modalPosition || [0, 0, 0],
      imageSide: imageSides[3],
      rotation: [0, 0, 0]
    }
  ];
  const layoutBlocksNumbersHeading = pageData?.layout?.[4]?.columns || [];
  const layoutBlockByNumberHeading = layoutBlocksNumbersHeading[0]?.richText?.root?.children?.find(child => child.tag === "h2")?.children[0]?.text || "By the Numbers";
  const layoutBlockByNumberParagraph = layoutBlocksNumbersHeading[0]?.richText?.root?.children?.find(child => child.type === "paragraph")?.children[0]?.text || "Our track record speaks volumes. These numbers represent our commitment to excellence and innovation in cosmetic chemistry.";


  const layoutBlocksNumbersSection = pageData?.layout?.[5]?.columns || [];

  // ✅ Defaults (used only when a stat field is missing)
  const DEFAULT_STATS = [
    { value: "0", title: "Default Title", description: "Default description." },
    { value: "0", title: "Default Title", description: "Default description." },
    { value: "0", title: "Default Title", description: "Default description." },
  ];

  const stats = (layoutBlocksNumbersSection.length ? layoutBlocksNumbersSection : DEFAULT_STATS).map(
    (block, index) => {
      const isDefaultObject = typeof block?.value !== "undefined";

      const value =
        (isDefaultObject
          ? block.value
          : block?.richText?.root?.children?.find((child) => child.tag === "h2")?.children?.[0]?.text) ||
        DEFAULT_STATS[index]?.value ||
        "0";

      const title =
        (isDefaultObject
          ? block.title
          : block?.richText?.root?.children?.find((child) => child.tag === "h3")?.children?.[0]?.text) ||
        DEFAULT_STATS[index]?.title ||
        "Default Title";

      const description =
        (isDefaultObject
          ? block.description
          : block?.richText?.root?.children?.find((child) => child.type === "paragraph")?.children?.[0]?.text) ||
        DEFAULT_STATS[index]?.description ||
        "Default description.";

      return { value, title, description };
    }
  );


  if (loading) {
    return <Loader />
  }

  return (
    <div ref={containerRef} className="w-full bg-black overflow-x-hidden h-screen overflow-scroll no-scrollbar pt-20 min-h-screen">
      <div className="text-white text-center my-8 md:my-16 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-[84px] font-[600] leading-tight mb-2 md:mb-4">{heroTitle}</h1>
        <p className="text-[#FFFFFFCC] text-base md:text-lg font-[400] max-w-3xl mx-auto">{heroDescription}</p>
      </div>
      {sections.map((section, index) => (
        <AnimatedSection
          key={index}
          section={section}
          index={index}
          isActive={activeSection === index}
          swapLayout={index % 2 === 1}
        />
      ))}
      <CallToAction
        heading={heading}
        brandLink={brandLink}
        brandName={brandName}
        tagline={tagline}
      />
      <motion.div
        className='text-center mb-16 md:mb-24 px-4 md:px-0'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className='text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-4 md:mb-6 leading-tight'>
          {excellenceHeading}
        </h2>
        <p className='text-gray-300 text-base md:text-lg max-w-4xl mx-auto leading-relaxed'>
          {excellenceParagraph}
        </p>
      </motion.div>

      {productShowcaseData.map((product, index) => (
        <ProductShowcase
          key={index}
          imageSide={product.imageSide}
          label={product.label}
          title={product.title}
          modal={product.modalPath}
          modalPosition={product.modalPosition}
          modalScale={product.modalScale}
          description={product.description}
          rotation={product?.rotation}
        />
      ))}
      <ByTheNumbers heading={layoutBlockByNumberHeading} paragraph={layoutBlockByNumberParagraph} stats={stats} />
      <ContactSection />
      <FinalSection />
      <Footer />
    </div>
  )
}
