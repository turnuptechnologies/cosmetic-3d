// components/service/WhyChooseQlear.jsx
'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';

const WhyProduct = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Clinically Proven",
      description: "Our formula is backed by scientific research and clinical studies to ensure effectiveness."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Natural Ingredients",
      description: "Made with 100% natural ingredients, free from harmful chemicals and parabens."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fast Results",
      description: "See visible improvements in your skin's texture and hydration in just 7 days."
    }
  ];

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose QLEAR</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the ultimate hydration with our premium moisturizing cream
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Features */}
          <div className="w-full lg:w-1/2 space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 bg-pink-50 p-3 rounded-full group-hover:bg-pink-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Product Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl transform rotate-1 -z-10"></div>
              <div className="relative">
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

                  <Model scale={1.5} modelPath={`/images/3d-three.glb`} position={[-1.6, 9 / 7, -0.2]} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyProduct;