'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';
import AnimatedCan from './AnimatedCan';
import HeroParticles from './HeroParticles';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Headline subtly settles into place
    tl.fromTo(
      headlineRef.current,
      { y: 50, opacity: 0, scale: 1.05 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    // Tagline fades in
    tl.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );
  }, []);

  return (
    <section className="relative w-screen min-h-[100svh] overflow-hidden bg-[#F8F4E6]">
      <HeroNavbar />
      
      {/* Background/Headline Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[10] pointer-events-none mt-[-5vh]">
        <h1 
          ref={headlineRef}
          className="text-[clamp(4rem,14vw,12rem)] text-[#8B0000] tracking-tighter leading-[0.85] text-center mix-blend-multiply opacity-0"
        >
          UNLIMITED<br />
          RELEASE<br />
          WATER
        </h1>
      </div>

      <HeroParticles />
      <AnimatedCan />

      {/* Tagline Layer */}
      <div className="absolute bottom-12 w-full flex justify-center z-[50] pointer-events-none">
        <p 
          ref={taglineRef}
          className="font-medium tracking-widest text-black text-lg sm:text-xl opacity-0"
        >
          DROP. AS. IT. SHOULD. BE.
        </p>
      </div>
      
      {/* CTA Buttons Layer */}
      <div className="absolute bottom-24 w-full flex justify-center gap-4 z-[50] pointer-events-auto">
        <button className="px-8 py-4 bg-black text-white font-bold tracking-widest text-sm rounded-full shadow-lg hover:scale-105 transition-transform">
          PRE-ORDER NOW
        </button>
      </div>
    </section>
  );
}
