'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FlaskConical, Lightbulb } from 'lucide-react';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';

export function SectionTwo({
  title = "What We Do",
  description = "We are a leading platform that connects top-tier Cosmetic Chemists and Formulators with brands and organizations. Our mission is to elevate your product offerings by pairing you with the best in the industry.",
  features = [
    {
      title: "Expert Network",
      description: "Access to industry-leading professionals",
    },
    {
      title: "Regulatory Expertise",
      description: "Assisting in the quality and regulatory areas",
    },
    {
      title: "Innovation Focus",
      description: "Driving product excellence through chemistry",
    },
    {
      title: "Passionate Team",
      description: "Our team thrives on helping your brand explode",
    },
  ],
}) {
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
      className="relative flex items-center justify-center px-12 md:px-16 snap-start"
    // style={{
    //   backgroundImage: "url('/images/11.png')",
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    // }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl">
        {/* Left Content */}
        <div ref={leftContentRef} className="space-y-8 text-white">
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight font-brooklyn ">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            {description}
          </p>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="p-2 rounded-full text-[#CBFF00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Expert Network</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Access to industry-leading professionals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="p-2 rounded-full text-[#CBFF00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Regulatory Expertise</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Assisting in the quality and regulatory areas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="p-2 rounded-full text-[#CBFF00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Innovation Focus</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Driving product excellence through chemistry
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="p-2 rounded-full text-[#CBFF00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Passionate Team</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Our team thrives on helping your brand explode
                </p>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg hover:bg-gray-750 transition-colors"
              >
                <div className="p-2 rounded-full text-[#CBFF00]">
                 
                  {index === 0 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content (3D Model) */}
        <div
          ref={rightContentRef}
          className="w-full flex items-center justify-center h-[500px] md:h-[650px] lg:h-[800px]"
          style={{
            backgroundImage: "url('/images/11.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* <Canvas camera={{ position: [0, 0, 15], fov: 22 }}>
            <ambientLight intensity={0.55} />

            <directionalLight
              position={[6, 6, 12]}
              intensity={2.0}
              castShadow={true}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />

            <directionalLight
              position={[-6, 2, 10]}
              intensity={1.0}
              castShadow={false}
            />

            <directionalLight
              position={[0, -3, -10]}
              intensity={1.4}
              color={"#ffffff"}
            />

            <directionalLight
              position={[0, 10, 5]}
              intensity={0.8}
              castShadow={false}
            />

            <hemisphereLight
              skyColor={"#ffffff"}
              groundColor={"#666666"}
              intensity={0.5}
            />

            <Model
              scale={1.3}
              modelPath="/images/shampoo.glb"
              position={[0.5, 0, 0]}
              rotation={[0, 0.4, 0]}
            />
            <OrbitControls enableZoom={false} />
          </Canvas> */}
          <Canvas
            camera={{ position: [0, 2, 10], fov: 35 }} // slightly up & back
            style={{ width: '100%', height: '100%', marginLeft: 85 }}
          >
            <ambientLight intensity={0.55} />

            <directionalLight
              position={[6, 6, 12]}
              intensity={2.0}
              castShadow={true}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />

            <directionalLight
              position={[-6, 2, 10]}
              intensity={1.0}
              castShadow={false}
            />

            <directionalLight
              position={[0, -3, -10]}
              intensity={1.4}
              color="#ffffff"
            />

            <directionalLight
              position={[0, 10, 5]}
              intensity={0.8}
              castShadow={false}
            />

            <hemisphereLight
              skyColor="#ffffff"
              groundColor="#666666"
              intensity={0.5}
            />

            <Model
              scale={1.3}
              modelPath="/images/Purple_Shampoo.glb"
              position={[0, 0, 0]}
              rotation={[0, 0.4, 0]}
            />

            <OrbitControls
              enableZoom={false}
              target={[0, 0, 0]}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
            />
          </Canvas>

        </div>
      </div>
    </section>
  );
}
