'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';

export default function StoryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full relative bg-[#0F1112] text-white font-sans antialiased selection:bg-[#C9A84C] selection:text-black">
      <HeroNavbar activeIndex={1} />

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[#8b5cf6]/20 rounded-full blur-[60px] md:blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-[#C9A84C]/20 rounded-full blur-[60px] md:blur-[150px]"
        />
      </div>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-16 pt-28 sm:pt-32 pb-20 sm:pb-24 space-y-24 md:space-y-32 relative z-10">
        
        {/* Intro */}
        <section className="min-h-[70svh] flex flex-col justify-center items-start pt-16 sm:pt-20">
          <span className="text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-8">{'// THE ORIGIN'}</span>
          <h1
            className="text-4xl sm:text-5xl md:text-8xl font-black leading-none mb-8 text-white"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif', letterSpacing: 0 }}
          >
            A SIMPLE QUESTION.<br />
            <span className="text-[#C9A84C]">A BETTER CAN.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-medium">
            We started with a simple question: Why does the most essential thing we consume come in disposable plastic that pollutes our environment?
          </p>
        </section>

        {/* Story Part 1 */}
        <section ref={startRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1 relative w-full aspect-[4/5] md:aspect-square bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-8">
            <Image
              src="/assets/new-can-variant-3.png"
              alt="DROP Black Can"
              fill
              quality={85}
              className="object-contain scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              sizes="(max-width: 768px) 80vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-none"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              It started with clove.
            </h2>
            <div className="space-y-6 text-white/60 text-base sm:text-lg leading-relaxed font-medium">
              <p>
                Our initial exploration began with clove and mint water. We realized that the smallest daily choices—like the water we drink—often say the most about how we live. 
              </p>
              <p>
                We wanted to move away from disposable plastic and build a product that matched the quality of the water inside it. The aluminum can was the obvious choice for its recyclability and durability.
              </p>
            </div>
          </div>
        </section>

        {/* Story Part 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-8">
            <h2 
              className="text-3xl sm:text-4xl md:text-6xl font-black text-[#C9A84C] leading-none"
              style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
            >
              Building the future.
            </h2>
            <div className="space-y-6 text-white/60 text-base sm:text-lg leading-relaxed font-medium">
              <p>
                We are currently in the pre-launch phase, building the infrastructure to bring DROP to the market in 2027. Our focus right now is on refining the product and establishing the right manufacturing partnerships to scale sustainably.
              </p>
            </div>
            
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.16em] sm:tracking-widest text-white/40">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 mt-1.5 bg-[#C9A84C] rounded-full shrink-0" /> MATTE ALUMINUM VESSEL
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 mt-1.5 bg-[#C9A84C] rounded-full shrink-0" /> RECYCLABLE PACKAGING
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 mt-1.5 bg-[#C9A84C] rounded-full shrink-0" /> PREMIUM INGREDIENTS
              </li>
            </ul>
          </div>
          <div className="relative w-full aspect-[4/5] md:aspect-square bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-8">
            <Image
              src="/assets/new-can-variant-2-final.png"
              alt="DROP Gold Can"
              fill
              quality={85}
              className="object-contain scale-125 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              sizes="(max-width: 768px) 80vw, 50vw"
            />
          </div>
        </section>

        {/* Outro */}
        <section className="min-h-[60svh] flex flex-col justify-center items-center text-center space-y-10 sm:space-y-12">
          <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.4em] text-[#C9A84C] uppercase font-bold">{'// BE PART OF IT'}</span>
          <h2
            className="text-3xl sm:text-4xl md:text-7xl font-black text-white max-w-4xl leading-[0.95] md:leading-[0.9]"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
          >
            WATER DOES NOT NEED TO BE LOUDER. IT NEEDS TO BE BETTER.
          </h2>
          <div className="pt-8">
            <Link 
              href="/#waitlist"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-5 bg-transparent border border-white/20 hover:border-white text-white font-bold text-xs tracking-[0.16em] sm:tracking-widest uppercase transition-all rounded-none focus:outline-none focus:ring-2 focus:ring-white"
            >
              Join the Launch List
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
