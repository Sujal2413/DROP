'use client';

import React from 'react';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SustainabilityClient() {
  return (
    <div className="w-full relative bg-[var(--color-canvas)] text-[var(--color-text)] font-sans antialiased overflow-hidden min-h-screen">
      
      <HeroNavbar activeIndex={0} />

      <main className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 pt-28 sm:pt-32 pb-24 sm:pb-32 relative z-10">
        
        {/* Minimalist Headline */}
        <header className="py-14 sm:py-20 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.9] sm:leading-[0.85] mb-6">
            NO PLASTIC.<br />
            NO COMPROMISE.
          </h1>
          <p className="font-bold text-base sm:text-lg md:text-xl uppercase tracking-[0.14em] sm:tracking-widest max-w-2xl mx-auto p-3 text-[var(--color-text)]/60">
            A commitment to the forever metal.
          </p>
        </header>

        {/* Elegant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8 relative z-10">
          
          {/* Card 1 */}
          <div className="bg-[#E5E5E5]/30 text-[#111111] p-8 md:p-12 flex flex-col justify-between gap-8 min-h-[320px] rounded-lg">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">Designed for Recyclability</h2>
            <p className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-[#111111]/80">
              Plastic degrades. Aluminum endures. Nearly 75% of all aluminum ever produced is still in active use today. We chose the forever metal because it supports an infinite recycling loop.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111111] text-[#F9F9F9] p-8 md:p-12 flex flex-col justify-between gap-8 min-h-[320px] rounded-lg">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 text-[#C9A84C]">Logistical Efficiency</h2>
            <p className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-white/80">
              Aluminum weighs significantly less than glass and stacks efficiently. Our goal is to leverage this material advantage to reduce transport emissions as we scale.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111111] text-[#F9F9F9] p-8 md:p-12 flex flex-col justify-between gap-8 min-h-[320px] rounded-lg">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">Protecting the Source</h2>
            <p className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-white/80">
              We are committed to sourcing exclusively from naturally replenishing springs, working with suppliers who prioritize the long-term health of local watersheds.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#E5E5E5]/30 text-[#111111] p-8 md:p-12 flex flex-col justify-between gap-8 min-h-[320px] rounded-lg">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">Take Action</h2>
            <p className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-[#111111]/80 mb-6">
              By choosing aluminum over single-use plastic, you are voting for a circular economy. Join us in building the infrastructure for better hydration.
            </p>
            <Link 
              href="/#waitlist"
              className="w-full bg-[#111111] text-[#F9F9F9] py-4 text-center font-black uppercase tracking-[0.14em] sm:tracking-widest hover:bg-[#C9A84C] hover:text-[#111111] transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2 rounded-sm"
            >
              Join The List
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
