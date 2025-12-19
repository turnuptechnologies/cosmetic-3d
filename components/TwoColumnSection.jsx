'use client';

import { useEffect, useRef, useContext } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';

export function TwoColumnSection({
  leftColumnData = {
    title: "Brands",
    description: "Using our comprehensive Cosmetic Chemistry Directory, you can browse the best chemists at no cost.",
    points: [
      "Access to elite cosmetic chemists",
      "Free directory browsing",
      "Tailored matching based on your needs"
    ],
    cta: {
      url: "/ExploreDirectory",
      label: "Explore Directory"
    }
  },
  rightColumnData = {
    title: "Cosmetic Chemists",
    description: "Gain access to a network of innovative companies looking to collaborate with you.",
    points: [
      "Connect with leading brands",
      "Showcase your expertise",
      "Access exclusive resource libraries"
    ],
    cta: {
      url: "/JoinOurNetwork",
      label: "Join Our Network"
    }
  }
}) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    if (!scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const animateColumn = (colRef) => {
      gsap.fromTo(
        colRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: colRef.current,
            scroller: scrollerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    };

    animateColumn(leftColRef);
    animateColumn(rightColRef);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf('*');
    };
  }, [scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-black text-white overflow-hidden snap-start"
    >
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-6xl mx-auto w-full py-16">
        {/* Left Column */}
        <div ref={leftColRef} className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold">{leftColumnData.title}</h2>
          <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
            {leftColumnData.description}
          </p>
          <div className="space-y-3 text-gray-200">
            {leftColumnData.points.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
          <a href={leftColumnData.cta.url}>
            <button className="flex items-center mx-auto gap-2 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg">
              {leftColumnData.cta.label} <ArrowUpRight size={18} />
            </button>
          </a>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold">{rightColumnData.title}</h2>
          <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
            {rightColumnData.description}
          </p>
          <div className="space-y-3 text-gray-200">
            {rightColumnData.points.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
          <a href={rightColumnData.cta.url}>
            <button className="flex items-center mx-auto gap-2 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg">
              {rightColumnData.cta.label} <ArrowUpRight size={18} />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
