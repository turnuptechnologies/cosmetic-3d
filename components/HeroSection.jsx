'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import Model from './model';

export function HeroSection() {
  const h1Ref = useRef(null);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black mb-10">
      {/* Background Video */}
      <video
       style={{ transform: 'rotate(90deg) scale(1.2)' }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain z-0 opacity-40"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Background Text - White Outline */}
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full">
        <motion.h1
          ref={h1Ref}
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

      {/* 3D Model */}
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

      {/* Foreground Text Outline */}
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

      {/* Bottom Left Content */}
      <motion.div
        className="absolute bottom-12 left-8 md:left-16 lg:left-24 max-w-md space-y-6 z-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-sm md:text-base text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products
        </motion.p>

        <motion.button
          className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>

      {/* Bottom Right Chemist Text */}
      <div className="absolute bottom-12 right-8 md:right-16 lg:right-24 z-40">
        <motion.h2
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          // style={{
          //   textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
          // }}
        >
          Chemist
        </motion.h2>
      </div>
    </section>
  );
}
