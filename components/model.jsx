'use client'

import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function Model({ modelPath }) {
  console.log('Model component received modelPath:', modelPath);
  const groupRef = useRef(null)

  // Load GLB model
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (!groupRef.current) return

    // Beautiful pop-in animation
    gsap.from(groupRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
  }, [])

  // Optional auto animation (soft idle rotation)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003 // soft idle rotation
    }
  })

  return (
    <group ref={groupRef} scale={10}> {/* Adjust scale here for uniform size */}
      <primitive object={scene} />
    </group>
  )
}
