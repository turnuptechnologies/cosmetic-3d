"use client"
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../../components/about/AnimatedSection";

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
      <div className="text-white text-center my-16">
        <h1 className="text-[84px] font-[600]">Our Story</h1>
        <p className="text-[#FFFFFFCC] text-[18px] font-[400]">A legacy built on innovation, expertise, and an unwavering commitment to excellence</p>
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
    </div>
  )
}
