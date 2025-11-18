'use client';

import { motion } from 'framer-motion';

export function TwoColumnSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {/* Left Column */}
        <motion.div 
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2 
            className="text-3xl font-bold"
            variants={itemVariants}
          >
            For Brands
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            variants={itemVariants}
          >
            Find the perfect cosmetic chemist to bring your product vision to life. Our platform connects you with top-tier talent specializing in formulation, innovation, and quality control.
          </motion.p>
          <motion.button 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Talent
          </motion.button>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ visible: { transition: { staggerChildren: 0.2, delay: 0.2 } } }}
        >
          <motion.h2 
            className="text-3xl font-bold"
            variants={itemVariants}
          >
            For Chemists
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            variants={itemVariants}
          >
            Showcase your expertise and connect with innovative brands looking for your skills. Join a community of formulators and chemists shaping the future of the cosmetic industry.
          </motion.p>
          <motion.button 
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full font-semibold"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Network
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
