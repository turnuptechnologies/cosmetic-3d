'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from './model';

export function SectionThree() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center px-8 md:px-16 lg:px-24"
      style={{ backgroundImage: "url('/images/background2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
        {/* Left 3D Model */}
        <motion.div 
          className="h-full w-full flex items-center justify-center lg:order-first"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model modelPath="/images/3d-two.glb" position={[-2, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          className="space-y-6 text-white lg:order-last"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black leading-tight"
            variants={itemVariants}
          >
            Experience the Difference
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300"
            variants={itemVariants}
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </motion.p>
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
