'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BUSINESS_TYPES = ['Café', 'Gym', 'Hotel', 'Salon', 'Co-working', 'Event', 'Other'] as const;
const VOLUME_OPTIONS = ['<100 cans', '100–500', '500–1000', '1000+'] as const;

export default function B2BSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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
      const res = await fetch('/api/b2b-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, contactName, email, businessType, monthlyVolume }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setBusinessName('');
        setContactName('');
        setEmail('');
        setBusinessType('');
        setMonthlyVolume('');
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
      id="b2b"
      className="relative bg-[#0F1112] py-28 md:py-36 px-8 md:px-16 overflow-hidden"
    >
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div ref={contentRef} className="max-w-2xl mx-auto relative z-10 opacity-0">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            Your space deserves better than plastic. Stock DROP.
          </h2>
          <p className="text-white/50 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
            Cafés, gyms, hotels, salons, co-working spaces, and events — stock DROP. for guests who notice the difference.
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
            <h3 className="text-[#C9A84C] text-2xl font-black tracking-tight mb-3 uppercase">Request Received</h3>
            <p className="text-white/60 font-medium text-sm">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Business Name */}
            <div className="md:col-span-2">
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Your business name"
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-all rounded-none"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Contact Name *</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
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
                placeholder="business@email.com"
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-all rounded-none"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Business Type *</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium focus:outline-none focus:border-[#C9A84C] transition-all appearance-none cursor-pointer rounded-none"
              >
                <option value="" className="bg-[#0F1112]">Select type</option>
                {BUSINESS_TYPES.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0F1112]">{opt}</option>
                ))}
              </select>
            </div>

            {/* Monthly Volume */}
            <div>
              <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Monthly Volume Interest</label>
              <select
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(e.target.value)}
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium focus:outline-none focus:border-[#C9A84C] transition-all appearance-none cursor-pointer rounded-none"
              >
                <option value="" className="bg-[#0F1112]">Select volume</option>
                {VOLUME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0F1112]">{opt}</option>
                ))}
              </select>
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="md:col-span-2 text-red-400 text-xs font-medium text-center">{message}</p>
            )}

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-transparent border-2 border-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-50 disabled:cursor-not-allowed text-[#C9A84C] font-black tracking-[0.2em] text-xs rounded-full transition-all duration-300 uppercase active:scale-95 cursor-pointer"
              >
                {status === 'loading' ? 'Sending...' : 'Request B2B Info'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
