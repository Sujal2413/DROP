'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import HydrationSection from '@/components/HydrationSection';
import LoginPage from '@/components/LoginPage';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Home() {
  const { isLoggedIn, addToCart } = useCart();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  const products = [
    {
      id: 'purple',
      name: 'Deep Purple',
      flavor: 'Mint Water',
      desc: 'Refreshing mint-infused still water designed to cool and soothe.',
      image: '/assets/new-can-variant-1.png',
      bg: 'bg-[#1A0B2E]/90',
      border: 'border-[#E9D5FF]/20',
      text: 'text-[#E9D5FF]',
      scale: 1.1,
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    },
    {
      id: 'black',
      name: 'Full Black',
      flavor: 'Athlete Edition',
      desc: 'High-performance hydration rich in natural trace minerals.',
      image: '/assets/new-can-variant-3.png',
      bg: 'bg-[#0A0A0A]/90',
      border: 'border-white/10',
      text: 'text-white',
      scale: 1.06,
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    },
    {
      id: 'gold',
      name: 'Pure Gold',
      flavor: 'Clove Water',
      desc: 'Infused with aromatic clove extracts to restore natural vitality.',
      image: '/assets/new-can-variant-2-final.png',
      bg: 'bg-[#1C170E]/90',
      border: 'border-[#C9A84C]/20',
      text: 'text-[#C9A84C]',
      scale: 1.1,
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    },
    {
      id: 'silver',
      name: 'Pure Silver',
      flavor: 'Sparkling Water',
      desc: 'Crisp, carbonated water for pure effervescent refreshment.',
      image: '/assets/new-can-2.png',
      bg: 'bg-[#15181B]/90',
      border: 'border-[#E2E8F0]/20',
      text: 'text-[#E2E8F0]',
      scale: 1.06,
      filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': products.map((p, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'name': `DROP - ${p.name}`,
        'image': `https://www.dropwater.in${p.image}`,
        'description': p.desc,
        'brand': {
          '@type': 'Brand',
          'name': 'DROP'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/PreOrder',
          'url': 'https://www.dropwater.in'
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      <main className="relative z-10">
        <HydrationSection />

        {/* Section 3: Lineup */}
        <section id="products" className="min-h-screen bg-[var(--color-cream)] py-32 px-6 text-center flex flex-col justify-center items-center relative z-10 font-sans">
          <h2 className="text-[clamp(3rem,8vw,6rem)] text-[#1B2A22] mb-6 font-black tracking-tight leading-none uppercase font-serif">
            The Collection
          </h2>
          <p className="text-xs md:text-sm font-bold text-[#D4AF37] tracking-[0.3em] mb-24 uppercase">
            Pure hydration in four essential states.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 max-w-[90rem] mx-auto px-4 relative z-10 w-full">
            {products.map((p) => (
              <div
                key={p.id}
                className={`group relative rounded-[2rem] overflow-hidden border ${p.border} ${p.bg} shadow-xl transition-all duration-700 hover:-translate-y-3 flex flex-col h-[560px] p-8 hover:shadow-2xl backdrop-blur-md`}
              >
                {/* Image Pedestal / Container */}
                <div className="w-full h-[260px] relative overflow-hidden flex items-center justify-center mb-8 bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                  <div className="relative w-full h-[90%] transition-transform duration-1000 group-hover:scale-[1.08] ease-out">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain object-center"
                      style={{ filter: p.filter, transform: `scale(${p.scale})` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow text-center items-center justify-between">
                  <div>
                    <h3 className={`text-2xl font-black uppercase tracking-widest ${p.text} font-serif`}>
                      {p.name}
                    </h3>
                    <p className="text-[#D4AF37] font-semibold text-xs tracking-[0.2em] uppercase mt-2 opacity-90">
                      {p.flavor}
                    </p>
                    <p className="text-white/60 text-sm mt-4 px-2 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Show Interest Button */}
                  <button
                    onClick={() => addToCart({
                      id: p.id,
                      name: p.name,
                      flavor: p.flavor,
                      price: 'SURVEY ITEM',
                      image: p.image
                    })}
                    className={`w-full mt-8 py-4 bg-transparent border border-white/20 group-hover:bg-white/10 group-hover:border-white/40 ${p.text} font-bold tracking-[0.2em] text-[10px] md:text-xs rounded-full transition-all duration-500 uppercase active:scale-95 cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl`}
                  >
                    Select Edition
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
