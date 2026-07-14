'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';
import { Particles } from '@/components/ui/particles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VariantShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const activeProduct = PRODUCTS[activeIndex];

  // Colors based on active product for subtle background accent
  const getAccentColor = (slug: string) => {
    switch (slug) {
      case 'mint': return '#2D1B4E';
      case 'athlete': return '#1A1A1A';
      case 'sparkling': return '#23272C';
      case 'clove': return '#5A0205';
      default: return '#111111';
    }
  };

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsFading(false);
    }, 300); // 300ms crossfade
  };

  const nextProduct = () => {
    handleSelect((activeIndex + 1) % PRODUCTS.length);
  };

  const prevProduct = () => {
    handleSelect((activeIndex - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <section id="products" className="w-full relative bg-[#F9F9F9] text-[#111111] font-sans border-b border-[#E5E5E5]/30 scroll-mt-24 overflow-hidden min-h-[80vh] flex items-center">
      
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0 opacity-30 transition-colors duration-1000"
        quantity={100}
        ease={80}
        color={getAccentColor(activeProduct.slug)}
        refresh
      />

      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-16 py-12 md:py-20 relative z-10">
        
        {/* Desktop Layout (Hidden on mobile) */}
        <div className="hidden md:flex flex-row items-center min-h-[60vh]">
          {/* Left: Dynamic Can Image */}
          <div className="w-1/2 flex justify-center relative">
            {/* Background Glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] transition-all duration-700 opacity-20"
              style={{ backgroundColor: getAccentColor(activeProduct.slug) }}
            />
            <div className={`relative w-[300px] lg:w-[400px] aspect-[1/2] transition-all duration-300 ${isFading ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
              <Image 
                src={activeProduct.image} 
                alt={activeProduct.displayName} 
                fill 
                className="object-contain drop-shadow-2xl" 
                priority
              />
            </div>
          </div>

          {/* Right: Content & Selectors */}
          <div className="w-1/2 flex flex-col justify-center pl-12 lg:pl-24">
            
            {/* Tab Selectors */}
            <div className="flex flex-wrap gap-3 mb-12">
              {PRODUCTS.map((p, idx) => (
                <button
                  key={`tab-${p.slug}`}
                  onClick={() => handleSelect(idx)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2 focus:ring-offset-[#F9F9F9] ${
                    activeIndex === idx 
                      ? 'bg-[#111111] text-white shadow-lg' 
                      : 'bg-[#E5E5E5]/50 text-[#111111]/60 hover:bg-[#E5E5E5] hover:text-[#111111]'
                  }`}
                  aria-pressed={activeIndex === idx}
                >
                  {p.displayName.replace(' DROP', '')}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className={`transition-all duration-300 ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]">
                {activeProduct.displayName}
              </h2>
              <div className="w-12 h-[2px] bg-[#111111] mb-6"></div>
              <p className="text-xl lg:text-2xl font-medium leading-relaxed text-[#111111]/80 mb-4 max-w-xl">
                {activeProduct.description}
              </p>
              <p className="text-sm font-bold tracking-widest uppercase text-[#111111]/50 mb-10">
                Designed for: {activeProduct.designedFor}
              </p>
              
              {activeProduct.status === 'available' || activeProduct.status === 'preorder' || activeProduct.status === 'coming-soon' ? (
                <Link 
                  href="/#waitlist" 
                  className="inline-block bg-[#111111] text-[#F9F9F9] px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#C9A84C] hover:text-[#111111] shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2"
                >
                  Join The List
                </Link>
              ) : (
                <div className="flex gap-4 items-center">
                  <span className="inline-block border border-[#111111]/20 text-[#111111] px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase rounded-full bg-[#E5E5E5]/20">
                    Coming Next
                  </span>
                  <Link href="/#waitlist" className="text-xs font-bold tracking-widest uppercase underline text-[#111111]/60 hover:text-[#111111] transition-colors">
                    Get Notified
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout (Hidden on desktop) */}
        <div className="md:hidden flex flex-col items-center pt-8">
          
          <div className="flex justify-between w-full items-center mb-10 px-2">
            <h2 className="text-xl font-bold tracking-tight uppercase">The Collection</h2>
            <div className="text-xs font-bold tracking-widest text-[#111111]/60">
              {activeIndex + 1} / {PRODUCTS.length}
            </div>
          </div>

          {/* Swipeable Card Area (Simulated via controls for now, implementing native touch swipe would require more complex hooks, keeping it simple and accessible with buttons) */}
          <div className="relative w-full flex items-center justify-center">
            
            <button 
              onClick={prevProduct}
              className="absolute left-0 z-20 p-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full text-[#111111] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111]"
              aria-label="Previous product"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="w-[280px] sm:w-[320px] bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center relative overflow-hidden">
               <div 
                className="absolute top-0 left-0 w-full h-32 opacity-10 transition-colors duration-500"
                style={{ background: `linear-gradient(to bottom, ${getAccentColor(activeProduct.slug)}, transparent)` }}
               />
               
               <div className={`relative w-[180px] h-[360px] mb-8 transition-all duration-300 ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                 <Image src={activeProduct.image} alt={activeProduct.displayName} fill className="object-contain drop-shadow-xl" priority />
               </div>

               <div className={`flex flex-col items-center text-center transition-all duration-300 w-full ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                 <h3 className="text-2xl font-black tracking-tighter mb-3 leading-tight">{activeProduct.displayName}</h3>
                 <p className="text-sm font-medium text-[#111111]/70 mb-4">{activeProduct.description}</p>
                 <p className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/40 mb-8 border-b border-[#E5E5E5] pb-4 w-full">
                   For: {activeProduct.designedFor}
                 </p>
                 
                 <Link 
                    href="/#waitlist" 
                    className="w-full block text-center bg-[#111111] text-[#F9F9F9] py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#C9A84C] hover:text-[#111111] transition-all duration-300 active:scale-95 shadow-xl"
                  >
                    Join The List
                  </Link>
               </div>
            </div>

            <button 
              onClick={nextProduct}
              className="absolute right-0 z-20 p-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full text-[#111111] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111]"
              aria-label="Next product"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
