'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';
import { OrbitControls } from '@react-three/drei';

export default function ProductShowcase({ imageSide = 'left', label, title, description, modal, modalScale, modalPosition = [0, 0, 0], rotation = [0, Math.PI / 8, 0] }) {
    const scrollDown = (e) => {
        e.preventDefault();
        // Get the next section element
        const currentSection = e.target.closest('section');
        const nextSection = currentSection.nextElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // If no next section, scroll to bottom
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

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
                            {/* <Canvas
                                style={{ transform: 'rotate(-10deg) scale(1.2)' }}
                                shadows
                                camera={{ position: [0, 0, 25], fov: 22 }}
                            >
                                <ambientLight intensity={0.55} />

                                <directionalLight
                                    position={[6, 6, 12]}
                                    intensity={2.0}
                                    castShadow={true}
                                    shadow-mapSize-width={2048}
                                    shadow-mapSize-height={2048}
                                />

                                <directionalLight
                                    position={[-6, 2, 10]}
                                    intensity={1.0}
                                    castShadow={false}
                                />

                                <directionalLight
                                    position={[0, -3, -10]}
                                    intensity={1.4}
                                    color={"#ffffff"}
                                />

                                <directionalLight
                                    position={[0, 10, 5]}
                                    intensity={0.8}
                                    castShadow={false}
                                />

                                <hemisphereLight
                                    skyColor={"#ffffff"}
                                    groundColor={"#666666"}
                                    intensity={0.5}
                                />

                                <Model scale={modalScale} modelPath={modal} position={[-1.6, 9 / 7, -0.2]} />
                                <OrbitControls enableZoom={false} />
                            </Canvas> */}

                            <Canvas
                                shadows
                                camera={{ position: [0, 2, 12], fov: 35 }} // slightly up & back
                                style={{ width: '100%', height: '100%' }}  // remove CSS transform
                            >
                                {/* Ambient light */}
                                <ambientLight intensity={0.55} />

                                {/* Key directional light */}
                                <directionalLight
                                    position={[6, 6, 12]}
                                    intensity={2.0}
                                    castShadow={true}
                                    shadow-mapSize-width={2048}
                                    shadow-mapSize-height={2048}
                                />

                                {/* Fill light */}
                                <directionalLight
                                    position={[-6, 2, 10]}
                                    intensity={1.0}
                                    castShadow={false}
                                />

                                {/* Rim/back light */}
                                <directionalLight
                                    position={[0, -3, -10]}
                                    intensity={1.4}
                                    color="#ffffff"
                                />

                                {/* Top light */}
                                <directionalLight
                                    position={[0, 10, 5]}
                                    intensity={0.8}
                                    castShadow={false}
                                />

                                {/* Hemisphere light */}
                                <hemisphereLight
                                    skyColor="#ffffff"
                                    groundColor="#666666"
                                    intensity={0.5}
                                />

                                {/* Model centered */}
                                <Model
                                    scale={modalScale}          // dynamic scale
                                    modelPath={modal}           // dynamic modelPath
                                    position={modalPosition}
                                    rotation={rotation}

                                // center model
                                // rotation={[0, Math.PI / 8, 0]} // optional initial tilt
                                />

                                {/* OrbitControls */}
                                <OrbitControls
                                    enableZoom={false}
                                    target={[0, 0, 0]}
                                    maxPolarAngle={Math.PI / 2}
                                    minPolarAngle={0}
                                />
                            </Canvas>
                            {/* Arrow Button – Mobile only */}
                            <button
                                onClick={scrollDown}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 
                                           text-white animate-bounce p-3 rounded-full 
                                           bg-white/10 hover:bg-white/20 transition-all
                                           z-50 cursor-pointer touch-manipulation
                                           focus:outline-none focus:ring-2 focus:ring-white/30
                                           md:hidden"
                                aria-label="Scroll Down"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

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
                            <h3
                                style={{ color: imageSide == "right" ? "#CBFF00" : "#FF4D8A" }}
                                className="text-sm font-semibold tracking-widest uppercase mb-4">
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
