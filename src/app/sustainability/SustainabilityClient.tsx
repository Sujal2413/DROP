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
    <div className="w-full relative bg-[var(--color-cream)] text-black font-sans selection:bg-black selection:text-white antialiased overflow-hidden min-h-screen border-x-2 border-black">
      
      {/* Dynamic Background Noise (Removed) */}

      {/* Navbar using Olive/Dark palette for black text on light background */}
      <HeroNavbar activeIndex={4} />

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-32 relative z-10">
        
        {/* Massive Headline */}
        <header className="py-20 text-center">
          <h1 className="text-[clamp(3rem,8vw,5rem)] font-black tracking-tighter uppercase leading-[0.85] mb-6 drop-shadow-[2px_2px_0px_var(--color-red)]">
            NO PLASTIC.<br />
            NO BULLSH*T.
          </h1>
          <p className="font-bold text-lg md:text-xl uppercase tracking-widest max-w-2xl mx-auto border-2 border-black p-3 bg-white shadow-[3px_3px_0px_black]">
            Luxury hydration that doesn't cost the earth.
          </p>
        </header>

        {/* Neo-brutalist Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8 relative z-10">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-[var(--color-mustard)] text-black p-6 md:p-8 border-2 border-black shadow-[5px_5px_0px_black] hover:shadow-[8px_8px_0px_black] flex flex-col justify-between cursor-default"
          >
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">100% Recyclable</h2>
            <p className="text-base md:text-lg font-bold leading-relaxed">
              Plastic degrades. Aluminum endures. 75% of all aluminum ever produced is still in active use today. Choose the forever metal.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-[var(--color-red)] text-white p-6 md:p-8 border-2 border-black shadow-[5px_5px_0px_black] hover:shadow-[8px_8px_0px_black] flex flex-col justify-between mt-6 md:mt-12 cursor-default"
          >
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 text-black drop-shadow-[1px_1px_0px_white]">Low Carbon Loop</h2>
            <p className="text-base md:text-lg font-bold leading-relaxed">
              Aluminum chills faster and weighs less. This means drastically fewer emissions during transport and refrigeration. Tight, localized, efficient.
            </p>
          </motion.div>

          {/* Card 3 */}
          <div className="bg-blue-600 text-white p-6 md:p-8 border-2 border-black shadow-[5px_5px_0px_black] hover:-translate-y-2 hover:shadow-[8px_8px_0px_black] transition-all duration-300 flex flex-col justify-between">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">Ethical Sourcing</h2>
            <p className="text-base md:text-lg font-bold leading-relaxed">
              We only take what the earth freely yields. We source exclusively from naturally replenishing springs. No draining basins. No habitat destruction.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-black text-white p-6 md:p-8 border-2 border-black shadow-[5px_5px_0px_var(--color-red)] hover:-translate-y-2 hover:shadow-[8px_8px_0px_var(--color-red)] transition-all duration-300 flex flex-col justify-between mt-6 md:mt-12">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">Take Action</h2>
            <p className="text-base md:text-lg font-bold leading-relaxed mb-6">
              By choosing DROP, you are actively scaling production to drive down the cost of aluminum, helping phase out single-use plastics forever.
            </p>
            <Link 
              href="/#products"
              className="w-full bg-white text-black py-3 text-center font-black uppercase tracking-widest border-2 border-transparent hover:border-white hover:bg-black hover:text-white transition-colors text-base"
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
      <div className="w-full overflow-hidden bg-transparent text-black py-4 border-y-2 border-black flex whitespace-nowrap">
        <div className="animate-custom-marquee flex items-center gap-8 font-black uppercase tracking-widest text-base">
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

      <Footer theme="default" />
      <ScrollToTop />
    </div>
  );
}
