'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './model';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Environment } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import { OrbitControls } from '@react-three/drei';
gsap.registerPlugin(ScrollTrigger);

export function HeroSectionAnimation({
  title = "Chemist",
  description = "Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products.",
  ctaLabel = "Start Innovating",
  title2 = "What We Do",
  description2 = "We are a leading platform that connects top-tier Cosmetic Chemists and Formulators with brands and organizations.",
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
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const modalRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);

  const scrollerRef = useContext(ScrollerContext);
  const router = useRouter();

  /* ----------------------------------
     TEXT ANIMATION
  ---------------------------------- */
  const textAnimation = {
    initial: { '--x': '50%', '--y': '50%' },
    animate: {
      '--x': ['40%', '60%', '40%'],
      '--y': ['40%', '60%', '40%'],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  };

  /* ----------------------------------
     BOTTOM CONTENT ANIMATION
  ---------------------------------- */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      bottomLeftRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }
    ).fromTo(
      bottomRightRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.5'
    );
  }, []);

  /* ----------------------------------
     MODAL SCROLL LOGIC (VISIBLE 1 & 2 ONLY)
  ---------------------------------- */
  useEffect(() => {
    if (!modalRef.current) return;

    const scroller = scrollerRef?.current || window;

    gsap.set(modalRef.current, {
      position: 'fixed',
      top: '60%',
      left: '40%',
      scale: 1,
      rotation: 320,
      xPercent: -50,
      yPercent: -50,
      width: 550,
      height: 550,
      zIndex: 30,
      opacity: 1,
    });

    // SECTION 1 → CENTER
    ScrollTrigger.create({
      trigger: section1Ref.current,
      scroller,
      start: 'top top',
      end: 'bottom top',
      onEnter: () =>
        gsap.to(modalRef.current, {
          left: '40%',
          opacity: 1,
          scale: 1,
          rotation: 320,
          duration: 1.2,
          ease: 'power3.inOut',
        }),
      onEnterBack: () =>
        gsap.to(modalRef.current, {
          left: '40%',
          opacity: 1,
          scale: 1,
          rotation: 320,
          duration: 1.2,
          ease: 'power3.inOut',
        }),
    });

    // SECTION 2 → MOVE RIGHT
    ScrollTrigger.create({
      trigger: section2Ref.current,
      scroller,
      start: 'top center',
      onEnter: () =>
        gsap.to(modalRef.current, {
          left: '70%',
          opacity: 1,
          scale: 1.1,
          rotation: 360,
          duration: 1.4,
          ease: 'power3.inOut',
        }),
      onEnterBack: () =>
        gsap.to(modalRef.current, {
          left: '75%',
          opacity: 1,
          scale: 1.1,
          rotation: 360,
          duration: 1.4,
          ease: 'power3.inOut',
        }),
    });

    // SECTION 3 → HIDE MODAL
    ScrollTrigger.create({
      trigger: section3Ref.current,
      scroller,
      start: 'top center',
      onEnter: () =>
        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 1,
          left: '100%',
          duration: 1,
          ease: 'power3.inOut',
        }),
      onEnterBack: () =>
        gsap.to(modalRef.current, {
          opacity: 1,
          scale: 1,
          left: '75%',
          duration: 1.4,
          ease: 'power3.inOut',
        }),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [scrollerRef]);

  return (
    <main className='scroll-smooth'>
      {/* ================= MODAL ================= */}
      <div ref={modalRef} >
        <Canvas camera={{ position: [15, 0, 0], fov: 20 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 8, 10]} intensity={1.8} />
          <directionalLight position={[-6, 4, 6]} intensity={1.0} />
          <directionalLight position={[0, 10, 5]} intensity={0.6} />
          <OrbitControls enableZoom={false} enablePan={false}  />
          <Environment preset="city"/>
          <Model
            modelPath="/images/OrangeSkinBottle.glb"
            scale={0.5}
            position={[0, 0.3, -0.2]}

          />
        </Canvas>
      </div>

      {/* ================= SECTION 1 ================= */}
      <section
        ref={section1Ref}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black mb-10"
      >
        <div className="relative w-full h-full">
          <video
            style={{ transform: 'rotate(90deg) scale(2.2)' }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain z-0"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-5"></div>
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center w-full pt-1 sm:pt-0">
          <motion.h1
            className="text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] font-black text-center select-none w-full px-4"
            initial={textAnimation.initial}
            animate={textAnimation.animate}
            transition={textAnimation.transition}
            style={{
              background: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'white',
              WebkitTextFillColor: 'white',
              WebkitTextStroke: '2px white',
              lineHeight: '0.9',
              letterSpacing: '-0.02em',
            }}
          >
            <div className="flex justify-center items-center">
              <span className='tracking-wide font-light'>Cosmetic</span>
            </div>
          </motion.h1>
        </div>
        <div className="absolute inset-0 z-30 flex items-center justify-center w-full pt-1 sm:pt-0">
          <motion.h1
            className="text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] font-black text-center select-none w-full px-4"
            initial={textAnimation.initial}
            animate={textAnimation.animate}
            transition={textAnimation.transition}
            style={{
              background: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1px white',
              lineHeight: '0.9',
              letterSpacing: '-0.02em',
            }}
          >
            <div className="flex justify-center items-center">
              <span className='tracking-wide font-light'>Cosmetic</span>
            </div>
          </motion.h1>
        </div>
        <div ref={bottomLeftRef} className="absolute bottom-42 sm:bottom-14 xl:bottom-8 left-4 right-4 sm:left-8 md:left-16 lg:left-24 max-w-md mx-auto sm:mx-0 space-y-4 sm:space-y-6 z-40 px-4 sm:px-0">
          <p
            className="text-xs sm:text-sm md:text-base text-white leading-relaxed text-center sm:text-left"
          >
            {description}
          </p>
          <div className="flex justify-center sm:justify-start">
            <button
              className="group flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
              onClick={() => router.push('/contact')}
            >
              <span>{ctaLabel}</span>
              <div className="bg-white rounded-full p-1 inline-flex items-center justify-center shadow">
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 z-10"
                  fill="none"
                  stroke="#ff4f7a"
                  viewBox="0 0 24 24"
                  style={{ rotate: -35 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </div>
            </button>
          </div>
        </div>

        <div ref={bottomRightRef} className="absolute bottom-16 right-6 z-30">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-light tracking-wide text-center sm:text-right"
          >
            {title}
          </h2>
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section
  ref={section2Ref}
        className=" flex h-screen w-full items-center px-16 bg-black text-white "
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 justify-between items-center w-full ">
          <div>
            <h2 className="text-5xl font-black mb-6">{title2}</h2>
            <p className="text-[16px] text-gray-300">{description2}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
                    {index === 4 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                    {index === 5 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          <div
          
            className="h-screen bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: "url('/images/11.png')" }}
          />
        </div>

      </section>

      {/* ================= SECTION 3 (MODEL HIDDEN) ================= */}
      <section
        ref={section3Ref}
        className=" flex items-center justify-center bg-white text-black"
      >
      </section>
    </main>
  );
}
