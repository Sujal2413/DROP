'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// CANS defines the display scaling and filter effects for each variant.
// NOTE: Cans have different image aspect ratios (purple/black are landscape 2752x1536; gold is portrait 603x1537; silver is portrait 1206x1474).
// The scale values are mathematically calibrated to ensure their visual height and width on screen are identical.
// Do not modify these scale ratios.
const CANS = [
  { 
    id: 'purple', src: '/assets/new-can-variant-1.png', alt: 'Deep Purple Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))'
  },
  { 
    id: 'gold', src: '/assets/new-can-variant-2-final.png', alt: 'Pure Gold Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))'
  },
  { 
    id: 'black', src: '/assets/new-can-variant-3.png', alt: 'Full Black Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))'
  },
  {
    id: 'silver', src: '/assets/new-can-2.png', alt: 'Sparkling Water Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))'
  }
];

export default function AnimatedCan({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(activeIndex);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
      className="absolute right-1/2 translate-x-1/2 top-[42%] -translate-y-1/2 md:right-[30%] md:translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-[60] pointer-events-none flex flex-col items-center justify-center w-[50vw] md:w-[40vw] max-w-[900px] aspect-[37/100] h-[clamp(450px,75vh,1100px)] overflow-visible"
    >
      {CANS.map((can, idx) => (
        <div 
          key={can.id}
          ref={(el) => { canRefs.current[idx] = el; }}
          className="absolute w-full h-full overflow-visible"
          style={{ 
            perspective: 1000, 
            opacity: idx === activeIndex ? 1 : 0, 
            pointerEvents: idx === activeIndex ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-full h-[100%] flex items-center justify-center overflow-visible">
            <Image
              src={can.src}
              alt={can.alt}
              fill
              priority
              quality={100}
              sizes={can.id === 'gold' ? '(max-width: 768px) 30vw, 500px' : '(max-width: 768px) 50vw, 900px'}
              className="object-contain object-center opacity-100"
              style={{ 
                mixBlendMode: 'normal',
                filter: can.filter,
                transform: `scale(${isMobile ? can.scale * 0.7 : can.scale})`,
                imageRendering: can.id === 'gold' ? 'high-quality' as React.CSSProperties['imageRendering'] : undefined
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
