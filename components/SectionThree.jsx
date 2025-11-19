'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SectionThree() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
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
  }, []);

  return (
    <section ref={sectionRef} className="relative my-10 h-screen w-full flex items-center justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Full-size background image aligned to the left */}
      <img
        src="/images/35.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-contain object-left"
      />
      
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
        {/* Left 3D Model */}
        <div 
          ref={leftContentRef}
          className="h-full w-full flex items-center justify-center lg:order-first"
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 10 }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model modelPath="/images/3d-two.glb" position={[0.1, 0, 0]} />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </div>

        {/* Right Content */}
        <div 
          ref={rightContentRef}
          className="space-y-6 text-white lg:order-last text-right"
        >
          <h2 
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Why Choose Us
          </h2>
          <p 
            className="text-lg text-gray-300"
          >
            At CosmeticChemist.com, we bridge the gap between innovative brands and expert cosmetic chemists. With a vast network of highly skilled formulators, we ensure that your products are developed with the latest scientific advancements and adhere to the highest industry standards.
          </p>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          >
            Join Our Network
          </button>
        </div>
      </div>
    </section>
  );
}
