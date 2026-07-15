import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureSplitSection from '@/components/FeatureSplitSection';
import VariantShowcase from '@/components/VariantShowcase';
import WhyDropSection from '@/components/WhyDropSection';
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
      }
    }))
  };

  return (
    <div className="bg-[#111111] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-10 bg-[#F9F9F9]">
        <HeroSection />
        <FeatureSplitSection />
        <VariantShowcase />
        <WhyDropSection />
        <WaitlistSection />
      </main>

      <Footer theme="default" />
    </div>
  );
}
