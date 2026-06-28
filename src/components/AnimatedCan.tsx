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

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    if (prevIndex === activeIndex) {
      // Initial load: fade in the active can
      gsap.fromTo(canRefs.current[activeIndex],
        { opacity: 0, scale: 0.8, x: 200 },
        { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: 'power3.out' }
      );
    } else {
      // Transition: drop outgoing can to the left, bring incoming can from right
      const tl = gsap.timeline();
      
      tl.to(canRefs.current[prevIndex], {
        x: '-100vw',
        y: 100, // Drop down slightly
        rotationZ: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.in'
      }, 0);

      tl.fromTo(canRefs.current[activeIndex],
        { x: '100vw', y: -100, rotationZ: 20, opacity: 0 },
        { x: 0, y: 0, rotationZ: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.4
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
      className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-[30] pointer-events-none flex flex-col items-center justify-center w-[80vw] md:w-[50vw] max-w-[600px] aspect-[37/100] h-[clamp(400px,70vh,900px)]"
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
          <Image
            src={can.src}
            alt={can.alt}
            fill
            priority
            sizes="(max-width: 768px) 80vw, 600px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
