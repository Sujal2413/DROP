'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = Array.from(containerRef.current.children);

    particles.forEach((particle) => {
      // Randomize initial position
      gsap.set(particle, {
        x: 'random(-45vw, 45vw)',
        y: 'random(-45vh, 45vh)',
        scale: 'random(0.3, 1)',
        opacity: 'random(0.2, 0.6)',
      });

      // Shimmer and float animation
      gsap.to(particle, {
        y: '-=50',
        x: '+=random(-20, 20)',
        opacity: 'random(0.1, 0.8)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 'random(0, 2)',
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen overflow-hidden pointer-events-none z-[40]"
    >
      {[...Array(45)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[1px] mix-blend-overlay"
        />
      ))}
    </div>
  );
}
