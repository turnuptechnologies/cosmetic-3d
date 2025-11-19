'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../lib/products.js'

export function ProductsSection() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const grid = gridRef.current
    if (!grid) return

    // Select only the content we want animated (NOT the arch)
    const cards = grid.querySelectorAll('.product-card')
    cards.forEach((card) => {
      const content = card.querySelector('.product-content')
      // Guard in case structure changes
      if (!content) return

      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            // play once when entering viewport
            toggleActions: 'play none none none',
            // improve performance
            invalidateOnRefresh: true,
          },
        }
      )
    })

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
      gsap.killTweensOf('*')
    }
  }, [])

  return (
    <section className="py-24 px-8 my-10 md:px-16 lg:px-24 bg-black text-white ">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          Cosmetic Chemistry
        </h2>

        <p className="text-gray-400 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Product Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto overflow-visible"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card relative rounded-3xl p-8 text-center shadow-2xl cursor-pointer group overflow-visible bg-transparent"
          >
            {/* ALWAYS VISIBLE ARCH — ABOVE CARD BACKGROUND */}
            <div className="absolute inset-0 z-[1] pointer-events-none flex items-start justify-center">
              <div className="w-[90%] h-[70%] bg-gradient-to-b from-white/40 to-transparent rounded-t-full blur-[0px]" />
            </div>

            <Link href={`/products/${product.slug}`}>
              {/* CONTENT we animate (keep z higher than arch) */}
              <div className="product-content relative z-[5]">
                {/* Product Image */}
                <div className="w-full h-56 flex items-center justify-center mb-10">
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    width={240}
                    height={240}
                    className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
