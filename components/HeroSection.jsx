'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './model';
import gsap from 'gsap';
import { motion } from 'framer-motion'; // Keep for continuous animation

export function HeroSection() {
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

  return (
    <section className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden bg-black mb-10">
      <video
       style={{ transform: 'rotate(90deg) scale(1.2)' }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain z-0 opacity-100  blur-[5px]"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full">
        <motion.h1
          className="text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] font-black text-center select-none w-full px-4"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
          style={{
            background: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'white',
            WebkitTextFillColor: 'white',
            WebkitTextStroke: '3px white',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
          }}
        >
          <div className="flex justify-center items-center">
            <span>Cosmetic</span>
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
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[2, 2, 5]}
              intensity={2.2}
              castShadow
            />
            <pointLight position={[10, 10, 10]} intensity={0.7} />
            <Model modelPath="/images/3d-one.glb" position={[-1.6, 9/7, -0.2]} />
          </Canvas>
        </div>
      </motion.div>
      <div className="absolute inset-0 z-30 flex items-center justify-center w-full">
        <motion.h1
          className="text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] font-black text-center select-none w-full px-4"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
          style={{
            background: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '2px white',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
          }}
        >
          <div className="flex justify-center items-center">
            <span>Cosmetic</span>
          </div>
        </motion.h1>
      </div>
      <div
        ref={bottomLeftRef}
        className="absolute bottom-12 left-8 md:left-16 lg:left-24 max-w-md space-y-6 z-40"
      >
        <p
          className="text-sm md:text-base text-gray-300 leading-relaxed"
        >
          Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products
        </p>
        <button
          className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
        >
          <span>Join the Innovation</span>
          <motion.svg
            className="w-5 h-5"
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
      <div ref={bottomRightRef} className="absolute bottom-12 right-8 md:right-16 lg:right-24 z-40">
        <h2
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white"
        >
          Chemist
        </h2>
      </div>
    </section>
  );
}
