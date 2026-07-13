'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadForm, { LeadFormConfig } from './ui/LeadForm';

gsap.registerPlugin(ScrollTrigger);

const DRINK_OPTIONS = ['Gym', 'Café', 'Home', 'Work', 'Events', 'Other'] as const;

const waitlistConfig: LeadFormConfig = {
  endpoint: '/api/waitlist',
  submitText: 'Join the List',
  submitLoadingText: 'Joining...',
  successTitle: 'You\'re In',
  layout: 'stack',
  selectBgColor: '#0A0A0A',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Mumbai, Delhi, Bangalore...' },
    { name: 'drinkContext', label: 'Where would you drink DROP.?', type: 'select', options: DRINK_OPTIONS }
  ]
};

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      id="waitlist"
      className="relative bg-[#0A0A0A] py-28 md:py-36 px-8 md:px-16 overflow-hidden"
    >
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={formRef} className="max-w-xl mx-auto relative z-10 opacity-0">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
            }}
          >
            Be first to try it.
          </h2>
          <p className="text-white/50 text-sm md:text-base font-medium tracking-wide">
            Launching 2027. The first batch goes to the list.
          </p>
          <div className="inline-block mt-4 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] md:text-xs font-bold tracking-widest uppercase">
            300ML & 500ML CANS
          </div>
        </div>

        <LeadForm config={waitlistConfig} />
      </div>
    </section>
  );
}
