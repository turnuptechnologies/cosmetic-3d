'use client'

import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image.js'
import { Users, Lightbulb, Clock } from "lucide-react"
import { products } from '../../../lib/products.js'
import Model from '../../../components/model.jsx'
import Header from '../../../components/Header.jsx'
import IngredientLabel from '../../../components/ingredient-label.jsx'

gsap.registerPlugin(ScrollTrigger)

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

  // SECTION REFS
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)
  const section5Ref = useRef(null) // grid section
  const section6Ref = useRef(null) // final CTA

  // SCROLL CONTAINER + MODAL + GRID
  const mainRef = useRef(null)
  const modalRef = useRef(null)
  const gridRef = useRef(null)

  const labelsRef = useRef(null)
  // Ref to the ACTIVE product card in the grid (matching current product)
  const activeCardRef = useRef(null)

  useEffect(() => {
    // Ensure we start at the top of the scroll container
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }

    ScrollTrigger.getAll().forEach(t => t.kill())

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1px)', () => {
      if (!modalRef.current || !mainRef.current) return



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


      // Initial modal state (same as Section 1 "right medium")
      gsap.set(modalRef.current, {
        position: 'fixed',
        xPercent: -50,
        yPercent: -50,
        left: '75%',
        top: '50%',
        width: 350,
        height: 350,
        zIndex: 30,
        opacity: 1,
      })

      const animateModal = (config) => {
        gsap.to(modalRef.current, {
          ...config,
          duration: 1,
          ease: 'power3.out',
        })
      }

      // ----------------------------------
      // SECTION 1 — Right, Medium
      // ----------------------------------
      ScrollTrigger.create({
        trigger: section1Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: () => {
          animateModal({
            left: '75%',
            top: '50%',
            width: 550,
            height: 550,
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '75%',
            top: '50%',
          width: 550,
            height: 550,
            opacity: 1,
            zIndex: 30,
          })
        },
      })

      // ----------------------------------
      // SECTION 2 — Left, Medium
      // ----------------------------------
      ScrollTrigger.create({
        trigger: section2Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: () => {
          animateModal({
            left: '25%',
            top: '50%',
            width: 560,
            height: 560,
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '25%',
            top: '50%',
            width: 560,
            height: 560,
            opacity: 1,
            zIndex: 30,
          })
        },
      })

      // ----------------------------------
      // SECTION 3 — Center, Large
      // ----------------------------------
      ScrollTrigger.create({
        trigger: section4Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: () => {
          animateModal({
            left: '50%',
            top: '45%',
            width: 380,
            height: 380,
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '50%',
            top: '45%',
            width: 380,
            height: 380,
            opacity: 1,
            zIndex: 30,
          })
        },
      })

      // ----------------------------------
      // SECTION 4 — Center, Small
      // ----------------------------------
      ScrollTrigger.create({
        trigger: section3Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: () => {
          animateModal({
            left: '50%',
            top: '50%',
            width: 560,
            height: 560,
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '50%',
            top: '50%',
            width: 560,
            height: 560,
            opacity: 1,
            zIndex: 30,
          })
        },
      })

      // ----------------------------------
      // SECTION 5 — Grid: modal moves
      // on top of the active product card
      // ----------------------------------
      const handleGridSection = () => {
        const cardEl = activeCardRef.current
        if (!cardEl || !modalRef.current) {
          // Fallback: center medium
          animateModal({
            left: '50%',
            top: '50%',
            width: 320,
            height: 320,
            opacity: 1,
            zIndex: 30,
          })
          return
        }

        const rect = cardEl.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight

        // Center of the card in viewport coords
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Convert to percentage so xPercent/yPercent -50 still works
        const leftPercent = (centerX / vw) * 100
        const topPercent = (centerY / vh) * 100

        const size = rect.width // matching card width; square modal
        // ${topPercent}
        animateModal({
          left: `${leftPercent}%`,
          top: `50%`,
          width: size,
          height: size,
          opacity: 1,
          zIndex: 30,
        })
      }
      const handleGridSection2 = () => {
        const cardEl = activeCardRef.current
        if (!cardEl || !modalRef.current) {
          // Fallback: center medium
          animateModal({
            left: '50%',
            top: '50%',
            width: 320,
            height: 320,
            opacity: 1,
            zIndex: 30,
          })
          return
        }

        const rect = cardEl.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight

        // Center of the card in viewport coords
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Convert to percentage so xPercent/yPercent -50 still works
        const leftPercent = (centerX / vw) * 100
        const topPercent = (centerY / vh) * 100

        const size = rect.width // matching card width; square modal
        // ${topPercent}
        animateModal({
          left: `${leftPercent}%`,
          top: `50%`,
          width: size,
          height: size,
          opacity: 1,
          zIndex: 30,
        })
      }

      ScrollTrigger.create({
        trigger: section5Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: handleGridSection,
        onEnterBack: () => {
          animateModal({
            left: '50%',
            top: '50%',
            width: 260,
            height: 260,
            opacity: 1,
            zIndex: 30,
          })
        },
      })

      // ----------------------------------
      // SECTION 6 — Final CTA:
      // fade modal slightly back
      // ----------------------------------
      ScrollTrigger.create({
        trigger: section6Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: () => {
          animateModal({
            left: '50%',
            top: '50%',
            width: 420,
            height: 420,
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          handleGridSection2();
        },
      })
    })

    return () => {
      mm.revert()
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

      {/* MAIN SCROLL + SNAP CONTAINER */}
      <main
        ref={mainRef}
        className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
      >
        {/* FIXED MODAL */}
        <div
          ref={modalRef}
          className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
  
        >
          <Canvas
            shadows
      
            camera={{ position: [15, 0, 0], fov: 20 }}
          >
            {/* Ambient Light */}
            <ambientLight intensity={0.4} />

            {/* Key Light */}
            <directionalLight
              position={[8, 8, 10]}
              intensity={1.8}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />

            {/* Fill */}
            <directionalLight position={[-6, 4, 6]} intensity={1.0} />

            {/* Rim */}
            <directionalLight position={[0, 5, -10]} intensity={1.2} />

            {/* Soft Top Light */}
            <directionalLight position={[0, 10, 5]} intensity={0.6} />

            <hemisphereLight skyColor="#ffffff" groundColor="#888888" intensity={0.3} />

            <OrbitControls enableZoom={false} enablePan={false} enableRotate />

            {/* CLEAN, CENTERED MODEL */}
            <Model
              modelPath={product.modelPath}
              position={[0, 0.4, 0.2]}     // true center
              rotation={[0, 0.4, 0.4]}   // subtle natural rotation
            />
          </Canvas>
        </div>




        {/* INNER WRAPPER FOR SNAP */}
        <div className="snap-y snap-mandatory">

          {/* ---------------------- */}
          {/* SECTION 1 — HERO      */}
          {/* ---------------------- */}
          <section
            ref={section1Ref}
            className="snap-start h-screen flex flex-col justify-center px-10 md:px-20 text-white"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase">{product.name}</h1>
            <p className="text-lg md:text-xl text-white/80 mt-4 max-w-md">
              {product.description}
            </p>
            <p className="text-sm font-mono mt-2 text-white/60">{product.volume}</p>
          </section>

          {/* ---------------------- */}
          {/* SECTION 2 — BENEFITS  */}
          {/* ---------------------- */}
          <section
            ref={section2Ref}
            className="snap-start h-screen flex flex-col justify-center text-right px-10 md:px-20 text-white "
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase">{product.name}</h1>
            <p style={{ marginLeft: 'auto' }} className="text-lg md:text-xl text-white/80 mt-4 max-w-md ">
              {product.description}
            </p>
            <p className="text-sm font-mono mt-2 text-white/60 ">{product.volume}</p>
            {/* <h2 className="text-4xl font-bold">Key Benefits</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-lg">
                  <div className="text-4xl">{benefit.icon}</div>
                  <h3 className="font-bold text-lg mt-4">{benefit.title}</h3>
                  <p className="text-white/70 text-sm mt-2">{benefit.description}</p>
                </div>
              ))}
            </div> */}
          </section>

          {/* ---------------------- */}
          {/* SECTION 3 — INGREDIENTS */}
          {/* ---------------------- */}
          <section
            ref={section3Ref}
            className="snap-start h-screen flex flex-col items-center justify-center px-10 md:px-20 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Core Ingredients</h2>
            <p className="text-white/70 mt-4 max-w-md">{product.chemicalComponents}</p>
            <div ref={labelsRef} className="absolute inset-0 opacity-0 pointer-events-none">
              {ingredientsWithPositions.map((ing) => (
                <IngredientLabel key={ing.id} ingredient={ing} />
              ))}
            </div>
          </section>

          {/* ---------------------- */}
          {/* SECTION 4 — CLINICAL  */}
          {/* ---------------------- */}
          {/* <section
            
            className="snap-start h-screen flex flex-col justify-center px-10 md:px-20 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Clinical Results</h2>

            <div className="mt-10 space-y-6 max-w-xl">
              {product.clinicalResults.map((result, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <p>{result.label}</p>
                    <p className="font-bold text-2xl text-pink-400">{result.percentage}</p>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full mt-2">
                    <div
                      className="h-1 bg-pink-400 rounded-full"
                      style={{ width: result.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
          <section ref={section4Ref} className="snap-start h-screen  bg-black py-12 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 md:mb-20">
                Why Choose Us
              </h2>

              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-3 gap-8 items-start">


                {/* Center Image */}


                {product.benefits.map((benefit, index) => (
                  <div key={index} className="text-white text-center">
                    <div className="flex items-center justify-center ">
                      <div className="relative w-full h-72">

                      </div>
                    </div>
                    <div className="flex justify-center mb-4">
                      <span className="w-16 h-16 text-pink-500" >{benefit.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}


              </div>


            </div>
          </section>

          {/* ---------------------- */}
          {/* SECTION 5 — GRID      */}
          {/* ---------------------- */}
          <section
            ref={section5Ref}
            className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-20 snap-start bg-black text-white"
          >
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Cosmetic Chemistry
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>

            {/* Products Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl w-full overflow-visible"
            >
              {products.map((item) => (
                <div
                  key={item.id}
                  // Attach ref only to the active product's card
                  ref={item.slug === product.slug ? activeCardRef : null}
                  className="product-card relative rounded-3xl p-8 text-center shadow-2xl cursor-pointer group overflow-visible bg-transparent"
                >
                  <div className="absolute inset-0 z-[1] pointer-events-none flex items-start justify-center">
                    <div className="w-[90%] h-[70%] bg-gradient-to-b from-white/40 to-transparent rounded-t-full blur-[0px]" />
                  </div>

                  <Link href={`/products/${item.slug}`}>
                    <div className="product-content relative z-[5]">
                      <div className="w-full h-56 flex items-center justify-center mb-10">
                        <Image
                          src={item.imagePath}
                          alt={item.name}
                          width={240}
                          height={240}
                          className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------- */}
          {/* SECTION 6 — FINAL CTA */}
          {/* ---------------------- */}
          <section
            ref={section6Ref}
            className="snap-start h-screen flex flex-col items-center justify-center text-center px-10 md:px-20 text-white"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase">{product.name}</h2>
            <p className="text-xl text-white/80 mt-4">Experience the transformation.</p>

            <button className="mt-8 bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition">
              Buy Now
            </button>
          </section>
        </div>
      </main>
    </>
  )
}
