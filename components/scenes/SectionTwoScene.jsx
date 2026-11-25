'use client';

import { SafeCanvas as Canvas } from '../SafeCanvas';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from '../model';

export default function SectionTwoScene({ className, style }) {
  return (
    <Canvas className={className} style={style}
      shadows
      camera={{ position: [0, 2, 12], fov: 35 }}
    >
      {/* 1. THE SECRET INGREDIENT: Environment Map 
    This provides the reflections that make the "NYXA" metal text shine. */}

      {/* 2. AMBIENT LIGHT: Lowered to prevent flattening the model */}
      {/* <ambientLight intensity={0.2} /> */}

      {/* 3. KEY LIGHT: Placed to the side to create highlights on the text edges */}
      {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      /> */}

      {/* 4. RIM LIGHT: Placed behind to define the silhouette of the glass */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* 5. FILL LIGHT: A warm light from the front to pop the orange color */}
      <pointLight position={[0, 2, 5]} intensity={1} color="#ff8844" />

      <Environment files="/hdr/potsdamer_platz_1k.hdr" />
      <Model
        scale={2}
        modelPath="/images/green_hero.glb"
        position={[0, 0, 0]} // Lowered slightly to center
      // rotation={[0, 0.4, 0]}
      />

      {/* 6. GROUND SHADOWS: Makes the product look high-end */}
      {/* <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      /> */}

      <OrbitControls
        enableZoom={false}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
    </Canvas>
  );
}
