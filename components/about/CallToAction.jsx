'use client';

import { motion } from 'framer-motion';

export default function CallToAction({
  heading,
  brandName,
  tagline,
 brandLink
}) {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto my-20 px-8 py-12 md:py-16 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full">
        <div
          className="w-full  rounded-3xl border-2 border-transparent bg-gradient-to-b from-black to-black p-8 relative shadow-2xl"
          style={{
            backgroundImage: "linear-gradient(black, black), linear-gradient(135deg, #ec4899, #f43f5e)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(244, 63, 94, 0.3)",
          }}
        >
          <div className="text-center space-y-4">
            {/* Main heading */}
            <h1 className="text-white text-2xl font-light leading-relaxed">{heading}</h1>

            {/* Brand name with gradient effect */}
            <p
              className="text-lg font-medium"
              style={{
                background: "linear-gradient(135deg, #ec4899, #f43f5e)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {brandName}

            </p>

            {/* Tagline */}
            <p className="text-gray-300 text-sm font-light">{tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
