'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import HydrationSection from '@/components/HydrationSection';
import LoginPage from '@/components/LoginPage';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Home() {
  const { isLoggedIn, addToCart } = useCart();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  const products = [
    {
      id: 'purple',
      name: 'Deep Purple',
      flavor: 'Mint Water',
      desc: 'Refreshing mint-infused still water designed to cool and soothe.',
      image: '/assets/new-can-variant-1.png',
      bg: 'bg-[#1A0B2E]/90',
      border: 'border-[#E9D5FF]/20',
      text: 'text-[#E9D5FF]',
      scale: 'scale-[1.1]',
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    },
    {
      id: 'black',
      name: 'Full Black',
      flavor: 'Athlete Edition',
      desc: 'High-performance hydration rich in natural trace minerals.',
      image: '/assets/new-can-variant-3.png',
      bg: 'bg-[#0A0A0A]/90',
      border: 'border-white/10',
      text: 'text-white',
      scale: 'scale-[1.1]',
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    },
    {
      id: 'gold',
      name: 'Pure Gold',
      flavor: 'Clove Water',
      desc: 'Infused with aromatic clove extracts to restore natural vitality.',
      image: '/assets/new-can-variant-2-final.png',
      bg: 'bg-[#1C170E]/90',
      border: 'border-[#C9A84C]/20',
      text: 'text-[#C9A84C]',
      scale: 'scale-[1.1]',
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    },
    {
      id: 'silver',
      name: 'Pure Silver',
      flavor: 'Sparkling Water',
      desc: 'Crisp, carbonated water for pure effervescent refreshment.',
      image: '/assets/new-can-2.png',
      bg: 'bg-[#15181B]/90',
      border: 'border-[#E2E8F0]/20',
      text: 'text-[#E2E8F0]',
      scale: 'scale-[1.1]',
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    }
  ];

  return (
    <>
      <HeroSection />

      <main className="relative z-10">
        <HydrationSection />

        {/* Section 3: Lineup */}
        <section id="products" className="min-h-screen bg-[var(--color-cream)] py-28 px-6 text-center flex flex-col justify-center items-center relative z-10">
          <h2 className="text-[clamp(3.5rem,8vw,6.5rem)] text-[var(--color-dark)] mb-4 font-black tracking-tight leading-none uppercase">
            YEAR ROUND
          </h2>
          <p className="text-lg md:text-xl font-bold text-[var(--color-red)] tracking-[0.2em] mb-20 uppercase">
            Available in Mint, Athlete, Clove, and Sparkling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 max-w-[90rem] mx-auto px-4 relative z-10 w-full">
            {products.map((p) => (
              <div 
                key={p.id} 
                className={`group relative rounded-[32px] overflow-hidden border ${p.border} ${p.bg} shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-[520px] p-6`}
              >
                {/* Image Pedestal / Container */}
                <div className="w-full h-[240px] relative overflow-hidden flex items-center justify-center mb-6 bg-black/10 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                  <div className="relative w-full h-[85%] transition-transform duration-700 group-hover:scale-105">
                    <Image 
                      src={p.image} 
                      alt={p.name} 
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 300px"
                      className={`object-contain object-center ${p.scale}`} 
                      style={{ filter: p.filter }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow text-center items-center justify-between">
                  <div>
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${p.text}`}>
                      {p.name}
                    </h3>
                    <p className="text-[#C9A84C] font-bold text-sm tracking-wider uppercase mt-1">
                      {p.flavor}
                    </p>
                    <p className="text-white/60 text-xs mt-3 px-2 font-medium leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Show Interest Button */}
                  <button 
                    onClick={() => addToCart({
                      id: p.id,
                      name: p.name,
                      flavor: p.flavor,
                      price: 'SURVEY ITEM',
                      image: p.image
                    })}
                    className="w-full mt-6 py-3.5 bg-[#C9A84C] hover:bg-[#B0913B] text-black font-extrabold tracking-widest text-[10px] rounded-full shadow-lg shadow-black/30 transition-all duration-300 uppercase active:scale-95 cursor-pointer"
                  >
                    Show Interest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
