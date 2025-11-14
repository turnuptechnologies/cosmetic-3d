import ProductCard from './ProductCard'

const products = [
  {
    productName: 'Radiant Serum',
    description: 'A silky serum that boosts luminosity and evens skin tone.',
    modelPath: '/3D-Modals-GLB/3d-two.glb',
    modelScale: 1.2,
    modelPosition: [0, -1, 0],
  },
  {
    productName: 'Velvet Lipstick',
    description: 'Rich, creamy color with a long-lasting, comfortable wear.',
    modelPath: '/3D-Modals-GLB/3d-three.glb',
    modelScale: 1.5,
    modelPosition: [0, -0.8, 0],
  },
  {
    productName: 'Glow Foundation',
    description: 'A lightweight foundation for a natural, dewy finish.',
    modelPath: '/3D-Modals-GLB/3d-four.glb',
    modelScale: 1.3,
    modelPosition: [0, -1.2, 0],
  },
]

export default function FeaturedProducts() {
  return (
    <section id="products" className="py-20 bg-brand-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">
            Featured Collection
          </h2>
          <p className="mt-4 text-lg text-brand-dark/80">
            Crafted with care, designed for you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.productName} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}