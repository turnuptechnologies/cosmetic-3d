'use client';

import { SafeCanvas as Canvas } from '../SafeCanvas';
import Model from '../model';

export default function HeroDesktopScene({ className, style }) {
  return (
    <Canvas className={className} style={style} shadows>
      {/* <PerspectiveCamera makeDefault position={[15, 0, 0]} fov={20} /> */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 8, 10]} intensity={1.8} />
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      {/* <Environment preset="city" /> */}

      <Model
        modelPath="/images/green_hero.glb"
        scale={1.8}
        position={[0, 0.7, -0.2]}
      />
    </Canvas>
  );
}
