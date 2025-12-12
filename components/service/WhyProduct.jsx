// components/service/WhyProduct.jsx
'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';
import Image from 'next/image';

const WhyProduct = () => {
  const features = [
    {
      path: "/images/clinic.png",
      title: "Clinically Proven",
      description: "Tested in independent laboratories with documented results showing 40% reduction in fine lines."
    },
    {
      path: "/images/leaf.png",
      title: "Natural Ingredients",
      description: "100% natural peptides and botanical extracts, free from parabens and sulfates."
    },
    {
      path: "/images/clock.png",
      title: "Fast Results",
      description: "Visible improvements in skin texture and firmness within the first week of use."
    }
  ];

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
        </div>

        {/* Right side - 3D Model */}
        <div className="w-full flex justify-center relative h-96">
          <div className="relative w-full h-full center">
            <Canvas
              style={{ width: '100%', height: '100%' }}
              shadows
              camera={{ position: [0, 0, 25], fov: 30 }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 5, 8]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight
                position={[-5, 5, -8]}
                intensity={0.5}
                color="#00a8ff"
              />
              <hemisphereLight
                skyColor="#ffffff"
                groundColor="#666666"
                intensity={0.5}
              />
              <Model
                scale={8.8}
                modelPath={"/images/etraux.glb"}
                position={[0, -1, 0]}
                rotation={[0, 0.5, 0]}
              />
            </Canvas>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Features */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {features.map((feature, index) => (
              <div key={index} className='gap-6'>
                <div className='flex justify-center'>
                  <div className="text-center">
                    <Image src={feature.path} alt="feature" width={24} height={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl text-center font-bold text-white my-6">{feature.title}</h3>
                  <p className="text-gray-300 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyProduct;