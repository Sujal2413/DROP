'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';

type FlavorKey = 'clove' | 'mint';

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFlavor, setActiveFlavor] = useState<FlavorKey>('clove');

  const handleScrollDown = () => {
    const timelineEl = document.getElementById('story-timeline');
    if (timelineEl) {
      timelineEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative bg-[#050505] text-white font-sans antialiased selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <HeroNavbar activeIndex={1} />

      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] bg-[#8b5cf6]/[0.05] rounded-full blur-[120px] md:blur-[180px] story-orb-1" />
        <div className="absolute bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-[#C9A84C]/[0.05] rounded-full blur-[120px] md:blur-[180px] story-orb-2" />
      </div>

      {styleStyles()}

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-28 sm:pt-36 pb-24 space-y-24 md:space-y-36">
        
        {/* Split Hero Section */}
        <section className="min-h-[85svh] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 pt-8">
          
          {/* Left Text Column */}
          <div className="w-full md:w-[55%] flex flex-col items-start text-left space-y-6">
            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Origin of DROP
            </div>
            
            <h1
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] text-white tracking-tight uppercase"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              A Simple<br />
              Question.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E6C675]">A Better Can.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#F9F9F9]/70 max-w-xl leading-relaxed font-medium">
              We started with a simple question: Why does the most essential thing we consume come in disposable plastic that pollutes our environment? DROP is our answer.
            </p>

            <button
              onClick={handleScrollDown}
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C] hover:text-white transition-colors duration-300 focus:outline-none pt-4"
            >
              Discover the Timeline
              <svg 
                className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
          </div>

          {/* Right Visual Column: Stunning Can Stack Box */}
          <div className="w-full md:w-[45%] flex justify-center items-center relative min-h-[350px] md:min-h-[450px]">
            <div className="absolute inset-0 bg-[#C9A84C]/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl flex items-center justify-center p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              
              {/* Golden radial background flare */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-r from-[#C9A84C]/10 to-transparent blur-[60px] rounded-full opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              
              {/* Stacked overlapping cans */}
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                {/* Gold Can - Back */}
                <div className="absolute transform -translate-x-10 -rotate-12 w-[180px] h-[300px] md:w-[220px] md:h-[360px] opacity-70 group-hover:scale-105 group-hover:-translate-x-14 transition-all duration-700">
                  <Image
                    src="/assets/new-can-variant-2-final.png"
                    alt="DROP Gold Can"
                    fill
                    className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    sizes="220px"
                    priority
                  />
                </div>
                
                {/* Black Can - Front */}
                <div className="absolute transform translate-x-10 rotate-6 w-[180px] h-[300px] md:w-[220px] md:h-[360px] group-hover:scale-105 group-hover:translate-x-14 transition-all duration-700">
                  <Image
                    src="/assets/new-can-variant-3.png"
                    alt="DROP Black Can"
                    fill
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                    sizes="220px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Timeline Grid */}
        <section id="story-timeline" className="scroll-mt-24 space-y-12">
          <div className="max-w-2xl">
            <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-[0.25em] block mb-4">{'// Chapters'}</span>
            <h2 
              className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              How it came to be
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Box 1: The Spark (Toggles Clove & Mint flavor descriptions) */}
            <div className="md:col-span-7 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[380px] hover:border-white/20 transition-all duration-500">
              <div className="z-10 relative space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-[#C9A84C] font-black text-6xl tracking-tighter opacity-20 block leading-none">01</span>
                  
                  {/* Interactive selector pills */}
                  <div className="flex gap-2 bg-white/[0.04] border border-white/10 rounded-full p-1">
                    <button
                      onClick={() => setActiveFlavor('clove')}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${activeFlavor === 'clove' ? 'bg-[#C9A84C] text-black shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      Clove
                    </button>
                    <button
                      onClick={() => setActiveFlavor('mint')}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${activeFlavor === 'mint' ? 'bg-[#C9A84C] text-black shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      Mint
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-bold tracking-tight uppercase">The Spark</h3>
                
                {/* Dynamic Content depending on interactive state */}
                <div className="min-h-[140px] flex flex-col justify-center">
                  {activeFlavor === 'clove' ? (
                    <div className="space-y-4">
                      <p className="text-[#F9F9F9]/80 text-base leading-relaxed font-medium">
                        Our initial exploration started with clove-infused water. We fell in love with its rich, warm herbal notes and immunity-boosting vitality. We realized that our choice of daily hydration reflects how we treat our bodies and our planet.
                      </p>
                      <p className="text-xs text-[#C9A84C] font-bold tracking-wider uppercase">
                        ★ Focus: Natural Vitality, Immunity & Earthy Warmth
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[#F9F9F9]/80 text-base leading-relaxed font-medium">
                        Next, we integrated pure mint extracts. A refreshing, clean, and cooling blend that revitalizes digestion and centers focus. No artificial cooling agents, no sugar, just the crisp herbal truth.
                      </p>
                      <p className="text-xs text-[#C9A84C] font-bold tracking-wider uppercase">
                        ★ Focus: Digestive Relief, Sharp Focus & Natural Cool
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Box 2: The Vessel (Premium Specs Card) */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#1C1F22] to-[#0A0C0D] border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[380px] hover:border-white/20 transition-all duration-500">
              {/* Metallic Brushed Texture overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ 
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.1) 100%)',
                backgroundSize: '200% 100%'
              }} />

              <div className="z-10 relative">
                <span className="text-[#F9F9F9]/20 font-black text-6xl tracking-tighter block mb-4 leading-none">02</span>
                <h3 className="text-3xl font-bold tracking-tight uppercase mb-6">The Vessel</h3>
                
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-white/50 tracking-wider uppercase">Material</span>
                    <span className="text-sm font-bold text-white">100% Matte Aluminium</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-white/50 tracking-wider uppercase">Recyclable</span>
                    <span className="text-sm font-bold text-[#C9A84C]">Infinitely</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-white/50 tracking-wider uppercase">Light Shield</span>
                    <span className="text-sm font-bold text-white">100% UV Protection</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/50 tracking-wider uppercase">Active Cycle</span>
                    <span className="text-sm font-bold text-white">75% of ever made still in use</span>
                  </li>
                </ul>
              </div>

              <p className="text-white/60 text-xs leading-relaxed font-medium z-10 relative pt-4">
                We chose matte aluminum because plastic degrades, but metal endures. It keeps the water colder, fresher, and helps phase out single-use plastics forever.
              </p>
            </div>

            {/* Box 3: Roadmap (Phase timeline, full width) */}
            <div className="md:col-span-12 bg-white/[0.01] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-500 overflow-hidden">
              <span className="text-[#C9A84C] font-black text-6xl tracking-tighter opacity-20 block mb-6 leading-none">03</span>
              <h3 className="text-3xl font-bold tracking-tight uppercase mb-10">The Roadmap</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                
                {/* Column Connecting Line */}
                <div className="hidden md:block absolute top-[15px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#C9A84C]/50 via-white/10 to-transparent z-0 pointer-events-none" />

                {/* Phase 1 */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-black flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(201,168,76,0.4)]">
                      ✓
                    </div>
                    <span className="text-xs font-bold tracking-widest text-[#C9A84C] uppercase">Phase 1 (2025)</span>
                  </div>
                  <h4 className="text-xl font-bold uppercase">Formulation</h4>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">
                    Perfecting the botanical profiles. Blending clove, mint, and pure essential minerals to create a crisp, calorie-free luxury hydration experience.
                  </p>
                </div>

                {/* Phase 2 */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center font-bold text-sm animate-pulse">
                      •
                    </div>
                    <span className="text-xs font-bold tracking-widest text-[#C9A84C] uppercase">Phase 2 (2026)</span>
                  </div>
                  <h4 className="text-xl font-bold uppercase">Infrastructure</h4>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">
                    Designing the custom matte vessels, configuring supply chains, and establishing manufacturing partnerships focused on lowering packaging carbon footprint.
                  </p>
                </div>

                {/* Phase 3 */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Phase 3 (2027)</span>
                  </div>
                  <h4 className="text-xl font-bold uppercase">Launch</h4>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    Bringing DROP to luxury boutique venues, performance centers, and selective retail shelves nationwide. High-end, zero plastic hydration.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Outro Section */}
        <section className="min-h-[50svh] flex flex-col justify-center items-center text-center relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-[3rem] p-8 sm:p-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-b from-[#8b5cf6]/10 to-transparent blur-[80px] rounded-full opacity-40 pointer-events-none" />
          
          <div className="relative z-10 space-y-10 max-w-4xl flex flex-col items-center">
            <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.4em] text-[#C9A84C] uppercase font-bold">{'// Zero Compromise'}</span>
            <h2
              className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[0.95] md:leading-[0.9] uppercase"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              Water does not need<br />
              to be louder. It needs<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E6C675]">to be better.</span>
            </h2>
            <div className="pt-4">
              <Link 
                href="/#waitlist"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white/20 hover:border-white text-white font-bold text-xs tracking-widest uppercase transition-all rounded-full hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Join the Launch List
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function styleStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes story-orb-pulse-1 {
        0%, 100% { transform: scale(1); opacity: 0.05; }
        50% { transform: scale(1.15); opacity: 0.08; }
      }
      @keyframes story-orb-pulse-2 {
        0%, 100% { transform: scale(1); opacity: 0.04; }
        50% { transform: scale(1.25); opacity: 0.06; }
      }
      .story-orb-1 {
        animation: story-orb-pulse-1 18s ease-in-out infinite;
      }
      .story-orb-2 {
        animation: story-orb-pulse-2 22s ease-in-out 3s infinite;
      }
    `}} />
  );
}
