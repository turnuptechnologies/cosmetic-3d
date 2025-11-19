'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FlaskConical, Lightbulb } from 'lucide-react'; // ⬅️ Icons
import Model from './model';

export function SectionTwo() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 my-10"
      style={{
        backgroundImage: "url('/images/11.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl">

        {/* LEFT CONTENT */}
        <motion.div
          className="space-y-8 text-white"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
            variants={itemVariants}
          >
            What We Do
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl"
            variants={itemVariants}
          >
            We are a leading platform that connects top-tier Cosmetic Chemists and Formulators 
            with brands and organizations. Our mission is to elevate your product offerings by 
            pairing you with the best in the industry.
          </motion.p>

          {/* FEATURE LIST */}
          <motion.div className="space-y-6" variants={itemVariants}>
            
            {/* Feature 01 */}
            <div className="flex items-start gap-4">
              <FlaskConical className="text-yellow-300 w-7 h-7 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Expert Network</h4>
                <p className="text-gray-400 text-sm">
                  Access to industry-leading professionals
                </p>
              </div>
            </div>

            {/* Feature 02 */}
            <div className="flex items-start gap-4">
              <Lightbulb className="text-green-400 w-7 h-7 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Innovation Focus</h4>
                <p className="text-gray-400 text-sm">
                  Driving product excellence through chemistry
                </p>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* RIGHT 3D MODEL */}
       <motion.div
  className="w-full flex items-center justify-center h-[520px] md:h-[650px] lg:h-[820px]"
  initial={{ opacity: 0, scale: 0.85 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.4 }}
>
  <Canvas camera={{ position: [0, 0, 15], fov: 22 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 8]} intensity={2} />
    <directionalLight position={[-4, -4, -6]} intensity={0.7} />

    {/* Bigger model without cropping */}
    <Model
      modelPath="/images/3d-one2.glb"
      scale={[1.6, 1.6, 1.6]}
      position={[0.1, 0.2, 0]}
      rotation={[0, 0.4, 0]}
    />

    <OrbitControls enableZoom={false} />
  </Canvas>
</motion.div>


      </div>
    </section>
  );
}
