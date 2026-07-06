"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

const CARDS = [
  {
    id: 'story',
    title: 'PURE SOURCE',
    content: '500ml of still water. No additives, no noise. Just crisp hydration in a hyper-realistic shell.',
    bgColor: 'bg-[var(--color-mustard)]',
    textColor: 'text-[var(--color-dark)]',
    rotation: '-rotate-2',
    margin: '',
  },
  {
    id: 'sustainability',
    title: '0.0% ABV',
    content: "Because it's water. Drink it anywhere, anytime. Stay sharp.",
    bgColor: 'bg-[var(--color-dark)]',
    textColor: 'text-[var(--color-cream)]',
    rotation: 'rotate-2',
    margin: 'md:mt-16',
  },
  {
    id: 'clarity',
    title: 'LIQUID CLARITY',
    content: '"Water is the driving force of all nature." Essential, uncompromising, and absolutely necessary for the grind.',
    bgColor: 'bg-[var(--color-cream)]',
    textColor: 'text-[var(--color-dark)]',
    rotation: 'rotate-1',
    margin: 'mt-4 md:mt-8',
  },
  {
    id: 'fluid',
    title: 'STAY FLUID',
    content: '"Empty your mind, be formless, shapeless — like water." Adapt to any situation and keep moving forward.',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    rotation: '-rotate-3',
    margin: 'mt-4 md:mt-24',
  }
];

export default function HydrationSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (selectedCard !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCard]);

  return (
    <section id="hydration" className="min-h-screen bg-[var(--color-red)] text-[var(--color-cream)] p-8 flex flex-col justify-center relative z-10 font-sans">
      <h1 className="text-[clamp(3rem,10vw,8rem)] text-center opacity-90 mb-16 leading-[0.9] font-black tracking-tighter uppercase font-serif">
        The Essential Element
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto w-full px-6 relative z-10">
        {CARDS.map((card, idx) => (
          <div 
            key={card.id}
            onClick={() => setSelectedCard(idx)}
            className={`${card.bgColor} ${card.textColor} p-8 lg:p-12 rounded-3xl border border-white/10 shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center cursor-pointer hover:shadow-2xl group`}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">{card.title}</h2>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </span>
            </div>
            <p className="font-sans text-lg lg:text-xl font-light leading-relaxed opacity-90">
              {card.content}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${selectedCard !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSelectedCard(null)}
      >
        {selectedCard !== null && (
          <div 
            className={`${CARDS[selectedCard].bgColor} ${CARDS[selectedCard].textColor} p-10 lg:p-16 rounded-3xl shadow-2xl max-w-2xl w-full relative transform transition-all duration-700 ease-out border border-white/20 ${selectedCard !== null ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute top-6 right-6 p-3 rounded-full hover:bg-black/10 transition-colors backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl lg:text-5xl font-black mb-8 uppercase tracking-tight font-serif">{CARDS[selectedCard].title}</h2>
            <p className="font-sans text-xl lg:text-2xl font-light leading-relaxed opacity-90">
              {CARDS[selectedCard].content}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
