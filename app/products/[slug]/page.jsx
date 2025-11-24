'use client'

import { useEffect, useRef, useContext } from 'react'
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


import { ScrollerContext } from '../../../lib/ScrollerContext';

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
        width: 550,
        height: 550,
        zIndex: 30,
        opacity: 1,
      })

      const animateModal = (config) => {
        gsap.to(modalRef.current, {
          ...config,
          width: 560,
          height: 560,
          duration: 1,
          ease: 'power2.out',
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
 
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '75%',
            top: '50%',
   
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
         
            opacity: 1,
            zIndex: 30,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '25%',
            top: '50%',
   
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
            top: '50%',
 
            opacity: 1,
            zIndex: 30,
            scale: 0.8,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '50%',
            top: '50%',

            opacity: 1,
            zIndex: 30,
            scale: 0.8,
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
  
            opacity: 1,
            zIndex: 30,
            scale: 1,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '50%',
            top: '50%',
 
            opacity: 1,
            zIndex: 30,
            scale: 1,
          })
        },
      })

      // ----------------------------------
      // SECTION 5 — Grid: modal moves
      // on top of the active product card
      // ----------------------------------
      const handleGridSection = () => {
        const cardEl = activeCardRef.current;
        if (!cardEl || !modalRef.current) {
          // Fallback centered modal (medium size)
          animateModal({
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            scale: 1,          // medium default
            opacity: 1,
            zIndex: 30,
            duration: 0.8,
            ease: "power3.out",
          });
          return;
        }

        const rect = cardEl.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Card center position
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Convert to viewport %
        const leftPercent = (centerX / vw) * 100;
        const topPercent = (centerY / vh) * 100;

        /**
         * SCALE CALCULATION:
         * - Card width determines modal scale
         * - You can tweak the divisor (300 → 350 → 400)
         * - Bigger divisor = smaller modal
         */
        const scaleValue = rect.width / 400; // adjust to taste

        animateModal({
          left: `${leftPercent + 3}%`,
          top: `50%`,
          xPercent: -50,
          yPercent: -50,
          scale: scaleValue,   // ⭐ THIS controls modal size smoothly
          opacity: 1,
          zIndex: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      };



      ScrollTrigger.create({
        trigger: section5Ref.current,
        scroller: mainRef.current,
        start: 'top center',
        onEnter: handleGridSection,
        onEnterBack: handleGridSection,
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
            top: '30%',
           
            opacity: 1,
            zIndex: 30,
            scale: 1,
          })
        },
        onEnterBack: () => {
          animateModal({
            left: '50%',
            top: '30%',
           
            opacity: 1,
            zIndex: 30,
            scale: 1,
          })
        },
      })
    })

    return () => {
      mm.revert()
    }
  }, [])
  const processSteps = product.ingredients;

  const sectionRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    if (!scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollerRef.current,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(sectionRef.current);
    };
  }, [scrollerRef]);

  const textAnimation = {
    '--x': '50%',
    '--y': '50%',
  };

  return (
    <>
      <Header />

      {/* MAIN SCROLL + SNAP CONTAINER */}
      <main
        ref={mainRef}
        className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar"
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
              position={[0, 0.3, -0.2]}     // true center
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

          </section>

          {/* ---------------------- */}
          {/* SECTION 3 — INGREDIENTS */}
          {/* ---------------------- */}
          <section
            ref={section3Ref}
            className="snap-start h-screen w-full flex items-center justify-center "
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">

              {/* Heading */}
              <h2 style={{ marginBottom: '-7%', marginTop: '10%' }} className="text-4xl lg:text-5xl font-bold text-center text-white text-balance">
                Process
              </h2>

              {/* Desktop Layout */}
              <div className="hidden  w-full lg:block flex-1 flex items-center justify-center">
                <div className="relative  min-h-[800px] w-full flex items-center justify-center">

                  {/* Center Image */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div ref={labelsRef} className="w-54 h-54 relative"></div>
                  </div>

                  {/* Top Left */}
                  <div className="absolute top-30 left-30 w-80">
                    <h3 className="text-xl font-bold text-white mb-2">
                      <span className="text-pink-500">{processSteps[0].number}</span> {processSteps[0].title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {processSteps[0].description}
                    </p>
                    <div className="mt-4 flex items-start">
                      <img
                        src="/images/line1.png"
                        alt='line'
                        width={240}
                        height={240}
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 ml-10"
                      />
                    </div>
                  </div>

                  {/* Top Right */}
                  <div className="absolute top-30 right-30 w-80 text-right">
                    <h3 className="text-xl font-bold text-white mb-2">
                      <span className="text-pink-500">{processSteps[1].number}</span> {processSteps[1].title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {processSteps[1].description}
                    </p>
                    <div className="mt-4 flex items-start justify-end">
                      <img
                        src="/images/line2.png"
                        alt='line'
                        width={240}
                        height={240}
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 mr-10"
                      />
                    </div>
                  </div>

                  {/* Middle Left */}
                  <div className="absolute top-1/2 left-12 -translate-y-1/2 w-80 flex items-center gap-6">

                    {/* Text Block */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        <span className="text-pink-500">{processSteps[2].number}</span> {processSteps[2].title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {processSteps[2].description}
                      </p>
                    </div>

                    {/* Line Image */}
                    <div className="w-20 flex justify-center">
                      <img
                        src="/images/line3-4.png"
                        alt="line"
                        width={100}
                        height={100}
                        className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                  </div>

                  {/* Middle Right */}
                  <div className="absolute top-1/2 right-12 transform -translate-y-1/2 w-80 text-right flex items-center gap-6">
                    <div className="w-20 flex justify-center">
                      <img
                        src="/images/line3-4.png"
                        alt="line"
                        width={100}
                        height={100}
                        className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        <span className="text-pink-500">{processSteps[3].number}</span> {processSteps[3].title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {processSteps[3].description}
                      </p>
                    </div>

                  </div>

                  {/* Bottom Left */}
                  <div className="absolute bottom-30 left-30 w-80">
                    <div className="mt-4 flex items-start">
                      <img
                        src="/images/line5.png"
                        alt='line'
                        width={240}
                        height={240}
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 ml-10"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      <span className="text-pink-500">{processSteps[4].number}</span> {processSteps[4].title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {processSteps[4].description}
                    </p>
                  </div>

                  {/* Bottom Right */}
                  <div className="absolute bottom-30 right-30 w-80 text-right">
                    <div className="mt-4 flex items-start justify-end">
                      <img
                        src="/images/line6.png"
                        alt='line'
                        width={240}
                        height={240}
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 mr-10"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      <span className="text-pink-500">{processSteps[5].number}</span> {processSteps[5].title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {processSteps[5].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden flex-1 flex flex-col justify-between">
                <div className="flex justify-center mb-8">
                  <div ref={section3Ref} className="w-48 h-48 relative">

                  </div>
                </div>

                <div className="space-y-8 max-w-2xl mx-auto">
                  {processSteps.map((step) => (
                    <div
                      key={step.id}
                      className="bg-gray-950 rounded-lg p-6 border border-gray-800"
                    >
                      <h3 className="text-lg font-bold text-white mb-2">
                        <span className="text-pink-500 text-2xl">{step.number}</span>{" "}
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-4 h-1 w-8 bg-gradient-to-r from-pink-500 to-transparent rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          {/* ---------------------- */}
          {/* SECTION 4 — CLINICAL  */}
          {/* ---------------------- */}

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
                        {product.imagePath === item.imagePath ? '' :
                          <Image
                            src={item.imagePath}
                            alt={item.name}
                            width={240}
                            height={240}
                            className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300"
                          />}
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

          <div className="relative flex flex-col min-h-screen">
            {/* Full-screen Section */}
            <section
              ref={sectionRef}
              className="relative flex-1 flex items-center justify-center bg-black snap-start"
            >
              {/* Main Text */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <h1
                  className="text-5xl md:text-[6rem] lg:text-[10rem] xl:text-[13rem] font-black text-center select-none w-full px-4"
                  style={{
                    ...textAnimation,
                    color: 'white',
                    WebkitTextFillColor: 'white',
                    WebkitTextStroke: '3px white',
                    lineHeight: '1.1',
                  }}
                >
                  <div className="flex justify-center"><span className='mb-[-30] tracking-widest font-light'>Cosmetic</span></div>
                  <div className="flex justify-center"><span className='mt-[-30] tracking-widest font-light'>Chemist</span></div>
                </h1>
              </div>

              {/* 3D Model */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div ref={section6Ref} className="w-60 h-60 mt-20 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] xl:w-[34rem] xl:h-[34rem]">


                </div>
              </div>


              {/* Outline Text */}
              <div className="absolute inset-0 z-30 flex items-center justify-center w-full pointer-events-none">
                <h1
                  className="text-5xl md:text-[6rem] lg:text-[10rem] xl:text-[13rem] font-black text-center select-none w-full px-4"
                  style={{
                    ...textAnimation,
                    color: 'transparent',
                    WebkitTextStroke: '1px white',
                    lineHeight: '1.1',
                  }}
                >
                  <div className="flex justify-center"><span className='mb-[-30] tracking-widest font-light'>Cosmetic</span></div>
                  <div className="flex justify-center"><span className='mt-[-30] tracking-widest font-light'>Chemist</span></div>
                </h1>
              </div>
            </section>

            {/* Footer with Glassy Effect */}
            <footer className="w-full relative py-12 z-40">
              {/* Glassy / frosted background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white/20 via-transparent "></div>

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent -z-20"></div>

              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-8">
                {/* Left Section */}
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-1/4">
                  <img src="../full-logo.png" alt="Cosmetic Chemist Logo" className="w-32 mb-4" />
                  <p className="text-md text-center text-white md:text-left max-w-md mb-4 font-light">
                    Your premier platform connecting cosmetic chemists with innovative brands.
                  </p>
                  <div className="flex justify-center md:justify-start gap-6">
                    <a href="#" className="text-white hover:text-pink-500">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-white hover:text-pink-500">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-white hover:text-pink-500">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="text-white hover:text-pink-500">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <h4 className="text-lg font-semibold mb-4 font-light text-white">Quick Links</h4>
                  <ul className="space-y-2 font-light">
                    <li><a href="#" className="text-white hover:text-pink-500">Home</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">About Us</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">Services</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">Database</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">Blog</a></li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="w-full md:w-1/4">
                  <h4 className="text-lg font-semibold mb-4 font-light text-white">Resources</h4>
                  <ul className="space-y-2 font-light">
                    <li><a href="#" className="text-white hover:text-pink-500">Chemical Database</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">Formula Library</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">Regulatory Guides</a></li>
                    <li><a href="#" className="text-white hover:text-pink-500">FAQ</a></li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="w-full md:w-1/4">
                  <h4 className="text-lg font-semibold mb-4 font-light text-white">Contact</h4>
                  <p className="mb-2 font-light">
                    <a href="mailto:info@cosmeticchemist.com" className="text-white hover:text-pink-500">info@cosmeticchemist.com</a>
                  </p>
                  <p className="mb-2 font-light">
                    <a href="tel:+18005551234" className="text-white hover:text-pink-500">+1 (800) 555-1234</a>
                  </p>
                  <p className="mb-2 text-white">123 Innovation Way, New York, NY 10001</p>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-8 border-t border-white/10 text-white/40 pt-6 mt-8">
                <p className="text-sm font-light">&copy; {new Date().getFullYear()} Cosmetic Chemist. All Rights Reserved.</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition text-sm font-light">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition text-sm font-light">Terms of Service</a>
                  <a href="#" className="hover:text-white transition text-sm font-light">Cookie Policy</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  )
}
