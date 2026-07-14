'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import VariantShowcase from '@/components/VariantShowcase';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/data/products';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': PRODUCTS.map((p, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'name': p.displayName,
        'image': `https://www.dropwater.in${p.image}`,
        'description': p.description,
        'brand': {
          '@type': 'Brand',
          'name': 'Drop Water'
        }
        // Removed Offers/price as requested for Waitlist model
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — unchanged */}
      <HeroSection />

      {/* New conversion flow sections */}
      <main className="relative z-10 bg-[#F9F9F9]">
        <MarqueeTicker />
        <VariantShowcase />
        <WaitlistSection />
      </main>

      <Footer />
    </>
  );
}
