'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './model';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function HeroSection(
  {
    title = "Chemist",
    description = "Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products.",
    ctaLabel = "Start Innovating",
    // ctaHref = "/",
    // backgroundVideoSrc = "/videos/hero-bg.mp4",
    // modelPath = "/images/Pink_Conditioner.glb",
  }
) {
  const [modelScale, setModelScale] = useState(1.4);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);

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
        ease: 'easeOut',
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

  // Handle responsive model scale
  useEffect(() => {
    const handleResize = () => {
      setModelScale(window.innerWidth < 768 ? 2.8 : 1.4);
    };

    // Set initial scale
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden bg-black mb-10">
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
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        transition={textAnimation.transition}
      >
        <div className="w-[16rem] h-[26rem] md:w-[22rem] md:h-[36rem] lg:w-[28rem] lg:h-[44rem] xl:w-[34rem] xl:h-[54rem]">
          <Canvas
            style={{ transform: 'rotate(-10deg) scale(1.2)' }}
            shadows
            camera={{ position: [0, 0, 25], fov: 22 }}
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

            {/* <Model scale={modelScale} modelPath="/images/Pink_Conditioner.glb" position={[-1.2, 1.2, 0]} rotation={[0, 0.4, 0]} /> */}
            <Model
              scale={modelScale}
              modelPath="/images/Pink_Conditioner.glb"
              position={[-1.2, 1.2, 0]}
              rotation={[0, 0.4, 0]}
            />
          </Canvas>

        </div>
      </motion.div>
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
      <div
        ref={bottomLeftRef}
        className="absolute bottom-42 sm:bottom-14 xl:bottom-8 left-4 right-4 sm:left-8 md:left-16 lg:left-24 max-w-md mx-auto sm:mx-0 space-y-4 sm:space-y-6 z-40 px-4 sm:px-0"
      >
        <p
          className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed text-center sm:text-left"
        >
          {description}
        </p>
        <div className="flex justify-center sm:justify-start">
          <button
            className="group flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <span>{ctaLabel}</span>
            <motion.svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </button>
        </div>
      </div>
      <div ref={bottomRightRef} className="absolute bottom-88 sm:bottom-24 right-4 sm:right-8 md:right-10 lg:right-20 z-40">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-light tracking-wide text-center sm:text-right"
        >
          {title}
        </h2>
      </div>
    </section>
  );
}
