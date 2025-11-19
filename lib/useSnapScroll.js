'use client';

import { useEffect, useRef } from 'react';

export const useSnapScroll = (containerRef) => {
  const isScrolling = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
        return;
      }
      
      e.preventDefault();

      if (isScrolling.current) return;

      const sections = Array.from(container.children);
      const currentScroll = container.scrollTop;
      
      let nextSection;

      if (e.key === 'ArrowDown') {
        nextSection = sections.find(section => section.offsetTop > currentScroll + 1);
      } else { // ArrowUp
        const reversedSections = sections.slice().reverse();
        nextSection = reversedSections.find(section => section.offsetTop < currentScroll - 1);
      }

      if (nextSection) {
        container.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth',
        });

        isScrolling.current = true;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          isScrolling.current = false;
        }, 700); // A bit shorter than 1s
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutRef.current);
    };
  }, [containerRef]);
};
