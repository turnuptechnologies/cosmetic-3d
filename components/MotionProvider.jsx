'use client';

import { MotionConfig } from 'framer-motion';

// Respect the visitor's "reduce motion" OS setting for all framer-motion animations
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
