'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExplainerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
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
      gsap.fromTo(
        bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
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
      className="relative bg-[#0F0F11] py-32 md:py-40 px-8 md:px-16 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A84C]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2
          ref={headlineRef}
          className="opacity-0 text-white mb-8"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
          }}
        >
          Water. Reconsidered.
        </h2>
        <p
          ref={bodyRef}
          className="opacity-0 text-white/70 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto"
        >
          No sugar. No flavour. No noise. DROP. is still water in a recyclable
          aluminium can — infused with mint, clove, or natural minerals for those
          who want more. Not another plastic bottle. A better standard.
        </p>
      </div>
    </section>
  );
}
