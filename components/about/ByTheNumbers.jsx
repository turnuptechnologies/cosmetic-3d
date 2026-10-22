'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// "5000+" -> { number: 5000, decimals: 0, suffix: "+" }; null when the value doesn't start with a number
const parseStat = (value) => {
  const match = String(value ?? '').match(/^(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/);
  if (!match) return null;
  return {
    number: parseFloat(match[1].replace(/,/g, '')),
    decimals: (match[1].split('.')[1] || '').length,
    suffix: match[2],
  };
};

// Explicit locale so the server and the browser always produce the same text
const formatNumber = (n, decimals) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// The real value is what is rendered (server HTML, no-JS, crawlers, reduced motion).
// The count-up only runs in the browser, after the card scrolls into view.
const AnimatedNumber = ({ value }) => {
  const stat = parseStat(value);
  const [animatedValue, setAnimatedValue] = useState(null); // null = show the real value
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  const target = stat?.number;
  const decimals = stat?.decimals ?? 0;

  useEffect(() => {
    if (!isInView || reduceMotion || target === undefined) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    let frame;

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      const factor = Math.pow(10, decimals);
      setAnimatedValue(progress < 1 ? Math.floor(eased * target * factor) / factor : null);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, target, decimals]);

  if (!stat) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {formatNumber(animatedValue ?? stat.number, stat.decimals)}{stat.suffix}
    </span>
  );
};

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