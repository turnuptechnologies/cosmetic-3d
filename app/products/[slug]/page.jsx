'use client'

import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { products } from '../../../lib/products.js'
import Model from '../../../components/model.jsx'
import IngredientLabel from '../../../components/ingredient-label.jsx'

gsap.registerPlugin(ScrollTrigger)

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
    <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6">
      <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition">
        <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm md:text-lg">C</span>
        </div>
        <div className="text-white">
          <p className="font-bold text-xs md:text-base">COSMETIC</p>
          <p className="text-[10px] md:text-xs text-white/60">CHEMIST</p>
        </div>
      </Link>
      <nav className="hidden md:flex gap-8 text-white/80 text-sm">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Service</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </nav>
      <button className="text-white/60 hover:text-white transition">
        <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
        </svg>
      </button>
    </div>
  </header>
)

export default function ProductDetailPage() {
  const params = useParams()
  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white pt-24">
        Product not found
      </div>
    )
  }

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)
  const section5Ref = useRef(null)
  const canvasContainerRef = useRef(null)
  const labelsRef = useRef(null)
  const contentLeftRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.set(canvasContainerRef.current, {
        position: 'fixed',
        left: '65%',
        top: '50%',
        width: '350px',
        height: '350px',
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        opacity: 1,
      })

      gsap.from(contentLeftRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      })

      gsap.to(canvasContainerRef.current, {
        scrollTrigger: {
          trigger: section1Ref.current,
          start: 'bottom 40%',
          end: 'bottom -100%',
          scrub: 2,
        },
        left: '50%',
        top: '35%',
        width: '300px',
        height: '300px',
      })

      gsap.to(canvasContainerRef.current, {
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top 50%',
          end: 'bottom 20%',
          scrub: 2,
        },
        left: '50%',
        top: '30%',
      })

      gsap.to(canvasContainerRef.current, {
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 2,
        },
        left: '50%',
        top: '50%',
        width: '400px',
        height: '400px',
      })

      gsap.to(labelsRef.current, {
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 2,
        },
        opacity: 1,
        pointerEvents: 'auto',
      })

      gsap.to(labelsRef.current, {
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'center 10%',
          end: 'bottom top',
          scrub: 2,
        },
        opacity: 0,
        pointerEvents: 'none',
      })

      gsap.to(canvasContainerRef.current, {
        scrollTrigger: {
          trigger: section4Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 2,
        },
        left: '50%',
        top: '55%',
        width: '220px',
        height: '220px',
      })

      gsap.to(canvasContainerRef.current, {
        scrollTrigger: {
          trigger: section5Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 2,
        },
        opacity: 0.4,
        zIndex: 5,
        top: '50%',
        position: 'fixed',
      })

      gsap.from('.benefit-card', {
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
      })

      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: section4Ref.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const ingredientsWithPositions = product.ingredients.map((ing, idx) => ({
    ...ing,
    angle: ['top-left', 'middle-left', 'bottom-left', 'top-right', 'middle-right', 'bottom-right'][idx],
    position: [
      { top: '12%', left: '8%' },
      { top: '48%', left: '2%' },
      { top: '80%', left: '12%' },
      { top: '12%', right: '8%' },
      { top: '48%', right: '2%' },
      { top: '80%', right: '12%' },
    ][idx],
  }))

  return (
    <>
      <Header />

      <main className="w-full bg-black overflow-x-hidden">
        <div ref={canvasContainerRef} className="w-[350px] h-[350px] fixed top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 z-30">
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Model modelPath={product.modelPath} />
          </Canvas>
        </div>

        <div ref={contentLeftRef} className="w-full md:w-[60%] text-white">
          <section ref={section1Ref} className="h-screen flex flex-col justify-center p-6 md:p-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{product.name}</h1>
            <p className="text-lg md:text-xl font-light text-white/80 mt-4 max-w-md">{product.description}</p>
            <p className="text-sm font-mono mt-2 text-white/60">{product.volume}</p>
            <button className="mt-8 bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold py-3 px-8 rounded-full w-fit hover:scale-105 transition">
              Add to Cart
            </button>
          </section>

          <section ref={section2Ref} className="min-h-screen flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="benefit-card bg-white/5 p-6 rounded-lg">
                  <div className="text-4xl">{benefit.icon}</div>
                  <h3 className="font-bold text-lg mt-4">{benefit.title}</h3>
                  <p className="text-white/70 mt-2 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section ref={section3Ref} className="h-screen flex flex-col justify-center p-6 md:p-8 relative">
            <h2 className="text-3xl md:text-4xl font-bold">Core Ingredients</h2>
            <p className="text-white/70 mt-4 max-w-md">{product.chemicalComponents}</p>
            <div ref={labelsRef} className="absolute inset-0 opacity-0 pointer-events-none">
              {ingredientsWithPositions.map((ing) => (
                <IngredientLabel key={ing.id} ingredient={ing} />
              ))}
            </div>
          </section>

          <section ref={section4Ref} className="min-h-screen flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold">Clinical Results</h2>
            <div className="mt-8 space-y-6 max-w-md">
              {product.clinicalResults.map((result, index) => (
                <div key={index} className="product-card">
                  <div className="flex justify-between items-baseline">
                    <p className="text-white/80">{result.label}</p>
                    <p className="font-bold text-2xl text-pink-400">{result.percentage}</p>
                  </div>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded-full">
                    <div className="bg-pink-400 h-1 rounded-full" style={{ width: result.percentage }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section ref={section5Ref} className="h-screen flex flex-col items-center justify-center text-center p-6 md:p-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{product.name}</h2>
            <p className="text-lg md:text-xl font-light text-white/80 mt-4">Experience the transformation.</p>
            <button className="mt-8 bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition">
              Buy Now
            </button>
          </section>
        </div>
      </main>
    </>
  )
}
