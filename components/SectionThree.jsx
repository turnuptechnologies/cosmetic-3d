'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import { useRouter } from 'next/navigation';

export function SectionThree({
  title = "We are your",
  highlightedTitle = "one-stop shop",
  subtitle = "for everything cosmetic",
  ctaLabel = "Join Our Network",
  description = `Our team is also well experienced with all regulatory and quality assurance matters.
Not only that but we are also passionate about design and branding and love to help brands out with that.
We guarantee you've never come across a more well-rounded team of experts than at CosmeticChemist.com.`
}) {
  const router = useRouter();

  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    if (!scrollerRef?.current || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: scrollerRef.current,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    });

    // 3D model container comes from left
    tl.fromTo(
      leftContentRef.current,
      {
        opacity: 0,
        x: -250,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      }
    )

      // Text content stagger
      .fromTo(
        rightContentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.6'
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-12 md:px-16 snap-start overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
        {/* LEFT — 3D MODEL */}
        <div
          ref={leftContentRef}
          className="w-full flex items-center justify-center h-[450px] md:h-[600px] lg:h-[750px] order-2 lg:order-1"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at center,
                rgba(0,0,0,0.3) 0%,
                rgba(0,0,0,0.6) 70%,
                rgba(0,0,0,0.9) 100%
              ),
              url('/images/35.png')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            boxShadow: 'inset 0 0 40px 25px rgba(0,0,0,0.75)',
          }}
        >
          <Canvas
            camera={{ position: [0, 2, 8], fov: 25 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.55} />

            <directionalLight position={[6, 6, 12]} intensity={2} />
            <directionalLight position={[-6, 2, 10]} intensity={1} />
            <directionalLight position={[0, -3, -10]} intensity={1.4} />
            <directionalLight position={[0, 10, 5]} intensity={0.8} />

            <hemisphereLight
              skyColor="#ffffff"
              groundColor="#666666"
              intensity={0.5}
            />

            <Model
              modelPath="/images/OrangeSkinBottle.glb"
              scale={0.5}
              position={[0, 0, 0]}
              rotation={[0, 0.4, 0]}
            />

            <OrbitControls
              enableZoom={false}
              target={[0, 0, 0]}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
            />
          </Canvas>
        </div>

        {/* RIGHT — TEXT */}
        <div
          ref={rightContentRef}
          className="space-y-6 md:px-4 order-1 lg:order-2"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {title}{' '}
            <span className="text-pink-400">{highlightedTitle}</span>{' '}
            {subtitle}
          </h2>

          <p className="text-gray-300">{description}</p>

          <button
            onClick={() => router.push('/contact')}
            className="px-8 py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
