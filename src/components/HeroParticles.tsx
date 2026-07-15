'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const DESKTOP_PARTICLE_COUNT = 30;

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  // Detect mobile and reduced motion once on mount (SSR-safe)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    if (!containerRef.current) return;

    const particles = Array.from(containerRef.current.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tweensRef.current.forEach((tw) => tw.resume());
        } else {
          tweensRef.current.forEach((tw) => tw.pause());
        }
      },
      { threshold: 0 }
    );

    observer.observe(containerRef.current);

    // Reuse random values outside hot path
    particles.forEach((particle) => {
      gsap.set(particle, {
        x: `random(0, 100vw)`,
        y: `random(0, 100vh)`,
        scale: `random(0.3, 1)`,
        opacity: `random(0.15, 0.5)`,
      });

      const tw = gsap.to(particle, {
        y: '-=40',
        x: '+=random(-15, 15)',
        opacity: 'random(0.1, 0.6)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 'random(0, 3)',
      });
      tweensRef.current.push(tw);
    });

    return () => {
      observer.disconnect();
      tweensRef.current.forEach((tw) => tw.kill());
      tweensRef.current = [];
    };
  }, [isMobile, prefersReducedMotion]);

  // Don't render particles on mobile or reduced motion
  if (isMobile || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-[40]"
    >
      {[...Array(DESKTOP_PARTICLE_COUNT)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-1.5 h-1.5 bg-white/40 rounded-full"
        />
      ))}
    </div>
  );
}
