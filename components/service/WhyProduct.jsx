// components/service/WhyProduct.jsx
'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';
import Image from 'next/image';
import { Environment, OrbitControls } from '@react-three/drei';

// const WhyProduct = () => {
//   const scrollDown = (e) => {
//     e.preventDefault();
//     // Get the next section element
//     const currentSection = e.target.closest('section');
//     const nextSection = currentSection.nextElementSibling;

//     if (nextSection) {
//       nextSection.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     } else {
//       // If no next section, scroll to bottom
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: 'smooth'
//       });
//     }
//   };
//   const features = [
//     {
//       path: "/images/clinic.png",
//       title: "Clinically Proven",
//       description: "Tested in independent laboratories with documented results showing 40% reduction in fine lines."
//     },
//     {
//       path: "/images/leaf.png",
//       title: "Natural Ingredients",
//       description: "100% natural peptides and botanical extracts, free from parabens and sulfates."
//     },
//     {
//       path: "/images/clock.png",
//       title: "Fast Results",
//       description: "Visible improvements in skin texture and firmness within the first week of use."
//     }
//   ];

//   return (
//     <section className="w-full py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
//         </div>

//         {/* Right side - 3D Model */}
//         <div className="w-full flex justify-center relative h-96">
//           <div className="relative w-full h-full center">
//             {/* <Canvas
//               style={{ width: '100%', height: '100%' }}
//               shadows
//               camera={{ position: [0, 0, 25], fov: 30 }}
//             >
//               <ambientLight intensity={0.5} />
//               <directionalLight
//                 position={[5, 5, 8]}
//                 intensity={1.5}
//                 castShadow
//                 shadow-mapSize-width={1024}
//                 shadow-mapSize-height={1024}
//               />
//               <directionalLight
//                 position={[-5, 5, -8]}
//                 intensity={0.5}
//                 color="#00a8ff"
//               />
//               <hemisphereLight
//                 skyColor="#ffffff"
//                 groundColor="#666666"
//                 intensity={0.5}
//               />
//               <Model
//                 scale={8.8}
//                 modelPath={"/images/etraux.glb"}
//                 position={[0, -1, 0]}
//                 rotation={[0, 0.5, 0]}
//               />
//               <OrbitControls enableZoom={false} />
//             </Canvas> */}
//             <Canvas
//               style={{ width: '100%', height: '100%' }}
//               shadows
//               camera={{ position: [0, 2, 12], fov: 35 }}
//             >
//               {/* Ambient */}
//               <ambientLight intensity={0.4} />

//               {/* FRONT key light */}
//               <directionalLight
//                 position={[0, 2, 10]}
//                 intensity={1.4}
//               />

//               {/* Right key light */}
//               <directionalLight
//                 position={[5, 5, 8]}
//                 intensity={1.2}
//                 castShadow
//                 shadow-mapSize-width={1024}
//                 shadow-mapSize-height={1024}
//               />

//               {/* Left fill light */}
//               <directionalLight
//                 position={[-5, 3, 6]}
//                 intensity={0.6}
//               />

//               {/* Back / rim light */}
//               <directionalLight
//                 position={[0, 2, -10]}
//                 intensity={8.9}
//               />

//               {/* Hemisphere */}
//               <hemisphereLight
//                 skyColor="#ffffff"
//                 groundColor="#666666"
//                 intensity={0.45}
//               />

//               {/* MODEL */}
//               <Model
//                 scale={4}
//                 modelPath="/images/Silver_Purple_Eye_Cream.glb"
//                 position={[0, 0, 0]}
//                 rotation={[0, Math.PI / 8, 0]}
//               />

//               <OrbitControls
//                 enableZoom={false}
//                 target={[0, 0, 0]}
//                 maxPolarAngle={Math.PI / 2}
//                 minPolarAngle={0}
//               />
//             </Canvas>


