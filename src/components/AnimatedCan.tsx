'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const CANS = [
  { id: 'purple', src: '/assets/new-can-variant-1.png', alt: 'Deep Purple Can' },
  { id: 'silver', src: '/assets/new-can-variant-2.png', alt: 'Icy Silver Can' },
  { id: 'black', src: '/assets/new-can-variant-3.png', alt: 'Full Black Can' }
];

export default function AnimatedCan({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(activeIndex);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    if (prevIndex === activeIndex && !isFirstRender.current) return;

    // Kill all ongoing tweens to prevent overlapping animations when switching tabs
    canRefs.current.forEach(can => {
      if (can) gsap.killTweensOf(can);
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initial load: fade in the active can
      gsap.fromTo(canRefs.current[activeIndex],
        { opacity: 0, scale: 0.8, x: 100 },
        { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: 'power3.out' }
      );
    } else {
      // Transition: circular rolling out to the left, circular rolling in from the right
      const tl = gsap.timeline();
      
      tl.to(canRefs.current[prevIndex], {
        x: '-100vw',
        y: -100, // Arc up
        rotationZ: -90, // Roll to the left
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut'
      }, 0);

      tl.fromTo(canRefs.current[activeIndex],
        { x: '100vw', y: 150, rotationZ: 90, opacity: 0 },
        { x: 0, y: 0, rotationZ: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.2
      );
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    // Continuous subtle floating loop with pronounced rotation
    canRefs.current.forEach((can) => {
      if (can) {
        gsap.to(can, {
          y: -20,
          rotationZ: 1,
          rotationY: 15, // Enhanced rotating motion
          rotationX: 1,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-[30%] translate-x-1/2 top-1/2 -translate-y-[60%] scale-110 z-[60] pointer-events-none flex flex-col items-center justify-center w-[90vw] md:w-[60vw] max-w-[1000px] aspect-[37/100] h-[clamp(600px,95vh,1200px)]"
    >
      {CANS.map((can, idx) => (
        <div 
          key={can.id}
          ref={(el) => { canRefs.current[idx] = el; }}
          className="absolute w-full h-full"
          style={{ 
            perspective: 1000, 
            opacity: idx === activeIndex ? 1 : 0, 
            pointerEvents: idx === activeIndex ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={can.src}
              alt={can.alt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 1000px"
              className="object-cover opacity-100"
              style={{ 
                mixBlendMode: 'normal',
                clipPath: 'inset(0 0 11.5% 0)',
                filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
