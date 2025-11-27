'use client';

import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <motion.div 
      className="relative w-full max-w-4xl mx-auto my-20 px-8 py-12 md:py-16 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl p-[1px] border-[1px] border-pink-500" style={{
        background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
        zIndex: -1
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="text-center">
        <motion.h2 
          className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join the elite cadre shaping the future.
        </motion.h2>
        
        <motion.div 
          className="text-pink-500 text-xl md:text-2xl font-medium mb-3 md:mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          CosmeticChemist.com
        </motion.div>
        
        <motion.p 
          className="text-gray-300 text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Where chemistry meets destiny.
        </motion.p>
      </div>
    </motion.div>
  );
}
