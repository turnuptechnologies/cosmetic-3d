'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from './model';

export function FinalSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Model in the center */}
      <div className="absolute z-10 w-full h-full flex items-center justify-center">
        <motion.div
          className="w-64 h-64 md:w-96 md:h-96"
        >
          <Canvas>
            <Stage environment="city" intensity={0.6}>
              <Model modelPath="/images/3d-three.glb" />
            </Stage>
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </motion.div>
      </div>

      {/* Inverted Text */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mix-blend-difference text-center select-none flex justify-between">
          <span>&lt;</span>
          <span>Cosmetic</span>
          <span>Chemist</span>
          <span>&gt;</span>
        </h2>
      </div>
    </section>
  );
}
