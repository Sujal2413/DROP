'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';
import AnimatedCan from './AnimatedCan';
import HeroParticles from './HeroParticles';

const THEMES = [
  { id: 'purple', name: 'DEEP PURPLE', bg: '#1A0B2E', accentBg: '#2D1B4E', text: '#E9D5FF' },
  { id: 'silver', name: 'ICY SILVER', bg: '#F8F4E6', accentBg: '#E8E2D2', text: '#B11212' },
  { id: 'black', name: 'FULL BLACK', bg: '#0A0A0A', accentBg: '#1A1A1A', text: '#FFFFFF' }
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
      
      {/* Right Side Accent Background (Curve Split) */}
      <div 
        className="absolute right-0 top-0 w-full md:w-[35%] lg:w-[30%] h-full rounded-l-[100px] sm:rounded-l-[150px] transition-colors duration-1000 z-0"
        style={{ backgroundColor: THEMES[activeIndex].accentBg }}
      >
        {/* Semi-circle shape on the line */}
        <div 
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] md:w-[40vh] md:h-[40vh] rounded-full z-0 transition-colors duration-1000"
          style={{ backgroundColor: THEMES[activeIndex].accentBg, opacity: 0.7 }}
        />
      </div>

      {/* Vertical Name Display */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[1] pointer-events-none overflow-hidden h-[80vh] flex items-center justify-center">
        <h2 
          className="text-[10vh] md:text-[15vh] font-bold tracking-tighter opacity-10 transition-colors duration-1000 whitespace-nowrap"
          style={{ 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: THEMES[activeIndex].text,
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif'
          }}
        >
          {THEMES[activeIndex].name}
        </h2>
      </div>

      {/* Left Content Container */}
      <div className="relative z-[50] w-full md:w-[45%] px-8 md:pl-16 lg:pl-24 flex flex-col items-start justify-center pt-20 pointer-events-auto">
        
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="opacity-0 transition-colors duration-1000 mb-6"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: THEMES[activeIndex].text,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
          }}
        >
          AS. IT.<br />
          SHOULD. BE.
        </h1>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
        
        {/* Sleek Footnote */}
        <div 
          ref={taglineRef}
          className="mt-16 font-semibold tracking-[0.2em] text-sm md:text-base opacity-0 transition-colors duration-1000 flex items-center gap-4"
          style={{ color: THEMES[activeIndex].text }}
        >
          <span className="opacity-70">500ML</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
          <span className="opacity-70">STILL WATER</span>
        </div>
      </div>

      <AnimatedCan activeIndex={activeIndex} />
    </section>
  );
}
