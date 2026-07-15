'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Droplet, Recycle, Ban, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDITORIAL_IMAGES = [
  { src: '/assets/drop_can_macro.png', alt: 'Macro water splash texture on cold brushed aluminium surface', width: 600, height: 800 },
  { src: '/assets/drop_can_urban.png', alt: 'DROP clean aluminium water can sitting on granite ledge in modern city', width: 700, height: 500 },
  { src: '/assets/drop_can_held.png', alt: 'DROP water can being held during a fitness workout', width: 500, height: 700 },
  { src: '/assets/drop_can_ice.png', alt: 'DROP premium water can resting on fresh crushed ice', width: 800, height: 600 },
];

export default function FeatureSplitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    // We want the horizontal scroll to happen as we scroll down vertically
    const ctx = gsap.context(() => {
      const scrollWidth = scrollWrapperRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          end: () => `+=${scrollWidth - windowWidth}`,
        }
      });
      
      tl.to(scrollWrapperRef.current, {
        x: () => -(scrollWidth - windowWidth),
        ease: "none"
      });

      // Subtle scale-down effect for images as they scroll by
      gsap.utils.toArray('.editorial-image-container').forEach((el: unknown) => {
        gsap.fromTo(el as Element, 
          { scale: 1 }, 
          { 
            scale: 0.85, 
            ease: "none",
            scrollTrigger: {
              trigger: el as Element,
              containerAnimation: tl,
              start: "left center",
              end: "right center",
              scrub: true,
            }
          }
        );
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="features" 
      ref={containerRef}
      className="relative w-full h-[100svh] bg-[#F4F4F3] text-[#111111] flex overflow-hidden border-b border-[#E5E5E5]/30 z-10 m-0 p-0"
    >
      <div 
        ref={scrollWrapperRef}
        className="flex h-full items-center gap-16 md:gap-32 px-[10vw] pr-[20vw] will-change-transform"
      >
        {/* Intro Text Block inside the horizontal scroll */}
        <div className="w-[85vw] md:w-[50vw] flex-shrink-0 flex flex-col justify-center pr-8 md:pr-16">
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-6 uppercase"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontWeight: 900,
            }}
          >
            Filtered to be better.<br />
            <span className="text-[#1A5F7A]">Naturally.</span>
          </h2>
          
          <p className="text-lg md:text-xl font-medium text-[#111111]/70 leading-relaxed mb-12 max-w-xl">
            Our purity comes from the power of pristine sources. We&apos;ve created a collection of premium functional waters for you, without a single compromise.
          </p>

          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12 max-w-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Ban size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-xs">No<br/>Plastic</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Droplet size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-xs">Real<br/>Minerals</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Zap size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-xs">Zero<br/>Sugar</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Recycle size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-xs">100%<br/>Recyclable</div>
            </div>
          </div>

          <div>
            <Link
              href="/#waitlist"
              className="inline-block bg-[#D62828] text-white px-10 py-5 text-sm font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#A81D1D] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-xl shadow-[#D62828]/20 focus:outline-none focus:ring-2 focus:ring-[#D62828] focus:ring-offset-2 focus:ring-offset-[#F4F4F3]"
            >
              Check Availability
            </Link>
          </div>
        </div>

        {/* Editorial Images */}
        {EDITORIAL_IMAGES.map((item, index) => (
          <div 
            key={`editorial-${index}`} 
            className={`flex-shrink-0 relative overflow-hidden rounded-[2px] shadow-2xl editorial-image-container
              ${index % 2 === 0 ? 'mt-[-10vh]' : 'mt-[20vh]'}
            `}
            style={{ 
              width: `${Math.min(item.width, 80)}vw`,
              maxWidth: `${item.width}px`, 
              height: `${Math.min(item.height, 70)}vh`,
              maxHeight: `${item.height}px` 
            }}
          >
            <Image 
              src={item.src} 
              alt={item.alt} 
              fill 
              sizes="(max-width: 1024px) 80vw, 50vw"
              className="object-cover transition-transform duration-[2s] hover:scale-105" 
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
