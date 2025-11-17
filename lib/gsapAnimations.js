import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function setupProductPageAnimations({
  section1Ref,
  section2Ref,
  section3Ref,
  section4Ref,
  section5Ref,
  canvasContainerRef,
  labelsRef,
  contentLeftRef,
}) {
  const ctx = gsap.context(() => {
    gsap.set(canvasContainerRef.current, {
      position: 'fixed',
      left: '65%',
      top: '50%',
      width: '350px',
      height: '350px',
      transform: 'translate(-50%, -50%)',
      zIndex: 30,
      opacity: 1,
    })

    gsap.from(contentLeftRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    })

    gsap.to(canvasContainerRef.current, {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'bottom 40%',
        end: 'bottom -100%',
        scrub: 2,
      },
      left: '50%',
      top: '35%',
      width: '300px',
      height: '300px',
    })

    gsap.to(canvasContainerRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 50%',
        end: 'bottom 20%',
        scrub: 2,
      },
      left: '50%',
      top: '30%',
    })

    gsap.to(canvasContainerRef.current, {
      scrollTrigger: {
        trigger: section3Ref.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 2,
      },
      left: '50%',
      top: '50%',
      width: '400px',
      height: '400px',
    })

    gsap.to(labelsRef.current, {
      scrollTrigger: {
        trigger: section3Ref.current,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 2,
      },
      opacity: 1,
      pointerEvents: 'auto',
    })

    gsap.to(labelsRef.current, {
      scrollTrigger: {
        trigger: section3Ref.current,
        start: 'center 10%',
        end: 'bottom top',
        scrub: 2,
      },
      opacity: 0,
      pointerEvents: 'none',
    })

    gsap.to(canvasContainerRef.current, {
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 2,
      },
      left: '50%',
      top: '55%',
      width: '220px',
      height: '220px',
    })

    gsap.to(canvasContainerRef.current, {
      scrollTrigger: {
        trigger: section5Ref.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 2,
      },
      opacity: 0.4,
      zIndex: 5,
      top: '50%',
      position: 'fixed',
    })

    gsap.from('.benefit-card', {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.12,
    })

    gsap.from('.product-card', {
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
    })
  })

  return () => {
    ctx.revert()
    ScrollTrigger.getAll().forEach(t => t.kill())
  }
}
