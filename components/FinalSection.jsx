'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';

export function FinalSection() {
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
          <div className="w-60 h-60 mt-20 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] xl:w-[34rem] xl:h-[34rem]">
            <Canvas
              camera={{ position: [0, 0, 10], fov: 10 }}
              style={{ transform: 'rotate(8deg) scale(1.15)' }}
            >
              {/* Soft global light */}
              <ambientLight intensity={0.8} />

              {/* Main key light */}
              <directionalLight
                position={[5, 5, 10]}
                intensity={1.6}
                castShadow={false}
              />

              {/* Fill light (softens shadows) */}
              <directionalLight
                position={[-5, 2, 8]}
                intensity={0.9}
                castShadow={false}
              />

              {/* Back rim light (gives premium edges) */}
              <directionalLight
                position={[0, -3, -10]}
                intensity={1.2}
                color="#ffffff"
              />

              {/* A soft hemisphere light for smooth gradients */}
              <hemisphereLight
                skyColor={"#ffffff"}
                groundColor={"#666666"}
                intensity={0.5}
              />

              <Model scale={0.5} modelPath="/images/3d-three.glb" position={[-0.2, -0.2, -0.2]} />
            </Canvas>

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
            <img src="./full-logo.png" alt="Cosmetic Chemist Logo" className="w-32 mb-4" />
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
  );
}
