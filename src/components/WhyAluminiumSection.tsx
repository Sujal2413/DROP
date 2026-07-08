'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyAluminiumSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F1112] py-28 md:py-36 px-8 md:px-16 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div ref={contentRef} className="max-w-2xl mx-auto text-center relative z-10 opacity-0">
        <h2
          className="text-white mb-8"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            lineHeight: 0.95,
          }}
        >
          Why a can, not a bottle.
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium">
          Aluminium is infinitely recyclable and doesn&apos;t carry the same afterlife problem
          plastic does. It&apos;s also colder, sturdier, and doesn&apos;t hold onto plastic taste.
        </p>
      </div>
    </section>
  );
}
