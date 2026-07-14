import React from 'react';
import { Metadata } from 'next';
import HeroNavbar from '@/components/HeroNavbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'For Business | DROP Water',
  description: 'Offer your guests a premium hydration experience. Partner with DROP for luxury canned water in your café, gym, or hotel.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#0F1112] min-h-screen text-white flex flex-col">
      <HeroNavbar activeIndex={2} /> {/* Black theme */}
      
      <main className="pt-24 md:pt-32 pb-12 flex-grow">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-16 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase" style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}>
            Elevate Your Space
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Plastic bottles don&apos;t belong in premium gyms, boutique hotels, or modern cafés. 
            Offer your guests a hydration experience that matches your brand&apos;s standards. 
            Zero plastic waste. 100% infinitely recyclable.
          </p>
        </div>
        
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
