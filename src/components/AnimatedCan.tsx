'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

// CANS defines the display scaling and filter effects for each variant.
const CANS = [
  { 
    id: 'purple', src: '/assets/new-can-variant-1.png', alt: 'Deep Purple Can', scale: 1.6,
    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8))',
    mobileFilter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
  },
  { 
    id: 'red', src: '/assets/clove_can_transparent.png', alt: 'Clove Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))',
    mobileFilter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))'
  },
  { 
    id: 'black', src: '/assets/new-can-variant-3.png', alt: 'Full Black Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))',
    mobileFilter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))'
  },
  {
    id: 'silver', src: '/assets/new-can-2.png', alt: 'Sparkling Water Can', scale: 1.6,
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))',
    mobileFilter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))'
  }
];

export default function AnimatedCan({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(activeIndex);
  const isFirstRender = useRef(true);
  const isMobileRef = useRef(false);
  const floatingTweenRef = useRef<gsap.core.Tween | null>(null);

  // One-time mobile check via ref (no re-render)
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to start floating loop on the active can (desktop only)
  const startFloatingLoop = (el: HTMLDivElement | null) => {
    if (!el || isMobileRef.current) return;

    // Kill previous floating tween
    if (floatingTweenRef.current) {
      floatingTweenRef.current.kill();
    }

    floatingTweenRef.current = gsap.to(el, {
      y: -20,
      rotationZ: 1,
      rotationY: 15,
      rotationX: 1,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  };

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    
    // Kill any active transitions/tweens on all cans
    canRefs.current.forEach(can => {
      if (can) gsap.killTweensOf(can);
    });
    if (floatingTweenRef.current) {
      floatingTweenRef.current.kill();
      floatingTweenRef.current = null;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      const activeCan = canRefs.current[activeIndex];
      if (activeCan) {
        gsap.fromTo(activeCan,
          { opacity: 0, scale: 0.8, x: 100, y: 0, rotationZ: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            x: 0, 
            y: 0,
            duration: isMobileRef.current ? 0.8 : 1.5, 
            ease: 'power3.out',
            onComplete: () => startFloatingLoop(activeCan)
          }
        );
      }
    } else {
      const prevCan = canRefs.current[prevIndex];
      const activeCan = canRefs.current[activeIndex];

      const duration = isMobileRef.current ? 0.6 : 1.2;

      if (prevCan) {
        gsap.to(prevCan, {
          x: '-100vw',
          y: isMobileRef.current ? -50 : -100,
          rotationZ: isMobileRef.current ? -45 : -90,
          opacity: 0,
          duration,
          ease: 'power3.inOut'
        });
      }

      if (activeCan) {
        gsap.fromTo(activeCan,
          { x: '100vw', y: isMobileRef.current ? 80 : 150, rotationZ: isMobileRef.current ? 45 : 90, opacity: 0 },
          { 
            x: 0, 
            y: 0, 
            rotationZ: 0, 
            opacity: 1, 
            duration, 
            ease: 'power3.out',
            onComplete: () => startFloatingLoop(activeCan)
          }
        );
      }
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Cleanup all GSAP tweens on unmount
  useEffect(() => {
    return () => {
      canRefs.current.forEach(can => {
        if (can) gsap.killTweensOf(can);
      });
      if (floatingTweenRef.current) {
        floatingTweenRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-1/2 translate-x-1/2 top-[47%] -translate-y-1/2 md:right-[30%] md:translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-[45] md:z-[60] pointer-events-none flex flex-col items-center justify-center w-[52vw] min-w-[150px] max-w-[210px] md:w-[40vw] md:max-w-[900px] aspect-[37/100] h-[min(52svh,430px)] min-h-[320px] md:h-[clamp(450px,75vh,1100px)] md:min-h-0 overflow-visible"
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
            <Link href="/#products" className="relative w-full h-full block cursor-pointer">
              <Image
                src={can.src}
                alt={can.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                quality={85}
                sizes="(max-width: 768px) 210px, (max-width: 1200px) 40vw, 900px"
                className="object-contain object-center"
                style={{ 
                  mixBlendMode: 'normal',
                  transform: `scale(${can.scale * 0.7})`,
                }}
              />
              {/* Desktop: use CSS media query for larger scale instead of JS state */}
              <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 768px) {
                  [data-can-id="${can.id}"] img {
                    transform: scale(${can.scale}) !important;
                    filter: ${can.filter};
                  }
                }
                @media (max-width: 767px) {
                  [data-can-id="${can.id}"] img {
                    filter: ${can.mobileFilter};
                  }
                }
              `}} />
              <span data-can-id={can.id} className="absolute inset-0 pointer-events-none" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
