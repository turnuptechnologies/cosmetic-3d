'use client';

import { SafeCanvas as Canvas } from '../SafeCanvas';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '../model';

export default function SectionThreeScene({ className, style }) {
  return (
    <Canvas className={className} style={style}
      camera={{ position: [0, 2, 8], fov: 25 }}
    >
      <ambientLight intensity={0.55} />

      <directionalLight position={[6, 6, 12]} intensity={2} />
      <directionalLight position={[-6, 2, 10]} intensity={1} />
      <directionalLight position={[0, -3, -10]} intensity={1.4} />
      <directionalLight position={[0, 10, 5]} intensity={0.8} />

      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#666666"
        intensity={0.5}
      />

      <Environment files="/hdr/potsdamer_platz_1k.hdr" />
      <Model
        modelPath="/images/SilverVerticalTube.compressed.glb"
        scale={1.5}
        position={[0, 0, 0]}
        rotation={[0, 0.4, 0]}
      />

      <OrbitControls
        enableZoom={false}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
    </Canvas>
  );
}
