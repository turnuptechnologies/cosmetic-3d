'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IngredientLabel({ ingredient, index }) {
  const labelRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Staggered animation for labels
    gsap.from(labelRef.current, {
      opacity: 0,
      x: ingredient.angle.includes('left') ? -30 : 30,
      y: ingredient.angle.includes('top') ? -20 : 20,
      duration: 0.8,
      delay: 0.3 + index * 0.1,
      ease: 'power2.out',
    })

    // Dot pulse animation
    gsap.to(dotRef.current, {
      opacity: [1, 0.5, 1],
      duration: 2,
      repeat: -1,
      ease: 'sine.inOut',
    })

    // Fade on scroll
    ScrollTrigger.create({
      trigger: 'section:nth-of-type(2)',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(labelRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
        })
      },
      onLeaveBack: () => {
        gsap.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [index, ingredient.angle])

  return (
    <div
      ref={labelRef}
      className="absolute pointer-events-auto"
      style={{
        top: ingredient.position.top,
        left: ingredient.position.left,
        right: ingredient.position.right,
        width: '180px',
      }}
    >
      {/* Connector Line */}
      <svg
        className="absolute w-16 h-12"
        style={{
          top: '-15px',
          left: ingredient.angle.includes('left') ? '150px' : 'auto',
          right: ingredient.angle.includes('right') ? '150px' : 'auto',
        }}
        viewBox="0 0 60 50"
      >
        <path
          d={`M ${
            ingredient.angle.includes('left') ? '0' : '60'
          } 0 Q 30 25 ${
            ingredient.angle.includes('left') ? '60' : '0'
          } 50`}
          stroke="rgb(255, 255, 255)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* Content */}
      <div
        className={`flex gap-3 ${
          ingredient.angle.includes('right') ? 'flex-row-reverse' : ''
        }`}
      >
        {/* Dot */}
        <div
          ref={dotRef}
          className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0 mt-1"
        />

        {/* Text */}
        <div className="text-white">
          <p className="font-semibold text-sm mb-1">{ingredient.label}</p>
          <p className="text-xs text-white/60 leading-relaxed">
            {ingredient.description}
          </p>
        </div>
      </div>
    </div>
  )
}
