'use client'

import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function Model({ modelPath, scale = 0.5, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef(null)

  const { scene } = useGLTF(modelPath)

  // Initial pop-in animation
  useEffect(() => {
    if (!groupRef.current) return

    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.9,
        ease: 'power3.out'
      }
    )
  }, [scale])

  // Smooth scale updates when parent changes size
  useEffect(() => {
    if (!groupRef.current) return

    gsap.to(groupRef.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 0.6,
      ease: "power2.out"
    })
  }, [scale])

  // Idle rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.013
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </group>
  )
}
