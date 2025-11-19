'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScroll({ children }) {
  const lenis = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Always register the plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    lenis.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Sync GSAP ScrollTrigger with Lenis
    lenis.current.on('scroll', ScrollTrigger.update);

    // GSAP ticker to sync animations
    const ticker = (time) => {
      lenis.current.raf(time * 1000);
    };
    gsap.ticker.add(ticker);

    // Cleanup
    return () => {
      gsap.ticker.remove(ticker);
      lenis.current.destroy();
      lenis.current = null;
    };
  }, []);

  // Reset scroll position on path change
  useEffect(() => {
    if (lenis.current) {
      lenis.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return children;
}
