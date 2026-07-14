import React from 'react';
import Image from 'next/image';

const VARIANTS = [
  {
    id: 'still',
    name: 'STILL WATER',
    desc: 'Pure, crisp 330ml still water.',
    useCase: 'Everyday Hydration',
    image: '/assets/new-can-variant-1.png', // Fallback image if needed
    isLaunch: true,
  },
  {
    id: 'mint',
    name: 'MINT WATER',
    desc: 'Refreshing mint-infused still water.',
    useCase: 'Post-Workout / Cooling',
    image: '/assets/new-can-variant-1.png',
    isLaunch: false,
  },
  {
    id: 'athlete',
    name: 'ATHLETE EDITION',
    desc: 'High-performance hydration rich in natural trace minerals.',
    useCase: 'Intense Recovery',
    image: '/assets/new-can-variant-3.png',
    isLaunch: false,
  },
  {
    id: 'clove',
    name: 'CLOVE WATER',
    desc: 'Infused with aromatic clove extracts.',
    useCase: 'Vitality & Digestion',
    image: '/assets/new-can-variant-2-final.png',
    isLaunch: false,
  },
  {
    id: 'sparkling',
    name: 'SPARKLING WATER',
    desc: 'Crisp, carbonated water for pure effervescent refreshment.',
    useCase: 'Effervescent Refreshment',
    image: '/assets/new-can-2.png',
    isLaunch: false,
  },
];

export default function VariantShowcase() {
  return (
    <section className="w-full bg-[#F9F9F9] text-[#111111] font-inter border-b border-[#E5E5E5]/30">
      
      {/* 1. Horizontal Drag-to-view Carousel */}
      <div className="py-24 border-b border-[#E5E5E5]/30">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16 mb-12">
          <h2 className="text-sm font-semibold tracking-[0.1em] text-[#111111]/50 uppercase mb-4">The Collection</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight">Explore the Range</p>
        </div>
        
        <div className="flex gap-8 overflow-x-auto px-5 md:px-16 pb-12 snap-x cursor-grab active:cursor-grabbing hide-scrollbar">
          {VARIANTS.map((v) => (
            <a key={`thumb-${v.id}`} href={`#variant-${v.id}`} className="flex-shrink-0 w-[240px] md:w-[320px] snap-start group flex flex-col items-center">
              <div className="w-full aspect-[3/4] bg-[#F1F1F1] rounded-sm mb-6 relative overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                 <div className="w-3/5 h-4/5 relative">
                    <Image src={v.image} alt={v.name} fill className="object-contain" />
                 </div>
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2 text-center">{v.name}</h3>
              <p className="text-sm text-[#111111]/60 text-center">{v.useCase}</p>
            </a>
          ))}
        </div>
      </div>

      {/* 2. Per-variant Product Showcases */}
      <div className="relative">
        {/* Navigation Dots (Sticky) */}
        <div className="hidden md:flex flex-col gap-4 absolute left-12 top-1/2 -translate-y-1/2 sticky top-[50vh] z-20">
           {VARIANTS.map(v => (
             <a key={`dot-${v.id}`} href={`#variant-${v.id}`} className="w-2 h-2 rounded-full bg-[#111111]/20 hover:bg-[#111111] transition-colors" aria-label={`Go to ${v.name}`}></a>
           ))}
        </div>

        {VARIANTS.map((v) => (
          <div key={v.id} id={`variant-${v.id}`} className="min-h-screen flex flex-col md:flex-row items-center max-w-[1440px] mx-auto px-5 md:px-16 py-32 border-b border-[#E5E5E5]/30">
            {/* Image Column */}
            <div className="w-full md:w-1/2 flex justify-center mb-16 md:mb-0">
               <div className="relative w-[300px] md:w-[450px] aspect-[1/2]">
                 <Image src={v.image} alt={v.name} fill className="object-contain drop-shadow-2xl" />
               </div>
            </div>
            {/* Content Column */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-24">
               <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">{v.name}</h2>
               <div className="w-12 h-[2px] bg-[#111111] mb-8"></div>
               <p className="text-xl md:text-2xl font-normal leading-relaxed text-[#111111]/80 mb-4">{v.desc}</p>
               <p className="text-sm font-semibold tracking-widest uppercase text-[#111111]/50 mb-12">Designed for: {v.useCase}</p>
               
               {v.isLaunch ? (
                 <button className="bg-[#111111] text-[#F9F9F9] px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#C0C0C0] hover:text-[#111111] transition-colors duration-300">
                   Join The List
                 </button>
               ) : (
                 <span className="inline-block border border-[#111111]/20 text-[#111111] px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase rounded-sm bg-[#E5E5E5]/20">
                   Coming Next
                 </span>
               )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
