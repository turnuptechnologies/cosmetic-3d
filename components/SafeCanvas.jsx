'use client';

import { Component } from 'react';
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

// Drop-in replacement for @react-three/fiber's <Canvas>
export function SafeCanvas(props) {
  return (
    <CanvasErrorBoundary>
      <Canvas {...props} />
    </CanvasErrorBoundary>
  );
}
