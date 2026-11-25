'use client';

import { SafeCanvas as Canvas } from '../SafeCanvas';
import Model from '../model';

export default function FinalScene({ className, style }) {
  return (
    <Canvas className={className} style={style}
      // dpr={window.devicePixelRatio}
      camera={{ position: [0, 0, 15], fov: 15 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />

      {/* Key directional light to highlight front label */}
      <directionalLight position={[5, 8, 10]} intensity={2.5} />

      {/* Fill light to soften shadows */}
      <directionalLight position={[-5, 4, 8]} intensity={1.8} />

      {/* Rim light to make edges pop */}
      <directionalLight position={[0, 6, -10]} intensity={2.0} />

      <group position={[0, 0, 0]}>
        <Model
          scale={0.75}
          modelPath="/images/formula_c2.glb"
          rotation={[0, 0, 0]}
          position={[-0.5, 0.8, 0]}
        />
      </group>
    </Canvas>
  );
}
