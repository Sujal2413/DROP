'use client';

import React from 'react';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import LoginPage from '@/components/LoginPage';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';
import { motion } from 'framer-motion';

export default function SustainabilityClient() {
  const { isLoggedIn } = useCart();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="w-full relative bg-[#FDFCF8] text-[#1B2A22] font-sans selection:bg-[#D4AF37] selection:text-white antialiased overflow-hidden min-h-screen">
      
      {/* Navbar using Olive/Dark palette for black text on light background */}
      <HeroNavbar activeIndex={4} />

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-32 relative z-10">
        
        {/* Massive Headline */}
        <header className="py-20 text-center">
          <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black tracking-tighter uppercase leading-[0.9] mb-6 font-serif">
            NO PLASTIC.<br />
            NO BULLSH*T.
          </h1>
          <p className="font-semibold text-xs md:text-sm uppercase tracking-[0.3em] max-w-2xl mx-auto text-[#D4AF37]">
            Luxury hydration that doesn't cost the earth.
          </p>
        </header>

        {/* Elegant Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 relative z-10">
          
          {/* Card 1 */}
          <div 
            className="bg-white text-[#1B2A22] p-10 md:p-16 rounded-[2rem] border border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 font-serif">100% Recyclable</h2>
            <p className="text-base md:text-lg font-light leading-relaxed opacity-80">
              Plastic degrades. Aluminum endures. 75% of all aluminum ever produced is still in active use today. Choose the forever metal.
            </p>
          </div>

          {/* Card 2 */}
          <div 
            className="bg-white text-[#1B2A22] p-10 md:p-16 rounded-[2rem] border border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between md:mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 font-serif">Low Carbon Loop</h2>
            <p className="text-base md:text-lg font-light leading-relaxed opacity-80">
              Aluminum chills faster and weighs less. This means drastically fewer emissions during transport and refrigeration. Tight, localized, efficient.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1B2A22] text-[#FDFCF8] p-10 md:p-16 rounded-[2rem] border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 font-serif text-[#D4AF37]">Ethical Sourcing</h2>
            <p className="text-base md:text-lg font-light leading-relaxed opacity-90">
              We only take what the earth freely yields. We source exclusively from naturally replenishing springs. No draining basins. No habitat destruction.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#D4AF37] text-[#1B2A22] p-10 md:p-16 rounded-[2rem] border border-black/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between md:mt-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 font-serif">Take Action</h2>
            <p className="text-base md:text-lg font-medium leading-relaxed mb-8">
              By choosing DROP, you are actively scaling production to drive down the cost of aluminum, helping phase out single-use plastics forever.
            </p>
            <Link 
              href="/#products"
              className="w-full bg-[#1B2A22] text-[#D4AF37] py-4 rounded-full text-center font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#2C4236] transition-colors shadow-lg"
            >
              Shop The Cans
            </Link>
          </div>

        </div>

      </main>

      {/* Ticker Tape */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 20s linear infinite;
        }
      `}} />
      <div className="w-full overflow-hidden bg-transparent text-[#D4AF37] py-8 border-y border-black/5 flex whitespace-nowrap">
        <div className="animate-custom-marquee flex items-center gap-12 font-black uppercase tracking-[0.2em] text-lg opacity-80">
           {/* First Set */}
           <span>★ DROP PLASTIC</span>
           <span>★ FOREVER METAL</span>
           <span>★ INFINITE RECYCLING</span>
           <span>★ ZERO COMPROMISE</span>
           <span>★ DROP PLASTIC</span>
           <span>★ FOREVER METAL</span>
           <span>★ INFINITE RECYCLING</span>
           <span>★ ZERO COMPROMISE</span>
           {/* Second Set (Duplicate for seamless loop) */}
           <span>★ DROP PLASTIC</span>
           <span>★ FOREVER METAL</span>
           <span>★ INFINITE RECYCLING</span>
           <span>★ ZERO COMPROMISE</span>
           <span>★ DROP PLASTIC</span>
           <span>★ FOREVER METAL</span>
           <span>★ INFINITE RECYCLING</span>
           <span>★ ZERO COMPROMISE</span>
        </div>
      </div>

      <Footer theme="olive" />
      <ScrollToTop />
    </div>
  );
}
