import { Canvas } from '@react-three/fiber';
import Model from '../../components/model';
import { Environment, OrbitControls } from '@react-three/drei';

export default function SpiderDetail({ processSteps }) {
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

  // Destructure each step data from the processSteps array
  const stepOne = processSteps[0] || {};
  const stepTwo = processSteps[1] || {};
  const stepThree = processSteps[2] || {};
  const stepFour = processSteps[3] || {};
  const stepFive = processSteps[4] || {};
  const stepSix = processSteps[5] || {};

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-12 md:mb-16">
          Process
        </h2>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden lg:block relative w-full">
          <div className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center gap-12">

            {/* Center Image */}
            <div className="w-full h-[60vh] flex justify-center mb-8">
              <Canvas
                // style={{ transform: 'rotate(-10deg) scale(1.2)' }}
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
                <Model scale={3.5} modelPath={`/images/ras.glb`} position={[0, 0, 0]} />
                <OrbitControls enableZoom={false} />
              </Canvas>

            </div>

            {/* Step One */}
            <div className="absolute top-0 left-0 md:top-8 md:left-8 lg:top-16 lg:left-16 xl:top-24 xl:left-24 w-48 sm:w-64 md:w-72 lg:w-80">
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-pink-500">Step</span> {stepOne.stepNumber || 'One'}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {stepOne.stepDescription || 'No description available for step one.'}
              </p>
              <div className="mt-4 flex items-start">
                <img
                  src={`/images/line1.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 ml-10"
                />
              </div>
            </div>

            {/* Step Two */}
            <div className="absolute top-0 right-0 md:top-8 md:right-8 lg:top-16 lg:right-16 xl:top-24 xl:right-24 w-48 sm:w-64 md:w-72 lg:w-80 text-right">
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-pink-500">Step</span> {stepTwo.stepNumber || 'Two'}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {stepTwo.stepDescription || 'No description available for step two.'}
              </p>
              <div className="mt-4 flex items-start justify-end">
                <img
                  src={`/images/line2.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 mr-10"
                />
              </div>
            </div>

            {/* Step Three */}
            <div className="absolute top-1/2 left-0 md:left-4 lg:left-12 -translate-y-1/2 w-48 sm:w-64 md:w-72 lg:w-80 flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  <span className="text-pink-500">Step</span> {stepThree.stepNumber || 'Three'}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stepThree.stepDescription || 'No description available for step three.'}
                </p>
              </div>
              <div className="w-20 flex justify-center">
                <img
                  src={`/images/line3-4.png`}
                  alt="line"
                  width={100}
                  height={100}
                  className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Step Four */}
            <div className="absolute top-1/2 right-0 md:right-4 lg:right-12 transform -translate-y-1/2 w-48 sm:w-64 md:w-72 lg:w-80 text-right flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="w-20 flex justify-center">
                <img
                  src={`/images/line3-4.png`}
                  alt="line"
                  width={100}
                  height={100}
                  className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  <span className="text-pink-500">Step</span> {stepFour.stepNumber || 'Four'}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stepFour.stepDescription || 'No description available for step four.'}
                </p>
              </div>
            </div>

            {/* Step Five */}
            <div className="absolute bottom-0 left-0 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16 xl:bottom-24 xl:left-24 w-48 sm:w-64 md:w-72 lg:w-80">
              <div className="mt-4 flex items-start">
                <img
                  src={`/images/line5.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 ml-10"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-pink-500">Step</span> {stepFive.stepNumber || 'Five'}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {stepFive.stepDescription || 'No description available for step five.'}
              </p>
            </div>

            {/* Step Six */}
            <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 xl:bottom-24 xl:right-24 w-48 sm:w-64 md:w-72 lg:w-80 text-right">
              <div className="mt-4 flex items-start justify-end">
                <img
                  src={`/images/line6.png`}
                  alt='line'
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 mr-10"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-pink-500">Step</span> {stepSix.stepNumber || 'Six'}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {stepSix.stepDescription || 'No description available for step six.'}
              </p>
            </div>

          </div>
        </div>

        {/* Mobile Layout - Vertical Steps */}
        <div className="lg:hidden mt-12 space-y-12">
          {processSteps.map((step, index) => {
            const { stepNumber, stepDescription } = step;
            return (
              <div key={index} className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-3">
                  <span className="text-pink-500">Step</span> {stepNumber || 'Step'}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {stepDescription || 'No description available for this step.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


