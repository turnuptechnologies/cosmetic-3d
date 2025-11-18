'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from './model';

const products = [
  {
    name: 'Aura Serum',
    description: 'A revitalizing serum for a youthful glow.',
    modelPath: '/images/3d-one.glb',
  },
  {
    name: 'Bloom Elixir',
    description: 'Nourishes and hydrates for a fresh look.',
    modelPath: '/images/3d-two.glb',
  },
  {
    name: 'Crystal Cream',
    description: 'Smooths and refines skin texture.',
    modelPath: '/images/3d-three.glb',
  },
  {
    name: 'Dawn Moisturizer',
    description: 'Locks in moisture for all-day hydration.',
    modelPath: '/images/3d-four.glb',
  },
];

export function ProductsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-gray-900 text-white">
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-black mb-4"
          variants={itemVariants}
        >
          Our Innovative Collection
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-400"
          variants={itemVariants}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {products.map((product, index) => (
          <motion.div 
            key={index}
            className="bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="h-48 w-full mb-4">
              <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Model modelPath={product.modelPath} position={[-2, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
                <OrbitControls enableZoom={false} autoRotate />
              </Canvas>
            </div>
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-400">{product.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
