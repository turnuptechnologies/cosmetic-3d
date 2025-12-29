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

gsap.registerPlugin(ScrollTrigger);

export function HeroSectionAnimation({
  title = "Chemist",
  description2 = "Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products.",
  ctaLabel = "Start Innovating",
  title2 = "What We Do",
  description22 = "We are a leading platform that connects top-tier Cosmetic Chemists and Formulators with brands and organizations.",
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
      top: '50%',
      left: '50%',
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
          left: '50%',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }),
      onEnterBack: () =>
        gsap.to(modalRef.current, {
          left: '50%',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }),
    });

    // SECTION 2 → MOVE RIGHT
    ScrollTrigger.create({
      trigger: section2Ref.current,
      scroller,
      start: 'top center',
      onEnter: () =>
        gsap.to(modalRef.current, {
          left: '75%',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }),
      onEnterBack: () =>
        gsap.to(modalRef.current, {
          left: '75%',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
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
          scale: 0.9,
          duration: 0.6,
          ease: 'power2.out',
        }),
      onEnterBack: () =>
        gsap.to(modalRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        }),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [scrollerRef]);

  return (
    <main>
      {/* ================= MODAL ================= */}
      <div ref={modalRef} className="pointer-events-none">
        <Canvas camera={{ position: [15, 0, 0], fov: 20 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 8, 10]} intensity={1.8} />
          <directionalLight position={[-6, 4, 6]} intensity={1.0} />
          <directionalLight position={[0, 10, 5]} intensity={0.6} />
          <Model
            modelPath="/images/SilverVerticalTube.compressed.glb"
            scale={3}
            position={[0, 0.3, -0.2]}
            rotation={[0, 0.4, 0.4]}
          />
        </Canvas>
      </div>

      {/* ================= SECTION 1 ================= */}
      <section
        ref={section1Ref}
        className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
      >
        <motion.h1
          className="text-[10rem] font-black text-white z-20"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
        >
          Cosmetic
        </motion.h1>

        <div ref={bottomLeftRef} className="absolute bottom-16 left-6 z-30">
          <p className="text-gray-300 max-w-md">{description2}</p>
          <button
            onClick={() => router.push('/contact')}
            className="mt-4 px-6 py-3 rounded-full bg-pink-600 text-white"
          >
            {ctaLabel}
          </button>
        </div>

        <div ref={bottomRightRef} className="absolute bottom-16 right-6 z-30">
          <h2 className="text-4xl text-white font-black">{title2}</h2>
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section
        ref={section2Ref}
        className="h-screen flex items-center px-16 bg-black text-white"
      >
        <div className="grid grid-cols-2 gap-24 max-w-7xl mx-auto">
          <div>
            <h2 className="text-5xl font-black mb-6">{title2}</h2>
            <p className="text-xl text-gray-300">{description22}</p>
          </div>
          <div
            className="h-[600px] bg-no-repeat bg-center bg-contain"
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
