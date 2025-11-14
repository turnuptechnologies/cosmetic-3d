'use client'

import dynamic from 'next/dynamic'

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-t-xl">Loading...</div>,
})

export default function ProductCard({ productName, description, modelPath, modelScale = 1, modelPosition = [0, 0, 0] }) {
  return (
    <div className="bg-brand-light rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="w-full h-64">
        <ModelViewer modelPath={modelPath} scale={modelScale} position={modelPosition} />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-serif font-bold text-brand-dark">{productName}</h3>
        <p className="mt-2 text-brand-dark/70">{description}</p>
        <button className="mt-4 bg-transparent border border-brand-pink text-brand-pink font-bold py-2 px-6 rounded-full hover:bg-brand-pink hover:text-white transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  )
}