import React from 'react';
import { Metadata } from 'next';
import HeroNavbar from '@/components/HeroNavbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Dumbbell, Coffee, Hotel, Briefcase, Sparkles, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Business | Premium Canned Water for India',
  description: 'Offer your guests a premium hydration experience. Infinitely recyclable canned water for gyms, hotels, cafés, corporate offices and events in India.',
  alternates: {
    canonical: '/for-business',
  },
};

const B2B_SECTORS = [
  {
    icon: Dumbbell,
    title: 'Gyms & Fitness Studios',
    keyword: 'water for gyms and fitness studios',
    description: 'Elevate your members\' workout experience. Say goodbye to single-use plastic bottles in your studios. Serve ice-cold, mineral-rich, or trace mineral-infused functional water in infinitely recyclable premium aluminium cans that stand out in fitness refrigerators.',
  },
  {
    icon: Coffee,
    title: 'Cafés & Restaurants',
    keyword: 'water cans for hotels and cafés',
    description: 'Aesthetically designed cans that complement your table settings and brand identity. Align your beverage menu with modern consumer values—zero plastic, clean presentation, and crisp, premium hydration.',
  },
  {
    icon: Hotel,
    title: 'Boutique Hotels & Lodging',
    keyword: 'premium water brand India',
    description: 'Provide an premium welcome. Replace generic plastic bottles in hotel rooms, conference facilities, and mini-bars with custom-styled, elegant aluminium water cans that convey luxury and environmental responsibility.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Offices',
    keyword: 'sustainable packaged water India',
    description: 'Upgrade your boardroom and executive suites. Meet your corporate ESG and sustainability goals while serving refreshing, high-quality still or functional water to clients, guests, and teams.',
  },
  {
    icon: Sparkles,
    title: 'Weddings & Premium Events',
    keyword: 'canned water Mumbai',
    description: 'Create memorable hydration experiences at high-profile gatherings, exhibitions, weddings, and premium product launches. Make a statement with minimalist design that keeps beverages colder, longer.',
  },
  {
    icon: ShoppingBag,
    title: 'Premium Retail & Health Stores',
    keyword: 'functional water India',
    description: 'Differentiate your shelves. Capitalize on the growing premium and health-conscious consumer segments looking for clean ingredients, functional benefit profiles, and eco-friendly packaging.',
  },
];

export default function ForBusinessPage() {
  return (
    <div className="bg-[#0F1112] min-h-screen text-white flex flex-col font-sans selection:bg-[#C9A84C] selection:text-[#111111]">
      <HeroNavbar activeIndex={2} />
      
      <main className="pt-28 md:pt-36 flex-grow">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 md:px-16 text-center mb-16 md:mb-24">
          <span className="text-[#C9A84C] text-xs sm:text-sm font-black tracking-[0.3em] uppercase block mb-4">
            DROP. FOR PARTNERS
          </span>
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-none"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
          >
            Premium Canned Water for Gyms, Cafés, Hotels and Events
          </h1>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Plastic bottles don&apos;t belong in premium spaces. Partner with DROP. to offer your guests 
            and clients an infinitely recyclable, cold-retaining, and visually striking hydration experience. 
            Infused with trace minerals, mint, or clove.
          </p>
        </section>

        {/* Sectors Grid */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {B2B_SECTORS.map((sector, index) => {
              const IconComponent = sector.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white/[0.02] border border-white/5 hover:border-[#C9A84C]/30 hover:bg-white/[0.04] p-8 rounded-3xl transition-all duration-500 flex flex-col h-full group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C]/10 group-hover:border-[#C9A84C]/30 transition-all duration-500">
                    <IconComponent className="w-6 h-6 text-white group-hover:text-[#C9A84C] transition-colors duration-500" />
                  </div>
                  
                  <h3 
                    className="text-xl font-bold tracking-tight mb-3 text-white"
                  >
                    {sector.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm font-normal leading-relaxed mb-6 flex-grow">
                    {sector.description}
                  </p>
                  
                  <div className="pt-4 border-t border-white/5 text-[10px] font-black tracking-widest text-[#C9A84C]/60 uppercase">
                    Target: {sector.keyword}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Wholesale contact form */}
        <ContactSection />
      </main>

      <Footer theme="default" />
    </div>
  );
}
