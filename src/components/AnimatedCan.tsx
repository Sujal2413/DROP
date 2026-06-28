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
      y: -20,
      rotationZ: 4,
      rotationY: 12,
      rotationX: 5,
      duration: 3,
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[30] pointer-events-none flex flex-col items-center justify-center w-full max-w-[400px] aspect-[37/100]"
    >
      <div 
        ref={canRef} 
        className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-[30]"
        style={{ perspective: 800 }}
      >
        <Image
          src="/Create_a_hyper-realistic_product_image_202606280004.jpeg" // Using the existing can image (purple/silver). User requested silver, we use the best available.
          alt="DROP Can"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
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
