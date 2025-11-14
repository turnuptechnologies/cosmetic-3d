'use client'

import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

function Model({ path, ...props }) {
  const group = useRef()
  const { scene } = useGLTF(path)

  // Optional: Add a gentle rotation animation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2
    }
  })

  return <primitive ref={group} object={scene} {...props} />
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

export default function ModelViewer({ modelPath, scale = 1, position = [0, 0, 0] }) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
      >
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={<Loader />}>
          <Model path={modelPath} scale={scale} position={position} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}