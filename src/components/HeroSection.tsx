'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';
import AnimatedCan from './AnimatedCan';
import HeroParticles from './HeroParticles';

const THEMES = [
  { id: 'purple', name: 'MINT WATER', bg: '#1A0B2E', accentBg: '#2D1B4E', text: '#E9D5FF', dotColor: '#8b5cf6' },
  { id: 'red', name: 'CLOVE WATER', bg: '#3c0103', accentBg: '#5A0205', text: '#fca5a5', dotColor: '#ef4444' },
  { id: 'black', name: 'ATHLETE EDITION', bg: '#000000', accentBg: '#0A0A0A', text: '#FFFFFF', dotColor: '#52525b' },
  { id: 'silver', name: 'SPARKLING WATER', bg: '#08121C', accentBg: '#102A43', text: '#F0F4F8', dotColor: '#93C5FD' }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isAutoCycling) return;
    
    // Auto-cycle cans every 4 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % THEMES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

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

  const handleFlavorSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoCycling(false); // Stop auto-cycling when user interacts
  }, []);

  const currentTheme = THEMES[activeIndex];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden transition-colors duration-1000 flex items-center"
      style={{ backgroundColor: currentTheme.bg, clipPath: 'inset(0)' }}
    >
      <HeroNavbar activeIndex={activeIndex} />
      <HeroParticles />

      {/* Right Side/Bottom Accent Background (Curve Split) */}
      <div
        className="absolute right-0 bottom-0 md:top-0 w-full md:w-[35%] lg:w-[30%] h-[38%] md:h-full rounded-t-[42px] md:rounded-t-none md:rounded-l-[100px] sm:rounded-l-[150px] transition-colors duration-1000 z-0"
        style={{ backgroundColor: currentTheme.accentBg }}
      >
        {/* Semi-circle shape on the line */}
        <div
          className="absolute left-1/2 top-0 md:left-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vh] h-[20vh] md:w-[40vh] md:h-[40vh] rounded-full z-0 transition-colors duration-1000"
          style={{ backgroundColor: currentTheme.accentBg, opacity: 0.7 }}
        />
      </div>

      {/* Vertical Name Display - Hidden on mobile for cleaner layout */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[10] pointer-events-none select-none overflow-hidden h-[80vh] hidden md:flex items-center justify-center vertical-text-container">
        <h2
          className="text-[10vh] md:text-[15vh] font-black tracking-tighter opacity-10 transition-colors duration-1000 whitespace-nowrap pointer-events-none select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: currentTheme.text,
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif'
          }}
        >
          {currentTheme.name}
        </h2>
      </div>

      {/* Content Container (Centered & spaced vertically on mobile to prevent overlapping the absolute can) */}
      <div className="relative z-[50] w-full md:w-[45%] px-5 sm:px-8 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start justify-between md:justify-center gap-4 min-h-[86svh] md:min-h-0 md:h-auto pt-24 pb-8 sm:pb-12 md:py-0 text-center md:text-left mx-auto md:mx-0 pointer-events-auto">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 transition-colors duration-1000 mb-8"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2.75rem, 15vw, 8rem)',
            color: currentTheme.text,
            fontWeight: 900,
            letterSpacing: '0.02em',
            lineHeight: 0.9,
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          <span className="sr-only">Drop Water - </span>
          AS. IT.<br />
          SHOULD. BE.
        </h1>

        {/* Interactive Flavor Selectors */}
        <div className="flex gap-4 items-center justify-center md:justify-start mb-4 z-[60] relative pointer-events-auto flavor-selector-btn">
          {THEMES.map((theme, idx) => (
            <button
              key={theme.id}
              onClick={() => handleFlavorSelect(idx)}
              aria-label={`Select ${theme.name}`}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${activeIndex === idx ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`}
              style={{ 
                backgroundColor: theme.dotColor,
                boxShadow: activeIndex === idx ? `0 0 15px ${theme.dotColor}` : 'none'
              }}
            />
          ))}
        </div>

        {/* Buttons and Pricing Anchors */}
        <div className="mt-4 md:mt-8 flex flex-col items-center md:items-start gap-4 w-full relative z-[60] pointer-events-auto">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start items-center">
            <a
              href="#waitlist"
              className="px-8 sm:px-10 py-4 w-full max-w-[20rem] sm:w-auto sm:max-w-none font-bold tracking-[0.16em] sm:tracking-[0.2em] text-xs rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 ring-1 ring-white/20 backdrop-blur-sm text-center block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                backgroundColor: currentTheme.id === 'red' ? '#fca5a5' : currentTheme.id === 'purple' ? '#E9D5FF' : '#FFFFFF',
                color: currentTheme.id === 'red' ? '#450a0a' : currentTheme.id === 'purple' ? '#1A0B2E' : '#0A0A0A'
              }}
            >
              JOIN THE WAITLIST
            </a>
            
            <a
              href="#products"
              className="px-8 sm:px-10 py-4 w-full max-w-[20rem] sm:w-auto sm:max-w-none bg-transparent border border-white/20 font-bold tracking-[0.16em] sm:tracking-[0.2em] text-xs rounded-full hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all duration-300 text-center flex items-center justify-center hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              style={{ color: currentTheme.text }}
            >
              EXPLORE FLAVORS
            </a>
          </div>
        </div>

        {/* Sleek Footnote */}
        <div
          ref={taglineRef}
          className="mt-4 md:mt-8 font-semibold tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.3em] text-[10px] md:text-xs opacity-0 transition-colors duration-1000 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 sm:gap-x-6 uppercase max-w-[19rem] sm:max-w-none pointer-events-none"
          style={{ color: currentTheme.text }}
        >
          <span className="opacity-70">330ML & 500ML</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shadow-[0_0_10px_currentColor]"></span>
          <span className="opacity-70">STILL WATER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shadow-[0_0_10px_currentColor]"></span>
          <span className="opacity-70">LAUNCHING 2027</span>
        </div>
      </div>

      <AnimatedCan activeIndex={activeIndex} />
    </section>
  );
}
