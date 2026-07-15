'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function VariantShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = PRODUCTS[activeIndex];

  // Colors based on active product for subtle background accent
  const getGradient = (slug: string) => {
    switch (slug) {
      case 'mint': return 'radial-gradient(circle at 75% 50%, rgba(45,27,78,0.4) 0%, transparent 60%)';
      case 'athlete': return 'radial-gradient(circle at 75% 50%, rgba(26,26,26,0.4) 0%, transparent 60%)';
      case 'sparkling': return 'radial-gradient(circle at 75% 50%, rgba(35,39,44,0.4) 0%, transparent 60%)';
      case 'clove': return 'radial-gradient(circle at 75% 50%, rgba(90,2,5,0.4) 0%, transparent 60%)';
      default: return 'radial-gradient(circle at 75% 50%, rgba(17,17,17,0.4) 0%, transparent 60%)';
    }
  };

  return (
    <section id="products" className="relative w-full bg-[#111111] text-[#F9F9F9] font-sans border-b border-[#E5E5E5]/10 min-h-screen flex overflow-hidden">
      
      {/* Background Gradient Transition */}
      <AnimatePresence>
        <motion.div
          key={activeProduct.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: getGradient(activeProduct.slug) }}
        />
      </AnimatePresence>

      <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row relative z-10">
        
        {/* Left Sticky Column: Minimalist Vertical Tab List */}
        <div className="w-full md:w-1/3 lg:w-1/4 pt-24 md:pt-40 px-8 md:px-16 flex flex-col md:border-r border-white/10 md:sticky md:top-0 h-auto md:h-screen">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-12">
            The Collection
          </h2>
          
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide">
            {PRODUCTS.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={p.slug}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`relative flex items-center p-4 rounded-xl transition-all duration-300 text-left focus:outline-none ${
                    isActive 
                      ? 'bg-white/5 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]' 
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <span className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
                    {p.displayName.replace(' DROP', '')}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-white rounded-r-full hidden md:block"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Dynamic Column */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-32 relative">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center z-20 mt-12 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] uppercase" style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}>
                  {activeProduct.displayName}
                </h2>
                
                <p className="text-lg lg:text-xl font-medium leading-relaxed text-white/70 mb-8 max-w-md">
                  {activeProduct.description}
                </p>
                
                <div className="flex flex-col gap-2 mb-10">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/10 pb-4 mb-2 w-max">
                    Designed for: {activeProduct.designedFor}
                  </p>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 w-max">
                    Size: {activeProduct.availableSizes?.[0]?.toUpperCase()} CAN
                  </p>
                </div>
                
                {activeProduct.status === 'available' || activeProduct.status === 'preorder' || activeProduct.status === 'coming-soon' ? (
                  <Link 
                    href="/#waitlist" 
                    className="inline-flex items-center justify-center bg-white text-black px-10 py-5 text-xs font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#C9A84C] hover:text-black hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-xl focus:outline-none w-max"
                  >
                    Join The List
                  </Link>
                ) : (
                  <div className="flex gap-4 items-center">
                    <span className="inline-block border border-white/20 text-white px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase rounded-full bg-white/5">
                      Coming Next
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Can Render */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[50vh] md:h-[70vh] z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.slug}
                initial={{ opacity: 0, x: 100, scale: 0.9, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -15, 0] // Subtle floating animation
                }}
                exit={{ opacity: 0, x: -100, scale: 0.9, rotate: -10 }}
                transition={{ 
                  duration: 0.6,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-[300px] lg:w-[450px] aspect-[1/2]"
              >
                <Image 
                  src={activeProduct.image} 
                  alt={activeProduct.displayName} 
                  fill 
                  className="object-contain drop-shadow-2xl" 
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
