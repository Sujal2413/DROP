'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function VariantShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = PRODUCTS[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // IntersectionObserver to track visibility
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play logic to automatically cycle variants
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Premium, deep dark gradients
  const getGradient = (slug: string) => {
    switch (slug) {
      case 'mint-water': return 'linear-gradient(180deg, #07030A 0%, #150A21 100%)';
      case 'athlete-edition': return 'linear-gradient(180deg, #050505 0%, #111111 100%)';
      case 'clove-water': return 'linear-gradient(180deg, #0A0203 0%, #1F0506 100%)';
      case 'still-water':
      default: return 'linear-gradient(180deg, #050709 0%, #0C1217 100%)';
    }
  };

  // High contrast accent colors
  const getAccentColor = (slug: string) => {
    switch (slug) {
      case 'mint-water': return '#D6BCFA'; // Soft vibrant purple
      case 'athlete-edition': return '#F8FAFC'; // Crisp white
      case 'clove-water': return '#FEB2B2'; // Soft vibrant red
      case 'still-water':
      default: return '#E2E8F0'; // Metallic silver
    }
  };

  // Dynamic typography for titles based on the product
  const getFontFamily = (slug: string) => {
    switch (slug) {
      case 'mint-water': return 'var(--font-heading)'; // Oswald for modern display
      case 'athlete-edition': return '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif'; // Sporty and bold
      case 'clove-water': return 'var(--font-serif)'; // Elegant serif
      case 'still-water':
      default: return 'var(--font-body)'; // Clean geometric sans
    }
  };

  // Custom text styling adjustments per font
  const getTitleStyles = (slug: string) => {
    const base = { fontFamily: getFontFamily(slug), color: getAccentColor(slug) };
    switch (slug) {
      case 'mint-water':
        return { ...base, textTransform: 'uppercase' as const, letterSpacing: '0.02em', fontWeight: 600 };
      case 'athlete-edition':
        return { ...base, textTransform: 'uppercase' as const, letterSpacing: '-0.02em', fontWeight: 900, transform: 'scaleY(1.1)' };
      case 'clove-water':
        return { ...base, textTransform: 'none' as const, letterSpacing: '0', fontWeight: 400, fontStyle: 'italic' };
      case 'still-water':
      default:
        return { ...base, textTransform: 'uppercase' as const, letterSpacing: '-0.04em', fontWeight: 800 };
    }
  };

  const accentColor = getAccentColor(activeProduct.slug);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const shouldFloat = isVisible && !isMobile && !prefersReducedMotion;

  return (
    <section ref={sectionRef} id="products" className="relative w-full text-white font-sans min-h-screen flex overflow-hidden bg-[#050505]">
      
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
      
      <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row relative z-10">
        
        {/* Left Sticky Column: Tab List */}
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
                  className={`relative flex items-center px-5 py-4 md:py-5 rounded-2xl transition-all duration-500 text-left focus:outline-none group overflow-hidden touch-manipulation border ${
                    isActive 
                      ? 'bg-white/5 border-white/10' 
                      : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <span 
                    className={`text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-500 relative z-10 ${
                      isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                    }`}
                  >
                    {p.displayName.replace(' DROP', '')}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] hidden md:block z-20"
                      style={{ backgroundColor: getAccentColor(p.slug) }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                  className="text-5xl md:text-6xl lg:text-[6rem] mb-6 leading-[1.1] origin-left" 
                  style={getTitleStyles(activeProduct.slug)}
                >
                  {activeProduct.displayName.replace('DROP ', '')}
                </h2>
                
                <p className="text-base lg:text-lg font-light leading-relaxed text-white/70 mb-10 max-w-md">
                  {activeProduct.description}
                </p>
                
                <div className="flex flex-col gap-4 mb-12">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 w-32">
                      Designed for
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white/90">
                      {activeProduct.designedFor}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 w-32">
                      Format
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white/90">
                      {activeProduct.availableSizes?.join(' / ').toUpperCase()} CAN
                    </span>
                  </div>
                </div>
                
                {activeProduct.status === 'available' || activeProduct.status === 'preorder' || activeProduct.status === 'coming-soon' ? (
                  <Link 
                    href="/#waitlist" 
                    className="inline-flex items-center justify-center px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase border hover:bg-white hover:text-black transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent w-max group touch-manipulation"
                    style={{ 
                      borderColor: accentColor,
                      color: '#FFFFFF'
                    }}
                  >
                    <span>Join The List</span>
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-center px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase border border-white/10 text-white/40">
                    Coming Next
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clean Floating Can Render - Removed the cheap white glow */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[45vh] md:h-[75vh] z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.slug}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: shouldFloat ? [0, -15, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ 
                  duration: isMobile ? 0.4 : 0.7,
                  ease: "easeOut",
                  ...(shouldFloat ? {
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {})
                }}
                className={`relative w-full aspect-[1/2] ${
                  activeProduct.slug === 'still-water' 
                    ? 'max-w-[300px] lg:max-w-[440px]' 
                    : 'max-w-[280px] lg:max-w-[420px]'
                }`}
              >
                <Image 
                  src={activeProduct.image} 
                  alt={activeProduct.displayName} 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 768px) 300px, 440px"
                  quality={95}
                  priority
                  style={{
                    // High-end ambient shadow to ground the object instead of a glowing aura. Fixed 0px for Safari compatibility.
                    filter: 'drop-shadow(0px 25px 25px rgba(0,0,0,0.5))'
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
