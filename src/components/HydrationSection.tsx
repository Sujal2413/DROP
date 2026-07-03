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
    <section id="products" className="min-h-screen bg-[var(--color-red)] text-[var(--color-cream)] p-8 flex flex-col justify-center relative z-10">
      <h1 className="text-[clamp(4rem,15vw,12rem)] text-center opacity-90 mb-16 leading-[0.9]">
        HYDRATION
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto w-full px-6 relative z-10">
        {CARDS.map((card, idx) => (
          <div 
            key={card.id}
            onClick={() => setSelectedCard(idx)}
            className={`${card.bgColor} ${card.textColor} p-8 lg:p-12 rounded-xl ${card.rotation} ${card.margin} shadow-[5px_5px_0px_var(--color-dark)] hover:-translate-y-1 hover:rotate-0 transition-all duration-300 flex flex-col justify-center cursor-pointer hover:shadow-[8px_8px_0px_var(--color-dark)]`}
          >
            <h2 className="text-3xl font-bold mb-4 uppercase">{card.title}</h2>
            <p className="font-sans text-lg lg:text-xl font-medium leading-relaxed">
              {card.content}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${selectedCard !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSelectedCard(null)}
      >
        {selectedCard !== null && (
          <div 
            className={`${CARDS[selectedCard].bgColor} ${CARDS[selectedCard].textColor} p-10 lg:p-16 rounded-2xl shadow-[10px_10px_0px_var(--color-dark)] max-w-2xl w-full relative transform transition-all duration-500 ${selectedCard !== null ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <X size={28} />
            </button>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tight">{CARDS[selectedCard].title}</h2>
            <p className="font-sans text-xl lg:text-2xl font-medium leading-relaxed">
              {CARDS[selectedCard].content}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
