   


'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { products } from '../lib/products.js' // ✅ SAME STYLE AS PRODUCT DETAIL PAGE

export function ProductsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-black text-white mt-10">

      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-black mb-6"
          variants={itemVariants}
        >
          Cosmetic Chemistry
        </motion.h2>

        <motion.p className="text-gray-400 leading-relaxed" variants={itemVariants}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </motion.p>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="relative rounded-3xl p-8 text-center shadow-2xl cursor-pointer group"
          >
            <Link href={`/products/${product.slug}`}>
              {/* Inverted Background Arch */}
               <div className="absolute inset-0 -z-10 flex items-start justify-center">
              <div className="w-[90%] h-[70%] bg-gradient-to-b from-white/60 to-transparent rounded-t-full" />
            </div>

              {/* Product Image */}
              <div className="w-full h-56 flex items-center justify-center mb-10">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {product.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
