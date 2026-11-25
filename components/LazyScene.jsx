'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Start fetching a scene's code (three.js, models) shortly before it scrolls into view
const MARGIN = '400px';

/**
 * Wraps a 3D scene module so three.js and the scene's code are only downloaded and run when the
 * scene is about to be seen, instead of with the page. Until then, a box with the scene's own
 * className/style holds its place so the layout doesn't move.
 *
 *   const HeroScene = lazyScene(() => import('./scenes/HeroScene'));
 *   <HeroScene className="..." style={{ ... }} />
 */
export function lazyScene(loader) {
  const Scene = dynamic(loader, { ssr: false, loading: () => null });

  return function LazyScene({ className, style, ...props }) {
    const holder = useRef(null);
    const [near, setNear] = useState(false);

    useEffect(() => {
      const el = holder.current;
      if (!el || typeof IntersectionObserver === 'undefined') return setNear(true);
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setNear(true),
        { rootMargin: MARGIN }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    if (!near) {
      return (
        <div
          ref={holder}
          className={className}
          style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
        />
      );
    }
    return <Scene className={className} style={style} {...props} />;
  };
}
