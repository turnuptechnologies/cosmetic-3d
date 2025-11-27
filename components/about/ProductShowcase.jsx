'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';
import gsap from 'gsap';

export default function ProductShowcase({imageSide = 'left', label, title, description, modal, modalScale}) {
    return (
        <section className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col lg:flex-row items-center ${imageSide === 'left' ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Left side - Product Image */}
                    <motion.div
                        className="w-full lg:w-1/2 relative z-10 mb-12 lg:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full max-w-md mx-auto h-[400px] lg:h-[500px]">
                            <Canvas
                                style={{ transform: 'rotate(-10deg) scale(1.2)' }}
                                shadows
                                camera={{ position: [0, 0, 25], fov: 22 }}
                            >
                                {/* Soft overall environmental light */}
                                <ambientLight intensity={0.55} />

                                {/* Key Light — main highlight */}
                                <directionalLight
                                    position={[6, 6, 12]}
                                    intensity={2.0}
                                    castShadow={true}
                                    shadow-mapSize-width={2048}
                                    shadow-mapSize-height={2048}
                                />

                                {/* Fill Light — softens shadows on left */}
                                <directionalLight
                                    position={[-6, 2, 10]}
                                    intensity={1.0}
                                    castShadow={false}
                                />

                                {/* Rim Light — adds beautiful outline */}
                                <directionalLight
                                    position={[0, -3, -10]}
                                    intensity={1.4}
                                    color={"#ffffff"}
                                />

                                {/* Soft top light for premium shine */}
                                <directionalLight
                                    position={[0, 10, 5]}
                                    intensity={0.8}
                                    castShadow={false}
                                />

                                {/* Hemisphere for gentle color blend */}
                                <hemisphereLight
                                    skyColor={"#ffffff"}
                                    groundColor={"#666666"}
                                    intensity={0.5}
                                />

                                <Model scale={modalScale} modelPath={`/images/3d-${modal}.glb`} position={[-1.6, 9 / 7, -0.2]} />
                            </Canvas>
                        </div>
                    </motion.div>

                    {/* Right side - Content */}
                    <div className="w-full lg:w-1/2 lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-pink-500 text-sm font-semibold tracking-widest uppercase mb-4">
                                {label}
                            </h3>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {title}
                            </h2>
                            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl">
                                {description}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300"
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mix-blend-overlay filter blur-3xl"></div>
            </div> */}
        </section>
    );
}