//             <button
//               onClick={scrollDown}
//               className="absolute bottom-4 left-1/2 -translate-x-1/2 
//                                            text-white animate-bounce p-3 rounded-full 
//                                            bg-white/10 hover:bg-white/20 transition-all
//                                            z-50 cursor-pointer touch-manipulation
//                                            focus:outline-none focus:ring-2 focus:ring-white/30
//                                            md:hidden"
//               aria-label="Scroll Down"
//               type="button"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//           {/* Left side - Features */}
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//             {features.map((feature, index) => (
//               <div key={index} className='gap-6'>
//                 <div className='flex justify-center'>
//                   <div className="text-center">
//                     <Image src={feature.path} alt="feature" width={24} height={24} />
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-xl text-center font-bold text-white my-6">{feature.title}</h3>
//                   <p className="text-gray-300 text-center">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
const WhyProduct = ({ whyChooseUsSection }) => {
  const scrollDown = (e) => {
    e.preventDefault();
    // Get the next section element
    const currentSection = e.target.closest('section');
    const nextSection = currentSection.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If no next section, scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Destructure columns from the section data
  const { columns = [] } = whyChooseUsSection || {};

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
        </div>

        {/* Right side - 3D Model */}
        <div className="w-full flex justify-center relative h-70">
          <div className="relative w-full h-full center">
            {/* <Canvas
              style={{ width: '100%', height: '100%' }}
              shadows
              camera={{ position: [0, 2, 12], fov: 35 }}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[0, 2, 10]} intensity={1.4} />
              <directionalLight position={[5, 5, 8]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
              <directionalLight position={[-5, 3, 6]} intensity={0.6} />
              <directionalLight position={[0, 2, -10]} intensity={8.9} />
              <hemisphereLight skyColor="#ffffff" groundColor="#666666" intensity={0.45} />
              <Model scale={4} modelPath="/images/Silver_Purple_Eye_Cream.glb" position={[0, 0, 0]} rotation={[0, Math.PI / 8, 0]} />
              <OrbitControls enableZoom={false} target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
            </Canvas> */}
            <Canvas
              dpr={1}
              camera={{ position: [0, 0, 15], fov: 15 }}
              style={{ width: "100%", height: "100%" }}
              gl={{
                antialias: false,
                powerPreference: "low-power",
              }}
            >
              <ambientLight intensity={0.8} />

              <directionalLight position={[0, 6, 10]} intensity={2.6} />
              <directionalLight position={[6, 4, 6]} intensity={1.8} />
              <directionalLight position={[-6, 4, 6]} intensity={1.8} />
              <directionalLight position={[0, 8, -10]} intensity={2.2} />

              <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <Model
                  scale={1.5}
                  modelPath="/images/horizontalLipStick.glb"
                  rotation={[0, 0, 0]}
                  position={[0, 0.5, 0]}
                />
                <OrbitControls
                  enableZoom={false}
                  // enableDamping={false}
                  target={[0, 0, 0]}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={0}
                />
              </group>
            </Canvas>

            <button
              onClick={scrollDown}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white animate-bounce p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/30 md:hidden"
              aria-label="Scroll Down"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Features */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {columns.map((column, index) => {
              // Hardcoded images and descriptions
              const title = column.richText?.root?.children?.find(child => child.tag === 'h3')?.children[0]?.text || 'Title Not Available';
              const description = column.richText?.root?.children?.find(child => child.type === 'paragraph')?.children[0]?.text || 'Description Not Available';
              const imagePath = index === 0 ? '/images/clinic.png' : index === 1 ? '/images/leaf.png' : '/images/clock.png'; // Hardcoded images

              return (
                <div key={index} className="gap-6">
                  <div className="flex justify-center">
                    <div className="text-center">
                      <img src={imagePath} alt="feature" width={24} height={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-center font-bold text-white my-6">{title}</h3>
                    <p className="text-gray-300 max-w-md mx-auto text-center">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};



export default WhyProduct;
