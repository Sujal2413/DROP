'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function AnimatedCan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Load Animation
    const tl = gsap.timeline();

    // Can rises up
    tl.fromTo(
      containerRef.current,
      { y: 300, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    // Continuous floating and rotating loop
    gsap.to(canRef.current, {
      y: -15,
      rotationZ: 3,
      rotationY: 8,
      rotationX: 4,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5, // start after intro
    });

    // Shadow scaling with float
    gsap.to(shadowRef.current, {
      scale: 0.8,
      opacity: 0.3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 -translate-x-1/2 z-[30] pointer-events-none flex flex-col items-center justify-center aspect-[37/100]"
      style={{ top: '54%', transform: 'translate(-50%, -50%)', height: 'clamp(210px, 24vw, 300px)' }}
    >
      <div 
        ref={canRef} 
        className="relative w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-[30]"
        style={{ perspective: 800 }}
      >
        <Image
          src="/assets/new-can-variant-2.png"
          alt="DROP Silver Can"
          fill
          priority
          sizes="(max-width: 768px) 300px, 400px"
          className="object-contain"
        />
      </div>

      {/* Floor Shadow */}
      <div
        ref={shadowRef}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/40 rounded-[100%] blur-[10px] z-[20]"
      />
    </div>
  );
}
