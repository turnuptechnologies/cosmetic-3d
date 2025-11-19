'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function TwoColumnSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative py-24 px-6 md:px-16 my-10 lg:px-24 bg-black text-white overflow-hidden">

      {/* Bottom Gradient Fade (matches screenshot) */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-6xl mx-auto relative z-10">

        {/* LEFT COLUMN → Brands */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-6"
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-extrabold">
            Brands
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 max-w-md mx-auto leading-relaxed"
          >
            Using our comprehensive Cosmetic Chemistry Directory,
            you can browse the best chemists at no cost.
          </motion.p>

          {/* bullet-like lines */}
          <motion.div variants={fadeUp} className="space-y-3 text-gray-200">
            <p>Access to elite cosmetic chemists</p>
            <p>Free directory browsing</p>
            <p>Tailored matching based on your needs</p>
          </motion.div>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center mx-auto gap-2 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg"
          >
            Explore Directory <ArrowUpRight size={18} />
          </motion.button>
        </motion.div>

        {/* RIGHT COLUMN → Cosmetic Chemists */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-6"
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-extrabold">
            Cosmetic Chemists
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 max-w-md mx-auto leading-relaxed"
          >
            Gain access to a network of innovative companies looking 
            to collaborate with you.
          </motion.p>

          <motion.div variants={fadeUp} className="space-y-3 text-gray-200">
            <p>Connect with leading brands</p>
            <p>Showcase your expertise</p>
            <p>Access exclusive resource libraries</p>
          </motion.div>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center mx-auto gap-2 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg"
          >
            Join Our Network <ArrowUpRight size={18} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
