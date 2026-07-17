'use client';

import React from 'react';

export default function WhyDropSection() {
  return (
    <section className="bg-[#050505] py-24 md:py-36 px-5 sm:px-8 md:px-16 text-[#F9F9F9] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-[#C9A84C]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-2xl">
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-6 uppercase drop-shadow-md text-transparent bg-clip-text bg-gradient-to-b from-[#E5E5E5] to-[#888888]" style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}>
            Why DROP.
          </h2>
          <p className="text-[#F9F9F9]/70 text-lg md:text-xl font-medium leading-relaxed">
            Hydration stripped back to its purest form, engineered for the demands of a high-performance life.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px]">
          
          {/* Box 1: The Water (Top Left, spans 7 cols) */}
          <div className="md:col-span-7 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 flex flex-col justify-between group overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* SVG Flow Diagram */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none flex items-center justify-end overflow-hidden">
              <svg viewBox="0 0 400 300" className="w-full h-full text-[#C9A84C] stroke-current transform translate-x-1/4 group-hover:translate-x-0 transition-transform duration-700 ease-out">
                <path d="M 0 150 C 100 150, 150 50, 250 50 C 350 50, 350 250, 450 250" fill="none" strokeWidth="4" className="animate-pulse" style={{ animationDuration: '4s' }} />
                <path d="M 0 180 C 100 180, 120 80, 220 80 C 320 80, 320 280, 420 280" fill="none" strokeWidth="2" opacity="0.5" className="animate-pulse" style={{ animationDuration: '5s' }} />
                <circle cx="250" cy="50" r="6" fill="#C9A84C" />
                <circle cx="220" cy="80" r="4" fill="#C9A84C" opacity="0.5" />
              </svg>
            </div>

            <div className="z-10 relative">
              <span className="text-[#C9A84C] font-black text-6xl tracking-tighter opacity-20 mb-4 block leading-none">01</span>
              <h3 className="text-3xl font-bold tracking-tight mb-4 uppercase">The Water</h3>
            </div>
            
            <p className="text-[#F9F9F9]/60 text-base leading-relaxed font-medium z-10 relative max-w-sm">
              Sourced with absolute precision. Our water undergoes advanced filtration to ensure a crisp, zero-compromise profile, fortified with natural trace minerals. No sugars, no synthetic additives, just pure cellular hydration.
            </p>
          </div>

          {/* Box 3: The Experience (Right, spans 5 cols, spans 2 rows) */}
          <div className="md:col-span-5 md:row-span-2 bg-gradient-to-br from-[#E5E5E5] to-[#F9F9F9] text-[#111111] rounded-[2.5rem] p-8 md:p-12 border border-[#C0C0C0] flex flex-col justify-between group overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
            
            <div className="z-10 relative">
              <span className="text-[#111111] font-black text-6xl tracking-tighter opacity-10 mb-4 block leading-none">03</span>
              <h3 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 uppercase leading-none">The<br/>Experience</h3>
            </div>
            
            <p className="text-[#111111]/80 text-lg lg:text-xl leading-relaxed font-medium z-10 relative font-serif">
              Engineered to elevate any environment. Whether stocking a premium boutique hotel, served at high-end fitness studios, or fueling your personal best, DROP is designed to be the definitive standard for modern hydration.
            </p>
          </div>

          {/* Box 2: The Can (Bottom Left, spans 7 cols) */}
          <div className="md:col-span-7 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 flex flex-col justify-between group overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-500">
            {/* Metallic Brushed Texture Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ 
              backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1) 100%)',
              backgroundSize: '200% 100%'
            }} />
            
            <div className="z-10 relative">
              <span className="text-[#F9F9F9] font-black text-6xl tracking-tighter opacity-10 mb-2 block leading-none">02</span>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 uppercase drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-b from-white to-[#888]">
                The Can
              </h3>
            </div>
            
            <p className="text-[#F9F9F9]/80 text-base leading-relaxed font-medium z-10 relative max-w-sm">
              Aluminium isn&apos;t just an aesthetic choice; it&apos;s a structural and environmental necessity. Infinitely recyclable, it shields the water from light and oxygen degradation while keeping it colder for longer. Pure performance packaging.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
