"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"


export default function AnimatedSection({ section, index, swapLayout = false }) {
    const ref = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const isInView = useInView(ref, { 
        once: true, 
        margin: "-30% 0px -30% 0px",
        amount: 0.3
    })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true)
        }
    }, [isInView, hasAnimated])
    
    const shouldAnimate = isInView || hasAnimated

    return (
        <div
            ref={ref}
            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Vertical timeline divider */}            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent bg-gray-600" />


            {/* Timeline dots */}
            <motion.div
                className="absolute left-1/2 top-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                    backgroundColor: section.color,
                    border: '2px solid black',
                    boxShadow: `
      0 0 10px ${section.color},
      0 0 20px ${section.color}40,
      0 0 30px ${section.color}20
    `
                }}
            />

            <div className="relative w-full h-full flex items-center">
                <div
                    className={`container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${swapLayout ? "md:[direction:rtl]" : ""}`}
                >
                    {/* Left side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: swapLayout ? 100 : -100 }}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: swapLayout ? 100 : -100 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="order-2 md:order-1 text-white md:[direction:ltr] bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 max-w-lg mx-auto"
                    >
                        <motion.div
                            className="relative w-28 h-28 mb-4 overflow-hidden rounded-lg"
                            initial={{ scale: 0, rotate: -20 }}
                            animate={shouldAnimate ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {section.image ? (
                                <Image
                                    src={section.image}
                                    alt={section.title || 'Section image'}
                                    fill
                                    className="object-cover"
                                    priority
                                    style={{ marginLeft: "-24px" }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl">
                                    {section.icon}
                                </div>
                            )}
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {section.title}
                        </motion.h2>

                        <motion.h3
                            className="text-sm font-semibold tracking-widest mb-3 uppercase"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ color: section.color }}
                        >
                            {section.subtitle}
                        </motion.h3>


                        <motion.p
                            className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {section.description}
                        </motion.p>

                        {/* Underline accent */}
                        <motion.div
                            className="mt-8 h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={shouldAnimate ? { width: 64 } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                    </motion.div>

                    {/* Right side - Large number */}
                    <motion.div
                        initial={{ opacity: 0, x: swapLayout ? -100 : 100 }}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: swapLayout ? -100 : 100 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="order-1 md:order-2 flex items-center justify-center md:[direction:ltr]"
                    >
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        >
                            {/* Animated background circle */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-3xl"
                                animate={shouldAnimate ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            />

                            {/* Number */}
                            <div className="text-9xl md:text-[250px] font-bold text-transparent bg-clip-text
                                        bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#e5e5e5]">
                                {section.number}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
