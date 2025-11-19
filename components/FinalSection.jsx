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

  // The continuous animation can be done with GSAP as well, but for simplicity, I'll leave the CSS-like animation for now.
  // The framer-motion textAnimation can be converted to a GSAP timeline.
  const textAnimation = {
    '--x': '50%',
    '--y': '50%',
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full pointer-events-none">
        <h1
          className="text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black text-center select-none w-full px-4"
          style={{
            ...textAnimation,
            color: 'white',
            WebkitTextFillColor: 'white',
            WebkitTextStroke: '3px white',
            lineHeight: '1.1',
          }}
        >
          <div className="flex justify-center"><span>Cosmetic</span></div>
          <div className="flex justify-center"><span>Chemist</span></div>
        </h1>
      </div>
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={textAnimation}
      >
        <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] xl:w-[44rem] xl:h-[44rem]">
          <Canvas camera={{ position: [0, 0, 10], fov: 10 }} style={{ transform: 'rotate(8deg) scale(1.2)' }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model modelPath="/images/3d-three.glb" position={[-0.2, -0.2, -0.2]} />
          </Canvas>
        </div>
      </div>
      <div className="absolute inset-0 z-30 flex items-center justify-center w-full pointer-events-none">
        <h1
          className="text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black text-center select-none w-full px-4"
          style={{
            ...textAnimation,
            color: 'transparent',
            WebkitTextStroke: '1px white',
            lineHeight: '1.1',
          }}
        >
          <div className="flex justify-center"><span>Cosmetic</span></div>
          <div className="flex justify-center"><span>Chemist</span></div>
        </h1>
      </div>
    </section>
  );
}
