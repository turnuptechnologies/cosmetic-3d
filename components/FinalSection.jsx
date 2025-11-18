'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import Model from './model';

export function FinalSection() {
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

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full pointer-events-none">
        <motion.h1
          ref={h1Ref}
          className="text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black text-center select-none w-full px-4"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
          style={{
            color: 'white',
            WebkitTextFillColor: 'white',
            WebkitTextStroke: '3px white',
            lineHeight: '1.1',
          }}
        >
          <div className="flex justify-center"><span>Cosmetic</span></div>
          <div className="flex justify-center"><span>Chemist</span></div>
        </motion.h1>
      </div>

      {/* 3D MODEL */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        transition={textAnimation.transition}
      >
        <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] xl:w-[44rem] xl:h-[44rem]">
          <Canvas camera={{ position: [0, 0, 10], fov: 10 }} style={{ transform: 'rotate(8deg) scale(1.2)' }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model modelPath="/images/3d-three.glb" position={[-0.2, -0.2, -0.2]}  
            // rotation={[0, 0, 0.4]}
             />
          </Canvas>
        </div>
      </motion.div>

      {/* FOREGROUND TEXT */}
      <div className="absolute inset-0 z-30 flex items-center justify-center w-full pointer-events-none">
        <motion.h1
          className="text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black text-center select-none w-full px-4"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px white',
            lineHeight: '1.1',
          }}
        >
          <div className="flex justify-center"><span>Cosmetic</span></div>
          <div className="flex justify-center"><span>Chemist</span></div>
        </motion.h1>
      </div>

    </section>
  );
}
