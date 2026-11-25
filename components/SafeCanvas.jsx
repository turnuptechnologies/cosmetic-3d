'use client';

import { Component, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

// The 3D scenes are decorative. If anything inside one fails (a model or environment map that
// can't be fetched, WebGL unavailable, ...), render nothing there instead of letting the error
// take down the whole page.
class CanvasErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('[3D] scene failed to render:', error?.message ?? error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Start loading a little before the scene scrolls into view
const MOUNT_MARGIN = '300px';
const MAX_CONTEXT_RECOVERIES = 3;

/**
 * Drop-in replacement for @react-three/fiber's <Canvas> that keeps 3D scenes cheap:
 * - the scene (and the models/textures it downloads) is only created once it is near the viewport,
 * - its render loop is paused while it is scrolled out of view,
 * - the pixel ratio is capped (phones report 3x), unless the caller sets `dpr`,
 * - if the WebGL context is lost, a fresh canvas is mounted (see below).
 *
 * Why the self-healing: R3F's Canvas suspends itself while models load, and R3F schedules a
 * forceContextLoss() on unmount that it never cancels. When React re-runs effects after a Suspense
 * reveal (always in dev Strict Mode, or on a real GPU reset) that kills the live canvas, leaving a
 * dead white box. Mounting a new <canvas> (new key) recovers it; models are cached so it is instant.
 */
export function SafeCanvas({ className, style, dpr, frameloop = 'always', onCreated, ...props }) {
  const placeholderRef = useRef(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(true);
  const [canvasEl, setCanvasEl] = useState(null);
  const [generation, setGeneration] = useState(0);

  // 1. Wait until the placeholder (same box the canvas will occupy) is close to the screen
  useEffect(() => {
    if (near) return;
    const el = placeholderRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setNear(true);

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin: MOUNT_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  // 2. Once created, stop rendering frames while the canvas is off screen
  useEffect(() => {
    if (!canvasEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px',
    });
    observer.observe(canvasEl);
    return () => observer.disconnect();
  }, [canvasEl]);

  if (!near) {
    // Mirrors the box <Canvas> renders, so nothing shifts when the scene mounts
    return (
      <div
        ref={placeholderRef}
        className={className}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
      />
    );
  }

  return (
    <CanvasErrorBoundary>
      <Canvas
        key={generation}
        {...props}
        className={className}
        style={style}
        dpr={dpr ?? [1, 1.5]}
        frameloop={frameloop === 'always' && !visible ? 'never' : frameloop}
        onCreated={(state) => {
          const el = state.gl.domElement;
          setCanvasEl(el);
          el.addEventListener(
            'webglcontextlost',
            (event) => {
              event.preventDefault();
              setCanvasEl(null);
              // Give up after a few attempts rather than looping on a broken GPU
              setGeneration((g) => (g < MAX_CONTEXT_RECOVERIES ? g + 1 : g));
            },
            { once: true }
          );
          onCreated?.(state);
        }}
      />
    </CanvasErrorBoundary>
  );
}
