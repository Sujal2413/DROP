'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DRINK_OPTIONS = ['Gym', 'Café', 'Home', 'Work', 'Events', 'Other'] as const;

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [drinkContext, setDrinkContext] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, city, drinkContext }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setName('');
        setEmail('');
        setCity('');
        setDrinkContext('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

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
            DROP. hasn&apos;t launched yet. The first batch goes to the list.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-16 px-8 border border-[#C9A84C]/20 rounded-3xl bg-[#C9A84C]/[0.03]">
            <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-[#C9A84C] text-2xl font-black tracking-tight mb-3 uppercase">You&apos;re In</h3>
            <p className="text-white/60 font-medium text-sm">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-all rounded-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-all rounded-none"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Mumbai, Delhi, Bangalore..."
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-all rounded-none"
              />
            </div>

            {/* Drink Context */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Where would you drink DROP.?</label>
              <select
                value={drinkContext}
                onChange={(e) => setDrinkContext(e.target.value)}
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium focus:outline-none focus:border-[#C9A84C] transition-all appearance-none cursor-pointer rounded-none"
              >
                <option value="" className="bg-[#0A0A0A]">Select an option</option>
                {DRINK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0A0A0A]">{opt}</option>
                ))}
              </select>
            </div>

            {/* Error message */}
            {status === 'error' && (
              <p className="text-red-400 text-xs font-medium text-center">{message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group relative w-full py-4 bg-[#C9A84C] hover:bg-[#B0913B] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black tracking-[0.2em] text-xs rounded-full shadow-lg shadow-[#C9A84C]/10 hover:shadow-[#C9A84C]/25 transition-all duration-300 uppercase active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-8">
                {status === 'loading' ? 'Joining...' : 'Join the List'}
              </span>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-black">
                {/* Eyes Motif */}
                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-black rounded-full animate-pulse delay-75" />
              </span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
