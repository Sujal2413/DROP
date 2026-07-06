'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';
import AnimatedCan from './AnimatedCan';
import HeroParticles from './HeroParticles';

const THEMES = [
  { id: 'purple', name: 'MINT WATER', bg: '#1A0B2E', accentBg: '#2D1B4E', text: '#E9D5FF' },
  { id: 'gold', name: 'CLOVE WATER', bg: '#1C1408', accentBg: '#2A1F0E', text: '#C9A84C' },
  { id: 'black', name: 'ATHLETE EDITION', bg: '#0A0A0A', accentBg: '#1A1A1A', text: '#FFFFFF' },
  { id: 'silver', name: 'SPARKLING WATER', bg: '#15181B', accentBg: '#23272C', text: '#E2E8F0' }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Auto-cycle cans every 3.5 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 3500);
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
      id="hero"
      className="relative w-screen min-h-[100svh] overflow-hidden transition-colors duration-1000 flex items-center"
      style={{ backgroundColor: THEMES[activeIndex].bg, clipPath: 'inset(0)' }}
    >
      <HeroNavbar activeIndex={activeIndex} />
      <HeroParticles />

      {/* Right Side/Bottom Accent Background (Curve Split) */}
      <div
        className="absolute right-0 bottom-0 md:top-0 w-full md:w-[35%] lg:w-[30%] h-[40%] md:h-full rounded-t-[50px] md:rounded-t-none md:rounded-l-[100px] sm:rounded-l-[150px] transition-colors duration-1000 z-0"
        style={{ backgroundColor: THEMES[activeIndex].accentBg }}
      >
        {/* Semi-circle shape on the line */}
        <div
          className="absolute left-1/2 top-0 md:left-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vh] h-[20vh] md:w-[40vh] md:h-[40vh] rounded-full z-0 transition-colors duration-1000"
          style={{ backgroundColor: THEMES[activeIndex].accentBg, opacity: 0.7 }}
        />
      </div>

      {/* Vertical Name Display - Hidden on mobile for cleaner layout */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[1] pointer-events-none overflow-hidden h-[80vh] hidden md:flex items-center justify-center">
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

      {/* Content Container (Centered & spaced vertically on mobile to prevent overlapping the absolute can) */}
      <div className="relative z-[50] w-full md:w-[45%] px-8 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start justify-between md:justify-center min-h-[85vh] md:min-h-0 md:h-auto pt-24 pb-12 md:py-0 text-center md:text-left mx-auto md:mx-0 pointer-events-auto">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 transition-colors duration-1000 mb-8"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            color: THEMES[activeIndex].text,
            fontWeight: 900,
            letterSpacing: '0.02em',
            lineHeight: 0.9,
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          AS. IT.<br />
          SHOULD. BE.
        </h1>

        {/* Buttons */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-6 w-full justify-center md:justify-start items-center">
          <button
            onClick={() => alert("Pre-order modal coming soon!")}
            className="px-10 py-4 w-full sm:w-auto font-bold tracking-[0.2em] text-xs rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-500 ring-1 ring-white/20 backdrop-blur-sm"
            style={{
              backgroundColor: THEMES[activeIndex].id === 'gold' ? '#C9A84C' : THEMES[activeIndex].id === 'purple' ? '#E9D5FF' : '#FFFFFF',
              color: THEMES[activeIndex].id === 'gold' ? '#1C1408' : THEMES[activeIndex].id === 'purple' ? '#1A0B2E' : '#0A0A0A'
            }}
          >
            PRE-ORDER NOW
          </button>
          <a
            href="https://forms.gle/oBq4GbBTc3AeaJSJ6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 w-full sm:w-auto bg-transparent border border-white/20 font-bold tracking-[0.2em] text-xs rounded-full hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all duration-500 text-center flex items-center justify-center hover:-translate-y-1"
            style={{ color: THEMES[activeIndex].text }}
          >
            FILL INTEREST FORM
          </a>
        </div>

        {/* Sleek Footnote */}
        <div
          ref={taglineRef}
          className="mt-14 md:mt-16 font-semibold tracking-[0.3em] text-[10px] md:text-xs opacity-0 transition-colors duration-1000 flex items-center justify-center md:justify-start gap-6 uppercase"
          style={{ color: THEMES[activeIndex].text }}
        >
          <span className="opacity-70">500ML</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shadow-[0_0_10px_currentColor]"></span>
          <span className="opacity-70">STILL WATER</span>
        </div>
      </div>

      <AnimatedCan activeIndex={activeIndex} />
    </section>
  );
}
