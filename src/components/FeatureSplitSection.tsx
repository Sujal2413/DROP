'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Droplet, Recycle, Ban, Zap } from 'lucide-react';

const COL_1_IMAGES = [
  '/assets/new-can-2.png',
  '/assets/new-can-variant-1.png',
  '/assets/clove_can_transparent.png',
  '/assets/new-can-variant-3.png',
];

const COL_2_IMAGES = [
  '/assets/new-can-variant-3.png',
  '/assets/clove_can_transparent.png',
  '/assets/new-can-2.png',
  '/assets/new-can-variant-1.png',
];

export default function FeatureSplitSection() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#F4F4F3] text-[#111111] flex flex-col lg:flex-row overflow-hidden border-b border-[#E5E5E5]/30 z-10">
      
      {/* Left side: Vertical Scrolling Images */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden bg-[#EBEBEA]">
        {/* Gradients for smooth fade out at top and bottom */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F4F4F3] to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F4F4F3] to-transparent z-10" />

        <div className="absolute inset-0 flex gap-4 p-4 lg:p-8 md:gap-8 justify-center transform -rotate-2 scale-105">
          {/* Column 1 (Scrolls Up) */}
          <div className="flex flex-col gap-4 md:gap-8 w-1/2 animate-scroll-up">
            {[...COL_1_IMAGES, ...COL_1_IMAGES, ...COL_1_IMAGES].map((src, i) => (
              <div key={`col1-${i}`} className="relative aspect-[3/4] w-full bg-white rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center p-6 overflow-hidden">
                <Image src={src} alt="Drop Water Can" fill className="object-contain p-4 md:p-8 drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
          
          {/* Column 2 (Scrolls Down) */}
          <div className="flex flex-col gap-4 md:gap-8 w-1/2 animate-scroll-down">
            {[...COL_2_IMAGES, ...COL_2_IMAGES, ...COL_2_IMAGES].map((src, i) => (
              <div key={`col2-${i}`} className="relative aspect-[3/4] w-full bg-white rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center p-6 overflow-hidden">
                <Image src={src} alt="Drop Water Can" fill className="object-contain p-4 md:p-8 drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-6">
          Filtered to be better.<br />
          <span className="text-[#1A5F7A]">Naturally.</span>
        </h2>
        
        <p className="text-lg md:text-xl font-medium text-[#111111]/70 leading-relaxed mb-12 max-w-lg">
          Our purity comes from the power of pristine sources. We&apos;ve created a collection of premium functional waters for you, without a single compromise.
        </p>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
              <Ban size={24} strokeWidth={2.5} />
            </div>
            <div className="font-bold uppercase tracking-widest text-xs">No<br/>Plastic</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
              <Droplet size={24} strokeWidth={2.5} />
            </div>
            <div className="font-bold uppercase tracking-widest text-xs">Real<br/>Minerals</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
              <Zap size={24} strokeWidth={2.5} />
            </div>
            <div className="font-bold uppercase tracking-widest text-xs">Zero<br/>Sugar</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
              <Recycle size={24} strokeWidth={2.5} />
            </div>
            <div className="font-bold uppercase tracking-widest text-xs">100%<br/>Recyclable</div>
          </div>
        </div>

        <div>
          <Link
            href="/#waitlist"
            className="inline-block bg-[#D62828] text-white px-8 md:px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#A81D1D] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-xl shadow-[#D62828]/20 focus:outline-none focus:ring-2 focus:ring-[#D62828] focus:ring-offset-2 focus:ring-offset-[#F4F4F3]"
          >
            Check Availability
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-33.33%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-33.33%); }
          100% { transform: translateY(0%); }
        }
        .animate-scroll-up {
          animation: scrollUp 20s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 20s linear infinite;
        }
        /* Pausing animations on hover for better UX */
        .animate-scroll-up:hover, .animate-scroll-down:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
