'use client';


import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from './model';


export function HeroSection() {
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
    <section className="relative z-10 h-screen w-full flex items-center justify-between px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Left Content */}
      <motion.div
        className="flex-1 max-w-2xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <div className="space-y-4">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter"
            variants={itemVariants}
          >
            <span>Cosmetic</span>
          </motion.h1>

          {/* Subtitle with outline effect */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F7A] to-[#C8FF3B] leading-tight tracking-tighter"
            variants={itemVariants}
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
            }}
          >
            Chemist
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-gray-300 max-w-md leading-relaxed"
          variants={itemVariants}
        >
          Connecting top-tier Cosmetic Chemists and Formulators with innovative brands to create exceptional products
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 glow-pulse"
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

      {/* Center 3D Model Space */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-full h-full pointer-events-none">
        <div className="w-96 h-screen flex items-center justify-center" >
           <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                {/* 3D Model in the center */}
                <div className="absolute z-10 w-full h-full flex items-center justify-center">
                  <motion.div
                    // className="w-64 h-64 md:w-96 md:h-96"
                  >
                    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                      <ambientLight intensity={1.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} />
                      <Model modelPath="/images/3d-one.glb" />
                      <OrbitControls enableZoom={false} autoRotate  />
                    </Canvas>
                  </motion.div>
                </div>
          
                {/* Inverted Text */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-8">
                  <h2 className="text-6xl md:text-9xl lg:text-9xl font-black text-white mix-blend-difference text-center select-none flex flex-col justify-between">
                
                    <span>Cosmetic</span>
                    <span>Chemist</span>
                
                  </h2>
                </div>
              </section>
        </div>
      </div>
    </section>
  );
}
