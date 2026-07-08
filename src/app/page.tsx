'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import ExplainerSection from '@/components/ExplainerSection';
import WaitlistSection from '@/components/WaitlistSection';
import B2BSection from '@/components/B2BSection';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import WhyAluminiumSection from '@/components/WhyAluminiumSection';
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

      {/* Hero — unchanged */}
      <HeroSection />

      {/* New conversion flow sections */}
      <main className="relative z-10">
        <ExplainerSection />
        <WaitlistSection />
        <B2BSection />
        <ProductShowcaseSection />
        <WhyAluminiumSection />
      </main>

      <Footer />
    </>
  );
}
