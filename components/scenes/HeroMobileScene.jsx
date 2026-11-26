'use client';

import { SafeCanvas as Canvas } from '../SafeCanvas';
import Model from '../model';

export default function HeroMobileScene({ className, style }) {
  return (
    <Canvas className={className} style={style}
      // dpr={window.devicePixelRatio}
      camera={{ position: [0, 3, 12], fov: 35 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.8} />

      <directionalLight position={[5, 10, 10]} intensity={2.5} />
      <directionalLight position={[-5, 8, 5]} intensity={2.0} />
      <directionalLight position={[0, 12, -5]} intensity={2.2} />

      <spotLight
        position={[0, 12, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
      />

      <Model
        scale={2}
        modelPath="/images/green_hero.glb"
        position={[0, 0, 0]}
      />
    </Canvas>
  );
}
