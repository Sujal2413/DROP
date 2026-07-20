'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index}
            className="border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="font-bold text-base text-white/90">
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-white/40 transition-transform duration-300 shrink-0 ml-4 ${
                  isOpen ? 'rotate-180 text-[#C9A84C]' : ''
                }`}
              />
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[300px] border-t border-white/5' : 'max-h-0'
              } overflow-hidden`}
            >
              <p className="px-6 py-5 text-sm leading-relaxed text-white/50">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
