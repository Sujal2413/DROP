'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Droplet, Recycle, Ban, Zap } from 'lucide-react';

const COL_1_ITEMS = [
  { src: '/assets/drop_can_condensation.png', alt: 'DROP premium aluminium can covered in ice-cold condensation', height: 380 },
  { src: '/assets/drop_can_held.png', alt: 'DROP water can being held during a fitness workout', height: 280 },
  { src: '/assets/drop_can_macro.png', alt: 'Macro water splash texture on cold brushed aluminium surface', height: 440 },
  { src: '/assets/drop_can_urban.png', alt: 'DROP clean aluminium water can sitting on granite ledge in modern city', height: 320 },
];

const COL_2_ITEMS = [
  { src: '/assets/drop_can_ice.png', alt: 'DROP premium water can resting on fresh crushed ice', height: 300 },
  { src: '/assets/drop_can_gym.png', alt: 'DROP water can next to a yoga mat in modern concrete gym', height: 420 },
  { src: '/assets/drop_can_cafe.png', alt: 'DROP water can on outdoor cafe table concrete setting', height: 350 },
  { src: '/assets/drop_can_condensation.png', alt: 'Macro close-up details of droplets on DROP water can', height: 280 },
];

export default function FeatureSplitSection() {
  return (
    <section 
      id="features" 
      className="relative w-full min-h-[100svh] bg-[#F4F4F3] text-[#111111] flex flex-col lg:flex-row overflow-hidden border-b border-[#E5E5E5]/30 z-10 m-0 p-0"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      
      {/* Left side: Vertical Image Marquee */}
      <div className="w-full lg:w-[49%] h-[60svh] lg:h-[100svh] relative overflow-hidden bg-[#EBEBEA] select-none pointer-events-none">
        
        <div className="absolute inset-0 flex gap-3 lg:gap-4 p-3 lg:p-4 justify-center">
          
          {/* Column 1 (Moves top to bottom) */}
          <div className="w-1/2 overflow-hidden relative h-full">
            <div className="flex flex-col gap-3 lg:gap-4 w-full animate-marquee-down will-change-transform">
              {/* Double render to guarantee seamless infinite scroll loop */}
              {[...COL_1_ITEMS, ...COL_1_ITEMS].map((item, i) => (
                <div 
                  key={`col1-${i}`} 
                  className="relative w-full overflow-hidden rounded-[20px] lg:rounded-[28px] bg-[#E1E1E0] shadow-sm shrink-0"
                  style={{ height: `${item.height}px` }}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    sizes="(max-width: 1024px) 25vw, 50vw"
                    className="object-cover" 
                    priority={i < 2}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 (Moves top to bottom, offset speed and delayed/staggered start) */}
          <div className="w-1/2 overflow-hidden relative h-full">
            <div className="flex flex-col gap-3 lg:gap-4 w-full animate-marquee-down-slow will-change-transform">
              {[...COL_2_ITEMS, ...COL_2_ITEMS].map((item, i) => (
                <div 
                  key={`col2-${i}`} 
                  className="relative w-full overflow-hidden rounded-[20px] lg:rounded-[28px] bg-[#E1E1E0] shadow-sm shrink-0"
                  style={{ height: `${item.height}px` }}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    sizes="(max-width: 1024px) 25vw, 50vw"
                    className="object-cover" 
                    priority={i < 2}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Right side: Content Block */}
      <div className="w-full lg:w-[51%] flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24 bg-[#F4F4F3] relative z-10">
        <div className="max-w-[580px] w-full">
          <h2 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 uppercase"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontWeight: 900,
            }}
          >
            Filtered to be better.<br />
            <span className="text-[#1A5F7A]">Naturally.</span>
          </h2>
          
          <p className="text-base md:text-lg font-medium text-[#111111]/70 leading-relaxed mb-12">
            Our purity comes from the power of pristine sources. We&apos;ve created a collection of premium functional waters for you, without a single compromise.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Ban size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">No<br/>Plastic</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Droplet size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">Real<br/>Minerals</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Zap size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">Zero<br/>Sugar</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Recycle size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">100%<br/>Recyclable</div>
            </div>
          </div>

          <div>
            <Link
              href="/#waitlist"
              className="inline-block bg-[#D62828] text-white px-8 md:px-12 py-4 text-xs font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#A81D1D] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-xl shadow-[#D62828]/20 focus:outline-none focus:ring-2 focus:ring-[#D62828] focus:ring-offset-2 focus:ring-offset-[#F4F4F3]"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>

      {/* High-performance GPU-friendly vertical scrolling tracks CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeDown {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0%, 0); }
        }
        
        .animate-marquee-down {
          animation: marqueeDown 28s linear infinite;
        }

        .animate-marquee-down-slow {
          animation: marqueeDown 36s linear infinite;
          animation-delay: -18s; /* Staggers initial starting layout positions */
        }

        /* Respect accessibility prefers-reduced-motion and pause animation */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-down, .animate-marquee-down-slow {
            animation: none !important;
            transform: translate3d(0, -25%, 0) !important;
          }
        }
      `}} />
    </section>
  );
}
