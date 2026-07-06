'use client';

import React from 'react';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import LoginPage from '@/components/LoginPage';

export default function SustainabilityPage() {
  const { isLoggedIn } = useCart();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen relative overflow-x-hidden antialiased selection:bg-[#C9A84C] selection:text-black">
      {/* Top Navbar */}
      <HeroNavbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#1A252C]/30 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] rounded-full bg-[#1A1815]/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-[#C9A84C] font-black text-xs tracking-[0.4em] uppercase mb-6 block animate-pulse">
            DROP MANDATE
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8 font-sans">
            PURE WATER.<br />
            ZERO PLASTIC.
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Every year, billions of plastic bottles pollute our oceans and ecosystems. We chose aluminum — infinitely recyclable, structurally sound, and cold to the touch.
          </p>
        </div>
      </section>

      {/* Grid: Narrative Panels (Bento Grid) */}
      <section className="py-24 px-6 md:px-12 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[32px] p-8 md:p-12 hover:border-[#C9A84C]/30 transition-all duration-500 flex flex-col justify-between group h-[400px] hover:shadow-[0_10px_30px_rgba(201,168,76,0.05)]">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#C9A84C]/10 group-hover:border-[#C9A84C]/25 transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-[#C9A84C] group-hover:text-white transition-colors duration-500">
                100% Recyclable Aluminum
              </h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed max-w-lg">
                Unlike plastic, which degrades and ends up in landfills, aluminum can be melted down and repurposed forever. 75% of all aluminum ever produced is still in use today.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 hover:border-[#C9A84C]/30 transition-all duration-500 flex flex-col justify-between group h-[400px] hover:shadow-[0_10px_30px_rgba(201,168,76,0.05)]">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#C9A84C]/10 group-hover:border-[#C9A84C]/25 transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-[#C9A84C] group-hover:text-white transition-colors duration-500">
                Low Carbon Loop
              </h3>
              <p className="text-white/60 text-xs font-medium leading-relaxed">
                By optimizing weight and transport logistics, we reduce emissions per transport loop, keeping our supply chains tight and efficient.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 hover:border-[#C9A84C]/30 transition-all duration-500 flex flex-col justify-between group h-[400px] hover:shadow-[0_10px_30px_rgba(201,168,76,0.05)]">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#C9A84C]/10 group-hover:border-[#C9A84C]/25 transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-[#C9A84C] group-hover:text-white transition-colors duration-500">
                Responsible Sourcing
              </h3>
              <p className="text-white/60 text-xs font-medium leading-relaxed">
                We only source water from springs that naturally replenish, never draining basins or disrupting surrounding habitats and ecosystems.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[32px] p-8 md:p-12 hover:border-[#C9A84C]/30 transition-all duration-500 flex flex-col justify-between group h-[400px] hover:shadow-[0_10px_30px_rgba(201,168,76,0.05)]">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#C9A84C]/10 group-hover:border-[#C9A84C]/25 transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-[#C9A84C] group-hover:text-white transition-colors duration-500">
                Eco Partnership Survey
              </h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed max-w-lg">
                We treat our customers as partners in environmental change. By sharing interest in our canned products, you help us scale production, drive down aluminum costs, and phase out plastic.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Bold CTA */}
      <section className="py-32 px-6 text-center border-t border-white/5 relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
          Ready to make<br />the transition?
        </h2>
        <p className="text-white/40 text-sm md:text-base font-medium max-w-md mb-10">
          Support sustainable, plastic-free hydration. Join the survey to demonstrate interest and shape the future of DROP.
        </p>
        <a 
          href="/#products"
          className="px-10 py-5 bg-[#C9A84C] hover:bg-[#B0913B] text-black font-black tracking-widest text-xs rounded-full transition-all duration-300 uppercase shadow-lg shadow-[#C9A84C]/10 hover:shadow-[#C9A84C]/25 cursor-pointer active:scale-95 text-center inline-block"
        >
          View Canned Flavors
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
