'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import { motion, useAnimation } from 'framer-motion';
import { Environment } from '@react-three/drei';

export function FinalSection() {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

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

  const textSlideVariants = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <div className="relative flex flex-col h-[70%] hidden md:flex min-h-0">

      {/* Full-screen Section (hidden on mobile) */}
      <section
        ref={sectionRef}
        className="relative flex-1 items-center justify-center bg-black snap-start hidden md:flex"
      >
        {/* Main Text */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={textSlideVariants}
        >
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
        </motion.div>

        {/* 3D Model */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ x: '-50%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.8
          }}
        >
          <div className="w-60 h-60 mt-20 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] xl:w-[34rem] xl:h-[34rem]">
            {/* <Canvas
              camera={{ position: [0, 0, 10], fov: 10 }}
              style={{ transform: 'rotate(-15deg) scale(1.15)' }}
            > */}
            <Canvas
              shadows
              // FOV 15-20 is the "sweet spot" for professional product shots
              camera={{ position: [0, 0, 15], fov: 15 }}
              // Antialiasing makes edges smooth
              gl={{ antialias: true }}
              style={{ width: '100%', height: '100%', transform: 'rotate(-15deg) scale(1.15)' }}
            >
              <Environment preset="studio" intensity={1} />

              <ambientLight intensity={0.1} />

              {/* 3. KEY LIGHT: Highlights the front and label */}
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
                castShadow
              />

              {/* 4. RIM LIGHT: Placed behind to catch the edge of the green glass */}
              <pointLight position={[-10, -5, -10]} intensity={1.5} color="#ffffff" />

              <group position={[0, 0, 0]}>
                <Model
                  scale={0.25} // Adjusted slightly
                  modelPath="/images/GreenBottleC2.glb"
                  /* 
                     The rotation here stands the bottle up. 
                     Since we removed CSS rotate, we use -0.26 radians 
                     (approx -15deg) to get that stylish tilt.
                  */
                  rotation={[0, 0, 0]}
                  position={[-0.5, 0.8, 0]}
                />
              </group>
            </Canvas>

          </div>
        </motion.div>


        {/* Outline Text */}
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center w-full pointer-events-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={textSlideVariants}
          transition={{ delay: 0.2 }} // Slight delay for the second text
        >
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
        </motion.div>
      </section>


    </div>
  );
}
