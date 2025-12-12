'use client';

import { useEffect, useRef, useContext } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';

export function TwoColumnSection() {
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center  bg-black text-white overflow-hidden snap-start">
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-6xl mx-auto w-full py-16">
        <div ref={leftColRef} className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold">
            Brands
          </h2>
          <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
            Using our comprehensive Cosmetic Chemistry Directory,
            you can browse the best chemists at no cost.
          </p>
          <div className="space-y-3 text-gray-200">
            <p>Access to elite cosmetic chemists</p>
            <p>Free directory browsing</p>
            <p>Tailored matching based on your needs</p>
          </div>
          <button
            className="flex items-center mx-auto gap-2 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg"
          >
            Explore Directory <ArrowUpRight size={18} />
          </button>
        </div>
        <div ref={rightColRef} className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold">
            Cosmetic Chemists
          </h2>
          <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
            Gain access to a network of innovative companies looking 
            to collaborate with <br /> you.
          </p>
          <div className="space-y-3 text-gray-200">
            <p>Connect with leading brands</p>
            <p>Showcase your expertise</p>
            <p>Access exclusive resource libraries</p>
          </div>
          <button
            className="flex items-center mx-auto gap-2 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg"
          >
            Join Our Network <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
