'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Extract numeric value and suffix
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, '');

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;
    const endValue = numericValue;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Ease-out function
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOutProgress * (endValue - startValue) + startValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    value: '30+',
    title: 'Years Combined Experience',
    description: 'Decades of industry expertise'
  },
  {
    value: '500+',
    title: 'Products Formulated',
    description: 'Innovative formulations created'
  },
  {
    value: '100+',
    title: 'Expert Chemists',
    description: 'In our curated network'
  },
  {
    value: '50+',
    title: 'Partner Brands',
    description: 'From indie to global leaders'
  },
  {
    value: '250K',
    title: 'Document Library',
    description: 'Comprehensive resources'
  },
  {
    value: '100%',
    title: 'Regulatory Compliance',
    description: 'Global standards met'
  }
];

export default function ByTheNumbers({ stats, heading, paragraph }) {
  return (
    <section className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{heading}</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {paragraph}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_100%)] p-6 md:p-8 rounded-xl border border-[#FFFFFF0D] shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-pink-500 mb-2 text-center">
                <AnimatedNumber value={stat.value} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">
                {stat.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}