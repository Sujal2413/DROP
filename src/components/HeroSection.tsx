'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';
import AnimatedCan from './AnimatedCan';
import HeroParticles from './HeroParticles';

const THEMES = [
  { id: 'purple', bg: '#1A0B2E', text: '#E9D5FF' },
  { id: 'silver', bg: '#F8F4E6', text: '#B11212' },
  { id: 'black', bg: '#0A0A0A', text: '#FFFFFF' }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Auto-cycle cans every 5 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <section 
      className="relative w-screen min-h-[100svh] overflow-hidden transition-colors duration-1000 flex items-center"
      style={{ backgroundColor: THEMES[activeIndex].bg }}
    >
      <HeroNavbar />
      <HeroParticles />
      
      {/* Left Content Container */}
      <div className="relative z-[50] w-full md:w-1/2 px-8 md:pl-16 lg:pl-24 flex flex-col items-start justify-center pt-20 pointer-events-auto">
        
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="opacity-0 transition-colors duration-1000"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: THEMES[activeIndex].text,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
          }}
        >
          AS.IT.<br />
          SHOULD.BE.
        </h1>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => alert("Pre-order modal coming soon!")} 
            className="px-8 py-4 bg-black text-white border border-white/20 font-bold tracking-widest text-sm rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            PRE-ORDER NOW
          </button>
          <a 
            href="https://forms.gle/oBq4GbBTc3AeaJSJ6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border-2 border-black/20 text-current font-bold tracking-widest text-sm rounded-full hover:bg-black/5 transition-all text-center flex items-center justify-center"
            style={{ borderColor: THEMES[activeIndex].text === '#B11212' ? 'rgba(177, 18, 18, 0.3)' : 'rgba(255,255,255,0.3)', color: THEMES[activeIndex].text }}
          >
            FILL INTEREST FORM
          </a>
        </div>
        
        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="mt-16 font-medium tracking-widest text-lg sm:text-xl opacity-0 transition-colors duration-1000"
          style={{ color: THEMES[activeIndex].text }}
        >
          DROP. AS. IT. SHOULD. BE.
        </p>
      </div>

      <AnimatedCan activeIndex={activeIndex} />
    </section>
  );
}
