'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import PhotographyWall from '@/components/PhotographyWall';
import MarqueeTicker from '@/components/MarqueeTicker';
import VariantShowcase from '@/components/VariantShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  const products = [
    {
      id: 'purple',
      name: 'Deep Purple',
      flavor: 'Mint Water',
      desc: 'Refreshing mint-infused still water designed to cool and soothe.',
      image: '/assets/new-can-variant-1.png',
    },
    {
      id: 'black',
      name: 'Full Black',
      flavor: 'Athlete Edition',
      desc: 'High-performance hydration rich in natural trace minerals.',
      image: '/assets/new-can-variant-3.png',
    },
    {
      id: 'gold',
      name: 'Pure Gold',
      flavor: 'Clove Water',
      desc: 'Infused with aromatic clove extracts to restore natural vitality.',
      image: '/assets/new-can-variant-2-final.png',
    },
    {
      id: 'silver',
      name: 'Pure Silver',
      flavor: 'Sparkling Water',
      desc: 'Crisp, carbonated water for pure effervescent refreshment.',
      image: '/assets/new-can-2.png',
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
          'name': 'Drop Water'
        },
        'offers': {
          '@type': 'Offer',
          'price': '80',
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

      {/* Hero — unchanged */}
      <HeroSection />

      {/* New conversion flow sections inspired by Slight Twist */}
      <main className="relative z-10 bg-[#F9F9F9]">
        <PhotographyWall />
        <MarqueeTicker />
        <VariantShowcase />
      </main>

      <Footer />
    </>
  );
}
