import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';
import { OrbitControls } from '@react-three/drei';

export default function SpiderDetail() {
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
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-12 md:mb-16">
          Process
        </h2>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden lg:block relative w-full">
          <div className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center">

            {/* Center Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 relative">
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

                  <Model scale={2.8} modelPath={`/images/ras.glb`} position={[-1.6, 9 / 7, -0.2]} />
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </div>
            </div>

            {/* Top Left */}
            <div className="absolute top-0 left-0 md:top-8 md:left-8 lg:top-16 lg:left-16 xl:top-24 xl:left-24 w-48 sm:w-64 md:w-72 lg:w-80">
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
            <div className="absolute top-0 right-0 md:top-8 md:right-8 lg:top-16 lg:right-16 xl:top-24 xl:right-24 w-48 sm:w-64 md:w-72 lg:w-80 text-right">
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
            <div className="absolute top-1/2 left-0 md:left-4 lg:left-12 -translate-y-1/2 w-48 sm:w-64 md:w-72 lg:w-80 flex items-center gap-2 sm:gap-4 md:gap-6">

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
            <div className="absolute top-1/2 right-0 md:right-4 lg:right-12 transform -translate-y-1/2 w-48 sm:w-64 md:w-72 lg:w-80 text-right flex items-center gap-2 sm:gap-4 md:gap-6">
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
            <div className="absolute bottom-0 left-0 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16 xl:bottom-24 xl:left-24 w-48 sm:w-64 md:w-72 lg:w-80">
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
            <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 xl:bottom-24 xl:right-24 w-48 sm:w-64 md:w-72 lg:w-80 text-right">
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
                <span className="text-pink-500">Step</span>Six
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is a sample description for process step six. Replace this with your actual content.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical Steps */}
        <div className="lg:hidden mt-12 space-y-12">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step}>
              {step === 4 && (
                <div key="mobile-model" className="w-full h-64 relative flex items-center justify-center my-8">
                  <div className="w-48 h-48 relative">
                    <Canvas
                      style={{ transform: 'rotate(-10deg) scale(1.2)' }}
                      shadows
                      camera={{ position: [0, 0, 25], fov: 22 }}
                    >
                      <ambientLight intensity={0.55} />
                      <directionalLight
                        position={[6, 6, 12]}
                        intensity={2.0}
                        castShadow={true}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                      />
                      <directionalLight
                        position={[-6, 2, 10]}
                        intensity={1.0}
                        castShadow={false}
                      />
                      <directionalLight
                        position={[0, -3, -10]}
                        intensity={1.4}
                        color={"#ffffff"}
                      />
                      <directionalLight
                        position={[0, 10, 5]}
                        intensity={0.8}
                        castShadow={false}
                      />
                      <hemisphereLight
                        skyColor={"#ffffff"}
                        groundColor={"#666666"}
                        intensity={0.5}
                      />
                      <Model scale={3.4} modelPath={`/images/ras.glb`} position={[-1.6, 9 / 7, -0.2]} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                    {/* Arrow Button – Mobile only */}
                    <button
                      onClick={scrollDown}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 
                                           text-white animate-bounce p-3 rounded-full 
                                           bg-white/10 hover:bg-white/20 transition-all
                                           z-50 cursor-pointer touch-manipulation
                                           focus:outline-none focus:ring-2 focus:ring-white/30
                                           md:hidden"
                      aria-label="Scroll Down"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <div key={`mobile-step-${step}`} className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-3">
                  <span className="text-pink-500">Step</span> {step === 1 ? 'One' :
                    step === 2 ? 'Two' :
                      step === 3 ? 'Three' :
                        step === 4 ? 'Four' :
                          step === 5 ? 'Five' : 'Six'}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  This is a sample description for process step {step}. Replace this with your actual content.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}