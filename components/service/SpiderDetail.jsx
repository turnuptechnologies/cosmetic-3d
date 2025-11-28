import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';

export default function SpiderDetail() {
  return (
    <section
      // ref={section3Ref}
      className="snap-start h-screen w-full flex items-center justify-center "
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">

        {/* Heading */}
        <h2 style={{ marginBottom: '-7%', marginTop: '10%' }} className="text-4xl lg:text-5xl font-bold text-center text-white text-balance">
          Ingrediants
        </h2>

        {/* Desktop Layout */}
        <div className="hidden  w-full lg:block flex-1 flex items-center justify-center">
          <div className="relative  min-h-[800px] w-full flex items-center justify-center">

            {/* Center Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-54 h-54 relative">
                <Canvas
                  style={{ transform: 'rotate(-10deg) scale(1.2)' }}
                  shadows
                  camera={{ position: [0, 0, 25], fov: 22 }}
                >
                  {/* Soft overall environmental light */}
                  <ambientLight intensity={0.55} />

                  {/* Key Light — main highlight */}
                  <directionalLight
                    position={[6, 6, 12]}
                    intensity={2.0}
                    castShadow={true}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />

                  {/* Fill Light — softens shadows on left */}
                  <directionalLight
                    position={[-6, 2, 10]}
                    intensity={1.0}
                    castShadow={false}
                  />

                  {/* Rim Light — adds beautiful outline */}
                  <directionalLight
                    position={[0, -3, -10]}
                    intensity={1.4}
                    color={"#ffffff"}
                  />

                  {/* Soft top light for premium shine */}
                  <directionalLight
                    position={[0, 10, 5]}
                    intensity={0.8}
                    castShadow={false}
                  />

                  {/* Hemisphere for gentle color blend */}
                  <hemisphereLight
                    skyColor={"#ffffff"}
                    groundColor={"#666666"}
                    intensity={0.5}
                  />

                  <Model scale={1.5} modelPath={`/images/3d-three.glb`} position={[-1.6, 9 / 7, -0.2]} />
                </Canvas>
              </div>
            </div>

            {/* Top Left */}
            <div className="absolute top-30 left-30 w-80">
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-pink-500">Step</span> One
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a sample description for process step one. Replace this with your actual content.
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
                <span className="text-pink-500">Step</span> Two
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a sample description for process step two. Replace this with your actual content.
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
                  <span className="text-pink-500">Step</span> Three
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This is a sample description for process step three. Replace this with your actual content.
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
                  <span className="text-pink-500">Step</span> Four
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This is a sample description for process step four. Replace this with your actual content.
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
                <span className="text-pink-500">Step</span> Five
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a sample description for process step five. Replace this with your actual content.
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
                <span className="text-pink-500">Step</span> Six
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a sample description for process step six. Replace this with your actual content.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex-1 flex flex-col justify-between">
          <div className="flex justify-center mb-8">
            <div
              // ref={section3Ref}
              className="w-48 h-48 relative">

            </div>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={`step-${step}`}
                className="bg-gray-950 rounded-lg p-6 border border-gray-800"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  <span className="text-pink-500 text-2xl">{step}</span>{" "}
                  Step {step} Title
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This is a sample description for step {step}. Replace this with your actual content.
                </p>

                <div className="mt-4 h-1 w-8 bg-gradient-to-r from-pink-500 to-transparent rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}