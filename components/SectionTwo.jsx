'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FlaskConical, Lightbulb } from 'lucide-react';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SectionTwo() {
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
      leftContentRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }
    ).fromTo(
      rightContentRef.current,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.5' // Start this animation 0.5s before the previous one ends
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 my-10"
      style={{
        backgroundImage: "url('/images/11.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl">

        {/* LEFT CONTENT */}
        <div ref={leftContentRef} className="space-y-8 text-white">
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            What We Do
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            We are a leading platform that connects top-tier Cosmetic Chemists and Formulators 
            with brands and organizations. Our mission is to elevate your product offerings by 
            pairing you with the best in the industry.
          </p>

          {/* FEATURE LIST */}
          <div className="space-y-6">
            
            {/* Feature 01 */}
            <div className="flex items-start gap-4">
              <FlaskConical className="text-yellow-300 w-7 h-7 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Expert Network</h4>
                <p className="text-gray-400 text-sm">
                  Access to industry-leading professionals
                </p>
              </div>
            </div>

            {/* Feature 02 */}
            <div className="flex items-start gap-4">
              <Lightbulb className="text-green-400 w-7 h-7 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Innovation Focus</h4>
                <p className="text-gray-400 text-sm">
                  Driving product excellence through chemistry
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT 3D MODEL */}
        <div
          ref={rightContentRef}
          className="w-full flex items-center justify-center h-[520px] md:h-[650px] lg:h-[820px]"
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 22 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 8]} intensity={2} />
            <directionalLight position={[-4, -4, -6]} intensity={0.7} />

            <Model
              modelPath="/images/3d-one2.glb"
              scale={[1.6, 1.6, 1.6]}
              position={[0.1, 0.2, 0]}
              rotation={[0, 0.4, 0]}
            />

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
