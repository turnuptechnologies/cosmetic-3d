"use client"
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import AnimatedSection from "../../components/about/AnimatedSection";
import CallToAction from "../../components/about/CallToAction";
import ProductShowcase from "../../components/about/ProductShowcase";

const sections = [
  {
    number: "01",
    title: "The Foundation",
    subtitle: "OVER THREE DECADES OF MASTERY",
    description:
      "At CosmeticChemist.com, we stand as the unparalleled vanguard of cosmetic innovation and scientific network and directory that redefines excellence in the global cosmetics landscape. Founded with over three decades of unsurpassable expertise in contract manufacturing, product development, quality & regulatory, and cosmetic formulation, our platform is not merely a resource, it is the indispensable nexus for trailblazers who demand precision, innovation, and supremacy.",
    icon: "✨",
  },
  {
    number: "02",
    title: "The Expertise",
    subtitle: "FULL SPECTRUM MASTERY",
    description:
      "Our founders's illustrious careers span the full spectrum of cosmetic and drug mastery, pioneering R&D that births groundbreaking actives, orchestrating seamless manufacturing and operations at scale, and infusing creative branding with an artist's touch. From the laboratory to the marketplace, from regulatory frameworks to SEO, we have engineered this digital citadel to command every whisper of inquiry in cosmetic chemistry, fueling the world's foremost intellects and aspirations straight to our threshold.",
    icon: "🧪",
  },
  {
    number: "03",
    title: "The Revolution",
    subtitle: "REDEFINING STANDARDS",
    description:
      "We are not just a service provider, we are architects of transformation. Our cutting-edge technology platform combines artificial intelligence with human expertise to deliver unprecedented solutions in the cosmetic and pharmaceutical industries.",
    icon: "🚀",
  },
  {
    number: "04",
    title: "The Future",
    subtitle: "TOMORROW STARTS HERE",
    description:
      "As we look ahead, we remain committed to pushing the boundaries of what's possible. Our vision extends beyond today's challenges to shape the cosmetic industry's future with innovation, integrity, and excellence.",
    icon: "🌟",
  },
]

export default function AboutPage() {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleWheel = (e) => {
      // Allow default scroll behavior
      return;
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeSection, isScrolling])

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden pt-20" style={{ scrollBehavior: "smooth" }}>
      <div className="text-white text-center my-8 md:my-16 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-[84px] font-[600] leading-tight mb-2 md:mb-4">Our Story</h1>
        <p className="text-[#FFFFFFCC] text-base md:text-lg font-[400] max-w-3xl mx-auto">A legacy built on innovation, expertise, and an unwavering commitment to excellence</p>
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
      <CallToAction />
      <motion.div
        className='text-center mb-16 md:mb-24 px-4 md:px-0'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className='text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-4 md:mb-6 leading-tight'>
          Cosmetic Chemistry Excellence
        </h2>
        <p className='text-gray-300 text-base md:text-lg max-w-4xl mx-auto leading-relaxed'>
          Elevate your beauty brand with our cutting-edge cosmetic chemistry lab, mastering formulations across skincare, hair care, oral care, cosmetics, personal care, and beyond. We craft innovative, safe, sustainable solutions from concept sketches to market-ready masterpieces.
        </p>
      </motion.div>
      <ProductShowcase />
    </div>
  )
}
