'use client'

import dynamic from 'next/dynamic'

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center">Loading 3D model...</div>,
})

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-tight">
            Elegance in Every Drop
          </h1>
          <p className="mt-4 text-lg text-brand-dark/80">
            Discover Aura Cosmetics, where nature's finest ingredients meet modern science to create skincare that illuminates your natural beauty.
          </p>
          <div className="mt-8">
            <a
              href="#products"
              className="inline-block bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-brand-pink-dark transition-transform duration-300 transform hover:scale-105"
            >
              Explore Products
            </a>
          </div>
        </div>

        {/* 3D Model */}
        <div className="w-full h-[400px] md:h-[600px]">
          <ModelViewer modelPath="/3D-Modals-GLB/3d-one.glb" scale={1.5} position={[0, -1.5, 0]} />
        </div>
      </div>
    </section>
  )
}