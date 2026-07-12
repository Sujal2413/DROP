'use client';

import React from 'react';
import HeroNavbar from '@/components/HeroNavbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <HeroNavbar activeIndex={2} /> {/* Black theme */}
      
      <main className="pt-24 md:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-8 md:px-16 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase" style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}>
            Elevate Your Space
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Plastic bottles don't belong in premium gyms, boutique hotels, or modern cafés. 
            Offer your guests a hydration experience that matches your brand's standards. 
            Better margins, perfect cooler fit, and zero plastic waste.
          </p>
        </div>
        
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
