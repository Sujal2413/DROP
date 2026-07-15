'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function VariantShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = PRODUCTS[activeIndex];

  // Rich, premium gradients tailored to each variant
  const getGradient = (slug: string) => {
    switch (slug) {
      case 'mint': return 'linear-gradient(145deg, #0F0518 0%, #2A1744 100%)';
      case 'athlete': return 'linear-gradient(145deg, #050505 0%, #171717 100%)';
      case 'sparkling': return 'linear-gradient(145deg, #03080F 0%, #0C2033 100%)';
      case 'clove': return 'linear-gradient(145deg, #1A0102 0%, #4A0205 100%)';
      default: return 'linear-gradient(145deg, #0A0A0A 0%, #1A1A1A 100%)';
    }
  };

  // Vibrant accent colors for interactive elements
  const getAccentColor = (slug: string) => {
    switch (slug) {
      case 'mint': return '#D6BCFA'; // Soft vibrant purple
      case 'athlete': return '#F8FAFC'; // Crisp white
      case 'sparkling': return '#BEE3F8'; // Soft cyan/blue
      case 'clove': return '#FEB2B2'; // Soft vibrant red
      default: return '#FFFFFF';
    }
  };

  const getGlowColor = (slug: string) => {
    switch (slug) {
      case 'mint': return 'rgba(139, 92, 246, 0.4)';
      case 'athlete': return 'rgba(255, 255, 255, 0.2)';
      case 'sparkling': return 'rgba(147, 197, 253, 0.4)';
      case 'clove': return 'rgba(239, 68, 68, 0.4)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  };

  const accentColor = getAccentColor(activeProduct.slug);
  const glowColor = getGlowColor(activeProduct.slug);

  return (
    <section id="products" className="relative w-full text-white font-sans min-h-screen flex overflow-hidden bg-[#050505]">
      
      {/* Background Gradient Transition */}
      <AnimatePresence>
        <motion.div
          key={activeProduct.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: getGradient(activeProduct.slug) }}
        />
      </AnimatePresence>
      
      {/* Ambient Glow behind the can */}
      <AnimatePresence>
        <motion.div
          key={`glow-${activeProduct.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full blur-[120px] pointer-events-none z-0"
          style={{ background: glowColor }}
        />
      </AnimatePresence>

      <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row relative z-10">
        
        {/* Left Sticky Column: Glassmorphism Tab List */}
        <div className="w-full md:w-1/3 lg:w-1/4 pt-24 md:pt-40 px-6 md:px-12 lg:px-16 flex flex-col md:border-r border-white/5 md:sticky md:top-0 h-auto md:h-screen z-20">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-10 pl-4">
            The Collection
          </h2>
          
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide">
            {PRODUCTS.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={p.slug}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex items-center px-5 py-4 md:py-5 rounded-2xl transition-all duration-500 text-left focus:outline-none group overflow-hidden ${
                    isActive 
                      ? 'bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 backdrop-blur-md' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span 
                    className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors duration-500 relative z-10 ${
                      isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                    }`}
                  >
                    {p.displayName.replace(' DROP', '')}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full hidden md:block z-20"
                      style={{ backgroundColor: getAccentColor(p.slug) }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent z-0"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Dynamic Column */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 md:py-32 relative z-10">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center z-20 mt-16 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 
                  className="text-6xl lg:text-[5.5rem] font-bold tracking-tighter mb-6 leading-[0.95] uppercase" 
                  style={{ 
                    fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
                    color: accentColor,
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                >
                  {activeProduct.displayName}
                </h2>
                
                <p className="text-base lg:text-lg font-medium leading-relaxed text-white/60 mb-10 max-w-md">
                  {activeProduct.description}
                </p>
                
                <div className="flex flex-col gap-4 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/50">
                      Designed for: <span className="text-white/90">{activeProduct.designedFor}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/50">
                      Size: <span className="text-white/90">{activeProduct.availableSizes?.[0]?.toUpperCase()} CAN</span>
                    </p>
                  </div>
                </div>
                
                {activeProduct.status === 'available' || activeProduct.status === 'preorder' || activeProduct.status === 'coming-soon' ? (
                  <Link 
                    href="/#waitlist" 
                    className="inline-flex items-center justify-center px-10 py-5 text-xs font-black tracking-[0.2em] uppercase rounded-full hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent w-max group relative overflow-hidden"
                    style={{ 
                      backgroundColor: accentColor,
                      color: '#000000',
                      boxShadow: `0 10px 25px -5px ${glowColor}`
                    }}
                  >
                    <span className="relative z-10">Join The List</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-white/5 border border-white/10 text-white/50 backdrop-blur-md">
                    Coming Next
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Can Render */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[45vh] md:h-[75vh] z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.slug}
                initial={{ opacity: 0, scale: 0.85, y: 50, rotate: -5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [0, -20, 0], // Smooth continuous floating
                  rotate: [0, 2, 0]
                }}
                exit={{ opacity: 0, scale: 0.85, y: -50, rotate: 5 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-[280px] lg:w-[420px] aspect-[1/2]"
              >
                <Image 
                  src={activeProduct.image} 
                  alt={activeProduct.displayName} 
                  fill 
                  className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" 
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
