'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';

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
    <section id="hero" className="relative w-screen min-h-[100svh] overflow-hidden bg-black flex flex-col items-center justify-center">
      <HeroNavbar />
      
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/hero_animation.mp4" type="video/mp4" />
      </video>

      {/* Main Text Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[10] pointer-events-none mt-[-5vh]">
        <h1 
          ref={headlineRef}
          className="text-center opacity-0 drop-shadow-xl"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            color: '#F8F4E6', // Light cream color for contrast over video
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
          }}
        >
          AS. IT.<br />
          SHOULD. BE.
        </h1>
      </div>

      {/* CTA Buttons Layer */}
      <div className="absolute bottom-24 w-full flex justify-center gap-4 z-[50] pointer-events-auto">
        <button className="px-8 py-4 bg-white text-black font-bold tracking-widest text-sm rounded-full shadow-lg hover:scale-105 transition-transform">
          PRE-ORDER NOW
        </button>
        <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition-colors">
          VIEW LINEUP
        </button>
      </div>
    </section>
  );
}
