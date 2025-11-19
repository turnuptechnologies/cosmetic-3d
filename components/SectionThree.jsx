'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';

export function SectionThree() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    if (!scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: scrollerRef.current,
        start: 'top center',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      leftContentRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }
    ).fromTo(
      rightContentRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-12 md:px-16 lg:px-24 py-24 snap-start overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/images/35.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
        {/* Left Content - 3D Model */}
        <div
          ref={leftContentRef}
          className="w-full flex items-center justify-center h-[450px] md:h-[600px] lg:h-[750px]"
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 15 }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model modelPath="/images/3d-two.glb" position={[0, 0, 0]} />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </div>

        {/* Right Content - Text */}
        <div
          ref={rightContentRef}
          className="space-y-6 text-white text-left lg:text-right"
        >
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            At CosmeticChemist.com, we bridge the gap between innovative brands and expert cosmetic chemists. With a vast network of highly skilled formulators, we ensure that your products are developed with the latest scientific advancements and adhere to the highest industry standards.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
            Join Our Network
          </button>
        </div>
      </div>
    </section>
  );
}
