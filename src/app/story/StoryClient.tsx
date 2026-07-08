'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full relative bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#C9A84C] selection:text-black">
      <HeroNavbar activeIndex={1} />

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[#8b5cf6]/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-[#C9A84C]/20 rounded-full blur-[150px]"
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-24 space-y-32 relative z-10">
        
        {/* Intro */}
        <section className="min-h-[70vh] flex flex-col justify-center items-start pt-20">
          <span className="text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-8">// THE GENESIS</span>
          <h1
            className="text-5xl md:text-8xl font-black leading-none mb-8 text-white"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif', letterSpacing: '-0.02em' }}
          >
            A SIMPLE HABIT.<br />
            <span className="text-[#C9A84C]">A BIGGER QUESTION.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-medium">
            Luxury is not found in excess, but in the essential. We redesigned the most fundamental element of life for those who demand ethical clarity without compromising on aesthetic prestige.
          </p>
        </section>

        {/* Story Part 1 */}
        <section ref={startRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative w-full aspect-[4/5] md:aspect-square bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-8">
            <Image
              src="/assets/new-can-variant-3.png"
              alt="DROP Black Can"
              fill
              className="object-contain scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 
              className="text-4xl md:text-6xl font-black text-white leading-none"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              It started with water.
            </h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed font-medium">
              <p>
                Born from a desire to strip away the noise of the commercial beverage industry. We looked at the spring—not as a resource to be exploited, but as a legacy to be protected.
              </p>
              <p>
                It began with clove water. Paying attention to what goes into the body, and slowly realizing that the smallest daily choices often say the most about how we live. Why does the most essential thing we consume still feel so ordinary?
              </p>
            </div>
          </div>
        </section>

        {/* Story Part 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 
              className="text-4xl md:text-6xl font-black text-[#C9A84C] leading-none"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              Just water.<br/>
              <span className="text-white">Designed with intention.</span>
            </h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed font-medium">
              <p>
                Our vessel is a statement of permanence in a world of disposability. Crafted from 100% infinitely recyclable aluminum, it is designed to feel as substantial as the liquid it protects. No labels. No clutter. Just the essence.
              </p>
            </div>
            
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" /> ZERO PLASTIC LEACHING
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" /> THERMAL TEMPERATURE LOCK
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" /> MATTE ALUMINUM VESSEL
              </li>
            </ul>
          </div>
          <div className="relative w-full aspect-[4/5] md:aspect-square bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-8">
            <Image
              src="/assets/new-can-variant-2-final.png"
              alt="DROP Gold Can"
              fill
              className="object-contain scale-125 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Outro */}
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center space-y-12">
          <span className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase font-bold">// THE FINAL THOUGHT</span>
          <h2
            className="text-4xl md:text-7xl font-black text-white max-w-4xl leading-[0.9]"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
          >
            WATER DOES NOT NEED TO BE LOUDER. IT NEEDS TO BE BETTER.
          </h2>
          <div className="pt-8">
            <Link 
              href="/#waitlist"
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white/20 hover:border-white text-white font-bold text-xs tracking-widest uppercase transition-all rounded-none"
            >
              Join the Waitlist
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer theme="dark" />
      <ScrollToTop />
    </div>
  );
}
