'use client'

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import Link from 'next/link';
import Model from '../components/model';
import { products } from '../lib/products';

const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out',
    });
  }, [index]);

  return (
    <Link href={`/products/${product.slug}`}>
      <div ref={cardRef} className="group cursor-pointer">
        <div className="relative min-h-[48px] md:min-h-[120px] lg:min-h-[150px] rounded-2xl overflow-hidden bg-black  hover:border-white/30 transition-all duration-300">

          {/* 3D Model Canvas */}
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="w-full h-full">
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, 10]} intensity={0.5} />
            <Model modelPath={product.modelPath} />
            <OrbitControls 
              autoRotate
              autoRotateSpeed={2}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI * 0.75}
            />
          </Canvas>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Info */}
        <div className="mt-6 space-y-2">
          <h3 className="text-white font-semibold text-lg md:text-xl group-hover:text-pink-400 transition">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm">{product.volume}</p>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <main className="w-full bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center pt-24 md:pt-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white">
              Cosmetic Chemistry
            </h1>
            <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover our premium collection of scientifically formulated skincare products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-20 md:py-32 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Our Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
