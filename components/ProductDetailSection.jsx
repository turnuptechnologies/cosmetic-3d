'use client';
import { Canvas } from '@react-three/fiber';
import Model from '../components/model';
import { useRef } from 'react';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';

function JarModel() {
    const jarRef = useRef();

    return (
        <group ref={jarRef} rotation={[0.2, 0.5, 0]}>
            {/* Jar Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[1, 1, 2, 32]} />
                <meshStandardMaterial
                    color="#333"
                    metalness={0.3}
                    roughness={0.2}
                />
            </mesh>

            {/* Jar Lid */}
            <mesh position={[0, 1.6, 0]} castShadow>
                <cylinderGeometry args={[1.1, 1.1, 0.2, 32]} />
                <meshStandardMaterial
                    color="#a0c4e4"
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>

            {/* Label */}
            <mesh position={[0, 0.5, 1.02]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1.8, 1.2]} />
                <meshBasicMaterial side={THREE.DoubleSide}>
                    <canvasTexture
                        attach="map"
                        args={[256, 256, { format: THREE.RGBAFormat }]}
                        onUpdate={(canvas) => {
                            const ctx = canvas.getContext('2d');
                            ctx.fillStyle = 'transparent';
                            ctx.fillRect(0, 0, 256, 256);
                            ctx.fillStyle = 'white';
                            ctx.font = '20px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText('QLEAR', 128, 50);
                            ctx.font = '12px Arial';
                            ctx.fillText('SUPER CELL DEEP', 128, 80);
                            ctx.fillText('MOISTURIZING', 128, 100);
                            ctx.fillText('HYDRATION CREAM', 128, 120);
                        }}
                    />
                </meshBasicMaterial>
            </mesh>
        </group>
    );
}

export function ProductDetailSection({ side, model, content }) {
    const stats = [
        { value: '40%', label: 'Reduction in fine lines' },
        { value: '65%', label: 'Improved skin firmness' },
        { value: '78%', label: 'Enhanced hydration' }
    ];

    return (
        <section className="w-full min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div
                    className={`
    flex flex-col-reverse lg:flex-row 
    gap-12 items-center
    ${side === "left" ? "lg:flex-row-reverse" : ""}
  `}
                >
                    {/* Left Column - Text Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#FFFFFF]">{content?.title}</h1>
                            {/* <p className="text-gray-400 mb-6">1.5 FL OZ</p> */}
                            <p className="text-[#FFFFFF] text-[14px] font-normal leading-relaxed mb-8">
                                {content?.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            {content?.tags.map((item, index) => (
                                <span
                                    key={index}
                                    className="text-sm rounded-lg transition-all duration-300 relative overflow-hidden group inline-block"
                                >
                                    <span className="relative">
                                        {item}
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#e90077] transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </span>
                            ))}
                        </div>
                        <p className="text-[#FFFFFF] text-[14px] font-normal leading-relaxed mb-8">
                            {content?.statement}
                        </p>
                        {/* <div className="mt-12">
                            <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">Clinical Study Results</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="p-6 rounded-lg text-center">
                                        <p className="text-3xl font-bold  mb-2">{stat.value}</p>
                                        <p className="text-sm text-gray-300">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    {/* Right Column - 3D Model */}
                    <motion.div
                        className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
                        initial={{ x: side === 'right' ? 200 : -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 15,
                            duration: 0.5
                        }}
                    >
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

                            <Model scale={2.4} modelPath={`/images/conditioner.glb`} position={[-1.6, 9 / 7, -0.2]} />
                        </Canvas>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function ProductDetailSectiontwo({ side, model, content }) {
    const stats = [
        { value: '40%', label: 'Reduction in fine lines' },
        { value: '65%', label: 'Improved skin firmness' },
        { value: '78%', label: 'Enhanced hydration' }
    ];

    return (
        <section className="w-full min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col lg:flex-row gap-12 items-center 
                               ${side === "left" ? "flex-col-reverse lg:flex-row-reverse" : ""}`}
                >
                    {/* Left Column - Text Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#FFFFFF]">{content?.title}</h1>
                            {/* <p className="text-gray-400 mb-6">1.5 FL OZ</p> */}
                            <p className="text-[#FFFFFF] text-[14px] font-normal leading-relaxed mb-8">
                                {content?.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            {content?.tags.map((item, index) => (
                              <span
                                    key={index}
                                    className="text-sm rounded-lg transition-all duration-300 relative overflow-hidden group inline-block"
                                >
                                    <span className="relative">
                                        {item}
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#e90077] transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </span>
                            ))}
                        </div>
                        <p className="text-[#FFFFFF] text-[14px] font-normal leading-relaxed mb-8">
                            {content?.statement}
                        </p>
                        {/* <div className="mt-12">
                            <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">Clinical Study Results</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="p-6 rounded-lg text-center">
                                        <p className="text-3xl font-bold  mb-2">{stat.value}</p>
                                        <p className="text-sm text-gray-300">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    {/* Right Column - 3D Model */}
                    <motion.div
                        className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
                        initial={{ x: side === 'right' ? 200 : -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 15,
                            duration: 0.5
                        }}
                    >
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

                            <Model scale={2.4} modelPath={`/images/shampoo.glb`} position={[-1.6, 9 / 7, -0.2]} />
                        </Canvas>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
